"use client";

import { useEffect, useState } from "react";
import styles from "./MonthlyPayCard.module.css";

export function MonthlyPayCard() {
    const [salaryData, setSalaryData] = useState([]);
    const [now, setNow] = useState(new Date());
    const [errorMsg, setErrorMsg] = useState();

    const getCurrentMonthName = () => {
        const monthsNames = [
            "Styczeń",
            "Luty",
            "Marzec",
            "Kwiecień",
            "Maj",
            "Czerwiec",
            "Lipiec",
            "Sierpień",
            "Wrzesień",
            "Październik",
            "Listopad",
            "Grudzień",
        ];
        const currentDate = now;
        const currentMonthNumber = currentDate.getMonth();
        return monthsNames[currentMonthNumber];
    };

    useEffect(() => {
        const fetchSalaryData = async () => {
            try {
                const response = await fetch("/api/user/paynaments/reckoning");

                if (!response.ok) {
                    const errorLog = await response.json();
                    setErrorMsg(errorLog.error);
                    return;
                }

                const data = await response.json();
                setSalaryData(data);
            } catch (error) {
                throw new Error(`Sprawdź end-point. ${error}`);
            }
        };

        fetchSalaryData();
    }, []);

    const currentMonth = getCurrentMonthName();
    return (
        <>
            {errorMsg && <p className={styles.errMsg}>{errorMsg}</p>}

            {salaryData.map((data) => (
                <div className={styles.container} key={data.month}>
                    <div className={styles.header}>
                        <p>
                            {currentMonth} {" - "}
                            {now.getDate().toString().padStart(2, "0")}.
                            {(now.getMonth() + 1).toString().padStart(2, "0")}.
                            {now.getFullYear()}
                        </p>
                    </div>

                    <div className={styles.body}>
                        <div className={styles.feeForCard}>
                            <p>Ceremonie pogrzebowe</p>
                            <p>{data.number_of_funerals} szt.</p>
                            <p>{data.total_funeral_ceremony_payout} zł.</p>
                        </div>
                        <div className={styles.feeForCard}>
                            <p>Przewóz zwłok</p>
                            <p>{data.number_of_transports} szt.</p>
                            <p>{data.total_funeral_transport_payout} zł.</p>
                        </div>
                        <div className={styles.feeForCard}>
                            <p>Przygotowanie zwłok</p>
                            <p>{data.number_of_body_prep} szt.</p>
                            <p>{data.total_body_preparation_payout} zł.</p>
                        </div>
                        <div className={styles.feeForCard}>
                            <p>Godziny robocze</p>
                            <p>{data.number_of_work_hours} h</p>
                            <p>{data.total_working_hours_payout} zł.</p>
                        </div>
                    </div>

                    <div className={styles.bottom}>
                        <p>Do wypłaty:</p>
                        <p>{data.total} zł.</p>
                    </div>
                </div>
            ))}
        </>
    );
}
