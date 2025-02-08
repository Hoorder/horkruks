import styles from "./Dashboard.module.css";

export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.funeralCardsContainer}></div>
                <div className={styles.funeralStatisticsContainer}></div>
            </div>
        </>
    );
}
