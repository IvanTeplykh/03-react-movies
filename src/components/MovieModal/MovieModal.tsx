import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}  
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>    
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>
  );
}
