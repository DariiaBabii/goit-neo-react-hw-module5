import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../api";
import classes from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      const reviewsData = await fetchMovieReviews(movieId);
      setReviews(reviewsData);
    };
    loadReviews();
  }, [movieId]);

  return (
    <div className={classes.reviewsContainer}>
      <h2 className={classes.title}>Reviews</h2>
      <ul className={classes.reviewsList}>
        {reviews.map((review) => (
          <li key={review.id} className={classes.reviewItem}>
            <p className={classes.reviewAuthor}>{review.author}</p>
            <p className={classes.reviewContent}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
