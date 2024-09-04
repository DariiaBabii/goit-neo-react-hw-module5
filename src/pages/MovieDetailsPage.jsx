import React, { useEffect, useState, useRef } from "react";
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../api";
import classes from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocationRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const loadMovieDetails = async () => {
      const movieData = await fetchMovieDetails(movieId);
      setMovie(movieData);
    };
    loadMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(previousLocationRef.current);
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={classes.detailsContainer}>
      <button onClick={handleGoBack} className={classes.goBackButton}>
        Go back
      </button>
      <div className={classes.header}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
          className={classes.poster}
        />
        <div className={classes.info}>
          <h1 className={classes.title}>
            {movie.title} ({movie.release_date.split("-")[0]})
          </h1>
          <p className={classes.voteAverage}>
            Vote average: {movie.vote_average}
          </p>
          <h2 className={classes.sectionTitle}>Overview</h2>
          <p className={classes.overview}>{movie.overview}</p>
          <h2 className={classes.sectionTitle}>Genres</h2>
          <p className={classes.genres}>
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
      <h2 className={classes.sectionTitle}>Additional info</h2>
      <nav className={classes.additionalInfo}>
        <Link
          to="cast"
          state={{ from: previousLocationRef.current }}
          className={classes.link}
        >
          Cast
        </Link>
        <Link
          to="reviews"
          state={{ from: previousLocationRef.current }}
          className={classes.link}
        >
          Reviews
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};
export default MovieDetailsPage;
