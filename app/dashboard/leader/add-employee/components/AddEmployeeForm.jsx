"use client";

import styles from "./AddEmployeeForm.module.css";
import { Input } from "@/app/dashboard/components/Input/Input";
import { Button } from "@/app/dashboard/components/Button/Button";
import { useState } from "react";

export function AddEmployeeForm() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [supports, setSupports] = useState("Trumna");
    const [role, setRole] = useState("employee");

    const [funeralService, setFuneralService] = useState("");
    const [transportService, setTransportService] = useState("");
    const [prepareService, setPrepareService] = useState("");
    const [hourService, setHourService] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [notes, setNotes] = useState("");

    const [successMessage, setSuccesMessage] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const handleAddEmployee = async (e) => {
        e.preventDefault();

        if (
            !name ||
            !surname ||
            !phoneNumber ||
            !supports ||
            !role ||
            !funeralService ||
            !transportService ||
            !prepareService ||
            !hourService ||
            !email ||
            !password ||
            !repeatPassword
        ) {
            setErrorMessage("Nie uzupełniono wymaganych danych");
            setSuccesMessage("");
            return;
        }

        if (role !== "employee" && role !== "manager") {
            setErrorMessage("Podana ranga jest nieprawidłowa");
            setSuccesMessage("");
            return;
        }

        if (supports !== "Trumna" && supports !== "Chorągiew") {
            setErrorMessage("Podana rola jest nieprawidłowa");
            setSuccesMessage("");
            return;
        }

        if (password !== repeatPassword) {
            setErrorMessage("Hasła różnią się");
            setSuccesMessage("");
            return;
        }

        try {
            const response = await fetch("/api/leader/add-employee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    surname,
                    phoneNumber,
                    supports,
                    role,
                    funeralService,
                    transportService,
                    prepareService,
                    hourService,
                    email,
                    password,
                    notes,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                setErrorMessage(error.error);
                setSuccesMessage("");
                return;
            }

            setSuccesMessage("Pomyślnie dodano pracownika.");
            setErrorMessage("");

            setName("");
            setSurname("");
            setPhoneNumber("");
            setSupports("");
            setRole("");
            setFuneralService("");
            setTransportService("");
            setPrepareService("");
            setHourService("");
            setEmail("");
            setPassword("");
            setRepeatPassword("");
            setNotes("");
        } catch (error) {
            console.error(`Sprawdź API: ${error}`);
        }
    };

    return (
        <form onSubmit={handleAddEmployee} className={styles.container}>
            <div className={styles.category}>
                <div className={styles.stepName}>
                    <p>Dane osobowe</p>
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"Imię"}
                        nameAndId={"Imie"}
                        placeholder={"Np. Konrad"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label={"Nazwisko"}
                        nameAndId={"Nazwisko"}
                        placeholder={"Np. Makuszyński"}
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <Input
                        label={"Numer Telefonu"}
                        nameAndId={"NumerTelefonu"}
                        placeholder={"Np. 938 493 775"}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className={styles.selectContainer}>
                    <div className={styles.selectWrapper}>
                        <label>Obsługuje</label>
                        <select onChange={(e) => setSupports(e.target.value)}>
                            <option value="Trumna">Trumna</option>
                            <option value="Chorągiew">Chorągiew</option>
                        </select>
                    </div>
                    <div className={styles.selectWrapper}>
                        <label>Stanowisko</label>
                        <select onChange={(e) => setRole(e.target.value)}>
                            <option value="employee">employee</option>
                            <option value="manager">manager</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles.category}>
                <div className={styles.stepName}>
                    <p>Dane finansowe</p>
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        type="number"
                        min={0}
                        max={200}
                        label={"Obsługa pogrzebu"}
                        nameAndId={"ObslugaPogrzbeu"}
                        placeholder={"Np. 100"}
                        value={funeralService}
                        onChange={(e) => setFuneralService(e.target.value)}
                    />
                    <Input
                        type="number"
                        min={0}
                        max={200}
                        label={"Przewóz zwłok"}
                        nameAndId={"PrzewozZwlok"}
                        placeholder={"Np. 100"}
                        value={transportService}
                        onChange={(e) => setTransportService(e.target.value)}
                    />
                    <Input
                        type="number"
                        min={0}
                        max={200}
                        label={"Przygotowanie zwłok"}
                        nameAndId={"PrzygotowanieZwlok"}
                        placeholder={"Np. 100"}
                        value={prepareService}
                        onChange={(e) => setPrepareService(e.target.value)}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <Input
                        type="number"
                        min={0}
                        max={200}
                        label={"Stawka godzinowa"}
                        nameAndId={"StawkaGodzinowa"}
                        placeholder={"Np. 100"}
                        value={hourService}
                        onChange={(e) => setHourService(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.category}>
                <div className={styles.stepName}>
                    <p>Dane logowania</p>
                </div>

                <div className={styles.inputContainer}>
                    <Input
                        label={"E-mail (Login)"}
                        nameAndId={"Email"}
                        placeholder={"example@domena.pl"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        label={"Hasło"}
                        nameAndId={"Haslo"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        label={"Powtórz hasło"}
                        nameAndId={"PowtorzHaslo"}
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <Input
                        label={"Uwagi"}
                        nameAndId={"Uwagi"}
                        placeholder={"Np. Kolega Tomka"}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                {successMessage ? (
                    <p className={styles.succesMessage}>{successMessage}</p>
                ) : (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                )}
            </div>

            <div className={styles.buttonContainer}>
                <Button>Dodaj pracownika</Button>
            </div>
        </form>
    );
}
