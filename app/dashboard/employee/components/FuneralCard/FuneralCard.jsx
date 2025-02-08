"use client";

import { useEffect, useState } from "react";
import styles from "./FuneralCard.module.css";

export function FuneralCard() {
    const [errorMsg, setErrorMsg] = useState(false);
    const [funeralCardData, setFuneralCardData] = useState([]);
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setIsSelected(false);
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
    }, [isSelected]);

    const updateFuneralCard = async (funeral_card_id, confirmation) => {
        try {
            const response = await fetch("/api/user/funeral-card", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    funeral_card_id,
                    confirmation,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Błąd aktualizacji danych");
            }

            setIsSelected(true);

            // alert("Dane pogrzebu zostały zaktualizowane!");
            //TODO: Dodac obsluge
        } catch (error) {
            console.error("Błąd podczas aktualizacji:", error);
        }
    };

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
                                <div
                                    className={styles.topBar}
                                    style={{
                                        backgroundColor:
                                            funeralCard.confirmation === 0
                                                ? "#171717"
                                                : funeralCard.confirmation === 1
                                                ? "#33660e"
                                                : funeralCard.confirmation === 2
                                                ? "#b41010"
                                                : "gray",
                                    }}
                                >
                                    <div className={styles.leftColumn}>
                                        <p className={styles.localityName}>
                                            {funeralCard.locality}
                                        </p>
                                        <p className={styles.localityDate}>
                                            {funeralCard.funeral_date}
                                        </p>
                                    </div>

                                    <div className={styles.rightColumn}>
                                        <button
                                            className={styles.acceptBtn}
                                            onClick={() =>
                                                updateFuneralCard(
                                                    funeralCard.id_funeral_cards,
                                                    1
                                                )
                                            }
                                        >
                                            {funeralCard.confirmation === 1 ? (
                                                <p>Potwierdzono</p>
                                            ) : (
                                                <p>Potwierdź</p>
                                            )}
                                        </button>
                                        <button
                                            className={styles.rejectBtn}
                                            onClick={() =>
                                                updateFuneralCard(
                                                    funeralCard.id_funeral_cards,
                                                    2
                                                )
                                            }
                                        >
                                            {funeralCard.confirmation === 2 ? (
                                                <p>Odrzucono</p>
                                            ) : (
                                                <p>Odrzuć</p>
                                            )}
                                        </button>
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
