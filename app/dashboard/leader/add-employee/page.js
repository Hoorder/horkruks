import { AddEmployeeForm } from "./components/AddEmployeeForm";
import styles from "./page.module.css";

export default function AddEmployee() {
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <p>Tworzenie nowego konta</p>
                <p>Określ dane finansowe oraz ragę</p>
            </div>
            <AddEmployeeForm />
        </div>
    );
}
