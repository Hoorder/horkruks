"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import styles from "./page.module.css";
import { useFormContext } from "../context/FormContext";
import { useState } from "react";
import { StepBadge } from "../components/StepBadge/StepBadge";

export default function StepThree() {
    const { state, dispatch } = useFormContext();
    const router = useRouter();

    const [funeralLocality, setFuneralLocality] = useState(
        state.funeralLocality
    );
    const [funeralDate, setFuneralDate] = useState(state.funeralDate);
    const [funeralTime, setFuneralTime] = useState(state.funeralTime);
    const [funeralEnteryTime, setFuneralEnteryTime] = useState(
        state.funeralEnteryTime
    );
    const [funeralGroupUpTime, setFuneralGroupUpTime] = useState(
        state.funeralGroupUpTime
    );
    const [funeralFlowers, setFuneralFlowers] = useState(state.funeralFlowers);
    const [funeralFlowersNote, setFuneralFlowersNote] = useState(
        state.funeralFlowersNote
    );

    const [errorMessage, setErrorMessage] = useState("");


    const onSubmit = (e) => {
        e.preventDefault();

        if (
            (!funeralLocality,
            !funeralDate,
            !funeralTime,
            !funeralEnteryTime,
            !funeralGroupUpTime,
            !funeralFlowers)
        )
            return setErrorMessage("Dane nie zostały wprowadzone");

        dispatch({
            type: "SET_FIELD",
            field: "funeralDate",
            value: funeralDate,
        });
        dispatch({
            type: "SET_FIELD",
            field: "funeralLocality",
            value: funeralLocality,
        });
        dispatch({
            type: "SET_FIELD",
            field: "funeralTime",
            value: funeralTime,
        });
        dispatch({
            type: "SET_FIELD",
            field: "funeralEnteryTime",
            value: funeralEnteryTime,
        });
        dispatch({
            type: "SET_FIELD",
            field: "funeralGroupUpTime",
            value: funeralGroupUpTime,
        });
        dispatch({
            type: "SET_FIELD",
            field: "funeralFlowers",
            value: funeralFlowers,
        });
        dispatch({
            type: "SET_FIELD",
            field: "funeralFlowersNote",
            value: funeralFlowersNote,
        });

        dispatch({ type: "NEXT_STEP" });
        router.push("/dashboard/leader/funeral-configurator/step-four");
    };

    const handleBack = () => {
        dispatch({ type: "PREV_STEP" });
        router.push("/dashboard/leader/funeral-configurator/step-two");
    };

    return (
        <>
            <form className={styles.container} onSubmit={onSubmit}>
                <StepBadge stepNumber={"3"} stepTitle={"Ceremonia"} />

                <div className={styles.stepName}>
                    <p>Informacje o ceremonii</p>
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Miejscowość"}
                        nameAndId={"funeral-locality"}
                        placeholder={"Np. Lubenia"}
                        value={funeralLocality}
                        onChange={(e) => setFuneralLocality(e.target.value)}
                    />
                    <Input
                        label={"Data pogrzebu"}
                        type="date"
                        nameAndId={"funeral-date"}
                        value={funeralDate}
                        onChange={(e) => setFuneralDate(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Godzina pogrzebu"}
                        type="time"
                        nameAndId={"funeral-time"}
                        value={funeralTime}
                        onChange={(e) => setFuneralTime(e.target.value)}
                    />
                    <Input
                        label={"Godzina wniesienia"}
                        type="time"
                        nameAndId={"entery-time"}
                        value={funeralEnteryTime}
                        onChange={(e) => setFuneralEnteryTime(e.target.value)}
                    />
                    <Input
                        label={"Godzina zbiórki"}
                        type="time"
                        nameAndId={"group-up-time"}
                        value={funeralGroupUpTime}
                        onChange={(e) => setFuneralGroupUpTime(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.options}>
                        <p>Wieńce</p>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="yes"
                                    name="safecare"
                                    value="1"
                                    checked={funeralFlowers === "1"}
                                    onChange={(e) =>
                                        setFuneralFlowers(e.target.value)
                                    }
                                />
                                <label htmlFor="yes">Tak</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="no"
                                    name="safecare"
                                    value="0"
                                    checked={funeralFlowers === "0"}
                                    onChange={(e) =>
                                        setFuneralFlowers(e.target.value)
                                    }
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
                        value={funeralFlowersNote}
                        onChange={(e) => setFuneralFlowersNote(e.target.value)}
                    />
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

                <p
                    style={{
                        color: "red",
                        fontWeight: "var(--medium)",
                        fontSize: "14px",
                        marginTop: "10px",
                    }}
                >
                    {errorMessage}
                </p>
            </form>
        </>
    );
}
