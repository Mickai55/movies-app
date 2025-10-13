import { Schema, model, Types } from "mongoose";

const MovieSchema = new Schema(
  {
    imdbID: { type: String, unique: false },
    title: String,
    year: String,
    type: String,
    poster: { type: Schema.Types.ObjectId, ref: "Poster" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // 👈 NEW
  },
  { timestamps: true }
);

MovieSchema.index({ imdbID: 1, createdBy: 1 }, { unique: true }); // unique per user

export const Movie = model("Movie", MovieSchema);
