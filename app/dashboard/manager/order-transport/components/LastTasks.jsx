"use client";

import { use, useEffect, useState } from "react";
import styles from "./LastTasks.module.css";
import Image from "next/image";

export function LastTasks({ setTransportId }) {
    const [funeralTasks, setFuneralTasks] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [isActive, setIsActive] = useState();

    useEffect(() => {
        const fetchLastTasks = async () => {
            try {
                const response = await fetch("/api/manager/transport/list");

                if (!response.ok) {
                    const errorData = await response.json();
                    if (response.status === 401) {
                        setErrorMsg(errorData.error);
                        return;
                    } else {
                        throw new Error("Błąd podczas pobierania danych");
                    }
                }

                const funeralTasks = await response.json();
                setFuneralTasks(funeralTasks);
            } catch (error) {
                console.error("Błąd w trakcie żądania:", error);
            }
        };

        fetchLastTasks();
    }, [isClicked]);

    const handleShow = async (id_transport_orders) => {
        setTransportId(id_transport_orders);
        setIsActive(id_transport_orders);

        try {
            const response = await fetch("/api/manager/transport/list", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_transport_orders,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Błąd podczas aktualizacji");
            }

            setIsClicked((prev) => !prev);
        } catch (error) {
            throw new Error("Sprawdź end-point");
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <p>Ostatnie 30 dni</p>
                    <p>Przeglądaj swoje przewozy z ostatnich 30 dni</p>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Kierownik</th>
                                <th>Partner</th>
                                <th>Adres</th>
                                <th>Numer kontaktowy</th>
                                <th>Data zadania</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {errorMsg && (
                                <tr>
                                    <td className={styles.errorTd} colSpan={7}>
                                        <p>{errorMsg}</p>
                                    </td>
                                </tr>
                            )}
                            {funeralTasks.map((task) => (
                                <tr
                                    className={
                                        task.order_displayed_time === null
                                            ? styles.newOrder
                                            : ""
                                    }
                                    style={{
                                        backgroundColor:
                                            task.id_transport_orders ===
                                            isActive
                                                ? "#f2eeee"
                                                : "white",
                                    }}
                                    key={task.id_transport_orders}
                                >
                                    <td>{task.id_transport_orders}</td>
                                    <td>{task.manager_name}</td>
                                    <td>{task.employee_name}</td>
                                    <td>{task.transport_from}</td>
                                    <td>{task.contact_number}</td>
                                    <td>{task.order_created_date}</td>
                                    <td>
                                        <Image
                                            className={styles.deleteBtn}
                                            onClick={() =>
                                                handleShow(
                                                    task.id_transport_orders
                                                )
                                            }
                                            src={"/pencil-edit.svg"}
                                            width={"20"}
                                            height={"20"}
                                            alt="Delete"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
