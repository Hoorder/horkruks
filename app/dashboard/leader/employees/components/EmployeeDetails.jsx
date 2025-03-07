"use client";

import { Input } from "@/app/dashboard/components/Input/Input";
import styles from "./EmployeeDetails.module.css";
import { useEffect, useState } from "react";
import { Button } from "@/app/dashboard/components/Button/Button";

export function EmployeeDetails({ employeeId }) {
    const [hide, setHide] = useState(false);

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

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const handleEmployeeId = async () => {
            setHide(false);
            setSuccessMessage("");
            setErrorMessage("");
            try {
                const response = await fetch(
                    "/api/leader/employee/edit-employee",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ employeeId }),
                    }
                );

                if (!response.ok) {
                    const errorMsg = await response.json();
                    setErrorMessage(errorMsg);
                }

                const data = await response.json();
                setName(data[0].first_name);
                setSurname(data[0].last_name);
                setPhoneNumber(data[0].phone_number);
                setSupports(data[0].role_handling);
                setRole(data[0].position);
                setFuneralService(data[0].funeral_service);
                setTransportService(data[0].transport_body);
                setPrepareService(data[0].dressing_body);
                setHourService(data[0].hourly_rate);
                setEmail(data[0].email);
            } catch (error) {
                console.log(error);
            }
        };

        handleEmployeeId();
    }, [employeeId, refresh]);

    const handleUpdateEmployee = async (e) => {
        e.preventDefault();
        const confirmDelete = window.confirm(
            "Czy na pewno chcesz zaktualizować dane pracownika?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const respone = await fetch("/api/leader/employee/edit-employee", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    employeeId,
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
                }),
            });

            if (!respone.ok) {
                const error = await respone.json();
                console.log(error);
            }

            setRefresh((prev) => !prev);
            setSuccessMessage("Pomyślnie zaktualizowane dane pracownika");
            setErrorMessage("");
        } catch (error) {
            console.log("Sprawdź API");
        }
    };

    return (
        <div
            onClick={() => setHide((prev) => !prev)}
            className={`${styles.modal} ${hide && styles.isHiden}`}
        >
            <form
                onSubmit={handleUpdateEmployee}
                className={styles.container}
                onClick={(e) => e.stopPropagation()}
            >
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
                            <select
                                onChange={(e) => setSupports(e.target.value)}
                            >
                                {supports === "Trumna" ? (
                                    <option value="Trumna">Trumna</option>
                                ) : (
                                    <option value="Chorągwie">Chorągwie</option>
                                )}
                            </select>
                        </div>
                        <div className={styles.selectWrapper}>
                            <label>Stanowisko</label>
                            <select onChange={(e) => setRole(e.target.value)}>
                                {role === "employee" ? (
                                    <option value="employee">employee</option>
                                ) : (
                                    <option value="manager">manager</option>
                                )}
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
                            onChange={(e) =>
                                setTransportService(e.target.value)
                            }
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
                    </div>
                    {successMessage ? (
                        <p className={styles.succesMessage}>{successMessage}</p>
                    ) : (
                        <p className={styles.errorMessage}>{errorMessage}</p>
                    )}
                </div>

                <div className={styles.buttonContainer}>
                    <Button>Aktualizuj dane</Button>
                </div>
            </form>
        </div>
    );
}
