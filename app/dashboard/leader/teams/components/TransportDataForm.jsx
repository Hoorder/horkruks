"use client";

import { useEffect, useState } from "react";
import styles from "./TransportDataForm.module.css";
import { Input } from "@/app/dashboard/components/Input/Input";
import { Button } from "@/app/dashboard/components/Button/Button";

export function TransportDataForm({
    setIsClicked,
    isAdd,
    isEdited,
    editedTransportId,
}) {
    const [employees, setEmployees] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [succesMsg, setSuccesMsg] = useState("");
    const [isSending, setIsSending] = useState(false);

    const [teamName, setTeamName] = useState("");
    const [managerId, setManagerId] = useState(null);
    const [employeeId1, setEmployeeId1] = useState(null);
    const [employeeId2, setEmployeeId2] = useState(null);
    const [employeeId3, setEmployeeId3] = useState(null);
    const [employeeId4, setEmployeeId4] = useState(null);
    const [employeeId5, setEmployeeId5] = useState(null);
    const [employeeId6, setEmployeeId6] = useState(null);
    const [employeeId7, setEmployeeId7] = useState(null);

    useEffect(() => {
        const showEmployee = async () => {
            try {
                const response = await fetch("/api/leader/teams", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    setErrorMsg("Nie znaleźono żadnych pracowników");
                }

                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                setErrorMsg("Błąd poczas próby wyświetlenia danych");
            }
        };

        showEmployee();
    }, []);

    useEffect(() => {
        const showEditedTransport = async () => {
            try {
                const response = await fetch(
                    `/api/leader/teams/cu-teams/?editedTransportId=${editedTransportId}`
                );

                if (!response.ok) {
                    setErrorMsg("Nie znaleźono żadnych pracowników");
                }

                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                setErrorMsg("Błąd poczas próby wyświetlenia danych");
            }
        };

        showEditedTransport();
    }, [editedTransportId, succesMsg]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        if (
            !teamName ||
            !managerId ||
            !employeeId1 ||
            !employeeId2 ||
            !employeeId3 ||
            !employeeId4 ||
            !employeeId5 ||
            !employeeId6 ||
            !employeeId7
        ) {
            setIsSending(false);
            setErrorMsg("Nie podano wszystkich danych");
            setSuccesMsg("");
            return;
        }

        try {
            const response = await fetch("/api/leader/teams/cu-teams", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    teamName,
                    managerId,
                    employeeId1,
                    employeeId2,
                    employeeId3,
                    employeeId4,
                    employeeId5,
                    employeeId6,
                    employeeId7,
                }),
            });

            if (!response.ok) {
                setErrorMsg("Nie udało się wysłać danych");
                setSuccesMsg("");
                return;
            }

            setSuccesMsg("Zlecenie zostało wysłane!");
            setErrorMsg("");
            setTeamName("");
            setIsSending(false);
            setIsClicked(true);
        } catch (error) {
            setErrorMsg("Błąd podczas wysyłania");
            setSuccesMsg("");
        }
    };

    const onUpdate = async (e) => {
        e.preventDefault();

        if (!transportFrom || !transportTo || !orderingPhoneNumber) {
            setErrorMsg("Nie podano wszystkich danych do przewozu");
            setSuccesMsg("");
            return;
        }

        try {
            const response = await fetch(
                "/api/leader/order-transport/edit-transport",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        teamName,
                        managerId,
                        employeeId1,
                        employeeId2,
                        employeeId3,
                        employeeId4,
                        employeeId5,
                        employeeId6,
                        employeeId7,
                        editedTransportId,
                    }),
                }
            );

            if (!response.ok) {
                setErrorMsg("Nie udało się wysłać danych");
                setSuccesMsg("");
            }

            setSuccesMsg("Zlecenie zostało zaktualizowane!");
            setErrorMsg("");
            setTransportFrom("");
            setTransportTo("");
            setOrderingPhoneNumber("");
            setIsClicked(true);
        } catch (error) {
            setErrorMsg("Błąd podczas wysyłania");
            setSuccesMsg("");
        }
    };

    return (
        <>
            {isAdd && (
                <form className={styles.container} onSubmit={onSubmit}>
                    <div className={styles.stepName}>
                        <p>Podstawowe dane</p>
                    </div>

                    <Input
                        nameAndId={"nazwaZespolu"}
                        label={"Nazwa zespołu"}
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />

                    <div className={styles.inputContainer}>
                        <div className={styles.selectContainer}>
                            <label>Kierownik</label>

                            <select
                                onChange={(e) => {
                                    setManagerId(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "manager"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 1</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId1(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 2</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId2(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 3</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId3(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 4</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId4(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 5</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId5(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 6</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId6(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 7</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId7(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div
                        className={`${styles.inputContainer} ${styles.inputContainerBtn}`}
                    >
                        <Button fontSize="14px">
                            {isSending ? (
                                <p className={styles.loader}></p>
                            ) : (
                                "Stwórz zespół"
                            )}
                        </Button>
                    </div>
                    <p className={styles.errorMessage}>{errorMsg}</p>
                    <p className={styles.errorMessage}>{succesMsg}</p>
                </form>
            )}

            {isEdited && (
                <form className={styles.container} onSubmit={onUpdate}>
                    <div className={styles.stepName}>
                        <p>Aktualizowany zespół: {editedTransportId}</p>
                    </div>

                    <Input
                        nameAndId={"nazwaZespolu"}
                        label={"Nazwa zespołu"}
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />

                    <div className={styles.inputContainer}>
                        <div className={styles.selectContainer}>
                            <label>Kierownik</label>

                            <select
                                onChange={(e) => {
                                    setManagerId(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "manager"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 1</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId1(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 2</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId2(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 3</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId3(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 4</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId4(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 5</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId5(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 6</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId6(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.selectContainer}>
                            <label>Pracownik 7</label>
                            <select
                                onChange={(e) => {
                                    setEmployeeId7(e.target.value);
                                }}
                            >
                                <option value={null}></option>
                                {employees
                                    .filter(
                                        (employee) =>
                                            employee.position === "employee"
                                    )
                                    .map((employee) => (
                                        <option
                                            key={employee.id_users}
                                            value={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" / "}
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div
                        className={`${styles.inputContainer} ${styles.inputContainerBtn}`}
                    >
                        <Button fontSize="14px">
                            {isSending ? (
                                <p className={styles.loader}></p>
                            ) : (
                                "Aktualizuj zespół"
                            )}
                        </Button>
                    </div>
                    <p className={styles.errorMessage}>{errorMsg}</p>
                    <p className={styles.errorMessage}>{succesMsg}</p>
                </form>
            )}
        </>
    );
}
