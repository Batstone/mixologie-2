"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { fetchDrinksData } from "@/app/lib/redux/thunks/fetchDrinksData";
import { useEffect, useState } from "react";
import Image from "next/image";

import { ID } from "@/constants";

import Header from "@/app/components/Header";

import styles from "../../styles/DrinkPage.module.css";
import Link from "next/link";
import Button from "@/app/components/Button";

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
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  function handleFavoriteChange() {
    console.log(isFavorite);
    setIsFavorite(!isFavorite);
  }

  function saveToLocalStorage(drink: string) {
    localStorage.setItem(ID, id);
    setStoredDrink(drink);
  }

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
        dispatch(fetchDrinksData({ searchType: ID, searchTerm: id }));
      }
    } else if (drinkFromStorage && !selectedDrink) {
      dispatch(fetchDrinksData({ searchType: ID, searchTerm: id }));
    }
  }, [dispatch]);

  // Change selected drink below to just user the userState value that I will add
  const selectedDrink = data?.find((drink) => drink.id === id);

  return (
    <>
      <Header />
      <main>
        <div className={`content-grid ${styles["drink"]}`}>
          <div className={styles["drink__container"]}>
            <div className={styles["drink__favorites"]}>
              <Button className={`${styles["drink__button"]} ${isFavorite ? styles["drink__button--favorite"] : ""}`} onClick={handleFavoriteChange}>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 217.408 217.408">
                  <path d="M194.078,22.682c-10.747-8.193-22.606-12.348-35.248-12.348c-15.951,0-33.181,6.808-50.126,19.754  C91.759,17.142,74.529,10.334,58.578,10.334c-12.642,0-24.501,4.155-35.248,12.348C7.606,34.671-0.24,49.8,0.006,67.648  c0.846,61.117,100.093,133.233,104.317,136.273l4.381,3.153l4.381-3.153c4.225-3.04,103.472-75.156,104.317-136.273  C217.648,49.8,209.802,34.671,194.078,22.682z M153.833,149.017c-18.374,18.48-36.915,33.188-45.129,39.453  c-8.214-6.265-26.755-20.972-45.129-39.453c-31.479-31.661-48.274-59.873-48.57-81.585c-0.178-13.013,5.521-23.749,17.421-32.822  c8.073-6.156,16.872-9.277,26.152-9.277c17.563,0,34.338,10.936,45.317,20.11l4.809,4.018l4.809-4.018  c10.979-9.174,27.754-20.11,45.317-20.11c9.28,0,18.079,3.121,26.152,9.277c11.9,9.073,17.599,19.809,17.421,32.822  C202.107,89.145,185.311,117.356,153.833,149.017z" />
                </svg>
              </Button>
            </div>
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
                          {selectedDrink.ingredientsAmount[index]} -
                          <Link className={styles["drink__link"]} href={`/`} onClick={() => localStorage.setItem("searchTerm", ingredient)}>
                            {ingredient}
                          </Link>
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
