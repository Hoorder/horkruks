import styles from "./StatisticsCard.module.css";

export function PanelClear({ title, value }) {
    return (
        <>
            <div className={styles.panel}>
                <div className={styles.panelTop}>
                    <p>{title}</p>
                    <p>{value}</p>
                </div>
            </div>
        </>
    );
}
