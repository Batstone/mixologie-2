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

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  const getPagedDrinks = () => {
    if (drinks.length <= 10) return drinks;

    const indexOfLastDrink = currentPage * 10;
    const indexOfFirstDrink = indexOfLastDrink - 10;
    return drinks.slice(indexOfFirstDrink, indexOfLastDrink);
  };

  const numberOfPages = Math.ceil(drinks.length / 10);

  const renderDrinkList = (drinkList: typeof drinks) => (
    <ul className={styles["drink-list"]}>
      {drinkList.map((drink) => (
        <li key={drink.id}>
          <DrinkCard drinkName={drink.name} drinkImage={drink.img} drinkId={drink.id} />
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {drinks.length > 10 && (
        <>
          {renderDrinkList(getPagedDrinks())}
          <Pager numberOfPages={numberOfPages} currentPage={currentPage} changePage={handlePageChange} />
        </>
      )}

      {drinks.length <= 10 && renderDrinkList(drinks)}
    </>
  );
}
