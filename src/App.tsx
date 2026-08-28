import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "@pages/homePage";
import MoviePage from "@pages/movieDetailsPage";
import FavouriteMoviesPage from "@pages/favouriteMoviesPage";
import MovieReviewPage from "@pages/movieReviewPage";
import SiteHeader from "@organisms/siteHeader";
import UpcomingMoviesPage from "@pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AddMovieReviewPage from "@pages/addMovieReviewPage";
import ActorsPage from "@pages/actorsPage";
import ActorDetailsPage from "@pages/actorDetailsPage";
import FantasyMoviePage from "@pages/fantasyMoviePage";
import FantasyMovieDetailsPage from "@pages/fantasyMovieDetailsPage";
import LoginPage from "@pages/loginPage";
import FavouriteActorsPage from "@pages/favouriteActorsPage";
import PrivateRoute from "@atoms/privateRoute";
import ProfilePage from "@pages/profilePage";
import MustWatchPage from "@pages/mustWatchPage";
import AllContext from "@contexts/allContext";
import SiteFooter from "@templates/siteFooter";
import NotFoundPage from "@pages/errors/notFoundPage";
import ServerErrorPage from "@pages/errors/serverErrorPage";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchOnWindowFocus: false,
        },
    },
});

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AllContext>
                    <SiteHeader />
                    <main className="mx-auto w-full max-w-7xl px-4">
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/movies/upcoming"
                                element={<UpcomingMoviesPage />}
                            />
                            <Route path="/movies/:id" element={<MoviePage />} />
                            <Route path="/actors" element={<ActorsPage />} />
                            <Route
                                path="/reviews/:id"
                                element={<MovieReviewPage />}
                            />
                            <Route
                                path="/actors/:id"
                                element={<ActorDetailsPage />}
                            />

                            {/* Anything belonging to one person sits behind
                                the guard. */}
                            <Route element={<PrivateRoute />}>
                                <Route
                                    path="/profile"
                                    element={<ProfilePage />}
                                />
                                <Route
                                    path="/movies/favourites"
                                    element={<FavouriteMoviesPage />}
                                />
                                <Route
                                    path="/movies/watchlist"
                                    element={<MustWatchPage />}
                                />
                                <Route
                                    path="/actors/favourites"
                                    element={<FavouriteActorsPage />}
                                />
                                <Route
                                    path="/fantasy"
                                    element={<FantasyMoviePage />}
                                />
                                <Route
                                    path="/fantasy/:id"
                                    element={<FantasyMovieDetailsPage />}
                                />
                                <Route
                                    path="/reviews/form"
                                    element={<AddMovieReviewPage />}
                                />
                            </Route>

                            <Route path="/" element={<HomePage />} />
                            <Route path="/error" element={<ServerErrorPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                    <SiteFooter />
                </AllContext>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
