import React, { useState, useEffect } from "react";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { searchMovies } from "../api";
import MovieList from "../components/MovieList";
import classes from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("query") || "";

    if (searchQuery) {
      searchMovies(searchQuery).then(setMovies);
      setQuery(searchQuery);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      setSearchParams({ query: query.trim() });
    }
  };

  return (
    <div className={classes["movies-container"]}>
      <h1 className={classes["movies-title"]}>Search movies</h1>
      <form className={classes["search-form"]} onSubmit={handleSubmit}>
        <input
          className={classes["search-input"]}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie name..."
        />
        <button className={classes.button} type="submit">
          <FiSearch size="16px" />
        </button>
      </form>
      {movies.length > 0 && <MovieList movies={movies} location={location} />}
    </div>
  );
};

export default MoviesPage;
