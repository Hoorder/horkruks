import { ProgressBar } from "../ProgressBar/ProgressBar";
import styles from "./Modal.module.css";

export function Modal({
    selectedId,
    funeralCardData,
    setSelectedId,
    setIsDetailsShown,
}) {
    return (
        <>
            <div
                className={styles.wrapper}
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
                            className={styles.container}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.header}>
                                <p>{funeralCard.locality}</p>
                                <p>{funeralCard.funeral_date}</p>
                            </div>
                            <ProgressBar selectedId={selectedId} />
                            <div className={styles.body}>
                                <div className={styles.funeralDetails}>
                                    <p>
                                        Zbiórka:{" "}
                                        <span>{funeralCard.meeting_time}</span>
                                    </p>
                                    <p>
                                        Wniesienie:{" "}
                                        <span>{funeralCard.entrance_time}</span>
                                    </p>
                                    <p>
                                        Zbiórka:{" "}
                                        <span>{funeralCard.funeral_time}</span>
                                    </p>
                                </div>
                                <div className={styles.funeralDetails}>
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
                                        Oprawa muzyczna:{" "}
                                        <span>
                                            {funeralCard.musical_arrangement ===
                                            1
                                                ? "Tak"
                                                : "Nie"}
                                        </span>
                                    </p>
                                </div>
                                <div className={styles.funeralDetails}>
                                    <p>
                                        Wieńce:{" "}
                                        <span>
                                            {funeralCard.flowers === 1
                                                ? "Tak"
                                                : "Nie"}
                                        </span>
                                    </p>
                                    <p>
                                        Szczegóły:{" "}
                                        <span>{funeralCard.flower_notes}</span>
                                    </p>
                                </div>
                                <div className={styles.funeralDetails}>
                                    <p>
                                        1:{" "}
                                        <span>{funeralCard.mourner_one}</span>
                                    </p>
                                    <p>
                                        2:{" "}
                                        <span>{funeralCard.mourner_two}</span>
                                    </p>
                                    <p>
                                        3:{" "}
                                        <span>{funeralCard.mourner_three}</span>
                                    </p>
                                    <p>
                                        4:{" "}
                                        <span>{funeralCard.mourner_four}</span>
                                    </p>
                                    <p>
                                        5:{" "}
                                        <span>{funeralCard.mourner_five}</span>
                                    </p>
                                    <p>
                                        6:{" "}
                                        <span>{funeralCard.mourner_six}</span>
                                    </p>
                                    <p>
                                        7:{" "}
                                        <span>{funeralCard.mourner_seven}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}
