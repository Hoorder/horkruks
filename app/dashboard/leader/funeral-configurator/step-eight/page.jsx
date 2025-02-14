"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "../context/FormContext";
import { Button } from "@/app/dashboard/components/Button/Button";
import Image from "next/image";
import { StepBadge } from "../components/StepBadge/StepBadge";

export default function StepEight() {
    const { state, dispatch } = useFormContext();
    const router = useRouter();

    const invoiceName = state.invoiceName;

    //TODO: Po stworzeniu faktury powinna ona dodać się do bazy
    //TODO: Po dodaniu pogrzebu powinny się dodać do bazy wszystkim żałobnikom którzy są !null dodać po jednym funeral tasks

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/leader/funeral-configurator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(state),
            });

            if (response.ok) {
                alert("Dane wysłane pomyślnie!");
                dispatch({ type: "RESET" });
                router.push("/dashboard/leader/funeral-configurator");
            } else {
                alert("Coś poszło nie tak, spróbuj ponownie.");
            }
        } catch (error) {
            console.error("Błąd wysyłania danych:", error);
            alert("Błąd serwera.");
        }
    };

    const handleBack = () => {
        dispatch({ type: "PREV_STEP" });
        router.push("/dashboard/leader/funeral-configurator/step-seven");
    };

    return (
        <>
            <form className={styles.container} onSubmit={handleSubmit}>
                <StepBadge stepNumber={"8"} stepTitle={"Faktura"} />

                <div className={styles.stepName}>
                    <p>Faktura</p>
                </div>

                <div className={styles.tableWrapper}>
                    <div className={styles.column}>
                        <p>Numer FV</p>
                        <p>Kwota</p>
                    </div>

                    <div className={styles.column}>
                        <p className={styles.services}>{invoiceName}</p>
                        <div className={styles.services}>
                            <div>
                                <a
                                    href={`/invoices/${invoiceName}`}
                                    download={invoiceName}
                                >
                                    <Image
                                        src={"/download.svg"}
                                        width={25}
                                        height={25}
                                        alt="donwload"
                                    />
                                </a>

                                <a
                                    href={`/invoices/${invoiceName}`}
                                    target="_blank"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const newWindow = window.open(
                                            `/invoices/${invoiceName}`,
                                            "_blank"
                                        );
                                        newWindow.onload = () =>
                                            newWindow.print();
                                    }}
                                >
                                    <Image
                                        src={"/printer.svg"}
                                        width={25}
                                        height={25}
                                        alt="donwload"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.inputContainer} ${styles.button}`}>
                    <Button
                        type="button"
                        onClick={handleBack}
                        background="transparent"
                        color="black"
                    >
                        Wstecz
                    </Button>
                    <Button type="submit">Zakończ</Button>
                </div>
            </form>
        </>
    );
}
