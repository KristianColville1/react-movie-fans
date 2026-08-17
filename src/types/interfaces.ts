export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    genre_ids?: number[];
}

export interface BaseMovieListProps {
    movies: BaseMovieProps[];
    action: (m: BaseMovieProps) => React.ReactNode;
}


export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
        id: number;
        name: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
}

export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
}

export interface MoviePageProps {
    movie: MovieDetailsProps;
    images: MovieImage[];

}

export type FilterOption =
    | "title"
    | "genre"
    | "yearFrom"
    | "yearTo"
    | "rating";

export interface MovieListPageTemplateProps extends BaseMovieListProps {
    title: string;
}

export interface Review {
    id: string;
    content: string;
    author: string;
}

export interface GenreData {
    genres: {
        id: string;
        name: string;
    }[];
}

export interface DiscoverMovies {
    page: number;
    total_pages: number;
    total_results: number;
    results: BaseMovieProps[];
}

  export interface Review {
      author: string;
      content: string;
      agree: boolean;
      rating: number;
      movieId: number;
  }

export interface BaseActorProps {
    id: number;
    name: string;
    profile_path?: string;
    known_for_department: string;
    popularity: number;
}

export interface ActorDetailsProps extends BaseActorProps {
    biography: string;
    birthday: string | null;
    deathday: string | null;
    place_of_birth: string | null;
    homepage: string | undefined;
}

export interface PopularActors {
    page: number;
    total_pages: number;
    total_results: number;
    results: BaseActorProps[];
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path?: string;
    order: number;
}

export interface CreditedMovie {
    id: number;
    title: string;
    character: string;
    poster_path?: string;
    release_date: string;
    vote_average: number;
}

export interface FantasyMovie {
    id: string;
    title: string;
    overview: string;
    genreIds: number[];
    releaseDate: string;
    runtime: number;
    productionCompanies: string;
}
