import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchReviewsById } from "../../utils/fetchMovies";
import css from "./Reviews.module.scss";
export default function Reviews() {
	const { movieId } = useParams();
	const [reviews, setReviews] = useState(null);

	useEffect(() => {
		if (!reviews) {
			fetchReviewsById(movieId).then(rev => setReviews([...rev]));
		}
	}, [movieId, reviews]);

	return (
		<ul>
			{reviews?.length ? (
				reviews.map(review => (
					<li key={review.id} className={css.review}>
						<h3 className={css.authorName}>Author:{review.author}</h3>
						<p>{review.content}</p>
					</li>
				))
			) : (
				<p>Here no reviews yet!</p>
			)}
		</ul>
	);
}
