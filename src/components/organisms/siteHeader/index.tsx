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
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [accountAnchorEl, setAccountAnchorEl] =
        useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
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
        setAnchorEl(null);
        setAccountAnchorEl(null);
        await signOut();
        navigate("/");
    };

    const handleMenuSelect = (pageURL: string) => {
        setAnchorEl(null);
        setAccountAnchorEl(null);
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
                                {session
                                    ? accountOptions.map((opt) => (
                                          <MenuItem
                                              key={opt.label}
                                              onClick={() =>
                                                  handleMenuSelect(opt.path)
                                              }
                                          >
                                              {opt.label}
                                          </MenuItem>
                                      ))
                                    : null}
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
            </AppBar>
            <Offset />
        </>
    );
};

export default SiteHeader;
