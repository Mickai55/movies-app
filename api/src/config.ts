import "dotenv/config";
export const config = {
  port: parseInt(process.env.PORT ?? "4000", 10),
  mongoUri: (process.env.MONGO_URI ?? "").trim(),
  omdbApiKey: process.env.OMDB_API_KEY ?? "720c3666",

  jwt: {
    secret: process.env.JWT_SECRET ?? "dev-secret",
    expires: process.env.JWT_EXPIRES ?? "15m",
    refreshSecret: process.env.REFRESH_SECRET ?? "dev-refresh",
    refreshExpires: process.env.REFRESH_EXPIRES ?? "30d",
  },

  cookies: {
    secure: process.env.COOKIE_SECURE === "true",
    domain: process.env.COOKIE_DOMAIN || undefined,
  }
};
