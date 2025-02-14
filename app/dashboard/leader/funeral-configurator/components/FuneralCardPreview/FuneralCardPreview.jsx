"use client";

import { useRouter } from "next/navigation";
import styles from "./FuneralCardPreview.module.css";
import { useFormContext } from "../../context/FormContext";

export function FuneralCardPreview() {
    const { state, dispatch } = useFormContext();
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p>
                    {state.deceasedName?.trim()
                        ? state.deceasedName
                        : "--------"}{" "}
                    {state.deceasedSurname?.trim()
                        ? state.deceasedSurname
                        : "--------"}
                </p>
            </div>

            <div className={styles.body}>
                <div className={styles.category}>
                    <p className={styles.categoryName}>1. Dane osoby zmarłej</p>
                    <p className={styles.categoryData}>
                        <span>Data narodzin: </span>
                        {state.deceasedBirthDate?.trim()
                            ? state.deceasedBirthDate
                            : "--------"}
                    </p>
                    <p className={styles.categoryData}>
                        <span>Data śmierci: </span>
                        {state.deceasedDeathDate?.trim()
                            ? state.deceasedDeathDate
                            : "--------"}
                    </p>
                    <p className={styles.categoryData}>
                        <span>PESEL: </span>
                        {state.deceasedPesel?.trim()
                            ? state.deceasedPesel
                            : "--------"}
                    </p>
                </div>

                <div className={styles.category}>
                    <p className={styles.categoryName}>2. Dane zleceniodawcy</p>
                    <p className={styles.categoryData}>
                        <span>Imię i nazwisko: </span>
                        {state.orderingName?.trim()
                            ? state.orderingName
                            : "--------"}{" "}
                        {state.orderingSurname?.trim()
                            ? state.orderingSurname
                            : "--------"}
                    </p>
                    <p className={styles.categoryData}>
                        <span>Numer telefonu: </span>
                        {state.orderingPhoneNumber?.trim()
                            ? state.orderingPhoneNumber
                            : "--------"}
                    </p>
                    <p className={styles.categoryData}>
                        <span>Ulica / Nr domu: </span>
                        {state.orderingCity?.trim()
                            ? state.orderingCity
                            : "--------"}{" "}
                        /{" "}
                        {state.orderingHouseNumber?.trim()
                            ? state.orderingHouseNumber
                            : "--------"}
                    </p>
                    <p className={styles.categoryData}>
                        <span>Kod / Miejscowość: </span>
                        {state.orderingPostCode?.trim()
                            ? state.orderingPostCode
                            : "--------"}{" "}
                        /{" "}
                        {state.orderingLocality?.trim()
                            ? state.orderingLocality
                            : "--------"}
                    </p>
                </div>

                <div className={styles.category}>
                    <p className={styles.categoryName}>
                        3. Ceremonia pogrzebowa
                    </p>
                    <p className={styles.categoryData}>
                        <span>Data pogrzebu: </span>
                        {state.funeralDate?.trim()
                            ? state.funeralDate
                            : "--------"}
                    </p>
                    <p className={styles.categoryData}>
                        <span>Miejsce pogrzebu: </span>
                        {state.funeralLocality?.trim()
                            ? state.funeralLocality
                            : "--------"}
                    </p>
                    <p className={styles.categoryData}>
                        <span>Godzina pogrzebu: </span>
                        {state.funeralTime?.trim()
                            ? state.funeralTime
                            : "--------"}
                    </p>
                    <p className={styles.categoryData}>
                        <span>Wieńce: </span>
                        {Number(state.funeralFlowers) === 1
                            ? `Tak, ${
                                  state.funeralFlowersNote?.trim()
                                      ? state.funeralFlowersNote
                                      : "--------"
                              }`
                            : "Nie"}
                    </p>

                    {Number(state.burialInAnUrn) === 1 && (
                        <p className={styles.categoryData}>Pochówek w urnie</p>
                    )}
                    {Number(state.burialInACoffin) === 1 && (
                        <p className={styles.categoryData}>
                            <span>Pochówek w trumnie</span>
                        </p>
                    )}
                </div>

                <div className={styles.category}>
                    <p className={styles.categoryName}>
                        4. Dodatkowe informacje
                    </p>

                    <p className={styles.categoryData}>
                        <span>Transport:</span>{" "}
                        {Number(state.transport) === 1 ? " Tak" : " Nie"}
                    </p>

                    <p className={styles.categoryData}>
                        <span>Przygotowanie zwłok:</span>{" "}
                        {Number(state.bodyPrepary) === 1 ? " Tak" : " Nie"}
                    </p>

                    <p className={styles.categoryData}>
                        <span>Namiot:</span>{" "}
                        {Number(state.tent) === 1 ? " Tak" : " Nie"}
                    </p>

                    <p className={styles.categoryData}>
                        <span>Krzyż z tabliczką:</span>{" "}
                        {Number(state.cross) === 1 ? " Tak" : " Nie"}
                    </p>

                    <p className={styles.categoryData}>
                        <span>Oprawa muzyczna:</span>{" "}
                        {Number(state.musicalArrangement) === 1
                            ? ` Tak ${
                                  state.musicalArrangementNote?.trim()
                                      ? state.musicalArrangementNote
                                      : "--------"
                              }`
                            : " Nie"}
                    </p>

                    <p>{state.manager}</p>
                    <p>{state.mournerOne}</p>
                    <p>{state.mournerTwo}</p>
                    <p>{state.mournerThree}</p>
                    <p>{state.mournerFour}</p>
                    <p>{state.mournerFive}</p>
                    <p>{state.mournerSix}</p>
                    <p>{state.mournerSeven}</p>
                </div>
            </div>
        </div>
    );
}
