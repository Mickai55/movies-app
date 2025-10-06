import { Request, Response } from "express";
import { User } from "../models/User";
import { hashPassword, verifyPassword, signAccessToken, signRefreshToken, verifyToken } from "../utils/auth";
import { config } from "../config";

function setAuthCookies(res: Response, access: string, refresh: string) {
  const common = {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: config.cookies.secure,
    domain: config.cookies.domain,
    path: "/",
  };
  res.cookie("access_token", access, { ...common, maxAge: 15 * 60 * 1000 }); // 15m
  res.cookie("refresh_token", refresh, { ...common, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30d
}

export async function register(req: Request, res: Response) {
  const { email, password, username } = req.body || {};
  if (!email || !password || !username)
    return res.status(400).json({ error: "email, username & password required" });

  const exists = await User.findOne({ email }).lean();
  if (exists) return res.status(409).json({ error: "Email already registered" });

  const passwordHash = await hashPassword(password);
  await User.create({ email, username, passwordHash });

  return res.status(201).json({ ok: true });
}


export async function login(req: Request, res: Response) {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "email & password required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const payload = { sub: user.id, email: user.email };
  const access = signAccessToken(payload, config.jwt.secret, config.jwt.expires);
  const refresh = signRefreshToken(payload, config.jwt.refreshSecret, config.jwt.refreshExpires);

  setAuthCookies(res, access, refresh);
  return res.json({ ok: true, user: { id: user.id, email: user.email, username: user.username, avatarUrl: user.avatarUrl } });
}

export async function me(req: Request, res: Response) {
  // populated by auth middleware
  // @ts-ignore
  const user = req.user;
  res.json({ user });
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies?.refresh_token;
  if (!token) return res.status(401).json({ error: "No refresh token" });

  try {
    const data = verifyToken<{ sub: string; email: string }>(token, config.jwt.refreshSecret);
    const payload = { sub: data.sub, email: data.email };
    const access = signAccessToken(payload, config.jwt.secret, config.jwt.expires);
    const refreshTok = signRefreshToken(payload, config.jwt.refreshSecret, config.jwt.refreshExpires);
    setAuthCookies(res, access, refreshTok);
    res.json({ ok: true });
  } catch {
    res.status(401).json({ error: "Invalid refresh token" });
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("access_token", { path: "/", domain: config.cookies.domain, secure: config.cookies.secure, sameSite: "lax" });
  res.clearCookie("refresh_token", { path: "/", domain: config.cookies.domain, secure: config.cookies.secure, sameSite: "lax" });
  res.json({ ok: true });
}
