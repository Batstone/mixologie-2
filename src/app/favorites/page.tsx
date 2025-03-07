"use client";

import { useEffect } from "react";

import Header from "../components/Header";
import styles from "@/app/styles/FavoritesPage.module.css";

import { FAVORITE_DRINKS } from "@/constants";
import Link from "next/link";

interface LocalStorageDrink {
  id: string;
  name: string;
}

export default function FavoritesPage() {
  let currentFavorites = {};
  let favoritesArray: LocalStorageDrink[] = [];
  useEffect(function () {
    currentFavorites = JSON.parse(localStorage.getItem(FAVORITE_DRINKS) || "{}");

    if (currentFavorites) {
      favoritesArray = Object.values(currentFavorites);
    }
  }, []);
  return (
    <>
      <Header />
      <div className={styles["favorites"]}>
        {currentFavorites && (
          <ul>
            {favoritesArray.map((drink: any) => (
              <li key={drink.id}>
                <Link href={`/drink/${drink.id}`}>{drink.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
