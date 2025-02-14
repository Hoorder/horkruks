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
    const invoicePath = `/${invoiceName}`;
    const bodyBox = state.coffinPrice || state.urnPrice;
    const funeralService = state.funeralService;
    const funeralTransport = state.bodyTransportPrice;
    const funeralBodyPrep = state.bodyPreparyPrice;
    const funeralCross = state.crossPrice;
    const musicalArrangement = state.musicalarrangementPrice;
    const funeralFlowers = state.flowersPrice;
    const insurance =
        state.insuranceAtZUS !== null || state.insuranceAtKRUS !== null
            ? 4000
            : 0;
    const totalAmount = state.totalAmount;

    //FIXME: Nie działa przypisywanie insurance

    //TODO: Po dodaniu pogrzebu powinny się dodać do bazy wszystkim żałobnikom którzy są !null dodać po jednym funeral tasks

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // 1. Wysyłanie danych do funeral_cards
    //         const response = await fetch("/api/leader/funeral-configurator", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(state),
    //         });

    //         if (!response.ok) throw new Error("Błąd podczas zapisu danych.");

    //         const { id_funeral_cards } = await response.json();
    //         alert(`Dane wysłane pomyślnie! ID wpisu: ${id_funeral_cards}`);

    //         // 2. Tworzenie faktury
    //         const invoiceResponse = await fetch("/api/leader/funeral-configurator/add-invoice", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 invoiceName,
    //                 invoicePath,
    //                 id_funeral_cards,
    //                 bodyBox,
    //                 funeralService,
    //                 funeralTransport,
    //                 funeralBodyPrep,
    //                 funeralCross,
    //                 musicalArrangement,
    //                 funeralFlowers,
    //                 insurance,
    //                 totalAmount
    //             }),
    //         });

    //         if (!invoiceResponse.ok) {
    //             console.error("Błąd przy tworzeniu faktury.");
    //         } else {
    //             const invoiceData = await invoiceResponse.json();
    //             console.log("Faktura:", invoiceData);
    //             console.log("Faktura:", state.insuranceAtZUS);
    //             console.log("Faktura:", state.insuranceAtKRUS);
    //         }

    //         // dispatch({ type: "RESET" });
    //         // router.push(
    //         //     `/dashboard/leader/funeral-configurator?id=${id_funeral_cards}`
    //         // );
    //     } catch (error) {
    //         console.error("Błąd:", error);
    //         alert("Wystąpił błąd podczas wysyłania danych.");
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/leader/funeral-configurator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(state),
            });

            if (!response.ok) throw new Error("Błąd podczas zapisu danych.");

            const { id_funeral_cards } = await response.json();
            alert(`Dane wysłane pomyślnie!`);

            const invoiceRequest = fetch(
                "/api/leader/funeral-configurator/add-invoice",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        invoiceName,
                        invoicePath,
                        id_funeral_cards,
                        bodyBox,
                        funeralService,
                        funeralTransport,
                        funeralBodyPrep,
                        funeralCross,
                        musicalArrangement,
                        funeralFlowers,
                        insurance,
                        totalAmount,
                    }),
                }
            );

            const otherEntryRequest = fetch(
                "/api/leader/funeral-configurator/add-employee-task",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id_funeral_cards,
                        manager: state.manager,
                        mournerOne: state.mournerOne,
                        mournerTwo: state.mournerTwo,
                        mournerThree: state.mournerThree,
                        mournerFour: state.mournerFour,
                        mournerFive: state.mournerFive,
                        mournerSix: state.mournerSix,
                        mournerSeven: state.mournerSeven,
                        funeralLocality: state.funeralLocality,
                    }),
                }
            );

            const [invoiceResponse, otherResponse] = await Promise.all([
                invoiceRequest,
                otherEntryRequest,
            ]);

            if (!invoiceResponse.ok)
                console.error("Błąd przy tworzeniu faktury.");
            if (!otherResponse.ok)
                console.error("Błąd przy tworzeniu innego wpisu.");

            const invoiceData = invoiceResponse.ok
                ? await invoiceResponse.json()
                : null;
            const otherData = otherResponse.ok
                ? await otherResponse.json()
                : null;
            //TODO: Dodać powiadomienie o pomyślnym dodaniu
            dispatch({ type: "RESET" });
            router.push(
                `/dashboard/leader/funeral-configurator?id=${id_funeral_cards}`
            );
        } catch (error) {
            console.error("Błąd:", error);
            alert("Wystąpił błąd podczas wysyłania danych.");
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch("/api/leader/funeral-configurator", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(state),
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             const id_funeral_cards = data.id_funeral_cards;

    //             alert(`Dane wysłane pomyślnie! ID wpisu: ${id_funeral_cards}`);
    //             dispatch({ type: "RESET" });

    //             router.push(
    //                 `/dashboard/leader/funeral-configurator?id=${id_funeral_cards}`
    //             );
    //         } else {
    //             alert("Coś poszło nie tak, spróbuj ponownie.");
    //         }
    //     } catch (error) {
    //         console.error("Błąd wysyłania danych:", error);
    //         alert("Błąd serwera.");
    //     }
    // };

    const handleBack = () => {
        dispatch({ type: "PREV_STEP" });
        router.push("/dashboard/leader/funeral-configurator/step-seven");
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
                        <Button type="submit">Zakończ</Button>
                    </div>
                </form>
            )}
        </>
    );
}
