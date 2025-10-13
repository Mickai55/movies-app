export type Poster = { _id: string; url: string };
export type Movie = {
  _id: string;
  imdbID: string;
  title: string;
  year?: string;
  type?: string;
  poster?: Poster;
};

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  favorites?: Movie[];
  ratedMovies?: { movie: Movie; rating: number }[];
}
