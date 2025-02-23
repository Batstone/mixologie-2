import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles["header__logo-container"]}`}>
        <h1>
          <Image src="/images/logo.png" alt="Logo" fill />
        </h1>
      </div>
      <nav className={styles["header__nav"]}>
        <ul className={styles["header__nav-list"]}>
          <li>
            <Link className={styles["header__nav-link"]} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles["header__nav-link"]} href="/about">
              Login
            </Link>
          </li>
          <li></li>
        </ul>
      </nav>
    </header>
  );
}
