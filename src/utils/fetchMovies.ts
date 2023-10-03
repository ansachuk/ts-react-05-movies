import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Movie } from "../@types/types";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] =
	"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmI4NjA0YTQxYTY4ZTc5YTFlOWVlZmM3Mjg0MmVjMSIsInN1YiI6IjY0NzBlMjY4MTNhMzIwMDBkY2Y5MGEzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RsXnr-598oJBtRU8ad6qDSzA1gOYtXAbicSLwSyV3Kk";

export const fetchTrendingMovies = async (): Promise<Array<Movie>> => {
	try {
		const trending = await axios.get(`trending/movie/day`);

		return trending.data.results;
	} catch (error) {
		throw Notify.failure(`${(error as Error).message}`);
	}
};

export const fetchMovieById = async (id: string) => {
	try {
		const movie = await axios.get(`movie/${id}`);

		return movie.data;
	} catch (error) {
		throw Notify.failure(`${(error as Error).message}`);
	}
};

export const fetchCastById = async (id: string) => {
	try {
		const cast = await axios.get(`movie/${id}/credits`);

		return cast.data.cast;
	} catch (error) {
		throw Notify.failure(`${(error as Error).message}`);
	}
};

export const fetchReviewsById = async (id: string) => {
	try {
		const reviews = await axios.get(`movie/${id}/reviews`);

		return reviews.data.results;
	} catch (error) {
		throw Notify.failure(`${(error as Error).message}`);
	}
};

export const fetchByQuery = async (query: string) => {
	try {
		const results = await axios.get(`search/movie?query=${query}`);

		return results.data.results;
	} catch (error) {
		throw Notify.failure(`${(error as Error).message}`);
	}
};
