import Link from "next/link";

import styles from "@/app/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <p>© 2021 Mixologie</p>
      <Link href="https://www.adambatstone.dev">
        <span>Visit the portfolio of developer, Adam Batstone. </span>Batstone Development
      </Link>
    </footer>
  );
}
