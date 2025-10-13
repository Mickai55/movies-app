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
  // @ts-ignore
  const userId = req.user.id;

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
      { imdbID: item.imdbID, createdBy: userId },
      {
        $set: update,
        $setOnInsert: { imdbID: item.imdbID, createdBy: userId },
      },
      { new: true, upsert: true }
    ).populate("poster");

    results.push(movie);
  }

  res.json({ count: results.length, movies: results });
}

export async function listMovies(req: Request, res: Response) {
  // @ts-ignore
  const userId = req.user.id;

  const sortField = String(req.query.sort || "createdAt");
  const order = req.query.order === "asc" ? 1 : -1;
  const page = Math.max(parseInt(String(req.query.page || "1"), 10), 1);
  const limit = Math.max(parseInt(String(req.query.limit || "12"), 10), 1);

  const query = { createdBy: userId };

  const total = await Movie.countDocuments(query);
  const movies = await Movie.find(query)
    .populate("poster")
    .sort({ [sortField]: order })
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

  res.json({
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
    movies,
  });
}
