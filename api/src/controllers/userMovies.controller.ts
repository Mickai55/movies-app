import { Request, Response } from "express";
import { User } from "../models/User";
import { Movie } from "../models/Movie";

export async function toggleFavorite(req: Request, res: Response) {
  // @ts-ignore
  const userId = req.user.id;
  const { movieId } = req.params;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const index = user.favorites.findIndex((id) => id.toString() === movieId);
  if (index >= 0) {
    // remove
    user.favorites.splice(index, 1);
  } else {
    // add
    const exists = await Movie.exists({ _id: movieId, createdBy: userId });
    if (!exists) return res.status(404).json({ error: "Movie not found" });
    user.favorites.push(new (require("mongoose").Types.ObjectId)(movieId));
  }

  await user.save();
  res.json({ favorites: user.favorites });
}

export async function rateMovie(req: Request, res: Response) {
  // @ts-ignore
  const userId = req.user.id;
  const { movieId } = req.params;
  const { rating } = req.body;

  if (typeof rating !== "number" || rating < 0 || rating > 10)
    return res.status(400).json({ error: "Rating must be between 0 and 10" });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const idx = user.ratedMovies.findIndex((r) => r.movie.toString() === movieId);
  if (idx >= 0) user.ratedMovies[idx].rating = rating;
  else
    user.ratedMovies.push({
      movie: new (require("mongoose").Types.ObjectId)(movieId),
      rating,
    });

  await user.save();
  res.json({ ratedMovies: user.ratedMovies });
}

export async function getFavorites(req: Request, res: Response) {
  // @ts-ignore
  const userId = req.user.id;
  const user = await User.findById(userId)
    .populate({
      path: "favorites",
      populate: { path: "poster" }, // 👈 nested populate
    })
    .select("favorites");

  res.json({ favorites: user?.favorites ?? [] });
}

export async function getRatedMovies(req: Request, res: Response) {
  // @ts-ignore
  const userId = req.user.id;
  const user = await User.findById(userId)
    .populate({
      path: "ratedMovies.movie",
      populate: { path: "poster" }, // 👈 nested populate
    })
    .select("ratedMovies");

  res.json({ ratedMovies: user?.ratedMovies ?? [] });
}
