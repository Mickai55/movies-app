import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { config } from "./config";
import moviesRouter from "./routes/movies.routes";
import authRouter from "./routes/auth.routes";
import profileRouter from "./routes/profile.routes";
import userMoviesRouter from "./routes/userMovies.routes";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// CORS: allow your frontend origin and cookies (credentials)
app.use(cors({
  origin: (origin, cb) => cb(null, true), // or ['http://localhost:5173']
  credentials: true,
}));

// Connect to Atlas
mongoose.connect(config.mongoUri).then(() => console.log("Mongo connected")).catch(err => console.error("Mongo error", err));

app.get("/health", (_req, res) => res.send("ok"));

// Mount routes
app.use("/api/auth", authRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/profile", profileRouter);
app.use("/api/user-movies", userMoviesRouter);

export default app;
