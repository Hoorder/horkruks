import { FuneralCard } from "./components/FuneralCard/FuneralCard";
import { Statistics } from "./components/Statistics/Statistics";
import styles from "./Dashboard.module.css";

export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.funeralCardsContainer}>
                    <FuneralCard />
                </div>
                <div className={styles.funeralStatisticsContainer}>
                    <Statistics />
                </div>
            </div>
        </>
    );
}
