import React, { useState, useContext, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
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
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    const { session, user, signOut } = useContext(AuthContext);

    // Signed out visitors are not offered the routes that would only bounce
    // them to the login page.
    const menuOptions = [
        { label: "Home", path: "/", private: false },
        { label: "Upcoming Movies", path: "/movies/upcoming", private: false },
        { label: "Actors", path: "/actors", private: false },
        { label: "Favorites", path: "/movies/favourites", private: true },
        { label: "Favourite Actors", path: "/actors/favourites", private: true },
        { label: "Fantasy Movie", path: "/fantasy", private: true },
    ].filter((opt) => !opt.private || session);

    const handleSignOut = async () => {
        setAnchorEl(null);
        await signOut();
        navigate("/");
    };

    const handleMenuSelect = (pageURL: string) => {
        navigate(pageURL);
    };

    const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                className="bg-surface-raised text-navajo-white"
            >
                <Toolbar>
                    <Typography variant="h4" sx={styles.title}>
                        TMDB Client
                    </Typography>
                    <Typography variant="h6" sx={styles.title}>
                        All you ever wanted to know about Movies!
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                size="large"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuOptions.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        onClick={() =>
                                            handleMenuSelect(opt.path)
                                        }
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                                {session ? (
                                    <MenuItem onClick={handleSignOut}>
                                        Sign out
                                    </MenuItem>
                                ) : (
                                    <MenuItem
                                        onClick={() =>
                                            handleMenuSelect("/login")
                                        }
                                    >
                                        Sign in
                                    </MenuItem>
                                )}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {menuOptions.map((opt) => (
                                <Button
                                    key={opt.label}
                                    color="inherit"
                                    onClick={() => handleMenuSelect(opt.path)}
                                >
                                    {opt.label}
                                </Button>
                            ))}
                            {session ? (
                                <>
                                    <Typography
                                        variant="body2"
                                        className="mx-3 text-navajo-white/70"
                                    >
                                        {user?.email}
                                    </Typography>
                                    <Button
                                        color="inherit"
                                        onClick={handleSignOut}
                                    >
                                        Sign out
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    color="inherit"
                                    onClick={() => handleMenuSelect("/login")}
                                >
                                    Sign in
                                </Button>
                            )}
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
};

export default SiteHeader;
