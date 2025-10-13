import React, { useState, useEffect } from "react";
import { Movie } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { Star, StarOff, X } from "lucide-react";

// @ts-ignore
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

interface Props {
  movie: Movie;
  index: number;
}

const MovieCard: React.FC<Props> = ({ movie, index }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false); // dialog open state
  const [tempRating, setTempRating] = useState<number>(5.0);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const [favRes, ratedRes] = await Promise.all([
          fetch(`${API_BASE}/api/user-movies/favorites`, {
            credentials: "include",
          }),
          fetch(`${API_BASE}/api/user-movies/rated`, {
            credentials: "include",
          }),
        ]);
        if (favRes.ok) {
          const favData = await favRes.json();
          setIsFavorite(
            favData.favorites.some((f: any) => f._id === movie._id)
          );
        }
        if (ratedRes.ok) {
          const ratedData = await ratedRes.json();
          const entry = ratedData.ratedMovies.find(
            (r: any) => r.movie._id === movie._id
          );
          if (entry) {
            setRating(entry.rating);
            setTempRating(entry.rating);
          }
        }
      } catch {
        /* ignore */
      }
    })();
  }, [user, movie._id]);

  async function toggleFavorite() {
    if (!user) return alert("Please login first.");
    setSaving(true);
    try {
      await fetch(`${API_BASE}/api/user-movies/favorites/${movie._id}`, {
        method: "POST",
        credentials: "include",
      });
      setIsFavorite((f) => !f);
    } finally {
      setSaving(false);
    }
  }

  async function saveRating() {
    if (!user) return alert("Please login first.");
    setSaving(true);
    try {
      await fetch(`${API_BASE}/api/user-movies/rated/${movie._id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: Number(tempRating.toFixed(1)) }),
      });
      setRating(Number(tempRating.toFixed(1)));
      setOpen(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      key={movie._id}
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4 flex flex-col"
    >
      <p className="text-xs text-gray-400 pb-2">{index + 1}</p>

      {movie.poster?.url ? (
        <img
          src={movie.poster.url}
          alt={movie.title}
          className="w-full h-72 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <div className="w-full h-72 bg-gray-200 rounded-xl grid place-items-center">
          <p className="text-gray-400">No poster</p>
        </div>
      )}

      <div className="mt-3 flex-1">
        <h3 className="font-semibold text-lg">{movie.title}</h3>
        <p className="text-sm text-gray-600">
          {movie.year} • {movie.type}
        </p>
      </div>

      {/* Favorite + Rating buttons */}
      <div className="mt-3 flex items-center justify-between border-t pt-2">
        {/* Favorite */}
        <button
          onClick={toggleFavorite}
          disabled={saving}
          className={`flex items-center gap-1 text-sm ${
            isFavorite
              ? "text-yellow-500 hover:text-yellow-600"
              : "text-gray-500 hover:text-gray-700"
          } transition`}
        >
          {isFavorite ? <Star fill="currentColor" /> : <StarOff />}
          {"Favorite"}
        </button>

        {/* Rating */}
        <button
          onClick={() => setOpen(true)}
          disabled={saving}
          className="px-3 py-1 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          {rating ? `⭐ ${rating.toFixed(1)}` : "Rate"}
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => !saving && setOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 w-80 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-semibold text-center mb-4">
              Rate {movie.title}
            </h2>

            <div className="flex flex-col items-center gap-3">
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={tempRating}
                onChange={(e) => setTempRating(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="text-xl font-semibold text-indigo-600">
                {tempRating.toFixed(1)} / 10
              </span>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1.5 rounded-md border text-gray-600 hover:bg-gray-100"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={saveRating}
                disabled={saving}
                className="px-4 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
