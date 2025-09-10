import { Schema, model, Types } from "mongoose";

export interface MovieDoc {
  _id: Types.ObjectId;
  imdbID: string; // unique key
  title: string;
  year?: string;
  type?: string;
  poster?: Types.ObjectId;
}

const MovieSchema = new Schema<MovieDoc>(
  {
    imdbID: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    year: String,
    type: String,
    poster: { type: Schema.Types.ObjectId, ref: "Poster" },
  },
  { timestamps: true }
);

export const Movie = model<MovieDoc>("Movie", MovieSchema);
