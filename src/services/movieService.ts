import axios from "axios";
import type { Movie } from "../types/movie";

const url = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(url, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
  });

  return response.data.results;
};