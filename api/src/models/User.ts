import { Schema, model } from "mongoose";

export interface UserDoc {
  email: string;
  username: string;
  passwordHash: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDoc>(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

export const User = model<UserDoc>("User", UserSchema);
