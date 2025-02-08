"use client";

import { useEffect, useState } from "react";
import styles from "./FuneralCard.module.css";
import Image from "next/image";
import { Modal } from "../Modal/Modal";

export function FuneralCard() {
    const [errorMsg, setErrorMsg] = useState(false);
    const [funeralCardData, setFuneralCardData] = useState([]);
    const [isSelected, setIsSelected] = useState(false);
    const [isDetailsShown, setIsDetailsShown] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        setIsSelected(false);
        const fetchFuneralCard = async () => {
            try {
                const response = await fetch("/api/manager/funeral-card");

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
        } catch (error) {
            console.error("Błąd podczas aktualizacji:", error);
        }
    };

    const showFuneralDetails = async (funeral_card_id) => {
        setIsDetailsShown((prev) => !prev);
        setSelectedId(funeral_card_id);

        try {
            const response = await fetch("/api/manager/funeral-card/list", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    funeral_card_id,
                }),
            });

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
            {isDetailsShown && selectedId !== null && (
                <Modal
                    selectedId={selectedId}
                    funeralCardData={funeralCardData}
                    setSelectedId={setSelectedId}
                    setIsDetailsShown={setIsDetailsShown}
                />
            )}

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
                                                ? "#d90b0b"
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
                                        <Image
                                            src="/check.svg"
                                            width={30}
                                            height={30}
                                            alt="potwierdz"
                                            className={styles.reactIcon}
                                            onClick={() =>
                                                updateFuneralCard(
                                                    funeralCard.id_funeral_cards,
                                                    1
                                                )
                                            }
                                        />
                                        <Image
                                            src="/exit.svg"
                                            width={30}
                                            height={30}
                                            alt="anuluj"
                                            className={styles.reactIcon}
                                            onClick={() =>
                                                updateFuneralCard(
                                                    funeralCard.id_funeral_cards,
                                                    2
                                                )
                                            }
                                        />
                                        <Image
                                            src="/information_card.svg"
                                            width={30}
                                            height={30}
                                            alt="information"
                                            className={styles.reactIcon}
                                            onClick={() =>
                                                showFuneralDetails(
                                                    funeralCard.id_funeral_cards
                                                )
                                            }
                                        />
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
                                        <p className={styles.funeralData}>
                                            <span>Wieńce: </span>
                                            {funeralCard.flower_notes}
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
