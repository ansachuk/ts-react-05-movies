import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import MovieItem from "components/MovieItem/MovieItem";
import { fetchTrendingMovies } from "utils/fetchMovies";
import css from "./Homepage.module.scss";

export default function Homepage() {
	const [trendingMovies, setTrendingMovies] = useState(null);
	const location = useLocation();

	useEffect(() => {
		fetchTrendingMovies().then(setTrendingMovies);
	}, []);

	return (
		<>
			<h2 className={css.title}>Trending now!</h2>
			<div className={css.wrapper}>
				{trendingMovies?.map(movie => (
					<Link key={movie.id} to={`movies/${movie.id}`} state={{ from: location }}>
						<MovieItem movie={movie} />
					</Link>
				))}
			</div>
		</>
	);
}
