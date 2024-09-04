import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api";
import { Link, useLocation } from "react-router-dom";
import classes from "./MovieList.module.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await fetchMovies();
      setMovies(movieData);
    };

    fetchData();
  }, []);

  return (
    <div className={classes["movies-container"]}>
      <div className={classes["movies-row"]}>
        {movies.map((movie) => (
          <div
            className={`${classes["movie-card-wrapper"]} ${classes["movie-card-wrapper-sm"]} py-3`}
            key={movie.id}
          >
            <div className={classes["movie-card"]}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  className={classes["movie-poster"]}
                  alt={movie.title}
                />
              </Link>
              <div className={classes["movie-card-body"]}>
                <h5 className={classes["movie-title"]}>{movie.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
