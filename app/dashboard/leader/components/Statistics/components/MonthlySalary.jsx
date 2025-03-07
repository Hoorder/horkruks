"use client";

import { useEffect, useState } from "react";
import { Panel } from "./Panel";
import styles from "./StatisticsCard.module.css";

export function MonthlySalary() {
    const [monthlySalaryData, setMonthlySalaryData] = useState([]);

    useEffect(() => {
        const fetchMonthlySalary = async () => {
            try {
                const response = await fetch(
                    "/api/user/statistics/salary-stats"
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

                const monthlySalary = await response.json();
                setMonthlySalaryData(monthlySalary);
            } catch (error) {
                console.error("Błąd w trakcie żądania:", error);
            }
        };

        fetchMonthlySalary();
    }, []);

    return (
        <>
            {monthlySalaryData.map((stats) => (
                <div className={styles.statisticsCard} key={stats.unique_key}>
                    <p className={styles.cardName}>Wynagrodzenie</p>

                    <Panel
                        title={"Stan konta:"}
                        value={`${stats.current_account_balance},00 zł`}
                        lastYearValue={`${stats.account_balance_last_year},00 zł`}
                    />

                    <Panel
                        title={"Pogrzebów w tym miesiącu:"}
                        value={`${stats.current_month_funeral_count} szt.`}
                        lastYearValue={`${stats.last_year_month_funeral_count} szt.`}
                    />

                    <Panel
                        title={"Przewozów w tym miesiącu:"}
                        value={`${stats.current_month_transport_count} szt.`}
                        lastYearValue={`${stats.last_year_month_transport_count} szt.`}
                    />

                    <Panel
                        title={"Ubierań w tym miesiącu:"}
                        value={`${stats.current_month_preparation_count} szt.`}
                        lastYearValue={`${stats.last_year_month_preparation_count} szt.`}
                    />

                    <Panel
                        title={"Godzin w tym miesiącu:"}
                        value={stats.current_month_working_hours}
                        lastYearValue={stats.last_year_same_month_working_hours}
                    />
                </div>
            ))}
        </>
    );
}
