import React, { ChangeEvent } from "react";
import { FilterOption, GenreData } from "@typings/interfaces";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { getGenres } from "@api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "@atoms/spinner";
import { sortOptions } from "@organisms/movieFilterUI/sorting";
import { splitChoices } from "@organisms/movieFilterUI/filters";

const cardStyle =
    "max-w-[345px] rounded-none border-white/10 bg-surface text-navajo-white";
const fieldStyle = "m-2 min-w-[220px]";
const narrowFieldStyle = "m-2 min-w-[100px] flex-1";
const inputStyle =
    "rounded-t bg-white/95 text-jet-black [&_.MuiSelect-icon]:text-jet-black/60";
const labelStyle = "text-jet-black/70";
const groupLabelStyle = "mx-2 mt-2 block text-navajo-white/80";
const checkboxStyle =
    "text-navajo-white/60 [&.Mui-checked]:text-ocean-mist";

interface FilterMoviesCardProps {
    onUserInput: (f: FilterOption, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    yearFromFilter: string;
    yearToFilter: string;
    ratingFilter: string;
    sortOption: string;
    onSortChange: (value: string) => void;
}

/**
 * Card holding the search criteria used to narrow a movie list, alongside the
 * menu used to order it.
 *
 * @param onUserInput Called with the filter that changed and its new value.
 * @param titleFilter The current title search text.
 * @param genreFilter The chosen genre ids, comma separated.
 * @param yearFromFilter The earliest release year to keep.
 * @param yearToFilter The latest release year to keep.
 * @param ratingFilter The lowest average score to keep.
 * @param sortOption The value of the currently selected sort criterion.
 * @param onSortChange Called with the newly selected sort criterion.
 * @returns JSX.Element
 */
const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({
    onUserInput,
    titleFilter,
    genreFilter,
    yearFromFilter,
    yearToFilter,
    ratingFilter,
    sortOption,
    onSortChange,
}) => {
    const { data, error, isLoading, isError } = useQuery<GenreData, Error>(
        "genres",
        getGenres,
    );

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <h1>{(error as Error).message}</h1>;
    }

    // No sentinel row is added, so an empty response is just an empty list
    // rather than a read off the front of it.
    const genres = data?.genres || [];
    const chosenGenres = splitChoices(genreFilter);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        onUserInput("title", e.target.value);
    };

    const toggleGenre = (id: string) => {
        const next = chosenGenres.includes(id)
            ? chosenGenres.filter((g) => g !== id)
            : [...chosenGenres, id];
        onUserInput("genre", next.join(","));
    };

    const handleYearFromChange = (e: ChangeEvent<HTMLInputElement>) => {
        onUserInput("yearFrom", e.target.value);
    };

    const handleYearToChange = (e: ChangeEvent<HTMLInputElement>) => {
        onUserInput("yearTo", e.target.value);
    };

    const handleRatingChange = (e: SelectChangeEvent) => {
        onUserInput("rating", e.target.value);
    };

    const clearAll = () => {
        onUserInput("title", "");
        onUserInput("genre", "");
        onUserInput("yearFrom", "");
        onUserInput("yearTo", "");
        onUserInput("rating", "");
    };

    // Sorting does not go through onUserInput. It is not a filter, so it has
    // no entry in the filter values the list page keeps.
    const handleSortChange = (e: SelectChangeEvent) => {
        e.preventDefault();
        onSortChange(e.target.value);
    };

    return (
        <>
            <Card className={cardStyle} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h1">
                        <FilterAltIcon fontSize="large" />
                        Filter the movies.
                    </Typography>

                    <TextField
                        className={fieldStyle}
                        InputProps={{ className: inputStyle }}
                        InputLabelProps={{ className: labelStyle }}
                        id="filled-search"
                        label="Search field"
                        type="search"
                        value={titleFilter}
                        variant="filled"
                        onChange={handleTextChange}
                    />

                    <FormLabel className={groupLabelStyle} component="legend">
                        Genres
                    </FormLabel>
                    <FormGroup className="mx-2 max-h-56 flex-nowrap overflow-y-auto">
                        {genres.map((genre) => (
                            <FormControlLabel
                                key={genre.id}
                                label={genre.name}
                                control={
                                    <Checkbox
                                        size="small"
                                        className={checkboxStyle}
                                        checked={chosenGenres.includes(
                                            String(genre.id),
                                        )}
                                        onChange={() =>
                                            toggleGenre(String(genre.id))
                                        }
                                        inputProps={{
                                            "aria-label": `Genre ${genre.name}`,
                                        }}
                                    />
                                }
                            />
                        ))}
                    </FormGroup>

                    <FormLabel className={groupLabelStyle} component="legend">
                        Release year
                    </FormLabel>
                    <Box className="flex">
                        <TextField
                            className={narrowFieldStyle}
                            InputProps={{ className: inputStyle }}
                            InputLabelProps={{ className: labelStyle }}
                            id="year-from"
                            label="From"
                            type="number"
                            value={yearFromFilter}
                            variant="filled"
                            onChange={handleYearFromChange}
                        />
                        <TextField
                            className={narrowFieldStyle}
                            InputProps={{ className: inputStyle }}
                            InputLabelProps={{ className: labelStyle }}
                            id="year-to"
                            label="To"
                            type="number"
                            value={yearToFilter}
                            variant="filled"
                            onChange={handleYearToChange}
                        />
                    </Box>

                    <FormControl className={fieldStyle} variant="filled">
                        <InputLabel id="rating-label" className={labelStyle}>
                            Minimum rating
                        </InputLabel>
                        <Select
                            className={inputStyle}
                            labelId="rating-label"
                            id="rating-select"
                            value={ratingFilter}
                            onChange={handleRatingChange}
                        >
                            <MenuItem value="">Any</MenuItem>
                            {[5, 6, 7, 8, 9].map((score) => (
                                <MenuItem key={score} value={String(score)}>
                                    {score}+
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="outlined"
                        onClick={clearAll}
                        className="m-2 border-ocean-mist text-ocean-mist hover:bg-ocean-mist hover:text-jet-black"
                    >
                        Clear all
                    </Button>
                </CardContent>
            </Card>
            <Card className={cardStyle} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h1">
                        <SortIcon fontSize="large" />
                        Sort the movies.
                    </Typography>
                    <FormControl className={fieldStyle} variant="filled">
                        <InputLabel id="sort-label" className={labelStyle}>
                            Sort by
                        </InputLabel>
                        <Select
                            className={inputStyle}
                            labelId="sort-label"
                            id="sort-select"
                            value={sortOption}
                            onChange={handleSortChange}
                        >
                            {sortOptions.map((option) => {
                                return (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
        </>
    );
};

export default FilterMoviesCard;
