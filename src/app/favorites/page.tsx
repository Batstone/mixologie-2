import Header from "../components/Header";
import styles from "@/app/styles/FavoritesPage.module.css";

import { FAVORITE_DRINKS } from "@/constants";
import Link from "next/link";

export default function FavoritesPage() {
  return (
    <>
      <Header />
      <div className={styles["favorites"]}>
        <ul>
          <li>
            <Link href={`/drink/${drinkId}`}></Link>
          </li>
        </ul>
      </div>
    </>
  );
}
