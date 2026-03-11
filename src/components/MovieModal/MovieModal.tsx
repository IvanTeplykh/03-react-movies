import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  
   useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

   const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = originalOverflow; // повертаємо overflow
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>

        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path || movie.poster_path}`} 
          alt={movie.title}
          className={css.image}
        />

        <div className={css.content}>
          <h2>{movie.title}</h2>
          {movie.overview && <p>{movie.overview}</p>}
          {movie.release_date && (
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
          )}
          {movie.vote_average !== undefined && (
            <p>
              <strong>Rating:</strong> {movie.vote_average}/10
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}