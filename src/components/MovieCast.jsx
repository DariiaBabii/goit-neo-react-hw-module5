import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../api";
import classes from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const loadCast = async () => {
      const castData = await fetchMovieCast(movieId);
      setCast(castData);
    };
    loadCast();
  }, [movieId]);

  return (
    <div className={classes.castContainer}>
      <h2 className={classes.title}>Cast</h2>
      <ul className={classes.castList}>
        {cast.map((actor, index) => (
          <li key={`${actor.id}-${index}`} className={classes.castItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={actor.name}
              className={classes.actorImage}
            />
            <p className={classes.actorName}>
              {actor.name}
              <br />
              <span className={classes.actorCharacter}>
                as {actor.character}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
