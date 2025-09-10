import React from "react";
import type { Movie } from "../types";

const MoviesGrid: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  if (movies.length === 0)
    return (
      <p className="text-gray-500 mt-6">No movies yet. Click a button above.</p>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {movies.map((m, index) => (
        <div
          key={m._id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4"
        >
          <p className="text-xs text-gray-400 pb-2">{index + 1}</p>
          {m.poster?.url ? (
            <img
              src={m.poster.url}
              alt={m.title}
              className="w-full h-72 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-72 bg-gray-200 rounded-xl grid place-items-center">
              <p className="text-gray-400">No poster </p>
            </div>
          )}
          <div className="mt-3">
            <h3 className="font-semibold text-lg">{m.title}</h3>
            <p className="text-sm text-gray-600">
              {m.year} • {m.type}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesGrid;
