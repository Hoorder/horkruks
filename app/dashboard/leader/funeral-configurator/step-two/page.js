"use client";

import Link from "next/link";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import styles from "./page.module.css";

export default function StepTwo() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.stepName}>
                    <p>Dane zleceniodawcy</p>
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Imię / Imiona"}
                        nameAndId={"name-ordering-person"}
                        placeholder={"Np. Anna"}
                    />
                    <Input
                        label={"Nazwisko"}
                        nameAndId={"surname-ordering-person"}
                        placeholder={"Np. Kowalska"}
                    />
                    <Input
                        label={"Numer telefonu"}
                        nameAndId={"phone-number-ordering-person"}
                        placeholder={"Np. 04928394032"}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Miasto"}
                        nameAndId={"city-ordering-person"}
                        placeholder={"Np. Zdziarski"}
                    />
                    <Input
                        label={"Numer domu"}
                        nameAndId={"house-number-ordering-person"}
                        placeholder={"Np. 144"}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Kod pocztowy"}
                        nameAndId={"post-code-ordering-person"}
                        placeholder={"Np. 12-345"}
                    />
                    <Input
                        label={"Miejscowość"}
                        nameAndId={"locality-ordering-person"}
                        placeholder={"Np. Borek"}
                    />
                </div>

                <div className={`${styles.inputContainer} ${styles.button}`}>
                    <Link
                        href={
                            "/dashboard/leader/funeral-configurator/step-three"
                        }
                    >
                        <Button>Dalej</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
