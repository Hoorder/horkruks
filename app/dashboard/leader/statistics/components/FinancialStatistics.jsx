import { useEffect, useState } from "react";
import styles from "./FinancialStatistics.module.css";
import { Panel } from "@/app/dashboard/manager/components/Statistics/components/Panel";

export function FinancialStatistics() {
    const [monthlySalaryData, setMonthlySalaryData] = useState([]);
    const [errorMsg, setErrorMsg] = useState();

    useEffect(() => {
        const fetchMonthlySalary = async () => {
            try {
                const response = await fetch(
                    "/api/user/statistics/financial-stats"
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
                    <p className={styles.cardName}>Finansowe</p>


                    <Panel
                        title={"Kwota zarobiona ogólnie:"}
                        value={`${stats.current_year_total_revenue ? stats.current_year_total_revenue : "0"} Zł.`}
                        lastYearValue={`${stats.last_year_total_revenue ? stats.last_year_total_revenue : "0"} Zł`}
                    />

                    <Panel
                        title={"Kwota zarobiona z pogrzebów:"}
                        value={`${stats.current_year_funeral_revenue ? stats.current_year_funeral_revenue : "0"} Zł.`}
                        lastYearValue={`${stats.last_year_funeral_revenue ? stats.last_year_funeral_revenue : "0"} Zł`}
                    />

                    <Panel
                        title={"Kwota zarobiona z przewozów:"}
                        value={`${stats.current_year_transport_revenue ? stats.current_year_transport_revenue : "0"} Zł.`}
                        lastYearValue={`${stats.last_year_transport_revenue ? stats.last_year_transport_revenue : "0"} Zł`}
                    />

                    <Panel
                        title={"Kwota zarobiona z ubierań:"}
                        value={`${stats.current_year_preparation_revenue ? stats.current_year_preparation_revenue : "0"} Zł.`}
                        lastYearValue={`${stats.last_year_preparation_revenue ? stats.last_year_preparation_revenue: "0"} Zł`}
                    />

                    <Panel
                        title={"Kwota zarobiona z godzin:"}
                        value={`${stats.current_year_working_hours_revenue ? stats.current_year_working_hours_revenue : "0"} Zł.`}
                        lastYearValue={`${stats.last_year_working_hours_revenue ? stats.last_year_working_hours_revenue : "0"} Zł`}
                    />
                </div>
            ))}
        </>
    );
}
