import { config } from "../config";
import { normalizeOmdbItem } from "../utils/normalize";

const OMDB_BASE = "http://www.omdbapi.com/";

export async function searchOmdb(query: string) {
  const url = `${OMDB_BASE}?s=${encodeURIComponent(query)}&apikey=${
    config.omdbApiKey
  }`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OMDb error ${res.status}`);
  const data: any = await res.json();
  if (data.Response === "False") return [];
  return (data.Search ?? []).map(normalizeOmdbItem);
}
