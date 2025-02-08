"use client";

import { useEffect, useState } from "react";
import styles from "./AddOrderForm.module.css";
import { Input } from "@/app/dashboard/components/Input/Input";
import { ProgressBar } from "./ProgressBar";

export function AddOrderForm({ transportId }) {
    const [fetchData, setFetchData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [isClicked, setIsClicked] = useState(false);

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
                    setErrorMsg("Błąd podczas wczytywania zadania");
                    return;
                }

                const funeralTasks = await response.json();
                setFetchData(funeralTasks);
                setErrorMsg("");
            } catch (error) {
                console.error("Błąd podczas pobierania zadania:", error);
                setErrorMsg("Błąd podczas pobierania danych");
            }
        };

        fetchData();
    }, [transportId, isClicked]);

    const handleUpdateStatusToConfirm = async (id_transport_orders) => {
        setIsClicked((prev) => !prev);
        try {
            const response = await fetch(
                "/api/manager/transport/list/confirm",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_transport_orders,
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

    const handleUpdateStatusToEnd = async (id_transport_orders) => {
        setIsClicked((prev) => !prev);
        try {
            const response = await fetch(
                "/api/manager/transport/list/end-task",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_transport_orders,
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
        <div className={styles.container}>
            <div className={styles.head}>
                <p>Zlecone przewozy</p>
                <p>Nowe oczekujące na potwierdzenie</p>
            </div>

            {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

            {!errorMsg &&
                fetchData.map((data) => (
                    <div className={styles.form} key={data.id_transport_orders}>
                        <div className={styles.segment}>
                            <div className={styles.sectionTitle}>
                                <p>Dane potrzebne do przewozu</p>
                                <div className="bar"></div>
                            </div>
                            <div className={styles.inputContainers}>
                                <Input
                                    label={"Kierownik"}
                                    nameAndId={"transportManager"}
                                    value={data.manager_name}
                                    disabled
                                />
                                <Input
                                    label={"Pracownik"}
                                    nameAndId={"employee"}
                                    value={data.employee_name}
                                    disabled
                                />
                                <Input
                                    label={"Transport z"}
                                    nameAndId={"transportFrom"}
                                    value={data.transport_from}
                                    disabled
                                />
                                <Input
                                    label={"Transport do"}
                                    nameAndId={"transportTo"}
                                    value={data.transport_to}
                                    disabled
                                />
                                <Input
                                    label={"Numer leceniodawcy"}
                                    nameAndId={"telNumber"}
                                    value={data.contact_number}
                                    disabled
                                />
                            </div>
                        </div>

                        <ProgressBar
                            transportId={transportId}
                            isClicked={isClicked}
                        />

                        <div className={styles.btnContainer}>
                            {data.order_confirmed_time === null && (
                                <button
                                    className={`${styles.button} ${styles.buttonConfirm}`}
                                    onClick={() => {
                                        handleUpdateStatusToConfirm(
                                            data.id_transport_orders
                                        );
                                    }}
                                >
                                    Potwierdź
                                </button>
                            )}

                            {data.order_completed_time === null && (
                                <button
                                    className={styles.button}
                                    onClick={() => {
                                        handleUpdateStatusToEnd(
                                            data.id_transport_orders
                                        );
                                    }}
                                >
                                    Zakończ
                                </button>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
}
