import { Router } from "express";
import { fetchAndStore, listMovies } from "../controllers/movies.controller";

const r = Router();

r.get("/fetch", fetchAndStore);
r.get("/", listMovies);

export default r;
