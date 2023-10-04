import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchReviewsById } from "../../utils/fetchMovies";

import css from "./Reviews.module.scss";
import { Review } from "../../@types/types";

export default function Reviews() {
	const { movieId } = useParams();
	const [reviews, setReviews] = useState<Review[]>([]);

	useEffect(() => {
		if (!reviews && movieId) {
			fetchReviewsById(movieId).then(prev => setReviews([...prev]));
		}
	}, [movieId, reviews]);

	return (
		<ul>
			{reviews.length ? (
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
