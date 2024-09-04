import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { searchMovies } from "../api";
import classes from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query");

    if (searchQuery) {
      setQuery(searchQuery);
      handleSearch(searchQuery);
    }
  }, [location.search]);

  const handleSearch = async (searchQuery) => {
    const searchResults = await searchMovies(searchQuery);
    setMovies(searchResults);

    navigate(`/movies?query=${searchQuery}`, { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
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
      {movies.length > 0 && (
        <ul className={classes["movies-list"]}>
          {movies.map((movie) => (
            <li key={movie.id} className={classes["movies-list-item"]}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
