import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
  toggleFavorite,
  rateMovie,
  getFavorites,
  getRatedMovies,
} from "../controllers/userMovies.controller";

const r = Router();
r.use(requireAuth);

r.get("/favorites", getFavorites);
r.post("/favorites/:movieId", toggleFavorite);

r.get("/rated", getRatedMovies);
r.post("/rated/:movieId", rateMovie);

export default r;
