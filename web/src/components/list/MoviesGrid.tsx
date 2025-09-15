import React, { useEffect, useState } from "react";
import type { Movie } from "../../types";
import MovieCard from "./MovieCard";
import ButtonBar from "./ButtonBar";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";

// @ts-ignore
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

const MoviesGrid: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<{
    page: number;
    pages: number;
    limit: number;
  }>({
    page: 1,
    pages: 1,
    limit: 12,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  async function loadAll() {
    try {
      setLoading(true);
      const sort = searchParams.get("sort") || "title";
      const order = searchParams.get("order") || "asc";
      const page = parseInt(searchParams.get("page") || "1", 10);
      const limit = parseInt(searchParams.get("limit") || "12", 10);

      const res = await fetch(
        `${API_BASE}/api/movies?sort=${sort}&order=${order}&page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setMovies(data.movies);
      setMeta({ page: data.page, pages: data.pages, limit: data.limit });

      // scroll to top after data load
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      alert("Server Error: Failed to load movies");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, [searchParams]);

  async function onFetch(q: string) {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/api/movies/fetch?q=${encodeURIComponent(q)}`);
      await loadAll();
    } catch (err) {
      alert("Server Error: Failed to add movies to list");
    } finally {
      setLoading(false);
    }
  }

  const goToPage = (p: number) => {
    const sort = searchParams.get("sort") || "title";
    const order = searchParams.get("order") || "asc";
    const limit = searchParams.get("limit") || "12";
    setSearchParams({ sort, order, page: String(p), limit });
  };

  const changeLimit = (l: number) => {
    const sort = searchParams.get("sort") || "title";
    const order = searchParams.get("order") || "asc";
    setSearchParams({ sort, order, page: "1", limit: String(l) });
  };

  return (
    <>
      <p className="text-gray-600 mb-6">
        Search for your favorite movies and add them to your collection. 😎
      </p>

      <ButtonBar onFetch={onFetch} loading={loading} />

      {movies.length === 0 ? (
        <p className="text-gray-500 mt-6">
          No movies yet. Click a button above.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {movies.map((m, index) => (
              <MovieCard key={m._id} movie={m} />
            ))}
          </div>

          <Pagination
            page={meta.page}
            pages={meta.pages}
            limit={meta.limit}
            onPageChange={goToPage}
            onLimitChange={changeLimit}
          />
        </>
      )}
    </>
  );
};

export default MoviesGrid;
