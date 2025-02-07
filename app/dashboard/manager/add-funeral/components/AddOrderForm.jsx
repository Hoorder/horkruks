"use client";

import { useEffect, useState } from "react";
import styles from "./AddOrderForm.module.css";
import { Input } from "@/app/dashboard/components/Input/Input";

export function AddOrderForm() {
    const [tasksData, setTasksData] = useState("");
    const [funeralLocality, setFuneralLocality] = useState("");
    const [transportLocality, setTransportLocality] = useState("");
    const [bodyPrepareLocality, setBodyPrepareLocality] = useState("");
    const [workHoursNumber, setWorkHoursNumber] = useState(0);
    const [userData, setUserData] = useState([]);
    const [errorMsg, setErrorMsg] = useState();
    const [succesMsg, setSuccesMsg] = useState();

    useEffect(() => {
        const currentDate = new Date().toISOString().split("T")[0];
        setTasksData(currentDate);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respone = await fetch("/api/session/");

                if (!respone.ok) {
                    throw new Error("Błąd pobierania danych");
                }

                const userResData = await respone.json();

                setUserData(userResData);
            } catch (error) {
                console.error("Błąd w trakcie żądania:", error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            id_users_fk: userData.user_id,
            task_date: tasksData,
            funeral_ceremony_place: funeralLocality,
            funeral_transport_place: transportLocality,
            body_preparation_place: bodyPrepareLocality,
            working_hours_number: workHoursNumber,
            funeral_ceremony_payout:
                funeralLocality.trim() === "" ? 0 : userData.funeral_fee,
            funeral_transport_payout:
                transportLocality.trim() === "" ? 0 : userData.transport_fee,
            body_preparation_payout:
                bodyPrepareLocality.trim() === ""
                    ? 0
                    : userData.dressing_body_fee,
            working_hours_payout: workHoursNumber * userData.hourly_fee,
        };

        try {
            const response = await fetch("/api/user/add-tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccesMsg(result.message);
                setFuneralLocality("");
                setTransportLocality("");
                setBodyPrepareLocality("");
                setWorkHoursNumber(0);
                setErrorMsg("");
            } else {
                setSuccesMsg("");
                setErrorMsg(result.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <p>Dodaj zadanie</p>
                    <p>
                        Wypełnij jedno bądź wszystkie z zadań i dodaj je do bazy
                    </p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.segment}>
                        <div className={styles.sectionTitle}>
                            <p>Ceremonia pogrzebowa</p>
                            <div className="bar"></div>
                        </div>

                        <div className={styles.inputContainers}>
                            <Input
                                label={"Miejscowość:"}
                                nameAndId={"funeralLocality"}
                                placeholder={"Np. Lubenia"}
                                value={funeralLocality}
                                onChange={(e) =>
                                    setFuneralLocality(e.target.value)
                                }
                            />
                            <Input
                                label={"Data:"}
                                type="date"
                                nameAndId={"localityDate"}
                                value={tasksData}
                                onChange={(e) => setTasksData(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.segment}>
                        <div className={styles.sectionTitle}>
                            <p>Przewóz zwłok</p>
                            <div className="bar"></div>
                        </div>

                        <div className={styles.inputContainers}>
                            <Input
                                label={"Miejscowość:"}
                                nameAndId={"transportLocality"}
                                placeholder={"Np. Do Lubeni"}
                                value={transportLocality}
                                onChange={(e) =>
                                    setTransportLocality(e.target.value)
                                }
                            />
                            <Input
                                label={"Data:"}
                                type="date"
                                nameAndId={"localityDate"}
                                value={tasksData}
                                onChange={(e) => setTasksData(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.segment}>
                        <div className={styles.sectionTitle}>
                            <p>Przygotowanie zwłok</p>
                            <div className="bar"></div>
                        </div>

                        <div className={styles.inputContainers}>
                            <Input
                                label={"Miejscowość:"}
                                nameAndId={"bodyPrepareLocality"}
                                placeholder={"Np. Do Lubeni"}
                                value={bodyPrepareLocality}
                                onChange={(e) =>
                                    setBodyPrepareLocality(e.target.value)
                                }
                            />
                            <Input
                                label={"Data:"}
                                type="date"
                                nameAndId={"localityDate"}
                                value={tasksData}
                                onChange={(e) => setTasksData(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.segment}>
                        <div className={styles.sectionTitle}>
                            <p>Godziny pracy</p>
                            <div className="bar"></div>
                        </div>

                        <div className={styles.inputContainers}>
                            <Input
                                type="number"
                                label={"Ilość godzin:"}
                                nameAndId={"workHoursNumber"}
                                placeholder={"Np. 18"}
                                value={workHoursNumber}
                                onChange={(e) =>
                                    setWorkHoursNumber(e.target.value)
                                }
                            />
                            <Input
                                label={"Data:"}
                                type="date"
                                nameAndId={"localityDate"}
                                value={tasksData}
                                onChange={(e) => setTasksData(e.target.value)}
                            />
                        </div>
                    </div>

                    {succesMsg ? (
                        <p className={styles.succesMsg}>{succesMsg}</p>
                    ) : (
                        <p className={styles.errorMsg}>{errorMsg}</p>
                    )}

                    <button className={styles.button}>Dodaj</button>
                </form>
            </div>
        </>
    );
}
