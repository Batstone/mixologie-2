"use client";

import DrinkInstructions from "@/app/components/DrinkInstructions";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { fetchDrinksData } from "@/app/lib/redux/thunks/fetchDrinksData";
import { useEffect, useState } from "react";
import Image from "next/image";

import { ID, DRINK } from "@/constants";

import Header from "@/app/components/Header";

import styles from "../../styles/DrinkPage.module.css";

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
    localStorage.setItem(ID, id);
    setStoredDrink(drink);
  }

  localStorage.setItem(DRINK, id);

  useEffect(() => {
    const drinkFromStorage = localStorage.getItem(ID);
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

  // Change selected drink below to just user the userState value that I will add
  const selectedDrink = data?.find((drink) => drink.id === id);

  console.log("selected", selectedDrink);

  return (
    <>
      <Header />
      <main>
        <div className={`content-grid ${styles["drink"]}`}>
          <div className={styles["drink__container"]}>
            <h2>{selectedDrink?.name}</h2>
            {selectedDrink && (
              <>
                <div className={styles["drink__image"]}>
                  <Image src={selectedDrink.img} alt={selectedDrink.name} fill />
                </div>
                <div className={styles["drink__text"]}>
                  <div className={styles["drink__ingredients"]}>
                    <h3>Ingredients:</h3>
                    <ul>
                      {selectedDrink.ingredients.map((ingredient, index) => (
                        <li key={index}>
                          {selectedDrink.ingredientsAmount[index]} - {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles["drink__instructions"]}>
                    <h3>Instructions:</h3>
                    <p>{selectedDrink.instructions}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
