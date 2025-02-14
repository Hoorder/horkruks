"use client";

import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import styles from "./page.module.css";
import { useFormContext } from "../context/FormContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StepBadge } from "../components/StepBadge/StepBadge";

export default function StepTwo() {
    const { state, dispatch } = useFormContext();
    const router = useRouter();

    const [orderingName, setOrderingName] = useState(state.orderingName);
    const [orderingSurname, setOrderingSurname] = useState(
        state.orderingSurname
    );
    const [orderingPhoneNumber, setOrderingPhoneNumber] = useState(
        state.orderingPhoneNumber
    );
    const [orderingCity, setOrderingCity] = useState(state.orderingCity);
    const [orderingHouseNumber, setOrderingHouseNumber] = useState(
        state.orderingHouseNumber
    );
    const [orderingPostCode, setOrderingPostCode] = useState(
        state.orderingPostCode
    );
    const [orderingLocality, setOrderingLocality] = useState(
        state.orderingLocality
    );

    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        if (
            (!orderingName,
            !orderingSurname,
            !orderingPhoneNumber,
            !orderingCity,
            !orderingHouseNumber,
            !orderingPostCode,
            !orderingLocality)
        )
            return setErrorMessage("Dane nie zostały wprowadzone");

        dispatch({
            type: "SET_FIELD",
            field: "orderingName",
            value: orderingName,
        });
        dispatch({
            type: "SET_FIELD",
            field: "orderingSurname",
            value: orderingSurname,
        });
        dispatch({
            type: "SET_FIELD",
            field: "orderingPhoneNumber",
            value: orderingPhoneNumber,
        });
        dispatch({
            type: "SET_FIELD",
            field: "orderingCity",
            value: orderingCity,
        });
        dispatch({
            type: "SET_FIELD",
            field: "orderingHouseNumber",
            value: orderingHouseNumber,
        });
        dispatch({
            type: "SET_FIELD",
            field: "orderingPostCode",
            value: orderingPostCode,
        });
        dispatch({
            type: "SET_FIELD",
            field: "orderingLocality",
            value: orderingLocality,
        });

        dispatch({ type: "NEXT_STEP" });
        router.push("/dashboard/leader/funeral-configurator/step-three");
    };

    const handleBack = () => {
        dispatch({ type: "PREV_STEP" });
        router.push("/dashboard/leader/funeral-configurator/");
    };

    return (
        <>
            <form className={styles.container} onSubmit={onSubmit}>
                <StepBadge stepNumber={"2"} stepTitle={"Zleceniodawca"} />

                <div className={styles.stepName}>
                    <p>Dane zleceniodawcy</p>
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Imię / Imiona"}
                        nameAndId={"name-ordering-person"}
                        placeholder={"Np. Anna"}
                        value={orderingName}
                        onChange={(e) => setOrderingName(e.target.value)}
                    />
                    <Input
                        label={"Nazwisko"}
                        nameAndId={"surname-ordering-person"}
                        placeholder={"Np. Kowalska"}
                        value={orderingSurname}
                        onChange={(e) => setOrderingSurname(e.target.value)}
                    />
                    <Input
                        label={"Numer telefonu"}
                        nameAndId={"phone-number-ordering-person"}
                        placeholder={"Np. 04928394032"}
                        value={orderingPhoneNumber}
                        onChange={(e) => setOrderingPhoneNumber(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Ulica"}
                        nameAndId={"city-ordering-person"}
                        placeholder={"Np. Zdziarski"}
                        value={orderingCity}
                        onChange={(e) => setOrderingCity(e.target.value)}
                    />
                    <Input
                        label={"Numer domu"}
                        nameAndId={"house-number-ordering-person"}
                        placeholder={"Np. 144"}
                        value={orderingHouseNumber}
                        onChange={(e) => setOrderingHouseNumber(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Kod pocztowy"}
                        nameAndId={"post-code-ordering-person"}
                        placeholder={"Np. 12-345"}
                        value={orderingPostCode}
                        onChange={(e) => setOrderingPostCode(e.target.value)}
                    />
                    <Input
                        label={"Miejscowość"}
                        nameAndId={"locality-ordering-person"}
                        placeholder={"Np. Borek"}
                        value={orderingLocality}
                        onChange={(e) => setOrderingLocality(e.target.value)}
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
