import React from "react";
import IconButton from "@mui/material/IconButton";

const bar =
    "absolute left-1/2 h-0.5 w-6 -translate-x-1/2 rounded bg-current transition-all duration-300 ease-in-out";

/**
 * Burger button whose three bars fold into a cross while the menu is open.
 *
 * @param open Whether the menu it controls is showing.
 * @param onClick Opens or closes that menu.
 * @returns JSX.Element
 */
const BurgerButton: React.FC<{
    open: boolean;
    onClick: () => void;
}> = ({ open, onClick }) => {
    return (
        <IconButton
            aria-label="menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            color="inherit"
            size="large"
            onClick={onClick}
        >
            <span className="relative block h-6 w-6">
                <span
                    className={`${bar} ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1"}`}
                />
                <span
                    className={`${bar} top-1/2 -translate-y-1/2 ${open ? "opacity-0" : "opacity-100"}`}
                />
                <span
                    className={`${bar} ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[1.15rem]"}`}
                />
            </span>
        </IconButton>
    );
};

export default BurgerButton;
