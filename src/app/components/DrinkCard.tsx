import Image from "next/image";

import styles from "../styles/DrinkCard.module.css";
import Link from "next/link";

interface DrinkCardProps {
  drinkName: string;
  drinkImage: string;
  drinkId: string;
}

export default function DrinkCard({ drinkName, drinkImage, drinkId }: DrinkCardProps) {
  return (
    <Link href={`/drink/${drinkId}`} className={styles.drink__card}>
      <div className={styles["drink__card-container"]}>
        <h2 className={styles.drink__title}>{drinkName}</h2>
        <div className={styles.drink__image}>
          <Image src={drinkImage} alt={drinkName} fill />
        </div>
        <div className={styles["drink__card-view"]}>
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 297 297">
            <path d="M265.49,72.014c2.836-2.897,3.658-7.213,2.086-10.95c-1.57-3.737-5.229-6.168-9.284-6.168h-48.877l37.7-37.7  c3.934-3.934,3.934-10.313,0-14.246c-3.935-3.933-10.311-3.933-14.245,0l-51.946,51.946H38.708c-4.055,0-7.714,2.431-9.284,6.168  c-1.572,3.737-0.75,8.053,2.086,10.95l106.918,109.232v95.609H93.605c-5.563,0-10.073,4.51-10.073,10.072S88.042,297,93.605,297  h109.791c5.563,0,10.073-4.51,10.073-10.072s-4.511-10.072-10.073-10.072h-44.823v-95.609L265.49,72.014z M198.516,111.638  L148.5,162.737l-50.016-51.099H198.516z M234.338,75.041l-16.104,16.451h-45.416l16.451-16.451H234.338z M160.779,75.041  l-16.452,16.451H78.766L62.662,75.041H160.779z" />
          </svg>
          <p>View Recipe</p>
        </div>
      </div>
    </Link>
  );
}
