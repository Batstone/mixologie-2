import { FormEvent, useState } from "react";
import { useAppDispatch } from "../lib/redux/hooks";

import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

import { searchTypes } from "../../constants";
import { fetchDrinksData } from "../lib/redux/thunks/fetchDrinksData";

export default function Form() {
  const dispatch = useAppDispatch();

  const [searchType, updateSearchType] = useState<string>(searchTypes[0]);
  const [searchTerm, updateSearchterm] = useState<string>("");

  const handleSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchDrinksData({ searchType, searchTerm }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Search for Cocktail or Ingredient</legend>
        <Select
          labelFor="selectInput"
          labelText="Search By:"
          id="selectInput"
          values={searchTypes}
          onChange={(e) => {
            updateSearchType(e.target.value);
          }}
        />
        <Input
          labelFor="searchInput"
          labelText="Cocktail"
          id="searchInput"
          placeholder="Enter Cocktail Name or Ingredient"
          type="text"
          value={searchTerm}
          onChange={(e) => updateSearchterm(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </fieldset>
    </form>
  );
}
