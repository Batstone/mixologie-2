import { current } from "@reduxjs/toolkit";
import Button from "./Button";
import styles from "../styles/Pager.module.css";

interface PagerProps {
  numberOfPages: number;
  currentPage: number;
  changePage: (page: number) => void;
}

export default function Pager({ numberOfPages, currentPage, changePage }: PagerProps) {
  return (
    <nav aria-label="Drink results pager" className={styles["pager-nav"]}>
      <ul className={styles["pager-list"]}>
        <li>
          <Button
            className={`${styles["pager-button"]} ${styles["pager-arrow"]}`}
            onClick={(e) => changePage(currentPage - 1)}
            disabled={currentPage === 1 ? true : false}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Go to previous page</span>
          </Button>
        </li>

        {Array.from({ length: numberOfPages }, (_, i) => {
          const isActive = currentPage === i + 1;

          return (
            <li key={i}>
              <Button
                className={`${styles["pager-button"]} ${isActive ? styles["pager-button-active"] : styles["pager-button-inactive"]}`}
                onClick={() => changePage(i + 1)}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive ? <span className="sr-only"> Page </span> : <span className="sr-only">Go to page </span>}
                {i + 1}
              </Button>
            </li>
          );
        })}

        <li>
          <Button
            className={`${styles["pager-button"]} ${styles["pager-arrow"]}`}
            onClick={(e) => changePage(currentPage + 1)}
            disabled={currentPage === numberOfPages ? true : false}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Go to next page</span>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
