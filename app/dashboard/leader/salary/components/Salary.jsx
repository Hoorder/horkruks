"use client";

import styles from "./Salary.module.css";
import { useEffect, useState } from "react";

export function Salary() {
    const [salaryData, setSalaryData] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const showSalary = async () => {
            try {
                const response = await fetch("/api/leader/salary");

                if (!response.ok) {
                    setErrorMessage("Nie znaleziono pracowników");
                    setSuccessMessage("");
                    return;
                }

                const data = await response.json();
                setSalaryData(data);
            } catch (error) {
                console.error(error);
            }
        };

        showSalary();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imię</th>
                                <th>Nazwisko</th>
                                <th>Ilość pogrzebów</th>
                                <th>Ilość przewozów</th>
                                <th>Ilość przygotowań</th>
                                <th>Ilość godzin</th>
                                <th>Razem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaryData.map((salary) => (
                                <tr key={salary.id_users}>
                                    <td>{salary.id_users}</td>
                                    <td>{salary.first_name}</td>
                                    <td>{salary.last_name}</td>
                                    <td>{salary.total_funerals}</td>
                                    <td>{salary.total_transports}</td>
                                    <td>{salary.total_body_preparations}</td>
                                    <td>
                                        {salary.total_working_hours === null
                                            ? "0"
                                            : salary.total_working_hours}
                                    </td>
                                    <td>{salary.total_payout}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
