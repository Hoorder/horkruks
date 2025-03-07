import { Invoices } from "./components/Invoices";
import styles from "./page.module.css";

export default function ShowInvoices() {
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <p>Baza faktur usługowych</p>
                <p>Przeglądaj i zarządzaj stanami FV</p>
            </div>

            <Invoices />
        </div>
    );
}
