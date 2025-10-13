import { Schema, model, Types } from "mongoose";

export interface UserDoc {
  email: string;
  username: string;
  passwordHash: string;
  avatarUrl?: string;
  favorites: Types.ObjectId[];
  ratedMovies: { movie: Types.ObjectId; rating: number }[];
  createdAt: Date;
  updatedAt: Date;
}

const RatedSchema = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    rating: { type: Number, min: 0, max: 10, required: true },
  },
  { _id: false }
);

const UserSchema = new Schema<UserDoc>(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Movie" }], // ⭐ favorite movies
    ratedMovies: [RatedSchema], // 🎬 ratings array
  },
  { timestamps: true }
);

export const User = model<UserDoc>("User", UserSchema);
