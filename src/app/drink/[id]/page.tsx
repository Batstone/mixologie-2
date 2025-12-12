"use client";

import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { fetchDrinksData } from "@/app/lib/redux/thunks/fetchDrinksData";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FAVORITES, INGREDIENT, ID, FAVORITE_DRINKS, SAVE_RECIPE_FAVORITE, REMOVE_RECIPTE_FAVORITE } from "@/constants";
import Header from "@/app/components/Header";
import Button from "@/app/components/Button";
import Link from "next/link";
import styles from "../../styles/DrinkPage.module.css";
import Footer from "@/app/components/Footer";

interface DrinkPageProps {
  params: { id: string };
}

interface LocalStorageDrink {
  id: string;
  name: string;
}

export default function DrinkPage({ params }: DrinkPageProps) {
  const { id } = params;
  const { data, loading, error } = useAppSelector((state) => state.drink);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);
  const [screenReaderText, setScreenReaderText] = useState(SAVE_RECIPE_FAVORITE);
  const fetchingRef = useRef<string | null>(null);

  const checkIfFavorite = () => {
    const favoriteDrinks = JSON.parse(localStorage.getItem(FAVORITE_DRINKS) || "{}");
    const drinkFromStorage = favoriteDrinks[id];
    if (drinkFromStorage) setIsFavorite(true);
  };

  const toggleFavorite = (name: string, id: string) => {
    const currentFavorites: { [key: string]: LocalStorageDrink } = JSON.parse(localStorage.getItem(FAVORITE_DRINKS) || "{}");
    const updatedFavorites = { ...currentFavorites };

    if (isFavorite) {
      delete updatedFavorites[id];
      setScreenReaderText(SAVE_RECIPE_FAVORITE);
    } else {
      updatedFavorites[id] = { name, id };
      setScreenReaderText(REMOVE_RECIPTE_FAVORITE);
    }

    // Update the local storage and the state
    localStorage.setItem(FAVORITE_DRINKS, JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  // Save the current drink to local storage
  const saveToLocalStorage = (drinkId: string) => {
    localStorage.setItem(ID, drinkId);
  };

  // Reset fetching ref when ID changes
  useEffect(() => {
    fetchingRef.current = null;
  }, [id]);

  // Fetch drink data when ID changes or when data changes but drink is missing
  useEffect(() => {
    checkIfFavorite();
    saveToLocalStorage(id);

    // Check if drink selection exists in data
    const selectedDrink = data?.find((drink) => drink.id === id);

    // Fetch if drink is not in data, not currently loading, and we haven't already initiated a fetch for this ID
    if (!selectedDrink && !loading && fetchingRef.current !== id) {
      fetchingRef.current = id;
      dispatch(fetchDrinksData({ searchType: ID, searchTerm: id }));
    } else if (selectedDrink) {
      // Drink found, reset fetching ref
      fetchingRef.current = null;
    }
  }, [dispatch, id, data, loading]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, ingredient: string) => {
    e.preventDefault();
    dispatch(fetchDrinksData({ searchType: INGREDIENT, searchTerm: ingredient }));
    router.push("/");
  };

  const selectedDrink = data?.find((drink) => drink.id === id);

  return (
    <>
      <Header currentPage={FAVORITES} />
      <main>
        <div className={`content-grid ${styles["drink"]}`}>
          <div className={styles["drink__container"]}>
            {selectedDrink && (
              <>
                <div className={styles["drink__favorites"]}>
                  <Button
                    title={screenReaderText}
                    className={`${styles["drink__button"]} ${isFavorite ? styles["drink__button--favorite"] : ""}`}
                    onClick={() => toggleFavorite(selectedDrink.name, selectedDrink.id)}
                  >
                    <svg aria-hidden="true" viewBox="0 0 217.408 217.408">
                      <path d="M194.078,22.682c-10.747-8.193-22.606-12.348-35.248-12.348c-15.951,0-33.181,6.808-50.126,19.754  C91.759,17.142,74.529,10.334,58.578,10.334c-12.642,0-24.501,4.155-35.248,12.348C7.606,34.671-0.24,49.8,0.006,67.648  c0.846,61.117,100.093,133.233,104.317,136.273l4.381,3.153l4.381-3.153c4.225-3.04,103.472-75.156,104.317-136.273  C217.648,49.8,209.802,34.671,194.078,22.682z M153.833,149.017c-18.374,18.48-36.915,33.188-45.129,39.453  c-8.214-6.265-26.755-20.972-45.129-39.453c-31.479-31.661-48.274-59.873-48.57-81.585c-0.178-13.013,5.521-23.749,17.421-32.822  c8.073-6.156,16.872-9.277,26.152-9.277c17.563,0,34.338,10.936,45.317,20.11l4.809,4.018l4.809-4.018  c10.979-9.174,27.754-20.11,45.317-20.11c9.28,0,18.079,3.121,26.152,9.277c11.9,9.073,17.599,19.809,17.421,32.822  C202.107,89.145,185.311,117.356,153.833,149.017z" />
                    </svg>
                    <span className="sr-only">{screenReaderText}</span>
                  </Button>
                </div>
                <h2>{selectedDrink.name}</h2>
                <div className={styles["drink__text"]}>
                  <div className={styles["drink__ingredients"]}>
                    <h3>Ingredients:</h3>
                    <ul>
                      {selectedDrink.ingredients.map((ingredient, index) => (
                        <li key={index}>
                          {selectedDrink.ingredientsAmount?.[index] && `${selectedDrink.ingredientsAmount[index]} - `}
                          <Link className={styles["drink__link"]} href={`/`} onClick={(e) => handleClick(e, ingredient)}>
                            {ingredient}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles["drink__instructions"]}>
                    <h3>Instructions:</h3>
                    <p>{selectedDrink.instructions}</p>
                    <p>Enjoy!</p>
                  </div>
                  <div className={styles["drink__image"]}>
                    <Image src={selectedDrink.img} alt={selectedDrink.name} fill />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
