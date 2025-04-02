import Link from "next/link";
import Image from "next/image";
import Head from "next/head"; // Import next/head

import styles from "../styles/Header.module.css";

import { SEARCH, FAVORITES } from "@/constants";

interface HeaderProps {
  currentPage: string;
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <>
      <Head>
        <title>Mixologie | {currentPage === SEARCH ? "Search" : "Favorites"}</title>
        <meta name="description" content="Craft the Perfect Cocktail" />
        <link rel="icon" href="../icon.png" />
        <meta property="og:title" content="Mixologie Cocktail App" />
        <meta property="og:description" content="Discover and make your favorite cocktails with Mixologie." />
      </Head>

      <header className={`${styles.header}`}>
        <div
          className={`${styles["header__logo-container"]} ${
            currentPage === SEARCH ? styles["header__logo-container--home"] : styles["header__logo-container--search"]
          }`}
        >
          <h1>
            <Image src="/images/logo.png" alt="Logo" fill />
          </h1>
        </div>
        <nav className={styles["header__nav"]}>
          <ul className={styles["header__nav-list"]}>
            <li>
              <Link className={styles["header__nav-link"]} href="/" {...(currentPage === SEARCH ? { "aria-current": "page" } : {})}>
                Search
              </Link>
            </li>
            <li>
              <Link className={styles["header__nav-link"]} href="/favorites" {...(currentPage === FAVORITES ? { "aria-current": "page" } : {})}>
                Favorites
              </Link>
            </li>
            <li></li>
          </ul>
        </nav>
      </header>
    </>
  );
}
