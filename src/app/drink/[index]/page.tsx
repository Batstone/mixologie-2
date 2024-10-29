"use client";

import DrinkInstructions from "@/app/components/DrinkInstructions";

import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { fetchDrinkData } from "@/app/lib/redux/thunks/fetchDrinkData";
import { useEffect } from "react";

interface DrinkPageProps {
  params: {
    index: string;
  };
}

export default function DrinkPage({ params }: DrinkPageProps) {
  const { index } = params;
  const { data, loading, error } = useAppSelector((state) => state.drink);

  const dispatch = useAppDispatch();

  // Change to selected drink
  const drinkIndex = parseInt(index, 10);
  const selectedDrink = data[drinkIndex];

  function saveToLocalStorage(drink: string) {
    localStorage.setItem("Drink", selectedDrink.name);
  }

  useEffect(
    function () {
      const storedDrink = localStorage.getItem("Drink");

      if (storedDrink) {
        dispatch(fetchDrinkData(storedDrink));
      } else {
        localStorage.setItem("Drink", selectedDrink.name);
      }
    },
    [dispatch]
  );

  return (
    <div>
      <h1>Drink Page</h1>
      {selectedDrink && <DrinkInstructions drinkName={selectedDrink.name} glass={selectedDrink.glass} instructions={selectedDrink.instructions} />}
    </div>
  );
}
