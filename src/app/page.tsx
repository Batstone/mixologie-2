"use client";

import { useAppDispatch, useAppSelector } from "./lib/redux/hooks";

import Link from "next/link";
import DrinkCard from "./components/DrinkCard";
import Form from "./components/Form";

export default function Home() {
  const dispatch = useAppDispatch();

  const { data, loading, error } = useAppSelector((state) => state.drink);

  console.log("data", data);

  return (
    <main>
      <div>
        <Form />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data.length !== 0 && (
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
