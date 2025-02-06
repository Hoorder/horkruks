"use client";

import Image from "next/image";
import styles from "./HistoryCeremonyList.module.css";
import { useEffect, useState } from "react";

export function HistoryCeremonyList() {
    const [funeralTasks, setFuneralTasks] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);
    const [activeYear, setActiveYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const fetchFuneralTasks = async () => {
            try {
                const response = await fetch(
                    "/api/user/statistics/funeral-tasks-history",
                    {
                        method: "GET",
                        headers: {
                            "X-Year": activeYear,
                        },
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    if (response.status === 401 || response.status === 404) {
                        setFuneralTasks([]);
                        setAvailableYears([]);
                        return;
                    } else {
                        throw new Error("Błąd podczas pobierania danych");
                    }
                }

                const data = await response.json();
                setFuneralTasks(data.tasks);
                setAvailableYears(data.years.map((yearData) => yearData.year)); // Zapisujemy dostępne lata
            } catch (error) {
                console.error("Błąd w trakcie żądania:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFuneralTasks();
    }, [activeYear]);

    const handleClick = (year) => {
        setActiveYear(year);
    };

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
        <div className={styles.container}>
            <div className={styles.dataFilterButtonContainer}>
                {availableYears.map((year) => (
                    <button
                        key={year}
                        className={year === activeYear ? styles.activeBtn : ""}
                        onClick={() => handleClick(year)}
                    >
                        {year}
                    </button>
                ))}
            </div>

            <div className={styles.tableContainer}>
                {loading ? (
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
                            {funeralTasks.length > 0 ? (
                                funeralTasks.map((task) => (
                                    <tr key={task.id_tasks}>
                                        <td>{task.id_tasks}</td>
                                        <td>
                                            {task.funeral_ceremony_place ||
                                                "-----"}
                                        </td>
                                        <td>
                                            {task.funeral_transport_place ||
                                                "-----"}
                                        </td>
                                        <td>
                                            {task.body_preparation_place ||
                                                "-----"}
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
                                                src="/trash.svg"
                                                width={20}
                                                height={20}
                                                alt="Usuń"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">
                                        Brak danych do wyświetlenia.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
