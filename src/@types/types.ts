type Collection = {
	id?: number;
	name: string;
	english_name?: string;
	poster_path?: string;
	iso_3166_1?: string;
	iso_639_1?: string;
};

type Author = {
	avatar_path: string;
	name: string;
	rating: number;
	username: string;
};

export type Movie = {
	adult: boolean;
	backdrop_path: string;
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	release_date: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	poster_path: string;

	belongs_to_collection: Collection;
	budget: number;
	genres: Array<Collection>;
	homepage: string;
	imdb_id: string;

	production_companies: [];
	production_countries: Array<Collection>;

	revenue: number;
	runtime: number;
	spoken_languages: Array<Collection>;
	status: string;
	tagline: string;
};

export type TrendingMovie = Pick<
	Movie,
	| "adult"
	| "backdrop_path"
	| "id"
	| "title"
	| "original_language"
	| "original_title"
	| "overview"
	| "popularity"
	| "release_date"
	| "video"
	| "vote_average"
	| "vote_count"
	| "poster_path"
> & {
	media_type: string;
	genre_ids: Array<number>;
};

export type Actor = {
	adult: boolean;
	cast_id: number;
	character: string;
	credit_id: string;
	gender: 1 | 2;
	id: number;
	known_for_department: string;
	name: string;
	order: number;
	original_name: string;
	popularity: number;
	profile_path: string;
};

export type Review = {
	author: string;
	author_details: Author;
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
};
