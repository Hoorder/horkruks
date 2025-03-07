"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "../context/FormContext";
import { Button } from "@/app/dashboard/components/Button/Button";
import { StepBadge } from "../components/StepBadge/StepBadge";

export default function StepSeven() {
    const { state, dispatch, goToStep  } = useFormContext();
    const router = useRouter();

    const nameAndSurnameOrderingPerson = `${state.orderingName} ${state.orderingSurname}`;
    const cityAndHouseNumberOrderingPerson = `${state.orderingCity} ${state.orderingHouseNumber}`;
    const postCodeAndLocalityOrderingPerson = `${state.orderingPostCode} ${state.orderingLocality}`;

    const coffin = Number(state.burialInACoffin);
    const urn = Number(state.burialInAnUrn);
    const bodyTransport = Number(state.transport);
    const bodyPrepary = Number(state.bodyPrepary);
    const cross = Number(state.cross);
    const musicalarrangement = Number(state.musicalarrangement);
    const flowers = Number(state.funeralFlowers);
    const insurance =
        Number(state.insuranceAtZUS) || Number(state.insuranceAtKRUS);

    const [coffinPrice, setCoffinPrice] = useState(state.coffinPrice);
    const [urnPrice, setUrnPrice] = useState(state.urnPrice);
    const [funeralService, setFuneralService] = useState(state.funeralService);
    const [bodyTransportPrice, setBodyTransportPrice] = useState(
        state.bodyTransportPrice
    );
    const [bodyPreparyPrice, setBodyPreparyPrice] = useState(
        state.bodyPreparyPrice
    );
    const [crossPrice, setCrossPrice] = useState(state.crossPrice);
    const [musicalarrangementPrice, setMusicalarrangementPrice] = useState(
        state.musicalarrangementPrice
    );
    const [flowersPrice, setFlowersPrice] = useState(state.flowersPrice);

    const [totalCeremonyCost, setTotalCeremonyCost] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const [invoiceName, setInvoiceName] = useState("");

    useEffect(() => {
        if (state.step < 7) {
            router.push("/dashboard/leader/funeral-configurator");
        }
    }, [state.step, router]);

    const updateSummary = () => {
        const summary =
            Number(coffinPrice) +
            Number(urnPrice) +
            Number(funeralService) +
            Number(bodyTransportPrice) +
            Number(bodyPreparyPrice) +
            Number(crossPrice) +
            Number(musicalarrangementPrice) +
            Number(flowersPrice);

        setTotalCeremonyCost(summary);
        setTotalAmount(summary - (insurance === 1 ? 4000 : 0));
    };

    useEffect(() => {
        updateSummary();
    }, [
        coffinPrice,
        urnPrice,
        funeralService,
        bodyTransportPrice,
        bodyPreparyPrice,
        crossPrice,
        musicalarrangementPrice,
        flowersPrice,
        insurance,
    ]);

    const generateInvoice = async () => {
        try {
            const response = await fetch("/api/generate-invoice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    totalAmount,
                    coffinPrice,
                    urnPrice,
                    funeralService,
                    bodyTransportPrice,
                    bodyPreparyPrice,
                    crossPrice,
                    musicalarrangementPrice,
                    flowersPrice,
                    insurance,
                    nameAndSurnameOrderingPerson,
                    cityAndHouseNumberOrderingPerson,
                    postCodeAndLocalityOrderingPerson,
                }),
            });

            const data = await response.json();
            if (data.success) {
                console.log("Faktura wygenerowana:", data.invoiceName);
                setInvoiceName(data.invoiceName);
                dispatch({
                    type: "SET_FIELD",
                    field: "invoiceName",
                    value: data.invoiceName,
                });
            } else {
                console.error("Błąd generowania faktury:", data.error);
            }
        } catch (error) {
            console.error("Błąd serwera:", error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        await generateInvoice();

        dispatch({
            type: "SET_FIELD",
            field: "coffinPrice",
            value: coffinPrice,
        });
        dispatch({
            type: "SET_FIELD",
            field: "urnPrice",
            value: urnPrice,
        });
        dispatch({
            type: "SET_FIELD",
            field: "funeralService",
            value: funeralService,
        });
        dispatch({
            type: "SET_FIELD",
            field: "bodyTransportPrice",
            value: bodyTransportPrice,
        });
        dispatch({
            type: "SET_FIELD",
            field: "bodyPreparyPrice",
            value: bodyPreparyPrice,
        });
        dispatch({
            type: "SET_FIELD",
            field: "crossPrice",
            value: crossPrice,
        });
        dispatch({
            type: "SET_FIELD",
            field: "musicalarrangementPrice",
            value: musicalarrangementPrice,
        });
        dispatch({
            type: "SET_FIELD",
            field: "flowersPrice",
            value: flowersPrice,
        });
        dispatch({
            type: "SET_FIELD",
            field: "totalCeremonyCost",
            value: totalCeremonyCost,
        });
        dispatch({
            type: "SET_FIELD",
            field: "totalAmount",
            value: totalAmount,
        });

        dispatch({ type: "NEXT_STEP" });
        goToStep("step-eight");
    };

    const handleBack = () => {
        dispatch({ type: "PREV_STEP" });
        goToStep("step-six");
    };

    return (
        <>
            <form className={styles.container} onSubmit={onSubmit}>
                <StepBadge stepNumber={"7"} stepTitle={"Kosztorys"} />

                <div className={styles.stepName}>
                    <p>Wycena usługi</p>
                </div>

                <div className={styles.tableWrapper}>
                    <div className={styles.column}>
                        <p>Usługa</p>
                        <p>Kwota</p>
                    </div>

                    {coffin === 1 && (
                        <div className={styles.column}>
                            <p className={styles.services}>Trumna</p>
                            <div>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={coffinPrice}
                                    className={styles.servicesPriceInput}
                                    onChange={(e) =>
                                        setCoffinPrice(e.target.value)
                                    }
                                />
                                <span>PLN</span>
                            </div>
                        </div>
                    )}

                    {urn === 1 && (
                        <div className={styles.column}>
                            <p className={styles.services}>Urna</p>
                            <div>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={urnPrice}
                                    className={styles.servicesPriceInput}
                                    onChange={(e) =>
                                        setUrnPrice(e.target.value)
                                    }
                                />
                                <span>PLN</span>
                            </div>
                        </div>
                    )}

                    <div className={styles.column}>
                        <p className={styles.services}>Obsługa pogrzebu</p>
                        <div>
                            <input
                                type="number"
                                min="0"
                                step="0.1"
                                value={funeralService}
                                className={styles.servicesPriceInput}
                                onChange={(e) =>
                                    setFuneralService(e.target.value)
                                }
                            />
                            <span>PLN</span>
                        </div>
                    </div>

                    {bodyTransport === 1 && (
                        <div className={styles.column}>
                            <p className={styles.services}>Transport zwłok</p>
                            <div>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={bodyTransportPrice}
                                    className={styles.servicesPriceInput}
                                    onChange={(e) =>
                                        setBodyTransportPrice(e.target.value)
                                    }
                                />
                                <span>PLN</span>
                            </div>
                        </div>
                    )}

                    {bodyPrepary === 1 && (
                        <div className={styles.column}>
                            <p className={styles.services}>
                                Przygotowanie zwłok
                            </p>
                            <div>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={bodyPreparyPrice}
                                    className={styles.servicesPriceInput}
                                    onChange={(e) =>
                                        setBodyPreparyPrice(e.target.value)
                                    }
                                />
                                <span>PLN</span>
                            </div>
                        </div>
                    )}

                    {cross === 1 && (
                        <div className={styles.column}>
                            <p className={styles.services}>Krzyż z tabliczką</p>
                            <div>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={crossPrice}
                                    className={styles.servicesPriceInput}
                                    onChange={(e) =>
                                        setCrossPrice(e.target.value)
                                    }
                                />
                                <span>PLN</span>
                            </div>
                        </div>
                    )}

                    {musicalarrangement === 1 && (
                        <div className={styles.column}>
                            <p className={styles.services}>Oprawa muzyczna</p>
                            <div>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={musicalarrangementPrice}
                                    className={styles.servicesPriceInput}
                                    onChange={(e) =>
                                        setMusicalarrangementPrice(
                                            e.target.value
                                        )
                                    }
                                />
                                <span>PLN</span>
                            </div>
                        </div>
                    )}

                    {flowers === 1 && (
                        <div className={styles.column}>
                            <p className={styles.services}>Kwiaty</p>
                            <div>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={flowersPrice}
                                    className={styles.servicesPriceInput}
                                    onChange={(e) =>
                                        setFlowersPrice(e.target.value)
                                    }
                                />
                                <span>PLN</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.tableWrapper}>
                    <div className={styles.column}>
                        <p>Podsumowanie</p>
                    </div>
                    <div className={styles.column}>
                        <p>Całkowity koszt ceremonii:</p>
                        <p>{totalCeremonyCost} PLN</p>
                    </div>

                    {insurance === 1 && (
                        <div className={styles.column}>
                            <p>Zasiłek pogrzebowy:</p>
                            <p>- 4 000 PLN</p>
                        </div>
                    )}

                    <div className={styles.column}>
                        <p>Razem:</p>
                        <p>{totalAmount} PLN</p>
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
                    <Button type="submit">Dalej</Button>
                </div>
            </form>
        </>
    );
}
