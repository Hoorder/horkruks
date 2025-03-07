"use client";

import { FinancialStatistics } from "./components/FinancialStatistics";
import { FuneralStats } from "./components/FuneralStats";
import { GeneralStats } from "./components/GeneralStats";
import { LocalityCurrentYear } from "./components/LocalityCurrentYear";
import styles from "./page.module.css";

export default function Statistics() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <p>Statystyki pogrzebowe</p>
                    <p>Przeglądaj swoje statystyki pogrzebowe</p>
                </div>

                <div className={styles.statsWrapper}>
                    <LocalityCurrentYear />
                    <FuneralStats />
                    <GeneralStats />
                    <FinancialStatistics />
                </div>
            </div>
        </>
    );
}
