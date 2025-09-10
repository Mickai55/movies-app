import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;
let app: any;

const mockSearchPayload = {
  Response: "True",
  Search: [
    {
      Title: "The Matrix",
      Year: "1999",
      imdbID: "tt0133093",
      Type: "movie",
      Poster: "https://x/a.jpg",
    },
    {
      Title: "The Matrix Reloaded",
      Year: "2003",
      imdbID: "tt0234215",
      Type: "movie",
      Poster: "https://x/b.jpg",
    },
  ],
};

describe("Movies API integration", () => {
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongod.getUri();

    const mod = await import("../src/app");
    app = mod.default;

    jest.spyOn(global as any, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockSearchPayload,
    } as any);
  });

  afterAll(async () => {
    jest.restoreAllMocks();
    await mongoose.disconnect();
    if (mongod) await mongod.stop();
  });

  afterEach(async () => {
    const conn = mongoose.connection;
    if (conn.readyState === 1) {
      await conn.db!.dropDatabase();
    }
  });

  it("GET /api/movies/fetch saves without duplicates and creates relation with poster", async () => {
    const r1 = await request(app)
      .get("/api/movies/fetch")
      .query({ q: "Matrix" });
    expect(r1.status).toBe(200);
    expect(r1.body.count).toBe(10);

    const r2 = await request(app)
      .get("/api/movies/fetch")
      .query({ q: "Matrix" });
    expect(r2.status).toBe(200);
    expect(r2.body.count).toBe(10);

    const list = await request(app).get("/api/movies");
    expect(list.status).toBe(200);
    expect(list.body.movies).toHaveLength(10);

    const ids = list.body.movies.map((m: any) => m.imdbID);
    expect(new Set(ids).size).toBe(ids.length);

    for (const m of list.body.movies) {
      expect(m.poster?.url).toMatch(/^https?:\/\//);
    }
  });
});
