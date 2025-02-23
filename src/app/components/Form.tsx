import { FormEvent, useState } from "react";
import { useAppDispatch } from "../lib/redux/hooks";

import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

import { searchTypes } from "../../constants";
import { fetchDrinksData } from "../lib/redux/thunks/fetchDrinksData";

import styles from "../styles/Form.module.css";

export default function Form() {
  const dispatch = useAppDispatch();

  const [searchType, updateSearchType] = useState<string>(searchTypes[0]);
  const [placeholderText, updatePlaceholderText] = useState<string>("Enter Cocktail Name");
  const [searchTerm, updateSearchterm] = useState<string>("");

  const handleSearchTypeChange = function (value: string) {
    console.log("change", value);
    updateSearchType(value);
    updatePlaceholderText(value === "Name" ? "Enter Cocktail Name" : "Enter Ingredient Name");
  };

  const handleSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchDrinksData({ searchType, searchTerm }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles["form__fieldset"]}>
        <legend className="sr-only">Search for Cocktail or Ingredient</legend>
        <div className={styles.form__element}>
          <Select
            labelFor="selectInput"
            labelText="Search By:"
            id="selectInput"
            values={searchTypes}
            className={styles.form__select}
            onChange={(e) => {
              handleSearchTypeChange(e.target.value);
            }}
          />
        </div>
        <div className={styles.form__element}>
          <Input
            labelFor="searchInput"
            labelText={`${searchType}:`}
            id="searchInput"
            placeholder={placeholderText}
            type="text"
            value={searchTerm}
            className={styles.form__input}
            onChange={(e) => updateSearchterm(e.target.value)}
          />
        </div>

        <Button type="submit" className={styles.form__button}>
          Find Cocktail
        </Button>
      </fieldset>
    </form>
  );
}
