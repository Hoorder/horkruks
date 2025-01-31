"use client";

import { Navigation } from "../components/NavBars/Navigation/Navigation";
import { TopBar } from "../components/NavBars/TopBar/TopBar";
import styles from "./Layout.module.css"; // Dodajemy styl

export default function Dashboard({ children }) {
    return (
        <div className={styles.dashboard}>
            <TopBar />
            <div className={styles.mainContainer}>
                <Navigation />
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}
