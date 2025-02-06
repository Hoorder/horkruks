"use client";

import { useEffect, useState } from "react";
import styles from "./FuneralCard.module.css";

export function FuneralCard() {
    const [errorMsg, setErrorMsg] = useState(false);
    const [funeralCardData, setFuneralCardData] = useState([]);

    useEffect(() => {
        const fetchFuneralCard = async () => {
            try {
                const response = await fetch("/api/user/funeral-card");

                if (!response.ok) {
                    const errorData = await response.json();
                    if (response.status === 401) {
                        setErrorMsg(errorData.error);
                        return;
                    } else {
                        throw new Error("Błąd poczas pobierania danych");
                    }
                }

                const funeralCard = await response.json();
                setFuneralCardData(funeralCard);
            } catch (error) {
                console.error("Błąd w trakcie żądania:", error);
            }
        };

        fetchFuneralCard();
    }, []);

    return (
        <>
            {errorMsg ? (
                <div className={styles.sectionTitle}>
                    <p>{errorMsg}</p>
                    <div className="bar"></div>
                </div>
            ) : (
                <>
                    <div className={styles.sectionTitle}>
                        <p>Twoje najbliższe pogrzeby:</p>
                        <div className="bar"></div>
                    </div>

                    <div className={styles.wrapper}>
                        {funeralCardData.map((funeralCard) => (
                            <div
                                className={styles.container}
                                key={funeralCard.id_funeral_cards}
                            >
                                <div className={styles.topBar}>
                                    <div className={styles.leftColumn}>
                                        <p className={styles.localityName}>
                                            {funeralCard.locality}
                                        </p>
                                        <p className={styles.localityDate}>
                                            {funeralCard.funeral_date}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.middleBar}>
                                    <div className={styles.middleLeftColumn}>
                                        <p className={styles.funeralData}>
                                            <span>Kierownik: </span>
                                            {funeralCard.manager}
                                        </p>
                                        <p className={styles.funeralData}>
                                            <span>Obsługa: </span>Siedmio
                                            osobowa
                                        </p>
                                    </div>
                                    <div className={styles.middleRightColumn}>
                                        <p className={styles.funeralData}>
                                            <span>Zbiórka: </span>
                                            {funeralCard.meeting_time}
                                        </p>
                                        <p className={styles.funeralData}>
                                            <span>Wniesienie: </span>
                                            {funeralCard.entrance_time}
                                        </p>
                                        <p className={styles.funeralData}>
                                            <span>Msza Św.: </span>
                                            {funeralCard.funeral_time}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.bottomBar}>
                                    <p>
                                        Ostatni pogrzeb w{" "}
                                        <span>{funeralCard.locality}</span> był
                                        w
                                        <span>
                                            {" "}
                                            {funeralCard.last_funeral_date}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
