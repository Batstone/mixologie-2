"use client";

import { FormEvent, useState } from "react";

import { useAppDispatch, useAppSelector } from "./lib/redux/hooks";

import { fetchDrinkData } from "./lib/redux/slices/searchSlice";
import Button from "./components/button";
import Input from "./components/input";
import Link from "next/link";
import DrinkCard from "./components/DrinkCard";

export default function Home() {
  const [searchTerm, updateSearchterm] = useState<string>("");

  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector((state) => state.drink);

  const handleSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {data.map((drink, index) => (
              <li key={index}>
                <Link href={`/drink/${drink.strDrink.replace(/\s+/g, '-')}`}>
                  <DrinkCard drinkName={drink.strDrink} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
