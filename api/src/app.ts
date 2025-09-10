import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config";
import moviesRouter from "./routes/movies.routes";

const app = express();
app.use(cors());
app.use(express.json());

async function connectMongo() {
  let uri = (config.mongoUri || "").trim();
  if (uri === "memory") {
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongod = await MongoMemoryServer.create();
    uri = mongod.getUri();
    console.log("Using in-memory Mongo at", uri);
  }
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error(`MONGO_URI invalid: ${uri}`);
  }
  await mongoose.connect(uri);
  console.log("Mongo connected");
}
connectMongo().catch((err) => console.error("Mongo error", err));

app.get("/health", (_req, res) => res.send("ok"));
app.use("/api/movies", moviesRouter);

export default app;
