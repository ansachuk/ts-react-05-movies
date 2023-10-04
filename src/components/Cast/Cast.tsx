import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchCastById } from "../../utils/fetchMovies";
import { Actor } from "../../@types/types";

import css from "./Cast.module.scss";

export default function Cast() {
	const { movieId } = useParams();
	const [cast, setCast] = useState<Actor[]>([]);

	useEffect(() => {
		if (!cast && movieId) {
			fetchCastById(movieId).then(prev => setCast([...prev]));
		}
	}, [movieId, cast]);

	return cast?.length ? (
		<ul className={css.wrapper}>
			{cast.map(
				person =>
					person.profile_path && (
						<li key={person.cast_id}>
							<img loading="lazy" className={css.img} alt={person.name} src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} />
							<h3>{person.name}</h3>
							<h4>Character:{person.character}</h4>
						</li>
					),
			)}
		</ul>
	) : (
		<p>We don't have information about cast</p>
	);
}
