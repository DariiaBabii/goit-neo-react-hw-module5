import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api";
import MovieList from "../components/MovieList";
import classes from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const popularMovies = await fetchMovies();
      setMovies(popularMovies);
    };
    loadMovies();
  }, []);

  return (
    <div className={classes["home-container"]}>
      <h1 className={classes["home-title"]}>Popular movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
