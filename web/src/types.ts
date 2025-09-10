export type Poster = { _id: string; url: string };
export type Movie = {
  _id: string;
  imdbID: string;
  title: string;
  year?: string;
  type?: string;
  poster?: Poster;
};
