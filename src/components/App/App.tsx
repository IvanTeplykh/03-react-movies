import { useState } from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import toast, { Toaster } from 'react-hot-toast';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import styles from './App.module.css'
import { MovieModal } from '../MovieModal/MovieModal';
import type { Movie } from '../../types/movie';


function App() {
  const notifyEmptyQuery = () => toast('❌ Please enter your search query.');
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      notifyEmptyQuery();
      return;
    }
    setQuery(query);
  }

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  }

  const handleCloseModal = () => {
    setSelectedMovie(null);
  }

  return (
    <>
      <Toaster />
      <div className={styles.app}>
        <SearchBar onSubmit={handleSearch} />
        <MovieGrid query={query} onMovieClick={handleMovieClick} />
      </div>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  )
}

export default App
