import styles from "./StatisticsCard.module.css";

export function Panel({ title, value, lastYearValue }) {
    return (
        <>
            <div className={styles.panel}>
                <div className={styles.panelTop}>
                    <p>{title}</p>
                    <p>{value}</p>
                </div>
                <div className={styles.panelBottom}>
                    W ubiegłym roku:<span> {lastYearValue}</span>.
                </div>
            </div>
        </>
    );
}
