import React from "react";
import ErrorNotice from "@molecules/errorNotice";

/**
 * Shown when something fails at the server end rather than the visitor's.
 *
 * @returns JSX.Element
 */
const ServerErrorPage: React.FC = () => {
    return (
        <ErrorNotice
            status={500}
            title="Something went wrong at our end."
            message="The page could not be loaded. Try again in a moment, and if it keeps happening it is not you, it is us."
        />
    );
};

export default ServerErrorPage;
