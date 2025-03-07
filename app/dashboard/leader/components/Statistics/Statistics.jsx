import { FuneralStats } from "./components/FuneralStats";
import { LocalityCurrentYear } from "./components/LocalityCurrentYear";
import { MonthlySalary } from "./components/MonthlySalary";
import styles from "./Statistics.module.css";

export function Statistics() {
    return (
        <>
            <div className={styles.sectionTitle}>
                <p>Twoje statystyki:</p>
                <div className="bar"></div>
            </div>

            <div className={styles.container}>
                <MonthlySalary />
                <FuneralStats />
                <LocalityCurrentYear />
            </div>
        </>
    );
}
