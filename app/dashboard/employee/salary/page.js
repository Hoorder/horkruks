import { SalaryHistory } from "./components/SalaryHistory";
import styles from "./page.module.css";

export default function Withdrawals() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <p>Miesiące w liczbach</p>
                    <p>Przeglądaj składowe swoich wypłat</p>
                </div>

                <SalaryHistory />
            </div>
        </>
    );
}
