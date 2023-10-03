import { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";

import MovieItem from "components/MovieItem/MovieItem";
import { fetchByQuery } from "utils/fetchMovies";
import useDebounce from "hooks/useDebounce";
import css from "./Movies.module.scss";

export default function Movies() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchedMovies, setSearchedMovies] = useState(null);
	const query = searchParams.get("query") ?? "";
	const location = useLocation();

	const debouncedQuery = useDebounce(query, 500);

	const updateSearchParams = query => {
		const nextSearchParams = query.trim() !== "" ? { query } : {};
		setSearchParams(nextSearchParams);
	};

	useEffect(() => {
		if (debouncedQuery.trim().length > 1) {
			fetchByQuery(debouncedQuery).then(setSearchedMovies);
		} else return setSearchedMovies([]);
	}, [debouncedQuery]);

	return (
		<>
			<input
				type="text"
				value={query}
				placeholder="Type a name of movie..."
				autoComplete="off"
				autoFocus
				autoCorrect="off"
				className={css.input}
				onChange={({ target }) => updateSearchParams(target.value)}
			/>

			{searchedMovies && (
				<div className={css.wrapper}>
					{searchedMovies.map(
						movie =>
							movie.poster_path && (
								<Link key={movie.id} to={`${movie.id}`} state={{ from: location }}>
									<MovieItem movie={movie} />
								</Link>
							),
					)}
				</div>
			)}
		</>
	);
}
