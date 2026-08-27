import React from "react";
import ErrorNotice from "@molecules/errorNotice";

/**
 * Shown for any address that does not match a route.
 *
 * @returns JSX.Element
 */
const NotFoundPage: React.FC = () => {
    return (
        <ErrorNotice
            status={404}
            title="We cannot find that page."
            message="The page you are looking for does not exist. It may have moved, or the address may be wrong."
        />
    );
};

export default NotFoundPage;
