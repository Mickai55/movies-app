import "dotenv/config";
export const config = {
  port: parseInt(process.env.PORT ?? "4000", 10),
  mongoUri: (
    process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/fullstack_focus"
  ).trim(),
  omdbApiKey: process.env.OMDB_API_KEY ?? "720c3666",
};
