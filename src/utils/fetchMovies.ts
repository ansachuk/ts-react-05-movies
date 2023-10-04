import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Actor, Movie, Review, TrendingMovie } from "../@types/types";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] =
	"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI4NjA0YTQxYTY4ZTc5YTFlOWVlZmM3Mjg0MmVjMSIsInN1YiI6IjY0NzBlMjY4MTNhMzIwMDBkY2Y5MGEzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RsXnr-598oJBtRU8ad6qDSzA1gOYtXAbicSLwSyV3Kk";

export const fetchTrendingMovies = async (): Promise<Array<TrendingMovie>> => {
	try {
		const trending = await axios.get(`trending/movie/day`);

		return trending.data.results;
	} catch (error) {
		throw Notify.failure(`${(error as Error).message}`);
	}
};

export const fetchMovieById = async (id: string): Promise<Movie> => {
	try {
		const movie = await axios.get(`movie/${id}`);

		return movie.data;
	} catch (error) {
		throw Notify.failure(`${(error as Error).message}`);
	}
};

export const fetchCastById = async (id: string): Promise<Array<Actor>> => {
	try {
		const cast = await axios.get(`movie/${id}/credits`);

		return cast.data.cast;
	} catch (error) {
		throw Notify.failure(`${(error as Error).message}`);
	}
};

export const fetchReviewsById = async (id: string): Promise<Array<Review>> => {
	try {
		const reviews = await axios.get(`movie/${id}/reviews`);

		return reviews.data.results;
	} catch (error) {
		throw Notify.failure(`${(error as Error).message}`);
	}
};

export const fetchByQuery = async (query: string): Promise<Array<TrendingMovie>> => {
	try {
		const results = await axios.get(`search/movie?query=${query}`);

		return results.data.results;
	} catch (error) {
		throw Notify.failure(`${(error as Error).message}`);
	}
};
