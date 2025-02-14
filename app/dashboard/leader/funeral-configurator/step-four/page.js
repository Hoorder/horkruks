"use client";

import { Button } from "../../../components/Button/Button";
import styles from "./page.module.css";
import Image from "next/image";
import { useFormContext } from "../context/FormContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StepBadge } from "../components/StepBadge/StepBadge";

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

    const handleBack = () => {
        dispatch({ type: "PREV_STEP" });
        router.push("/dashboard/leader/funeral-configurator/step-three");
    };
    const [zoomedImage, setZoomedImage] = useState(null);

    const handleZoom = (src) => {
        setZoomedImage(src);
    };

    const closeZoom = () => {
        setZoomedImage(null);
    };

    return (
        <>
            <form className={styles.container} onSubmit={onSubmit}>
                <StepBadge stepNumber={"4"} stepTitle={"Pochówek"} />

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
                                        setBurialInAnUrn(null);
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
                                        setBurialInACoffin(null);
                                    }}
                                />
                                <label htmlFor="urn">Urna</label>
                            </div>
                        </div>
                    </div>
                </div>

                {Number(burialInACoffin) === 1 && (
                    <div className={styles.imageContainer}>
                        {[
                            "1.jpg",
                            "2.jpg",
                            "3.jpg",
                            "4.jpg",
                            "5.jpg",
                            "6.jpg",
                            "7.jpg",
                            "8.jpg",
                            "9.jpg",
                            "10.jpg",
                            "11.jpg",
                            "12.jpg",
                        ].map((filename, index) => (
                            <Image
                                key={index}
                                src={`/coffins/${filename}`}
                                width={192}
                                height={108}
                                alt={`coffin-type-${index + 1}`}
                                className={styles.image}
                                onClick={() =>
                                    handleZoom(`/coffins/${filename}`)
                                }
                            />
                        ))}
                    </div>
                )}

                {Number(burialInAnUrn) === 1 && (
                    <div className={styles.imageContainer}>
                        {[
                            "1.jpg",
                            "2.jpg",
                            "3.jpg",
                            "4.jpg",
                            "5.jpg",
                            "6.jpg",
                            "7.jpg",
                            "8.jpg",
                            "9.jpg",
                            "10.jpg",
                        ].map((filename, index) => (
                            <Image
                                key={index}
                                src={`/urns/${filename}`}
                                width={155}
                                height={207}
                                alt={`coffin-type-${index + 1}`}
                                className={styles.image}
                                onClick={() => handleZoom(`/urns/${filename}`)}
                            />
                        ))}
                    </div>
                )}

                {zoomedImage && (
                    <div className={styles.modal} onClick={closeZoom}>
                        <div className={styles.modalContent}>
                            <Image
                                src={zoomedImage}
                                width={800}
                                height={450}
                                alt="zoomed-image"
                            />
                        </div>
                    </div>
                )}

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
