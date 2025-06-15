import { MonthlyPayCard } from "./components/MonthlyPayCard";
import styles from "./page.module.css";

export default function Bill() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <p>Rozliczenie miesięczne</p>
          <p>Sprawdź składowe swojego miesiąca</p>
        </div>

        <MonthlyPayCard />
      </div>
    </>
  );
}
