"use client";

import { useEffect, useState } from "react";
import styles from "./SalaryHistory.module.css";

export function SalaryHistory() {
    const [salaryData, setSalaryData] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSalaryData = async (year) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `/api/user/paynaments/salary-history?year=${year}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || "Błąd podczas pobierania danych."
                );
            }

            const data = await response.json();
            setYears(data.years);
            setSalaryData(data.tasks);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalaryData(selectedYear);
    }, [selectedYear]);

    return (
        <div className={styles.container}>
            <div className={styles.dataFilterButtonContainer}>
                {years.map((year) => (
                    <button
                        key={year}
                        className={
                            year === selectedYear ? styles.activeBtn : ""
                        }
                        onClick={() => setSelectedYear(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {/* {loading && <p>Ładowanie danych...</p>} */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {loading ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Miesiąc</th>
                            <th>Ilość pogrzebów</th>
                            <th>Ilość przewozów</th>
                            <th>Ilość ubierań</th>
                            <th>Ilość godzin</th>
                            <th>Razem (zł)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>-----</td>
                            <td>-----</td>
                            <td>-----</td>
                            <td>-----</td>
                            <td>-----</td>
                            <td>-----</td>
                            <td>-----</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Miesiąc</th>
                                <th>Ilość pogrzebów</th>
                                <th>Ilość przewozów</th>
                                <th>Ilość ubierań</th>
                                <th>Ilość godzin</th>
                                <th>Razem (zł)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaryData.length > 0 ? (
                                salaryData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.month}</td>
                                        <td>{item.number_of_funerals}</td>
                                        <td>{item.number_of_transports}</td>
                                        <td>{item.number_of_body_prep}</td>
                                        <td>{item.number_of_work_hours}</td>
                                        <td>{item.total} zł</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7}>
                                        Brak danych dla wybranego roku
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
