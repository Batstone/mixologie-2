"use client";

import DrinkInstructions from "@/app/components/DrinkInstructions";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { fetchDrinksData } from "@/app/lib/redux/thunks/fetchDrinksData";
import { useEffect, useState } from "react";

import { ID } from "@/constants";

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

  function saveToLocalStorage(drink: string) {
    localStorage.setItem("id", id);
    setStoredDrink(drink);
  }

  localStorage.setItem("Drink", id);

  // Set the selected drink. use the ID

  useEffect(() => {
    const drinkFromStorage = localStorage.getItem("id");
    const selectedDrink = data?.find((drink) => drink.id === id);

    if (!drinkFromStorage && selectedDrink) {
      const currentDrinkId = selectedDrink?.id;
      saveToLocalStorage(currentDrinkId);
    } else if (drinkFromStorage && selectedDrink) {
      if (drinkFromStorage !== selectedDrink.id) {
        const currentDrinkId = selectedDrink?.id;
        saveToLocalStorage(currentDrinkId);
      }
    } else if (drinkFromStorage && !selectedDrink) {
      dispatch(fetchDrinksData({ searchType: ID, searchTerm: id }));
    }
  }, [dispatch]);

  // CHange selected drink below to just user the userState value that I will add
  const selectedDrink = data?.find((drink) => drink.id === id);

  return (
    <div>
      <h1>Drink Page</h1>
      <p>{selectedDrink?.name}</p>
    </div>
  );
}
