import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const moviesEmpty = { movies: [] };
export const moviesAfterFetch = {
  count: 2,
  movies: [
    {
      _id: "1",
      imdbID: "tt0133093",
      title: "The Matrix",
      year: "1999",
      type: "movie",
      poster: { _id: "p1", url: "https://img/1.jpg" },
    },
    {
      _id: "2",
      imdbID: "tt0234215",
      title: "The Matrix Reloaded",
      year: "2003",
      type: "movie",
      poster: { _id: "p2", url: "https://img/2.jpg" },
    },
  ],
};

const API = "http://localhost:4000";

export const handlers = [
  http.get(`${API}/api/movies`, () => HttpResponse.json(moviesEmpty)),
  http.get(`${API}/api/movies/fetch`, () =>
    HttpResponse.json(moviesAfterFetch)
  ),
  http.get(`${API}/api/movies`, () =>
    HttpResponse.json({ movies: moviesAfterFetch.movies })
  ),
];

export const server = setupServer(...handlers);
