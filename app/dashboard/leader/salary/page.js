import { Salary } from "./components/Salary";
import styles from "./page.module.css";

export default function ShowSalary() {
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <p>Wypłaty pracownicze</p>
                <p>Przeglądaj wypłaty miesięczne i roczne</p>
            </div>

            <Salary />
        </div>
    );
}
