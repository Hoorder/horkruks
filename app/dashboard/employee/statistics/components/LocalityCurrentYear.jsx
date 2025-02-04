import { useEffect, useState, useMemo } from "react";
import styles from "./LocalityCurrentYear.module.css";

export function LocalityCurrentYear() {
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
                <p className={styles.cardName}>Miejscowości</p>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Miejscowość</th>
                                <th>Liczba</th>
                                <th>Wykres</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funeralsData.map((stats, index) => {
                                const maxFunerals = Math.max(
                                    ...funeralsData.map(
                                        (data) => data.funerals_count
                                    )
                                );

                                const widthPercentage =
                                    (stats.funerals_count / maxFunerals) * 100;
                                const divWidth = Math.min(widthPercentage, 100);

                                return (
                                    <tr key={stats.rank || index}>
                                        <td>{stats.rank || index}</td>
                                        <td>{stats.funeral_ceremony_place}</td>
                                        <td>{stats.funerals_count}</td>
                                        <td>
                                            <div
                                                className={
                                                    styles.chartPlaceholder
                                                }
                                                style={{
                                                    width: `${divWidth}%`,
                                                }}
                                            ></div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
