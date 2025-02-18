"use client";

import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useFormContext } from "./context/FormContext";
import { useRouter } from "next/navigation";
import { StepBadge } from "./components/StepBadge/StepBadge";

export default function Home() {
    const { state, dispatch, goToStep } = useFormContext();
    const router = useRouter();

    const [deceasedName, setDeceasedName] = useState(state.deceasedName);
    const [deceasedSurname, setDeceasedSurname] = useState(
        state.deceasedSurname
    );
    const [deceasedPesel, setDeceasedPesel] = useState(state.deceasedPesel);
    const [deceasedBirthDate, setDeceasedBirthDate] = useState(
        state.deceasedBirthDate
    );
    const [deceasedDeathDate, setDeceasedDeathDate] = useState(
        state.deceasedDeathDate
    );
    const [noInsurance, setNoInsurance] = useState(state.noInsurance || "");
    const [insuranceAtZUS, setInsuranceAtZUS] = useState(
        state.insuranceAtZUS || ""
    );
    const [insuranceAtKRUS, setInsuranceAtKRUS] = useState(
        state.insuranceAtKRUS || ""
    );

    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        if (
            (!deceasedName,
            !deceasedSurname,
            !deceasedPesel,
            !deceasedBirthDate,
            !deceasedDeathDate,
            !noInsurance || !insuranceAtZUS || !insuranceAtKRUS)
        )
            return setErrorMessage("Dane nie zostały wprowadzone");

        dispatch({
            type: "SET_FIELD",
            field: "deceasedName",
            value: deceasedName,
        });
        dispatch({
            type: "SET_FIELD",
            field: "deceasedSurname",
            value: deceasedSurname,
        });
        dispatch({
            type: "SET_FIELD",
            field: "deceasedPesel",
            value: deceasedPesel,
        });
        dispatch({
            type: "SET_FIELD",
            field: "deceasedBirthDate",
            value: deceasedBirthDate,
        });
        dispatch({
            type: "SET_FIELD",
            field: "deceasedDeathDate",
            value: deceasedDeathDate,
        });
        dispatch({
            type: "SET_FIELD",
            field: "noInsurance",
            value: noInsurance,
        });
        dispatch({
            type: "SET_FIELD",
            field: "insuranceAtZUS",
            value: insuranceAtZUS,
        });
        dispatch({
            type: "SET_FIELD",
            field: "insuranceAtKRUS",
            value: insuranceAtKRUS,
        });

        dispatch({ type: "NEXT_STEP" });
        goToStep("step-two");
    };
    return (
        <>
            <form className={styles.container} onSubmit={onSubmit}>
                <StepBadge stepNumber={"1"} stepTitle={"Osoba zmarła"} />

                <div className={styles.stepName}>
                    <p>Dane osoby zmarłej</p>
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Imię / Imiona"}
                        nameAndId={"name-death-person"}
                        placeholder={"Np. Konrad"}
                        value={deceasedName}
                        onChange={(e) => setDeceasedName(e.target.value)}
                    />
                    <Input
                        label={"Nazwisko"}
                        nameAndId={"surname-death-person"}
                        placeholder={"Np. Zdziarski"}
                        value={deceasedSurname}
                        onChange={(e) => setDeceasedSurname(e.target.value)}
                    />
                    <Input
                        label={"Pesel"}
                        nameAndId={"pesel-death-person"}
                        placeholder={"Np. 74829384938"}
                        value={deceasedPesel}
                        onChange={(e) => setDeceasedPesel(e.target.value)}
                    />
                    <Input
                        label={"Data urodzenia"}
                        type="date"
                        nameAndId={"start-date-death-person"}
                        value={deceasedBirthDate}
                        onChange={(e) => setDeceasedBirthDate(e.target.value)}
                    />
                    <Input
                        label={"Data śmierci"}
                        type="date"
                        nameAndId={"end-date-death-person"}
                        value={deceasedDeathDate}
                        onChange={(e) => setDeceasedDeathDate(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.options}>
                        <p>Czy osoba zmarła była ubezpieczona?</p>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="no"
                                    name="safecare"
                                    value="0"
                                    checked={noInsurance === "1"}
                                    onChange={() => {
                                        setNoInsurance("1");
                                        setInsuranceAtZUS("0");
                                        setInsuranceAtKRUS("0");
                                    }}
                                />
                                <label htmlFor="no">NIE</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="zus"
                                    name="safecare"
                                    value="1"
                                    checked={insuranceAtZUS === "1"}
                                    onChange={() => {
                                        setInsuranceAtZUS("1");
                                        setNoInsurance("0");
                                        setInsuranceAtKRUS("0");
                                    }}
                                />
                                <label htmlFor="zus">ZUS</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="krs"
                                    name="safecare"
                                    value="2"
                                    checked={insuranceAtKRUS === "1"}
                                    onChange={() => {
                                        setInsuranceAtKRUS("1");
                                        setNoInsurance("0");
                                        setInsuranceAtZUS("0");
                                    }}
                                />
                                <label htmlFor="krs">KRUS</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.inputContainer} ${styles.button}`}>
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
