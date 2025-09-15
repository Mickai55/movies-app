import React from "react";
import { Movie } from "../../types";

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <div
      key={movie._id}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-4"
    >
      {movie.poster?.url ? (
        <img
          src={movie.poster.url}
          alt={movie.title}
          className="w-full h-72 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <div className="w-full h-72 bg-gray-200 rounded-xl grid place-items-center">
          <p className="text-gray-400">No poster </p>
        </div>
      )}
      <div className="mt-3">
        <h3 className="font-semibold text-lg">{movie.title}</h3>
        <p className="text-sm text-gray-600">
          {movie.year} • {movie.type}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
