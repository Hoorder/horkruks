"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "../context/FormContext";
import { Button } from "@/app/dashboard/components/Button/Button";
import { Input } from "@/app/dashboard/components/Input/Input";
import { StepBadge } from "../components/StepBadge/StepBadge";

export default function StepSix() {
    const { state, dispatch } = useFormContext();
    const router = useRouter();

    const [transport, setTransport] = useState(state.transport);
    const [bodyPrepary, setBodyPrepary] = useState(state.bodyPrepary);
    const [tent, setTent] = useState(state.tent);
    const [cross, setCross] = useState(state.cross);
    const [musicalarrangement, setMusicalarrangement] = useState(
        state.musicalarrangement
    );
    const [musicalarrangementNote, setMusicalarrangementNote] = useState(
        state.musicalarrangementNote
    );

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch({
            type: "SET_FIELD",
            field: "transport",
            value: transport,
        });

        dispatch({
            type: "SET_FIELD",
            field: "bodyPrepary",
            value: bodyPrepary,
        });

        dispatch({
            type: "SET_FIELD",
            field: "tent",
            value: tent,
        });

        dispatch({
            type: "SET_FIELD",
            field: "cross",
            value: cross,
        });

        dispatch({
            type: "SET_FIELD",
            field: "musicalarrangement",
            value: musicalarrangement,
        });

        dispatch({
            type: "SET_FIELD",
            field: "musicalarrangementNote",
            value: musicalarrangementNote,
        });

        dispatch({ type: "NEXT_STEP" });
        router.push("/dashboard/leader/funeral-configurator/step-seven");
    };

    const handleBack = () => {
        dispatch({ type: "PREV_STEP" });
        router.push("/dashboard/leader/funeral-configurator/step-five");
    };

    return (
        <>
            <form className={styles.container} onSubmit={onSubmit}>
                <StepBadge stepNumber={"6"} stepTitle={"Pozostałe"} />

                <div className={styles.stepName}>
                    <p>Dane osoby zmarłej</p>
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.options}>
                        <p>Dodatkowe usługi</p>
                        <div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="Transport"
                                    checked={transport === "1"}
                                    onChange={() => {
                                        setTransport(
                                            transport === "1" ? "0" : "1"
                                        );
                                    }}
                                />
                                <label htmlFor="Transport">Transport</label>
                            </div>

                            <div>
                                <input
                                    type="checkbox"
                                    id="przygotowanieZwłok"
                                    checked={bodyPrepary === "1"}
                                    onChange={() => {
                                        setBodyPrepary(
                                            bodyPrepary === "1" ? "0" : "1"
                                        );
                                    }}
                                />
                                <label htmlFor="przygotowanieZwłok">
                                    Przygotowanie zwłok
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.options}>
                        <p>Miejsce ceremonii</p>
                        <div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="tent"
                                    checked={tent === "1"}
                                    onChange={() => {
                                        setTent(tent === "1" ? "0" : "1");
                                    }}
                                />
                                <label htmlFor="tent">Namiot</label>
                            </div>

                            <div>
                                <input
                                    type="checkbox"
                                    id="cross"
                                    checked={cross === "1"}
                                    onChange={() => {
                                        setCross(cross === "1" ? "0" : "1");
                                    }}
                                />
                                <label htmlFor="cross">krzyż</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="musicalarrangement"
                                    checked={musicalarrangement === "1"}
                                    onChange={() => {
                                        setMusicalarrangement(
                                            musicalarrangement === "1"
                                                ? "0"
                                                : "1"
                                        );
                                    }}
                                />
                                <label htmlFor="musicalarrangement">
                                    Oprawa muzyczna
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Oprawa muzyczna"}
                        nameAndId={"name-death-person"}
                        placeholder={"Notatki"}
                        value={musicalarrangementNote}
                        onChange={(e) =>
                            setMusicalarrangementNote(e.target.value)
                        }
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
            </form>
        </>
    );
}
