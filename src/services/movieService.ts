import axios from "axios";
import type { Movie, MoviesResponse } from "../types/movie";

const url = "https://api.themoviedb.org/3/search/movie";
const token = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesResponse>(url, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data.results;
};