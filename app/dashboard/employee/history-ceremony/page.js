import { HistoryCeremonyList } from "./components/HistoryCeremonyList";
import styles from "./page.module.css";

export default function HistoryCeremony() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <p>Historia zleceń pogrzebowych</p>
                    <p>Przeglądaj swoje zlecenia z każdego roku</p>
                </div>

                <HistoryCeremonyList />
            </div>
        </>
    );
}
