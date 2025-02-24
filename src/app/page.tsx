"use client";

import { useAppSelector } from "./lib/redux/hooks";

import Header from "./components/Header";
import DrinkCard from "./components/DrinkCard";
import Form from "./components/Form";
import Footer from "./components/Footer";

import styles from "./styles/Home.module.css";

export default function Home() {
  const { data, loading, error } = useAppSelector((state) => state.drink);

  return (
    <div className="content-grid">
      <Header />
      <main>
        <div className={styles.home__hero}>
          <h2 className={styles["home__sub-heading"]}>Everything You Need to Craft The Perfect Cocktail.</h2>
          <div>
            <Form />
          </div>
        </div>
        {loading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}

        {data.length !== 0 && (
          <div>
            <h2 className={styles["home__search-results-title"]}>Search Results ({data.length}):</h2>
            <ul className={styles.home__list}>
              {data.map((drink) => (
                <li key={drink.id}>
                  <DrinkCard drinkName={drink.name} drinkImage={drink.img} drinkId={drink.id} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
