import React from "react";
import AuthContextProvider from "@contexts/authContextProvider";
import ToastContextProvider from "@contexts/toastContextProvider";
import MoviesContextProvider from "@contexts/moviesContextProvider";

const providers = [
    AuthContextProvider,
    ToastContextProvider,
    MoviesContextProvider,
];

/**
 * Wraps its children in every context the app uses, outermost first.
 *
 * @param children The tree the providers wrap.
 * @returns JSX.Element
 */
export const AllContext: React.FC<React.PropsWithChildren> = ({ children }) => {
    return providers.reduceRight<React.ReactNode>(
        (wrapped, Provider) => <Provider>{wrapped}</Provider>,
        children,
    ) as React.ReactElement;
};

export default AllContext;
