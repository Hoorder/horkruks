"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useFormContext } from "../context/FormContext";
import { Button } from "@/app/dashboard/components/Button/Button";
import { StepBadge } from "../components/StepBadge/StepBadge";
import { useEffect, useState } from "react";
import { sendEmail } from "../lib/email";

export default function Summary() {
    const { state, dispatch, goToStep } = useFormContext();
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

    const [createFuneralCardMessage, setCreateFuneralCardMessage] =
        useState(false);
    const [createInvoiceMessage, setCreateInvoiceMessage] = useState(false);
    const [createEmployeeTasksMessage, setCreateEmployeeTasksMessage] =
        useState(false);
    const [
        createEmployeeEmailSendingMessage,
        setCreateEmployeeEmailSendingMessage,
    ] = useState(false);
    const [createResultMessage, setCreateResultMessage] = useState(false);

    const [addNewFuneralTask, setAddNewFuneralTask] = useState(false);

    useEffect(() => {
        if (state.step < 9) {
            router.push("/dashboard/leader/funeral-configurator");
        }
    }, [state.step, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAddNewFuneralTask(true);

        try {
            const response = await fetch("/api/leader/funeral-configurator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(state),
            });

            if (!response.ok) throw new Error("Błąd podczas zapisu danych.");

            const { id_funeral_cards } = await response.json();
            setCreateFuneralCardMessage(true);

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
            setCreateInvoiceMessage(true);
            if (!otherResponse.ok)
                console.error(`Błąd przy dodawaniu zadań dla zespołu.`);
            setCreateEmployeeTasksMessage(true);

            try {
                const result = await sendEmail(
                    `${state.managerEmail},
                    ${state.mournerOneEmail},
                    ${state.mournerTwoEmail},
                    ${state.mournerThreeEmail},
                    ${state.mournerFourEmail},
                    ${state.mournerFiveEmail},
                    ${state.mournerSixEmail},
                    ${state.mournerSevenEmail}`,
                    state.funeralLocality,
                    state.funeralTime,
                    state.funeralEnteryTime,
                    state.funeralGroupUpTime,
                    state.funeralDate
                );
                console.log("E-mail wysłany pomyślnie:", result);
                setCreateEmployeeEmailSendingMessage(true);
            } catch (error) {
                console.error("Błąd podczas wysyłania e-maila:", error);
            }
        } catch (error) {
            console.error("Błąd:", error);
            alert("Wystąpił błąd podczas wysyłania danych.");
        }
    };

    const handleBack = () => {
        dispatch({ type: "PREV_STEP" });
        goToStep("step-eight");
    };

    const handleExit = () => {
        dispatch({ type: "RESET" });
        goToStep("");
    };

    useEffect(() => {
        if (
            createFuneralCardMessage &&
            createInvoiceMessage &&
            createEmployeeTasksMessage &&
            createEmployeeEmailSendingMessage
        ) {
            setCreateResultMessage(true);
        }
    }, [
        createFuneralCardMessage,
        createInvoiceMessage,
        createEmployeeTasksMessage,
        createEmployeeEmailSendingMessage,
    ]);

    return (
        <>
            <form className={styles.container} onSubmit={handleSubmit}>
                <StepBadge stepNumber={"9"} stepTitle={"Podsumowanie"} />

                <div className={styles.stepName}>
                    <p>Podsumowanie</p>
                </div>

                <div className={styles.progressContainer}>
                    {addNewFuneralTask ? (
                        <>
                            <div className={styles.progressElement}>
                                {createFuneralCardMessage ? (
                                    <p>
                                        ✅ Pomyślnie utworzono kartę pogrzebu.
                                    </p>
                                ) : (
                                    <>
                                        <div className={styles.loader}></div>
                                        <p>Tworzenie Karty Pogrzebu ...</p>
                                    </>
                                )}
                            </div>

                            <div className={styles.progressElement}>
                                {createInvoiceMessage ? (
                                    <p>✅ Pomyślnie zapisano fakturę.</p>
                                ) : (
                                    <>
                                        <div className={styles.loader}></div>
                                        <p>Zapisywanie Faktury ...</p>
                                    </>
                                )}
                            </div>
                            <div className={styles.progressElement}>
                                {createEmployeeTasksMessage ? (
                                    <p>✅ Pomyślnie przypisano pracowników.</p>
                                ) : (
                                    <>
                                        <div className={styles.loader}></div>
                                        <p>Przypisywanie pracowników ...</p>
                                    </>
                                )}
                            </div>
                            <div className={styles.progressElement}>
                                {createEmployeeEmailSendingMessage ? (
                                    <p>✅ Wysłano powiadomienia pracownikom.</p>
                                ) : (
                                    <>
                                        <div className={styles.loader}></div>
                                        <p>
                                            Wysyłanie powiadomień pracownikom...
                                        </p>
                                    </>
                                )}
                            </div>
                            <br />
                            <div className={styles.progressElement}>
                                {createResultMessage ? (
                                    <>
                                        <p>✅ Zakończono wszystkie etapy.</p>
                                        <div
                                            className={`${styles.inputContainer} ${styles.button}`}
                                        >
                                            <Button
                                                type="button"
                                                onClick={handleExit}
                                            >
                                                Zakończ
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.loader}></div>
                                        <p>Finalizacja ...</p>
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.progressElement}>
                                <p>
                                    ✅ Wszystkie dane zostały poprawnie
                                    wprowadzone.
                                </p>
                            </div>
                            <div className={styles.progressElement}>
                                <p>🔷 W celu finalizacji dodaj zlecenie.</p>
                            </div>
                        </>
                    )}
                </div>

                <div className={`${styles.inputContainer} ${styles.button}`}>
                    {!addNewFuneralTask && (
                        <>
                            <Button
                                type="button"
                                onClick={handleBack}
                                background="transparent"
                                color="black"
                            >
                                Wstecz
                            </Button>
                            <Button type="submit">Dodaj zlecenie</Button>
                        </>
                    )}
                </div>
            </form>
        </>
    );
}
