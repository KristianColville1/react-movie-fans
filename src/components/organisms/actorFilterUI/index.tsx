import React, { useState, useContext, ChangeEvent } from "react";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { AuthContext } from "@contexts/authContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const cardStyle =
    "max-w-[345px] rounded-none border-white/10 bg-surface text-navajo-white";
const fieldStyle = "m-2 min-w-[220px]";
const inputStyle =
    "rounded-t bg-white/95 text-jet-black [&_.MuiSelect-icon]:text-jet-black/60";
const labelStyle = "text-jet-black/70";

interface ActorFilterUIProps {
    onNameChange: (value: string) => void;
    nameFilter: string;
}

/**
 * Floating filter button that opens a drawer holding the actor name search.
 *
 * @param onNameChange Called with the new name search text.
 * @param nameFilter The current name search text.
 * @returns JSX.Element
 */
const ActorFilterUI: React.FC<ActorFilterUIProps> = ({
    onNameChange,
    nameFilter,
}) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    // Filtering and sorting are the premium feature, so anonymous visitors
    // get an invitation rather than the control.
    const { session } = useContext(AuthContext);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        onNameChange(e.target.value);
    };

    return (
        <>
            {session ? (
                <Fab
                    variant="extended"
                    onClick={() => setDrawerOpen(true)}
                    className="fixed top-24 right-4 bg-magenta-bloom font-semibold text-jet-black hover:bg-magenta-bloom/90"
                >
                    Filter
                </Fab>
            ) : (
                <Typography
                    variant="body2"
                    className="fixed top-24 right-4 rounded-full bg-surface-raised px-4 py-2 text-navajo-white/80"
                >
                    Sign in to filter and sort
                </Typography>
            )}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ className: "bg-surface text-navajo-white" }}
            >
                <Card className={cardStyle} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h1">
                            <FilterAltIcon fontSize="large" />
                            Filter the actors.
                        </Typography>
                        <TextField
                            className={fieldStyle}
                            InputProps={{ className: inputStyle }}
                            InputLabelProps={{ className: labelStyle }}
                            id="actor-name-search"
                            label="Search field"
                            type="search"
                            value={nameFilter}
                            variant="filled"
                            onChange={handleTextChange}
                        />
                    </CardContent>
                </Card>
            </Drawer>
        </>
    );
};

export default ActorFilterUI;
