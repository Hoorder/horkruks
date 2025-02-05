"use client";

import { useEffect, useState } from "react";
import styles from "./LastTasks.module.css";
import Image from "next/image";

export function LastTasks() {
    const [funeralTasks, setFuneralTasks] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchLastTasks = async () => {
            try {
                const response = await fetch(
                    "/api/user/statistics/funeral-tasks"
                );

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
    }, []);

    const handleDelete = async (taskId) => {
        const confirmDelete = window.confirm(
            "Czy na pewno chcesz usunąć to zadanie?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch("/api/user/statistics/funeral-tasks", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ taskId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMsg(errorData.error || "Nie udało się usunąć zadania");
                return;
            }

            setFuneralTasks((prevTasks) =>
                prevTasks.filter((task) => task.id_tasks !== taskId)
            );
        } catch (error) {
            console.error("Błąd podczas usuwania zadania:", error);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <p>Ostatnie 30 dni</p>
                    <p>Przeglądaj swoje zadania z ostatnich 30 dni</p>
                </div>

                <div className={styles.tableContainer}>
                    <p>{errorMsg}</p>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ceremonia</th>
                                <th>Przewóz zwłok</th>
                                <th>Przygotowanie zwłok</th>
                                <th>Godziny pracy</th>
                                <th>Data zadania</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funeralTasks.map((task) => (
                                <tr key={task.id_tasks}>
                                    <td>{task.id_tasks}</td>
                                    <td>
                                        {task.funeral_ceremony_place || "-----"}
                                    </td>
                                    <td>
                                        {task.funeral_transport_place ||
                                            "-----"}
                                    </td>
                                    <td>
                                        {task.body_preparation_place || "-----"}
                                    </td>
                                    <td>
                                        {task.working_hours_place === 0
                                            ? "-----"
                                            : task.working_hours_place}
                                    </td>
                                    <td>{task.task_date}</td>
                                    <td>
                                        <Image
                                            className={styles.deleteBtn}
                                            onClick={() =>
                                                handleDelete(task.id_tasks)
                                            }
                                            src={"/trash.svg"}
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
