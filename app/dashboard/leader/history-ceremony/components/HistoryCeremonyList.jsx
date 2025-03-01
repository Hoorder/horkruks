"use client";

import Image from "next/image";
import styles from "./HistoryCeremonyList.module.css";
import { useEffect, useState } from "react";
import { CeremonyDetails } from "./CeremonyDetails";

export function HistoryCeremonyList() {
    const [funeralData, setFuneralData] = useState([]);
    const [funeralYears, setFuneralYears] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [ceremonyId, setCeremonyId] = useState();
    const [actualYear, setActualYear] = useState(new Date().getFullYear());

    const [hide, setHide] = useState(true);

    useEffect(() => {
        const displayFunerals = async () => {
            try {
                const response = await fetch("/api/leader/history-ceremony", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ actualYear }),
                });

                if (!response.ok) {
                    const errorMsg = await response.json();
                    setErrorMessage(errorMsg);
                }

                const funeralDataResp = await response.json();
                setFuneralData(funeralDataResp.funeral_data);
                setFuneralYears(funeralDataResp.funeral_years);
            } catch (error) {
                console.log(error);
            }
        };

        displayFunerals();
    }, []);

    const handleChangeYear = async (year) => {
        const actualYear = Number(year);
        setActualYear(year);
        try {
            const response = await fetch("/api/leader/history-ceremony", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ actualYear }),
            });

            if (!response.ok) {
                const errorMsg = await response.json();
                setErrorMessage(errorMsg);
            }

            const funeralDataResp = await response.json();
            setFuneralData(funeralDataResp.funeral_data);
            setFuneralYears(funeralDataResp.funeral_years);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteFuneralOrder = async (funeralOrderId) => {
        const confirmDelete = window.confirm(
            "Czy na pewno chcesz usunąć to zlecenie?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch("/api/leader/history-ceremony/modal", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ funeralOrderId }),
            });

            if (!response.ok) {
                console.log("Błąd podczas usuwania");
            }

            setFuneralData((prevTasks) =>
                prevTasks.filter(
                    (task) => task.id_funeral_cards !== funeralOrderId
                )
            );
        } catch (error) {
            console.log("Sprawdź API");
        }
    };

    return (
        <>
            {hide ? null : <CeremonyDetails ceremonyId={ceremonyId} />}

            <div className={styles.container}>
                <div className={styles.dataFilterButtonContainer}>
                    {funeralYears.map((year) => (
                        <button
                            key={year.funeral_years}
                            className={
                                Number(year.funeral_years) ===
                                Number(actualYear)
                                    ? styles.activeBtn
                                    : null
                            }
                            value={year.funeral_years}
                            onClick={(e) => handleChangeYear(e.target.value)}
                        >
                            {year.funeral_years}
                        </button>
                    ))}
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imię</th>
                                <th>Nazwisko</th>
                                <th>Miejscowość</th>
                                <th>Data ceremonii</th>
                                <th>Godzina</th>
                                <th>Kierownik</th>
                                <th>Przewóz</th>
                                <th>Przygotowanie</th>
                                <th>Wieńce</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funeralData.map((funeral) => (
                                <tr key={funeral.id_funeral_cards}>
                                    <td>{funeral.id_funeral_cards}</td>
                                    <td>{funeral.dead_person_name}</td>
                                    <td>{funeral.dead_person_surname}</td>
                                    <td>{funeral.funeral_locality}</td>
                                    <td>{funeral.funeral_date}</td>
                                    <td>{funeral.funeral_time}</td>
                                    <td>{funeral.team_manager_name}</td>
                                    <td>
                                        {funeral.transport === 1
                                            ? "Tak"
                                            : "Nie"}
                                    </td>
                                    <td>
                                        {funeral.preparation_of_the_body === 1
                                            ? "Tak"
                                            : "Nie"}
                                    </td>
                                    <td>
                                        {funeral.flowers === 1 ? "Tak" : "Nie"}
                                    </td>
                                    <td>
                                        <div
                                            className={styles.tdActionContainer}
                                        >
                                            <Image
                                                className={styles.editBtn}
                                                src={"/pencil-edit.svg"}
                                                width={"20"}
                                                height={"20"}
                                                alt="Edit"
                                                onClick={() => {
                                                    setHide(false);
                                                    setCeremonyId(
                                                        funeral.id_funeral_cards
                                                    );
                                                }}
                                            />

                                            <Image
                                                className={styles.deleteBtn}
                                                src={"/trash.svg"}
                                                width={"20"}
                                                height={"20"}
                                                alt="Delete"
                                                onClick={() =>
                                                    deleteFuneralOrder(
                                                        funeral.id_funeral_cards
                                                    )
                                                }
                                            />
                                        </div>
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
