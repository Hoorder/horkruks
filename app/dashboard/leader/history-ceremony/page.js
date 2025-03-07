import { HistoryCeremonyList } from "./components/HistoryCeremonyList";
import styles from "./page.module.css";

export default function HistoryCeremony() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <p>Historia ceremonii pogrzebowych</p>
                    <p>Sprawdzaj szczegóły i zarządzaj statusami ceremonii</p>
                </div>

                <HistoryCeremonyList />
            </div>
        </>
    );
}
