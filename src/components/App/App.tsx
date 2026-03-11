import { useState, useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { MovieModal } from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";
import styles from "./App.module.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setIsError(false);
      setIsLoading(false);
      return;
    }

    const getMovies = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await fetchMovies(query);

        if (data.length === 0) {
          toast.error("No movies found for your request.");
          setMovies([]);
        } else {
          setMovies(data);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [query]);

  return (
    <>
      <Toaster />
      <div className={styles.app}>
        <SearchBar onSubmit={handleSearch} />

        {isError && <ErrorMessage />}
        {isLoading && <Loader />}
        {!isLoading && !isError && (
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        )}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}

export default App;
