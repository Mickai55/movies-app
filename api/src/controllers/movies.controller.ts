import { Request, Response } from "express";
import { Movie } from "../models/Movie";
import { Poster } from "../models/Poster";
import { searchOmdb } from "../services/omdb.service";

async function upsertPoster(url?: string) {
  if (!url) return undefined;
  const existing = await Poster.findOne({ url }).exec();
  if (existing) return existing._id;
  const created = await Poster.create({ url, source: "omdb" });
  return created._id;
}

export async function fetchAndStore(req: Request, res: Response) {
  const { q } = req.query as { q: string };
  if (!q) return res.status(400).json({ error: "Missing q" });
  const items = await searchOmdb(q);

  const results = [] as any[];
  for (const item of items) {
    const posterId = await upsertPoster(item.posterUrl);
    const update = {
      title: item.title,
      year: item.year,
      type: item.type,
      poster: posterId,
    };
    const movie = await Movie.findOneAndUpdate(
      { imdbID: item.imdbID },
      { $set: update, $setOnInsert: { imdbID: item.imdbID } },
      { new: true, upsert: true }
    ).populate("poster");
    results.push(movie);
  }

  res.json({ count: results.length, movies: results });
}

export async function listMovies(_req: Request, res: Response) {
  const movies = await Movie.find({})
    .populate("poster")
    .sort({ createdAt: -1 })
    .limit(200)
    .exec();
  res.json({ movies });
}
