"use client";

import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";

export function ProgressBar({ selectedId }) {
    const [fetchData, setFetchData] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        if (!selectedId) {
            throw new Error("Wybierz przewóz, który Cię interesuje");
        }

        const fetchData = async () => {
            try {
                const response = await fetch(
                    `/api/manager/funeral-card/preview?selectedId=${selectedId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Błąd poczas pobierania danych.");
                }

                const funeralTasks = await response.json();
                setFetchData(funeralTasks);
            } catch (error) {
                console.error("Błąd podczas pobierania zadania:", error);
                throw new Error("Błąd podczas pobierania danych");
            }
        };

        fetchData();
    }, [isClicked]);

    const handleUpdateStatusToConfirm = async (id_funeral_card) => {
        setIsClicked((prev) => !prev);
        try {
            const response = await fetch(
                "/api/manager/funeral-card/list/confirm",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_funeral_card,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Błąd podczas aktualizacji");
            }
        } catch (error) {
            throw new Error("Sprawdź end-point");
        }
    };

    return (
        <>
            {fetchData.map((data) => (
                <div className={styles.container} key={data.id_funeral_cards}>
                    <div className={styles.wrapper}>
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
                            <p>Zakończono</p>
                            {data.order_confirmed_time ? (
                                <p>{data.order_confirmed_time}</p>
                            ) : (
                                <p>--:--</p>
                            )}
                        </div>
                    </div>
                    {data.order_confirmed_time === null && (
                        <button
                            className={styles.endBtn}
                            onClick={() => {
                                handleUpdateStatusToConfirm(
                                    data.id_funeral_cards
                                );
                            }}
                        >
                            Zgłoś zakończenie
                        </button>
                    )}
                </div>
            ))}
        </>
    );
}
