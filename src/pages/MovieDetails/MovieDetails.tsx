import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import { fetchMovieById } from "../../utils/fetchMovies";

import Fallback from "../../components/Fallback/Fallback";

import { Movie } from "../../@types/types";
import icon from "../../icons/arrowLeft.svg";

import css from "./MovieDetails.module.scss";

export default function MovieDetails() {
	const [movie, setMovie] = useState<Movie>();
	const { movieId } = useParams();

	const location = useLocation();
	const backLinkHref = location.state?.from ?? "/movies";
	let scoreClass;
	let userScore = 0;

	useEffect(() => {
		if (!movie && movieId) {
			fetchMovieById(movieId).then(setMovie);
		}
	}, [movie, movieId]);

	const releaseYear = movie?.release_date ? new Date(movie.release_date).getFullYear() : "N/A";

	if (movie) {
		userScore = Number((movie.vote_average * 10).toFixed(2));
	}

	if (userScore < 50 && userScore > 25) {
		scoreClass = css.orange;
	} else if (userScore < 80 && userScore > 50) {
		scoreClass = css.yellow;
	} else if (userScore > 80) {
		scoreClass = css.green;
	} else {
		scoreClass = css.red;
	}

	const statusClass = movie?.status === "Released" ? css.green : css.red;

	return (
		movie && (
			<>
				<Link className={css.backLink} to={backLinkHref}>
					<svg width="40" height="40">
						<use href={icon + "#arrowLeft"}></use>
					</svg>
					Back
				</Link>
				<div className={css.wrapper}>
					<img loading="lazy" className={css.poster} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />

					<div className={css.info}>
						<h2 className={css.title}>{`${movie.title} (${releaseYear})`}</h2>
						<p className={css.tagline}>{movie.tagline}</p>

						<p className={css.score}>
							User score: <span className={scoreClass}>{userScore}</span> %
						</p>

						<h3>Genres</h3>

						<p className={css.genres}>{movie.genres.map(genre => `${genre.name} `)}</p>

						<h3>Overview</h3>
						<p className={css.overview}>{movie.overview}</p>

						<h3>Status</h3>

						<p className={statusClass}>{movie.status}</p>
					</div>
				</div>
				<nav className={css.navigation}>
					<Link to={"cast"} state={{ from: backLinkHref }}>
						Cast
					</Link>
					<Link to={"reviews"} state={{ from: backLinkHref }}>
						Reviews
					</Link>
				</nav>

				<Suspense fallback={<Fallback />}>
					<Outlet />
				</Suspense>
			</>
		)
	);
}
