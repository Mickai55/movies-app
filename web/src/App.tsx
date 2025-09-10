import React, { useEffect, useState } from "react";
import ButtonBar from "./components/ButtonBar";
import MoviesGrid from "./components/MoviesGrid";
import type { Movie } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadAll() {
    try {
      const res = await fetch(`${API_BASE}/api/movies`);
      const data = await res.json();
      setMovies(data.movies);
    } catch (err) {
      alert("Server Error: Failed to load movies");
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function onFetch(q: string) {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/api/movies/fetch?q=${encodeURIComponent(q)}`);
      await loadAll();
    } catch (err) {
      alert("Server Error: Failed to add movies to list");
    }
     finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Movies App</h1>
      <p className="text-gray-600 mb-6">
        Welcome! Search for your favorite movies. 😎
      </p>
      <ButtonBar onFetch={onFetch} loading={loading} />
      <MoviesGrid movies={movies} />
    </div>
  );
}
