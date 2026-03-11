import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
import { toast } from "react-hot-toast";  



import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Loader } from "../Loader/Loader";


interface MovieGridProps {
  query: string;
  onMovieClick: (movie: Movie) => void;
}

export const MovieGrid = ({ query, onMovieClick }: MovieGridProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const notifyNotFound = () => toast('❌ No movies found for your request.');

  useEffect(() => {
    if (!query) {
      return;
    }

    const getMovies = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchMovies(query);
        if (data.length === 0) {
          notifyNotFound();
          setMovies([]);
          return;
        }
        setMovies(data);
      } catch (error) {
        setIsError(true);        
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [query]);

  if (isError) {
    return <ErrorMessage />;
  }


  if (isLoading) {
    return <Loader />;
  }

  return (
    <ul className={css.grid}>
      {movies.map(movie => (
        <li key={movie.id} onClick={() => onMovieClick(movie)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};