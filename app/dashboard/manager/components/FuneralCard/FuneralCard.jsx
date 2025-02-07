"use client";

import { useEffect, useState } from "react";
import styles from "./FuneralCard.module.css";
import Image from "next/image";

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

            // alert("Dane pogrzebu zostały zaktualizowane!");
            //TODO: Dodac obsluge
        } catch (error) {
            console.error("Błąd podczas aktualizacji:", error);
        }
    };

    const showFuneralDetails = (funeral_card_id) => {
        setIsDetailsShown((prev) => !prev);
        setSelectedId(funeral_card_id);
    };

    return (
        <>
            {isDetailsShown && selectedId !== null && (
                <div
                    className={styles.detailsWrapper}
                    onClick={() => {
                        setIsDetailsShown(false);
                        setSelectedId(null);
                    }}
                >
                    {funeralCardData
                        .filter(
                            (funeralCard) =>
                                funeralCard.id_funeral_cards === selectedId
                        )
                        .map((funeralCard) => (
                            <div
                                key={funeralCard.id_funeral_cards}
                                className={styles.detailsContainer}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className={styles.detailHeader}>
                                    <div className={styles.leftColumn}>
                                        <p className={styles.localityName}>
                                            {funeralCard.locality}
                                        </p>
                                        <p className={styles.localityDate}>
                                            {funeralCard.funeral_date}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.detailBody}>
                                    <div className={styles.detailCard}>
                                        <div
                                            className={`${styles.sectionTitle} ${styles.detailTitle}`}
                                        >
                                            <p>Podstawowe informacjie:</p>
                                            <div className="bar"></div>
                                        </div>
                                        <p>
                                            Zbiórka:{" "}
                                            <span>
                                                {funeralCard.meeting_time}
                                            </span>
                                        </p>
                                        <p>
                                            Wniesienie:{" "}
                                            <span>
                                                {funeralCard.entrance_time}
                                            </span>
                                        </p>
                                        <p>
                                            Msza Św.:{" "}
                                            <span>
                                                {funeralCard.funeral_time}
                                            </span>
                                        </p>
                                    </div>

                                    <div className={styles.detailCard}>
                                        <div
                                            className={`${styles.sectionTitle} ${styles.detailTitle}`}
                                        >
                                            <p>Dodatkowe informacjie:</p>
                                            <div className="bar"></div>
                                        </div>
                                        <p>
                                            Oprawa muzyczna:{" "}
                                            <span>
                                                {funeralCard.musical_arrangement ===
                                                1
                                                    ? "Tak"
                                                    : "Nie"}
                                            </span>
                                        </p>
                                        <p>
                                            Notatki do oprawy:{" "}
                                            <span>
                                                {funeralCard.musical_notest}
                                            </span>
                                        </p>
                                        <p>
                                            Namiot:{" "}
                                            <span>
                                                {funeralCard.tent === 1
                                                    ? "Tak"
                                                    : "Nie"}
                                            </span>
                                        </p>
                                        <p>
                                            Krzyż:{" "}
                                            <span>
                                                {funeralCard.funeral_cross === 1
                                                    ? "Tak"
                                                    : "Nie"}
                                            </span>
                                        </p>
                                        <p>
                                            Wieńce:{" "}
                                            <span>
                                                {funeralCard.flowers === 1
                                                    ? "Tak"
                                                    : "Nie"}{" "}
                                                {funeralCard.flower_notes}
                                            </span>
                                        </p>
                                    </div>

                                    <div className={styles.detailCard}>
                                        <div
                                            className={`${styles.sectionTitle} ${styles.detailTitle}`}
                                        >
                                            <p>Obsługa:</p>
                                            <div className="bar"></div>
                                        </div>
                                        <p>
                                            Żałobnik 1:{" "}
                                            <span>
                                                {funeralCard.mourner_one}
                                            </span>
                                        </p>
                                        <p>
                                            Żałobnik 2:{" "}
                                            <span>
                                                {funeralCard.mourner_two}
                                            </span>
                                        </p>
                                        <p>
                                            Żałobnik 3:{" "}
                                            <span>
                                                {funeralCard.mourner_three}
                                            </span>
                                        </p>
                                        <p>
                                            Żałobnik 4:{" "}
                                            <span>
                                                {funeralCard.mourner_four}
                                            </span>
                                        </p>
                                        <p>
                                            Żałobnik 5:{" "}
                                            <span>
                                                {funeralCard.mourner_five}
                                            </span>
                                        </p>
                                        <p>
                                            Żałobnik 6:{" "}
                                            <span>
                                                {funeralCard.mourner_six}
                                            </span>
                                        </p>
                                        <p>
                                            Żałobnik 7:{" "}
                                            <span>
                                                {funeralCard.mourner_seven}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
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
