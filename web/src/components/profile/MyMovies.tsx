import React, { useState, useEffect } from "react";
import { Movie } from "../../types";
import MovieCard from "../list/MovieCard";
import { useAuth } from "../../context/AuthContext";

// @ts-ignore
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

const MyMovies: React.FC = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<"favorites" | "ratings">("favorites");
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [ratedMovies, setRatedMovies] = useState<
    { movie: Movie; rating: number }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    (async () => {
      try {
        if (tab === "favorites") {
          const res = await fetch(`${API_BASE}/api/user-movies/favorites`, {
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            setFavorites(data.favorites);
          }
        } else {
          const res = await fetch(`${API_BASE}/api/user-movies/rated`, {
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            setRatedMovies(data.ratedMovies);
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [tab, user]);

  if (!user)
    return (
      <div className="text-center py-10 text-gray-600">
        Please log in to view your movies.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">My Movies 🎥</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setTab("favorites")}
          className={`px-6 py-2 text-sm font-medium rounded-l-xl border 
            ${
              tab === "favorites"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
        >
          ⭐ Favorites
        </button>
        <button
          onClick={() => setTab("ratings")}
          className={`px-6 py-2 text-sm font-medium rounded-r-xl border-t border-b border-r 
            ${
              tab === "ratings"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
        >
          🎬 Ratings
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : tab === "favorites" ? (
        favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie, i) => (
              <MovieCard key={movie._id} movie={movie} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            You don’t have any favorite movies yet. ⭐
          </p>
        )
      ) : ratedMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ratedMovies.map(({ movie, rating }, i) => (
            <div key={movie._id} className="relative">
              <MovieCard movie={movie} index={i} />
              <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                {rating.toFixed(1)} / 10
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          You haven’t rated any movies yet. 🎯
        </p>
      )}
    </div>
  );
};

export default MyMovies;
