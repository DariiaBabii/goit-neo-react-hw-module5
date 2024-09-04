import axios from "axios";

const API_READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const API_KEY = "1d2f40fa0c8cb33dd32d4c35d829d518";
const baseURL = "https://api.themoviedb.org/3";

const apiService = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
});

export const fetchMovies = async () => {
  try {
    const response = await apiService.get("/movie/popular", {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `${baseURL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId) => {
  try {
    const response = await apiService.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await apiService.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await apiService.get(`/search/movie`, {
      params: {
        query,
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};
