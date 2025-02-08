import { useEffect, useState } from "react";
import { Panel } from "./Panel";
import styles from "./StatisticsCard.module.css";

export function FuneralStats() {
    const [funeralData, setFuneralData] = useState([]);

    useEffect(() => {
        const fetchFuneralData = async () => {
            try {
                const response = await fetch(
                    "/api/user/statistics/funeral-stats"
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

                const funeralData = await response.json();
                setFuneralData(funeralData);
            } catch (error) {
                console.error("Błąd w trakcie żądania:", error);
            }
        };

        fetchFuneralData();
    }, []);

    return (
        <>
            {funeralData.map((stats) => (
                <div className={styles.statisticsCard} key={stats.unique_key}>
                    <p className={styles.cardName}>Statystyki pogrzebowe</p>

                    <Panel
                        title={"Pogrzebów dzisiaj:"}
                        value={`${stats.funerals_today} szt.`}
                        lastYearValue={`${stats.funerals_one_year_ago} szt.`}
                    />

                    <Panel
                        title={"Pogrzebów w tym miesiącu:"}
                        value={`${stats.funerals_this_month} szt.`}
                        lastYearValue={`${stats.funerals_last_year_same_month} szt.`}
                    />

                    <Panel
                        title={"Pogrzebów w tym roku:"}
                        value={`${stats.funerals_this_year_to_date} szt.`}
                        lastYearValue={`${stats.funerals_last_year} szt.`}
                    />
                </div>
            ))}
        </>
    );
}
