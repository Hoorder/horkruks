"use client";

import { useEffect, useState } from "react";
import { Panel } from "./Panel";
import styles from "./StatisticsCard.module.css";

export function LocalityCurrentYear() {
    const [now, setNow] = useState(new Date());
    const [funeralsData, setFuneralsData] = useState([]);

    useEffect(() => {
        const fetchFuneralsData = async () => {
            try {
                const response = await fetch(
                    "/api/user/statistics/locality-stats"
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    if (response.status === 401) {
                        setErrorMsg(errorData.error);
                        return;
                    } else {
                        throw new Error("Błąd poczas pobierania danych");
                    }
                }

                const funeralsData = await response.json();
                setFuneralsData(funeralsData);
            } catch (error) {
                console.error("Błąd w trakcie żądania:", error);
            }
        };

        fetchFuneralsData();
    }, []);

    return (
        <>
            <div className={styles.statisticsCard}>
                <p className={styles.cardName}>
                    Miejscowości {now.getFullYear()}
                </p>

                <div className={styles.localityContainer}>
                    {funeralsData.map((stats, index) => (
                        <div key={stats.rank || index}>
                            <p>
                                {stats.rank}. {stats.funeral_ceremony_place}:
                                <span>{stats.funerals_count}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
