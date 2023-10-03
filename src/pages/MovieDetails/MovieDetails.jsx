import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchMovieById } from "utils/fetchMovies";

import Fallback from "components/Fallback/Fallback";
import { ReactComponent as ArrowLeft } from "../../icons/arrowLeft.svg";

import css from "./MovieDetails.module.scss";

export default function MovieDetails() {
	const [movie, setMovie] = useState(null);
	const { movieId } = useParams();

	const location = useLocation();
	const backLinkHref = location.state?.from ?? "/movies";
	let scoreClass;
	let statusClass;

	useEffect(() => {
		if (!movie) {
			fetchMovieById(movieId).then(setMovie);
		}
	}, [movie, movieId]);

	const releaseYear = movie?.release_date ? new Date(movie.release_date).getFullYear() : "N/A";

	const userScore = (movie?.vote_average * 10).toFixed(2);

	if (userScore < 50 && userScore > 25) {
		scoreClass = css.orange;
	} else if (userScore < 80 && userScore > 50) {
		scoreClass = css.yellow;
	} else if (userScore > 80) {
		scoreClass = css.green;
	} else {
		scoreClass = css.red;
	}

	statusClass = movie?.status === "Released" ? css.green : css.red;

	return (
		movie && (
			<>
				<Link className={css.backLink} to={backLinkHref}>
					<ArrowLeft className={css.arrowIcon} />
					Back
				</Link>
				<div className={css.wrapper}>
					<img
						loading="lazy"
						className={css.poster}
						src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
						alt={movie.title}
					/>

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
					<Outlet id={movieId} />
				</Suspense>
			</>
		)
	);
}
