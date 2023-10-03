import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "components/Layout/Layout";

const Homepage = lazy(() => import("pages/Homepage/Homepage"));
const Movies = lazy(() => import("pages/Movies/Movies"));
const MovieDetails = lazy(() => import("pages/MovieDetails/MovieDetails"));
const Cast = lazy(() => import("components/Cast/Cast"));
const Reviews = lazy(() => import("components/Reviews/Reviews"));

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Homepage />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/movies/:movieId" element={<MovieDetails />}>
					<Route path="cast" element={<Cast />} />
					<Route path="reviews" element={<Reviews />} />
				</Route>
				<Route path="*" element={<Navigate to={"/"} />} />
			</Route>
		</Routes>
	);
};

export default App;
