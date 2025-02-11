"use client";

import { Button } from "../../../components/Button/Button";
import styles from "./page.module.css";
import Image from "next/image";
import { useFormContext } from "../context/FormContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StepFour() {
    const { state, dispatch } = useFormContext();
    const router = useRouter();

    const [burialInAnUrn, setBurialInAnUrn] = useState(state.burialInAnUrn);
    const [burialInACoffin, setBurialInACoffin] = useState(
        state.burialInACoffin
    );

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch({
            type: "SET_FIELD",
            field: "burialInAnUrn",
            value: burialInAnUrn,
        });

        dispatch({
            type: "SET_FIELD",
            field: "burialInACoffin",
            value: burialInACoffin,
        });

        dispatch({ type: "NEXT_STEP" });
        router.push("/dashboard/leader/funeral-configurator/step-five");
    };

    return (
        <>
            <form className={styles.container} onSubmit={onSubmit}>
                <div className={styles.stepName}>
                    <p>Rodzaj pochówku</p>
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.options}>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="coffin"
                                    name="burialType"
                                    value="coffin"
                                    checked={burialInACoffin === "1"}
                                    onChange={() => {
                                        setBurialInACoffin("1");
                                        setBurialInAnUrn("0");
                                    }}
                                />
                                <label htmlFor="coffin">Trumna</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="urn"
                                    name="burialType"
                                    value="urn"
                                    checked={burialInAnUrn === "1"}
                                    onChange={() => {
                                        setBurialInAnUrn("1");
                                        setBurialInACoffin("0");
                                    }}
                                />
                                <label htmlFor="urn">Urna</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <Image
                        src={"/coffins/1.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                </div>

                <div className={`${styles.inputContainer} ${styles.button}`}>
                    <Button type="submit">Dalej</Button>
                </div>
            </form>
        </>
    );
}
