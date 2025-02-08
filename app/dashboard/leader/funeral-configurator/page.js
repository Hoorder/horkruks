"use client";

import Link from "next/link";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import styles from "./page.module.css";

export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.stepName}>
                    <p>Dane osoby zmarłej</p>
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Imię / Imiona"}
                        nameAndId={"name-death-person"}
                        placeholder={"Np. Konrad"}
                    />
                    <Input
                        label={"Nazwisko"}
                        nameAndId={"surname-death-person"}
                        placeholder={"Np. Zdziarski"}
                    />
                    <Input
                        label={"Pesel"}
                        nameAndId={"pesel-death-person"}
                        placeholder={"Np. 04928394032"}
                    />
                    <Input
                        label={"Data urodzenia"}
                        type="date"
                        nameAndId={"start-date-death-person"}
                    />
                    <Input
                        label={"Data śmierci"}
                        type="date"
                        nameAndId={"end-date-death-person"}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.options}>
                        <p>Czy osoba zmarła była ubezpieczona?</p>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="no"
                                    name="safecare"
                                    value="1"
                                />
                                <label htmlFor="no">NIE</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="zus"
                                    name="safecare"
                                    value="1"
                                />
                                <label htmlFor="zus">ZUS</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="krs"
                                    name="safecare"
                                    value="1"
                                />
                                <label htmlFor="krs">KRUS</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.inputContainer} ${styles.button}`}>
                    <Link
                        href={"/dashboard/leader/funeral-configurator/step-two"}
                    >
                        <Button>Dalej</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
