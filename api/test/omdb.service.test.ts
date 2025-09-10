import { searchOmdb } from "../src/services/omdb.service";

describe("searchOmdb", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("normalizes results from OMDb", async () => {
    const fakePayload = {
      Response: "True",
      Search: [
        {
          Title: "The Matrix",
          Year: "1999",
          imdbID: "tt0133093",
          Type: "movie",
          Poster: "https://x/y.jpg",
        },
        {
          Title: "Matrix Reloaded",
          Year: "2003",
          imdbID: "tt0234215",
          Type: "movie",
          Poster: "N/A",
        },
      ],
    };

    const fetchSpy = jest.spyOn(global as any, "fetch").mockResolvedValue({
      ok: true,
      json: async () => fakePayload,
    } as any);

    const items = await searchOmdb("Matrix");
    expect(fetchSpy).toHaveBeenCalled();
    expect(items).toHaveLength(2);
    expect(items[0]).toEqual({
      imdbID: "tt0133093",
      title: "The Matrix",
      year: "1999",
      type: "movie",
      posterUrl: "https://x/y.jpg",
    });
    expect(items[1].posterUrl).toBeUndefined();
  });
});
