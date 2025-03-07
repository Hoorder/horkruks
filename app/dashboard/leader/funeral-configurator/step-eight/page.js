"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useFormContext } from "../context/FormContext";
import { Button } from "@/app/dashboard/components/Button/Button";
import Image from "next/image";
import { StepBadge } from "../components/StepBadge/StepBadge";
import { useEffect } from "react";

export default function StepEight() {
    const { state, dispatch, goToStep } = useFormContext();
    const router = useRouter();

    const invoiceName = state.invoiceName;

    useEffect(() => {
        if (state.step < 8) {
            router.push("/dashboard/leader/funeral-configurator");
        }
    }, [state.step, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({ type: "NEXT_STEP" });
        goToStep("summary");
    };

    const handleBack = () => {
        dispatch({ type: "PREV_STEP" });
        goToStep("step-seven");
    };

    return (
        <>
            {invoiceName && (
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

                    <div
                        className={`${styles.inputContainer} ${styles.button}`}
                    >
                        <Button
                            type="button"
                            onClick={handleBack}
                            background="transparent"
                            color="black"
                        >
                            Wstecz
                        </Button>
                        <Button type="submit">Dalej</Button>
                    </div>
                </form>
            )}
        </>
    );
}
