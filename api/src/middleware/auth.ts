import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";
import { config } from "../config";
import { User } from "../models/User";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearer = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : undefined;
  const token = req.cookies?.access_token || bearer;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const payload = verifyToken<{ sub: string }>(token, config.jwt.secret);
    const user = await User.findById(payload.sub)
      .select("email username avatarUrl")
      .lean();
    if (!user) return res.status(401).json({ error: "User not found" });

    // @ts-ignore
    req.user = { id: payload.sub, ...user };
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
