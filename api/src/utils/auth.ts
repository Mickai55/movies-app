import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashPassword(plain: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}
export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export function signAccessToken(
  payload: object,
  secret: string,
  expiresIn: any
) {
  return jwt.sign(payload, secret, { expiresIn });
}
export function signRefreshToken(
  payload: object,
  secret: string,
  expiresIn: any
) {
  return jwt.sign(payload, secret, { expiresIn });
}
export function verifyToken<T = any>(token: string, secret: string): T {
  return jwt.verify(token, secret) as T;
}
