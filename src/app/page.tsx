"use client";

import { useAppSelector } from "./lib/redux/hooks";

import Header from "./components/Header";
import Form from "./components/Form";
import DrinkList from "./components/DrinkList";
import Footer from "./components/Footer";

import { SEARCH } from "@/constants";

import styles from "./styles/Home.module.css";

export default function Home() {
  const { data, searchTerm, loading, error } = useAppSelector((state) => state.drink);

  return (
    <>
      <Header currentPage={SEARCH} />
      <main>
        <div className={styles.home__hero}>
          <h2 className={styles["home__sub-heading"]}>Everything You Need to Craft The Perfect Cocktail.</h2>
          <div>
            <Form />
          </div>
        </div>

        {loading && <p className={styles.home__text}>Loading...</p>}
        {error && <p className={styles.home__text}>{error}</p>}

        {data.length !== 0 && (
          <div className={styles["home__search-results"]}>
            <h2 className={styles["home__search-results-title"]}>
              Search Results ({data.length}), <span className={styles["home__search-results-term"]}>{searchTerm}:</span>
            </h2>
            <DrinkList drinks={data} />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
