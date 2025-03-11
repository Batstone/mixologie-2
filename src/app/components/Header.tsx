import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Header.module.css";

import { SEARCH, FAVORITES } from "@/constants";
import { Metadata } from "next";

interface HeaderProps {
  currentPage: string;
}

export const metadata: Metadata = {
  title: "Mixologie",
  description: "Craft the Perfect Cocktail",
};

export default function Header({ currentPage }: HeaderProps) {
  return (
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
  );
}
