import { Schema, model, Types } from "mongoose";

export interface PosterDoc {
  _id: Types.ObjectId;
  url: string;
  source: "omdb";
  width?: number;
  height?: number;
  contentType?: string;
}

const PosterSchema = new Schema<PosterDoc>(
  {
    url: { type: String, required: true, unique: true },
    source: { type: String, default: "omdb" },
    width: Number,
    height: Number,
    contentType: String,
  },
  { timestamps: true }
);

export const Poster = model<PosterDoc>("Poster", PosterSchema);
