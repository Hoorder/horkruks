import { useEffect, useState } from "react";
import styles from "./GeneralStats.module.css";
import { Panel } from "@/app/dashboard/manager/components/Statistics/components/Panel";

export function GeneralStats() {
    const [monthlySalaryData, setMonthlySalaryData] = useState([]);
    const [errorMsg, setErrorMsg] = useState();

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
                    <p className={styles.cardName}>Ogólne</p>

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
