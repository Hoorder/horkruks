import { SearchByDate } from "./components/SearchByDate";
import { SearchByPlace } from "./components/SearchByPlace";
import styles from "./page.module.css";

export default function Search() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <p>Wyszukiwarka miejsc pogrzebu</p>
                    <p>Przeglądaj interesujące daty bądź miejsca</p>
                </div>

                <div className={styles.searchWrapper}>
                    <SearchByDate />
                    <SearchByPlace />
                </div>
            </div>
        </>
    );
}
