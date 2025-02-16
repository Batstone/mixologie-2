"use client";

import { FormEvent, useState } from "react";

import { useAppDispatch, useAppSelector } from "./lib/redux/hooks";

import { fetchDrinksData } from "./lib/redux/slices/drinkSlice";

import Link from "next/link";
import DrinkCard from "./components/DrinkCard";
import Input from "./components/Input";
import Button from "./components/Button";

export default function Home() {
  const [searchTerm, updateSearchterm] = useState<string>("");

  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector((state) => state.drink);

  const handleSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchDrinksData(searchTerm));
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
            {data.map((drink) => (
              <li key={drink.id}>
                <Link href={`/drink/${drink.id}`}>
                  <DrinkCard drinkName={drink.name} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
