"use client";

import Link from "next/link";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import styles from "./page.module.css";

export default function StepThree() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.stepName}>
                    <p>Informacje o ceremonii</p>
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Miejscowość"}
                        nameAndId={"funeral-locality"}
                        placeholder={"Np. Lubenia"}
                    />
                    <Input
                        label={"Data pogrzebu"}
                        type="date"
                        nameAndId={"funeral-date"}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Godzina pogrzebu"}
                        type="time"
                        nameAndId={"funeral-time"}
                    />
                    <Input
                        label={"Godzina wniesienia"}
                        type="time"
                        nameAndId={"entery-time"}
                    />
                    <Input
                        label={"Godzina zbiórki"}
                        type="time"
                        nameAndId={"group-up-time"}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.options}>
                        <p>Kwiaty?</p>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="yes"
                                    name="safecare"
                                    value="1"
                                />
                                <label htmlFor="yes">Tak</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="no"
                                    name="safecare"
                                    value="1"
                                />
                                <label htmlFor="no">Nie</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Uwagi"}
                        type="text"
                        width="250px"
                        nameAndId={"notes-for-flowers"}
                        placeholder={"Skąd odebrać, napisy"}
                    />
                </div>

                <div className={`${styles.inputContainer} ${styles.button}`}>
                    <Link
                        href={
                            "/dashboard/leader/funeral-configurator/step-four"
                        }
                    >
                        <Button>Dalej</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
