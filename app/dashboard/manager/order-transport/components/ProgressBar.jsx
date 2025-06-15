"use client";

import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";

export function ProgressBar({ transportId, isClicked }) {
    const [fetchData, setFetchData] = useState([]);
    const [errorMsg, setErrorMsg] = useState();

    useEffect(() => {
        if (!transportId) {
            setErrorMsg("Wybierz przewóz, który Cię interesuje");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `/api/manager/transport/preview?transportId=${transportId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    // setErrorMsg("Błąd podczas wczytywania zadania");
                    return;
                }

                const funeralTasks = await response.json();
                setFetchData(funeralTasks);
                // setErrorMsg("");  // Clear error if data is fetched successfully
            } catch (error) {
                console.error("Błąd podczas pobierania zadania:", error);
                setErrorMsg("Błąd podczas pobierania danych");
            }
        };

        fetchData();
    }, [isClicked]);
    return (
        <>
            <div className={styles.sectionTitle}>
                <p>Postęp zlecenia</p>
                <div className="bar"></div>
            </div>

            {fetchData.map((data) => (
                <div
                    className={styles.container}
                    key={data.id_transport_orders}
                >
                    <div
                        className={`${styles.progressLevel} ${
                            data.order_created_time && styles.send
                        }`}
                    >
                        <p>Wysłano</p>
                        <p>{data.order_created_time}</p>
                    </div>
                    <div
                        className={`${styles.progressLevel} ${
                            data.order_displayed_time && styles.show
                        }`}
                    >
                        <p>Wyświetlono</p>
                        {data.order_displayed_time ? (
                            <p>{data.order_displayed_time}</p>
                        ) : (
                            <p>--:--</p>
                        )}
                    </div>
                    <div
                        className={`${styles.progressLevel} ${
                            data.order_confirmed_time && styles.confirmed
                        }`}
                    >
                        <p>Potwierdzono</p>
                        {data.order_confirmed_time ? (
                            <p>{data.order_confirmed_time}</p>
                        ) : (
                            <p>--:--</p>
                        )}
                    </div>
                    <div
                        className={`${styles.progressLevel} ${
                            data.order_completed_time && styles.end
                        }`}
                    >
                        <p>Zakończono</p>
                        {data.order_completed_time ? (
                            <p>{data.order_completed_time}</p>
                        ) : (
                            <p>--:--</p>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}
