import { useState } from "react";

import DrinkCard from "./DrinkCard";
import Pager from "./Pager";

import { Drink } from "../lib/redux/slices/drinkSlice";

import styles from "../styles/DrinkList.module.css";

interface DrinkListProps {
  drinks: Drink[];
}

export default function DrinkList({ drinks }: DrinkListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (drinks.length > 10) {
    const indexOfLastDrink = currentPage * 10;
    const indexOfFirstDrink = indexOfLastDrink - 10;
    const currentDrinks = drinks.slice(indexOfFirstDrink, indexOfLastDrink);

    function handlePageChange(page: number) {
      setCurrentPage(page);
    }

    return (
      <>
        <ul className={styles["drink-list"]}>
          {currentDrinks.map((drink) => (
            <li key={drink.id}>
              <DrinkCard drinkName={drink.name} drinkImage={drink.img} drinkId={drink.id} />
            </li>
          ))}
        </ul>
        <Pager total={drinks.length} currentPage={currentPage} changePage={handlePageChange} />
      </>
    );
  }

  return (
    <ul className={styles["drink-list"]}>
      {drinks.map((drink) => (
        <li key={drink.id}>
          <DrinkCard drinkName={drink.name} drinkImage={drink.img} drinkId={drink.id} />
        </li>
      ))}
    </ul>
  );
}
