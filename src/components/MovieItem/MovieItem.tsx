import { TrendingMovie } from "../../@types/types";

import css from "./MovieItem.module.scss";

type Props = {
	movie: TrendingMovie;
};

export default function MovieItem({ movie: { title, poster_path, release_date } }: Props) {
	return (
		<>
			<img loading="lazy" className={css.posterImg} src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />

			<h3 className={css.title}>{title}</h3>
			{release_date && <p className={css.year}>{new Date(release_date).getFullYear()}</p>}
		</>
	);
}
