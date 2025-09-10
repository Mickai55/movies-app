export type OmdbSearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export const normalizeOmdbItem = (item: OmdbSearchItem) => ({
  imdbID: item.imdbID,
  title: item.Title,
  year: item.Year,
  type: item.Type,
  posterUrl: item.Poster && item.Poster !== "N/A" ? item.Poster : undefined,
});
