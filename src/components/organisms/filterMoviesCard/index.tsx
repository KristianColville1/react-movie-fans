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
import Select from "@mui/material/Select";
import { getGenres } from "@api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "@atoms/spinner";
import { sortOptions } from "@organisms/movieFilterUI/sorting";


const cardStyle =
    "max-w-[345px] rounded-none border-white/10 bg-surface text-navajo-white";
const fieldStyle = "m-2 min-w-[220px] bg-navajo-white/95 rounded-t";

interface FilterMoviesCardProps {
    onUserInput: (f: FilterOption, s: string) => void; // Add this line
    titleFilter: string;
    genreFilter: string;
    sortOption: string;
    onSortChange: (value: string) => void;
}

/**
 * Card holding the search field and genre menu used to filter a movie list,
 * alongside the menu used to order it.
 *
 * @param onUserInput Called with the filter that changed and its new value.
 * @param titleFilter The current title search text.
 * @param genreFilter The id of the currently selected genre.
 * @param sortOption The value of the currently selected sort criterion.
 * @param onSortChange Called with the newly selected sort criterion.
 * @returns JSX.Element
 */
const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({ onUserInput, titleFilter, genreFilter, sortOption, onSortChange }) => {
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
  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
      genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (
      e: SelectChangeEvent,
      type: FilterOption,
      value: string,
  ) => {
      e.preventDefault();
      onUserInput(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(e, "title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
      handleChange(e, "genre", e.target.value);
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
                        id="filled-search"
                        label="Search field"
                        type="search"
                        value={titleFilter}
                        variant="filled"
                        onChange={handleTextChange}
                    />

                    <FormControl className={fieldStyle}>
                        <InputLabel id="genre-label">Genre</InputLabel>
                        <Select
                            labelId="genre-label"
                            id="genre-select"
                            value={genreFilter}
                            onChange={handleGenreChange}
                        >
                            {genres.map((genre) => {
                                return (
                                    <MenuItem key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
            <Card className={cardStyle} variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h1">
                        <SortIcon fontSize="large" />
                        Sort the movies.
                    </Typography>
                    <FormControl className={fieldStyle}>
                        <InputLabel id="sort-label">Sort by</InputLabel>
                        <Select
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
