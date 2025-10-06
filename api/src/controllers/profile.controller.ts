import { Request, Response } from "express";
import { User } from "../models/User";

export async function getProfile(req: Request, res: Response) {
  // @ts-ignore
  const userId = req.user.id;
  const user = await User.findById(userId).select("email username avatarUrl createdAt");
  res.json({ user });
}

export async function updateProfile(req: Request, res: Response) {
  // @ts-ignore
  const userId = req.user.id;
  const { username, avatarUrl } = req.body || {};
  const update: any = {};
  if (username) update.username = username;
  if (avatarUrl) update.avatarUrl = avatarUrl;

  const user = await User.findByIdAndUpdate(userId, update, { new: true })
    .select("email username avatarUrl createdAt");

  res.json({ ok: true, user });
}
