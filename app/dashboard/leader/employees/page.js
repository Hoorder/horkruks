import { Employees } from "./components/Employees";
import styles from "./page.module.css";

export default function ShowEmployees() {
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <p>Baza pracowników zakładu</p>
                <p>Zarządzaj pracownikami</p>
            </div>

            <Employees />
        </div>
    );
}
