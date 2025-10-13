import { Router } from "express";
import { fetchAndStore, listMovies } from "../controllers/movies.controller";
import { requireAuth } from "../middleware/auth";

const r = Router();
r.use(requireAuth); // 👈 protect all movie endpoints
r.get("/fetch", fetchAndStore);
r.get("/", listMovies);

export default r;
