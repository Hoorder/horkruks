"use client";

import { useEffect, useState } from "react";
import styles from "./CeremonyDetails.module.css";
import { Button } from "@/app/dashboard/components/Button/Button";

export function CeremonyDetails({ ceremonyId }) {
    const [funeralData, setFuneralData] = useState([]);
    const [funeralTasksData, setFuneralTasksData] = useState([]);
    const [funeralEmployeeData, setFuneralEmployeeData] = useState([]);
    const [hide, setHide] = useState(false);
    const [orderEnd, setOrderEnd] = useState(false);
    const [oldEmployeeId, setOldEmployeeId] = useState();
    const [change, setChange] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [refresh, setRefrest] = useState();

    useEffect(() => {
        const handleCeremonyId = async () => {
            setHide(false);
            try {
                const response = await fetch(
                    "/api/leader/history-ceremony/modal",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ ceremonyId }),
                    }
                );

                if (!response.ok) {
                    const errorMsg = await response.json();
                    setErrorMessage(errorMsg);
                }

                const funeralDataResp = await response.json();
                setFuneralData(funeralDataResp.funeral_data);
                setFuneralTasksData(funeralDataResp.funeral_tasks);
                setFuneralEmployeeData(funeralDataResp.funeral_employee);
            } catch (error) {
                console.log(error);
            }
        };

        handleCeremonyId();
    }, [change, refresh, ceremonyId, orderEnd]);

    const handleChangeEmployee = async (employeeId) => {
        try {
            const response = await fetch("/api/leader/history-ceremony", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ceremonyId,
                    oldEmployeeId,
                    newEmployeeId: employeeId,
                }),
            });

            if (!response.ok) {
                const message = await response.json();
                setErrorMessage(message.error);
                setSuccessMessage();
                return;
            }

            setChange(true);

            const message = await response.json();
            setSuccessMessage(message.message);
            setErrorMessage();
        } catch (error) {
            console.error("Sprawdź api:", error);
        }
    };

    const handleEndOrder = async () => {
        try {
            const response = await fetch("/api/leader/history-ceremony/modal", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ceremonyId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Błąd podczas aktualizacji");
            }

            setOrderEnd(true);
        } catch (error) {
            throw new Error("Sprawdź end-point");
        }
    };

    return (
        <div
            onClick={() => setHide((prev) => !prev)}
            className={`${styles.modal} ${hide && styles.isHiden}`}
        >
            <form
                className={styles.container}
                onClick={(e) => e.stopPropagation()}
            >
                {funeralData.map((ceremony) => (
                    <div
                        key={ceremony.id_funeral_cards}
                        className={styles.head}
                    >
                        <p className={styles.head_title}>
                            {ceremony.dead_person_name}{" "}
                            {ceremony.dead_person_surname}
                        </p>
                        <p>
                            Faktura: <span>{ceremony.invoices_number}</span>
                        </p>
                    </div>
                ))}

                <div className={styles.body}>
                    <div className={styles.containerLeft}>
                        <div className={styles.stepName}>
                            <p>Zespół obsługujący</p>
                        </div>
                        <div className={styles.selectContainer}>
                            <div className={styles.selectWrapper}>
                                {funeralTasksData
                                    .filter(
                                        (employee) =>
                                            employee.position === "manager"
                                    )
                                    .map((task) => {
                                        const displayedId =
                                            funeralTasksData.map(
                                                (task) => task.id_users_fk
                                            );

                                        return (
                                            <div
                                                key={task.id_users_fk}
                                                className={styles.select}
                                            >
                                                <label>Kierownik</label>

                                                <select
                                                    className={
                                                        task.confirmation === 1
                                                            ? styles.decided
                                                            : task.confirmation ===
                                                              2
                                                            ? styles.undecided
                                                            : null
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeEmployee(
                                                            e.target.value
                                                        )
                                                    }
                                                    onClick={(e) =>
                                                        setOldEmployeeId(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option
                                                        value={task.id_users_fk}
                                                    >
                                                        {task.id_users_fk}
                                                        {" / "}
                                                        {task.imienazwisko}
                                                    </option>
                                                    {funeralEmployeeData
                                                        .filter(
                                                            (employee) =>
                                                                !displayedId.includes(
                                                                    employee.id_users
                                                                ) &&
                                                                employee.position ===
                                                                    "manager"
                                                        )
                                                        .map((employee) => (
                                                            <option
                                                                key={
                                                                    employee.id_users
                                                                }
                                                                value={
                                                                    employee.id_users
                                                                }
                                                            >
                                                                {
                                                                    employee.id_users
                                                                }
                                                                {"/ "}
                                                                {
                                                                    employee.employee
                                                                }
                                                                {"/ "}
                                                                {
                                                                    employee.role_handling
                                                                }
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        );
                                    })}
                            </div>

                            <div className={styles.selectWrapper}>
                                {funeralTasksData
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((task) => {
                                        const displayedId =
                                            funeralTasksData.map(
                                                (task) => task.id_users_fk
                                            );

                                        return (
                                            <div
                                                key={task.id_users_fk}
                                                className={styles.select}
                                            >
                                                <label>Żałobnik</label>

                                                <select
                                                    className={
                                                        task.confirmation === 1
                                                            ? styles.decided
                                                            : task.confirmation ===
                                                              2
                                                            ? styles.undecided
                                                            : null
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeEmployee(
                                                            e.target.value
                                                        )
                                                    }
                                                    onClick={(e) =>
                                                        setOldEmployeeId(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option
                                                        value={task.id_users_fk}
                                                    >
                                                        {task.id_users_fk}
                                                        {" / "}
                                                        {task.imienazwisko}
                                                    </option>
                                                    {funeralEmployeeData
                                                        .filter(
                                                            (employee) =>
                                                                !displayedId.includes(
                                                                    employee.id_users
                                                                ) &&
                                                                employee.position !==
                                                                    "leader" &&
                                                                employee.position !==
                                                                    "manager"
                                                        )
                                                        .map((employee) => (
                                                            <option
                                                                key={
                                                                    employee.id_users
                                                                }
                                                                value={
                                                                    employee.id_users
                                                                }
                                                            >
                                                                {
                                                                    employee.id_users
                                                                }
                                                                {"/ "}
                                                                {
                                                                    employee.employee
                                                                }
                                                                {" / "}
                                                                {
                                                                    employee.role_handling
                                                                }
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                        {successMessage ? (
                            <p className={styles.succesMessage}>
                                {successMessage}
                            </p>
                        ) : (
                            <p className={styles.errorMessage}>
                                {errorMessage}
                            </p>
                        )}

                        {funeralData.map((data) => (
                            <div key={data.id_funeral_cards}>
                                <div className={styles.containerr}>
                                    <div
                                        className={`${styles.progressLevel} ${
                                            data.order_created_time &&
                                            styles.send
                                        }`}
                                    >
                                        <p>Wysłano</p>
                                        <p>{data.order_created_time}</p>
                                    </div>
                                    <div
                                        className={`${styles.progressLevel} ${
                                            data.order_displayed_time &&
                                            styles.show
                                        }`}
                                    >
                                        <p>Wyświetlono</p>
                                        {data.order_displayed_time ? (
                                            <p>{data.order_displayed_time}</p>
                                        ) : (
                                            <p>--:--</p>
                                        )}
                                    </div>
                                    <div
                                        className={`${styles.progressLevel} ${
                                            data.order_confirmed_time &&
                                            styles.confirmed
                                        }`}
                                    >
                                        <p>Potwierdzono</p>
                                        {data.order_confirmed_time ? (
                                            <p>{data.order_confirmed_time}</p>
                                        ) : (
                                            <p>--:--</p>
                                        )}
                                    </div>
                                    <div
                                        className={`${styles.progressLevel} ${
                                            data.order_completed_time &&
                                            styles.end
                                        }`}
                                    >
                                        <p>Zakończono</p>
                                        {data.order_completed_time ? (
                                            <p>{data.order_completed_time}</p>
                                        ) : (
                                            <p>--:--</p>
                                        )}
                                    </div>
                                </div>

                                {data.order_created_time &&
                                    data.order_displayed_time &&
                                    data.order_confirmed_time &&
                                    !data.order_completed_time && (
                                        <div className={styles.buttonContainer}>
                                            <Button
                                                type="button"
                                                onClick={handleEndOrder}
                                            >
                                                Zakończ
                                            </Button>
                                        </div>
                                    )}
                            </div>
                        ))}

                        <div className={styles.buttonContainer}>
                            <Button
                                type="button"
                                className={styles.refreshButton}
                                onClick={() => setRefrest((prev) => !prev)}
                            >
                                ⟳
                            </Button>
                        </div>
                    </div>
                    <div className={styles.containerRight}>
                        <div className={styles.stepName}>
                            <p>Szczegóły ceremonii</p>
                        </div>
                        {funeralData.map((ceremony) => (
                            <div
                                key={ceremony.id_funeral_cards}
                                className={styles.ceremonyDetailsContainer}
                            >
                                <p>
                                    <span>ID zlecenia: </span>
                                    {ceremony.id_funeral_cards}
                                </p>
                                <p className={styles.category}>
                                    ----- Zmarły -----
                                </p>
                                <p>
                                    <span>Imię nazwisko: </span>
                                    {ceremony.dead_person_name}{" "}
                                    {ceremony.dead_person_surname}
                                </p>

                                <p>
                                    <span>PESEL: </span> {ceremony.pesel}
                                </p>

                                <p>
                                    <span>Data narodzin: </span>
                                    {ceremony.birth_date}
                                </p>
                                <p>
                                    <span>Data śmierci: </span>
                                    {ceremony.death_date}
                                </p>
                                <p>
                                    {ceremony.insured_in_zus ? (
                                        <>
                                            <span>Ubezpieczony w: </span>
                                            {ceremony.insured_in_zus && "Zus"}
                                        </>
                                    ) : (
                                        <>
                                            <span>Ubezpieczony w: </span>
                                            {ceremony.insured_in_krus && "Krus"}
                                        </>
                                    )}
                                </p>
                                <p className={styles.category}>
                                    ----- Zamawiający -----
                                </p>
                                <p>
                                    <span>Imię nazwisko: </span>
                                    {ceremony.principal_name}{" "}
                                    {ceremony.principal_surname}
                                </p>
                                <p>
                                    <span>Numer telefonu: </span>
                                    {ceremony.principal_phone_number}
                                </p>
                                <p>
                                    <span>Adres i numer domu: </span>
                                    {ceremony.principal_city}{" "}
                                    {ceremony.principal_house_number}
                                </p>
                                <p className={styles.category}>
                                    ----- Pogrzeb -----
                                </p>
                                <p>
                                    <span>Miejscowość: </span>
                                    {ceremony.principal_city}
                                </p>
                                <p>
                                    <span>Data: </span>
                                    {ceremony.funeral_date}
                                </p>
                                <p>
                                    <span>Zbiórka: </span>
                                    {ceremony.meeting_time}
                                </p>
                                <p>
                                    <span>Wniesienie: </span>
                                    {ceremony.entrance_time}
                                </p>
                                <p>
                                    <span>Msza: </span>
                                    {ceremony.funeral_time}
                                </p>
                                <p>
                                    <span>Pogrzeb w: </span>
                                    {ceremony.id_urns_fk ? (
                                        <>{ceremony.id_urns_fk && "Urnie"}</>
                                    ) : (
                                        <>
                                            {" "}
                                            {ceremony.id_coffins_fk &&
                                                "Trumnie"}
                                        </>
                                    )}
                                </p>
                                <p className={styles.category}>
                                    ----- Dodatkowe -----
                                </p>
                                <p>
                                    <span>Transport: </span>
                                    {ceremony.transport ? "Tak" : "Nie"}
                                </p>
                                <p>
                                    <span>Przygotowanie ciała: </span>
                                    {ceremony.preparation_of_the_body
                                        ? "Tak"
                                        : "Nie"}
                                </p>
                                <p>
                                    <span>Namiot: </span>
                                    {ceremony.tent ? "Tak" : "Nie"}
                                </p>
                                <p>
                                    <span>Krzyż: </span>
                                    {ceremony.funeral_cross ? "Tak" : "Nie"}
                                </p>
                                <p>
                                    <span>Oprawa muzyczna: </span>
                                    {ceremony.musical_arrangement
                                        ? "Tak"
                                        : "Nie"}
                                </p>
                                <p>
                                    <span>Notatki(oprawa): </span>
                                    {ceremony.musical_notest}
                                </p>
                                <p>
                                    <span>Wieńce: </span>
                                    {ceremony.flowers ? "Tak" : "Nie"}
                                </p>
                                <p>
                                    <span>Notatki(wieńce): </span>
                                    {ceremony.flower_notes}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
}
