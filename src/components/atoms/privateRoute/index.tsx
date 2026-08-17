import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@contexts/authContext";
import Spinner from "@atoms/spinner";

/**
 * Route wrapper that only renders its children for a signed in user. While
 * the first session lookup is still running it waits, rather than treating
 * not yet known as signed out.
 *
 * @returns JSX.Element
 */
const PrivateRoute: React.FC = () => {
    const { session, isLoading } = useContext(AuthContext);
    const location = useLocation();

    if (isLoading) {
        return <Spinner />;
    }

    if (!session) {
        // Remember where they were headed so signing in can carry them on.
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default PrivateRoute;
