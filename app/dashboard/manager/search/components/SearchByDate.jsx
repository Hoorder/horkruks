"use client";

import { Input } from "@/app/dashboard/components/Input/Input";
import styles from "./SearchByDate.module.css";
import { useState } from "react";

export function SearchByDate() {
    const [startData, setStartData] = useState("");
    const [endData, setEndData] = useState("");
    const [searchedData, setSearchedData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!startData || !endData) {
            setErrorMessage("Wprowadź zarówno datę początkową, jak i końcową.");
            return;
        }

        if (startData > endData) {
            setErrorMessage("Data początkowa nie może być więszka");
            return;
        }

        try {
            const response = await fetch(
                `/api/user/search/search-by-date?startDate=${encodeURIComponent(
                    startData
                )}&endDate=${encodeURIComponent(endData)}`
            );

            if (!response.ok) {
                throw new Error("Błąd podczas pobierania danych");
            }

            const searchData = await response.json();

            if (searchData.error) {
                setErrorMessage(searchData.error);
                setSearchedData([]);
            } else {
                setSearchedData(searchData);
                setErrorMessage("");
            }
        } catch (error) {
            setErrorMessage("Wystąpił błąd podczas wyszukiwania.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p>Według daty</p>
            </div>

            <form className={styles.searchContainer} onSubmit={handleSubmit}>
                <Input
                    label="Data początkowa"
                    type="date"
                    nameAndId="startDate"
                    onChange={(e) => setStartData(e.target.value)}
                    value={startData}
                />
                <Input
                    label="Data końcowa"
                    type="date"
                    nameAndId="endDate"
                    onChange={(e) => setEndData(e.target.value)}
                    value={endData}
                />
                <button type="submit">Szukaj</button>
            </form>

            {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nr.</th>
                            <th>Miejscowość</th>
                            <th>Data pogrzebu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchedData.length > 0 &&
                            searchedData.map((data) => (
                                <tr key={data.result_number}>
                                    <td>{data.result_number}</td>
                                    <td>{data.funeral_ceremony_place}</td>
                                    <td>{data.task_date}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
