"use client";

import { FormEvent, useState } from "react";
import Button from "./components/button";
import Input from "./components/input";

import { useAppDispatch } from "./lib/redux/hooks";

import { fetchDrinkData } from "./lib/redux/slices/searchSlice";

export default function Home() {
  const [searchTerm, updateSearchterm] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("serachTerm", searchTerm);
    if (searchTerm.trim()) {
      dispatch(fetchDrinkData(searchTerm));
    }
  };

  return (
    <main>
      <div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Search for Cocktail or Ingredient</legend>
            <Input
              labelFor="searchInput"
              labelText="Cocktail"
              placeholder="Enter Cocktail Name or Ingredient"
              type="text"
              value={searchTerm}
              onChange={(e) => updateSearchterm(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
