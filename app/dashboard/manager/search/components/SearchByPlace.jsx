"use client";

import { Input } from "@/app/dashboard/components/Input/Input";
import styles from "./SearchByPlace.module.css";
import { useState } from "react";

export function SearchByPlace() {
    const [place, setPlace] = useState("");
    const [funeralYear, setFuneralYear] = useState("");
    const [searchedData, setSearchedData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!place || !funeralYear) {
            setErrorMessage("Wprowadź miejscowość i rok pogrzebu.");
            return;
        }

        try {
            const response = await fetch(
                `/api/user/search/search-by-place?place=${encodeURIComponent(
                    place
                )}&funeralYear=${encodeURIComponent(funeralYear)}`
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

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear; year >= 2020; year--) {
            years.push(year);
        }
        return years;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p>Według miejscowości</p>
            </div>

            <form className={styles.searchContainer} onSubmit={handleSubmit}>
                <Input
                    label="Miejscowość"
                    placeholder="Np. Lubenia"
                    nameAndId="place"
                    onChange={(e) => setPlace(e.target.value)}
                    value={place}
                />

                <div className={styles.inputContainer}>
                    <label htmlFor="funeralYear">Rok pogrzebu</label>
                    <select
                        id="funeralYear"
                        name="funeralYear"
                        value={funeralYear}
                        onChange={(e) => setFuneralYear(e.target.value)}
                    >
                        <option value="">Rok</option>
                        {generateYearOptions().map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

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
