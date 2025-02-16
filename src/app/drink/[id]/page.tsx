"use client";

import DrinkInstructions from "@/app/components/DrinkInstructions";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { fetchDrinkDetails } from "@/app/lib/redux/thunks/fetchDrinksData";
import { useEffect, useState } from "react";

interface DrinkPageProps {
  params: {
    id: string;
  };
}

export default function DrinkPage({ params }: DrinkPageProps) {
  const { id } = params;
  const { data, loading, error } = useAppSelector((state) => state.drink);
  const dispatch = useAppDispatch();

  const [storedDrink, setStoredDrink] = useState<string | null>(null);

  console.log("DATA", data);
  console.log("id here", id);

  function saveToLocalStorage(drink: string) {
    localStorage.setItem("id", id);
    setStoredDrink(drink); // Ensure state is also updated
  }
  console.log("id here", id);
  localStorage.setItem("Drink", id);

  // Set the selected drink. use the ID

  useEffect(() => {
    const drinkFromStorage = localStorage.getItem("id");
    const selectedDrink = data?.find((drink) => drink.id === id);

    if (!drinkFromStorage && selectedDrink) {
      console.log("Saving new drink to localStorage");
      const currentDrinkId = selectedDrink?.id;
      saveToLocalStorage(currentDrinkId);
    } else if (drinkFromStorage && selectedDrink) {
      if (drinkFromStorage !== selectedDrink.id) {
        console.log("Updating stored drink in localStorage");
        const currentDrinkId = selectedDrink?.id;
        saveToLocalStorage(currentDrinkId);
      }
    } else if (drinkFromStorage && !selectedDrink) {
      console.log("Fetching new drink from API:", drinkFromStorage);
      dispatch(fetchDrinkDetails(id));
    }
  }, [data, dispatch]); // Removed storedDrink from dependencies

  console.log("Final Stored Drink:", storedDrink);

  const selectedDrink = data?.find((drink) => drink.id === id);

  return (
    <div>
      <h1>Drink Page</h1>
      <p>{selectedDrink?.name}</p>
    </div>
  );
}
