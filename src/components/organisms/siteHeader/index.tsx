import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import BurgerButton from "@atoms/burgerButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from "@contexts/authContext";

const styles = {
    title: {
        flexGrow: 1,
    },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

/**
 * Fixed app bar with the site title and the main navigation, which collapses
 * into a menu on smaller screens.
 *
 * @returns JSX.Element
 */
const SiteHeader: React.FC = () => {
    const navigate = useNavigate();
    const [accountAnchorEl, setAccountAnchorEl] =
        useState<HTMLButtonElement | null>(null);
    const accountOpen = Boolean(accountAnchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    const { session, user, signOut } = useContext(AuthContext);

    // Signed out visitors are not offered the routes that would only bounce
    // them to the login page.
    const menuOptions = [
        { label: "Home", path: "/", private: false },
        { label: "Upcoming Movies", path: "/movies/upcoming", private: false },
        { label: "Actors", path: "/actors", private: false },
        { label: "Fantasy Movie", path: "/fantasy", private: true },
    ].filter((opt) => !opt.private || session);

    // the lists that belong to one person live under their own account
    const accountOptions = [
        { label: "Profile", path: "/profile" },
        { label: "Favourite Movies", path: "/movies/favourites" },
        { label: "Watch List", path: "/movies/watchlist" },
        { label: "Favourite Actors", path: "/actors/favourites" },
    ];

    const handleSignOut = async () => {
        setAccountAnchorEl(null);
        await signOut();
        navigate("/");
    };

    const handleMenuSelect = (pageURL: string) => {
        setAccountAnchorEl(null);
        navigate(pageURL);
    };

    const [navOpen, setNavOpen] = useState(false);

    const handleMenuSelectMobile = (pageURL: string) => {
        setNavOpen(false);
        handleMenuSelect(pageURL);
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                className="bg-surface-raised text-navajo-white"
            >
                <Toolbar className="mx-auto w-full max-w-7xl">
                    <Typography
                        variant="h4"
                        component="button"
                        sx={styles.title}
                        onClick={() => handleMenuSelect("/")}
                        className="cursor-pointer border-0 bg-transparent p-0 text-left text-inherit"
                    >
                        MovieFans
                    </Typography>
                    {isMobile ? (
                        <BurgerButton
                            open={navOpen}
                            onClick={() => setNavOpen((shown) => !shown)}
                        />
                    ) : (
                        <>
                            {menuOptions.map((opt) => (
                                <Button
                                    key={opt.label}
                                    color="inherit"
                                    size="small"
                                    className="px-2 text-sm normal-case"
                                    onClick={() => handleMenuSelect(opt.path)}
                                >
                                    {opt.label}
                                </Button>
                            ))}
                            {session ? (
                                <>
                                    <IconButton
                                        aria-label="account"
                                        aria-controls="account-menu"
                                        aria-haspopup="true"
                                        color="inherit"
                                        className="ml-2"
                                        onClick={(event) =>
                                            setAccountAnchorEl(
                                                event.currentTarget,
                                            )
                                        }
                                    >
                                        <Avatar className="h-8 w-8 bg-ocean-mist text-sm font-semibold text-jet-black">
                                            {user?.email?.[0]?.toUpperCase()}
                                        </Avatar>
                                    </IconButton>
                                    <Menu
                                        id="account-menu"
                                        anchorEl={accountAnchorEl}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={accountOpen}
                                        onClose={() =>
                                            setAccountAnchorEl(null)
                                        }
                                    >
                                        <MenuItem disabled>
                                            {user?.email}
                                        </MenuItem>
                                        {accountOptions.map((opt) => (
                                            <MenuItem
                                                key={opt.label}
                                                onClick={() =>
                                                    handleMenuSelect(opt.path)
                                                }
                                            >
                                                {opt.label}
                                            </MenuItem>
                                        ))}
                                        <MenuItem onClick={handleSignOut}>
                                            Sign out
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Button
                                    color="inherit"
                                    size="small"
                                    className="px-2 text-sm normal-case"
                                    onClick={() => handleMenuSelect("/login")}
                                >
                                    Sign in
                                </Button>
                            )}
                        </>
                    )}
                </Toolbar>

                <Collapse in={isMobile && navOpen} timeout={300} unmountOnExit>
                    <nav
                        id="mobile-nav"
                        className="flex flex-col border-t border-white/10 bg-surface-raised pb-2"
                    >
                        {menuOptions.map((opt) => (
                            <Button
                                key={opt.label}
                                color="inherit"
                                className="justify-start px-6 py-3 text-base normal-case"
                                onClick={() => handleMenuSelectMobile(opt.path)}
                            >
                                {opt.label}
                            </Button>
                        ))}

                        {session ? (
                            <>
                                <Typography
                                    variant="body2"
                                    className="px-6 pt-3 pb-1 text-navajo-white/50"
                                >
                                    {user?.email}
                                </Typography>
                                {accountOptions.map((opt) => (
                                    <Button
                                        key={opt.label}
                                        color="inherit"
                                        className="justify-start px-6 py-3 text-base normal-case"
                                        onClick={() =>
                                            handleMenuSelectMobile(opt.path)
                                        }
                                    >
                                        {opt.label}
                                    </Button>
                                ))}
                                <Button
                                    color="inherit"
                                    className="justify-start px-6 py-3 text-base normal-case"
                                    onClick={() => {
                                        setNavOpen(false);
                                        void handleSignOut();
                                    }}
                                >
                                    Sign out
                                </Button>
                            </>
                        ) : (
                            <Button
                                color="inherit"
                                className="justify-start px-6 py-3 text-base normal-case"
                                onClick={() => handleMenuSelectMobile("/login")}
                            >
                                Sign in
                            </Button>
                        )}
                    </nav>
                </Collapse>
            </AppBar>
            <Offset />
        </>
    );
};

export default SiteHeader;
