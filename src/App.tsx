import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "@pages/homePage";
import MoviePage from "@pages/movieDetailsPage";
import FavouriteMoviesPage from "@pages/favouriteMoviesPage";
import MovieReviewPage from "@pages/movieReviewPage";
import SiteHeader from "@organisms/siteHeader";
import UpcomingMoviesPage from "@pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "@contexts/moviesContextProvider";
import AddMovieReviewPage from "@pages/addMovieReviewPage";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false,
        },
    },
});

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <SiteHeader />
                <MoviesContextProvider>
                    <Routes>
                        <Route
                            path="/movies/favourites"
                            element={<FavouriteMoviesPage />}
                        />
                        <Route
                            path="/movies/upcoming"
                            element={<UpcomingMoviesPage />}
                        />
                        <Route path="/movies/:id" element={<MoviePage />} />
                        <Route
                            path="/reviews/form"
                            element={<AddMovieReviewPage />}
                        />
                        <Route
                            path="/reviews/:id"
                            element={<MovieReviewPage />}
                        />

                        <Route path="/" element={<HomePage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </MoviesContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
