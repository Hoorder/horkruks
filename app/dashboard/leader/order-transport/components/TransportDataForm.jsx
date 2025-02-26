"use client";

import { useEffect, useState } from "react";
import styles from "./TransportDataForm.module.css";
import { Input } from "@/app/dashboard/components/Input/Input";
import { Button } from "@/app/dashboard/components/Button/Button";
import { sendTransportAddEmail } from "../../funeral-configurator/lib/email";

export function TransportDataForm({
    setIsClicked,
    isAdd,
    isEdited,
    editedTransportId,
}) {
    const [employees, setEmployees] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [succesMsg, setSuccesMsg] = useState("");

    const [managerId, setManagerId] = useState(null);
    const [employeeId, setEmployeeId] = useState(null);
    const [maganerEmail, setManagerEmail] = useState();
    const [employeeEmail, setEmployeeEmail] = useState();
    const [transportFrom, setTransportFrom] = useState("");
    const [transportTo, setTransportTo] = useState("");
    const [orderingPhoneNumber, setOrderingPhoneNumber] = useState("");

    const [editedTransportData, setEditedTransportData] = useState("");

    useEffect(() => {
        const showEmployee = async () => {
            try {
                const response = await fetch(
                    "/api/leader/order-transport/add-transport"
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

        showEmployee();
    }, []);

    useEffect(() => {
        const showEditedTransport = async () => {
            try {
                const response = await fetch(
                    `/api/leader/order-transport/edit-transport?editedTransportId=${editedTransportId}`
                );

                if (!response.ok) {
                    setErrorMsg("Nie znaleźono żadnych pracowników");
                }

                const data = await response.json();
                setEditedTransportData(data);
            } catch (error) {
                setErrorMsg("Błąd poczas próby wyświetlenia danych");
            }
        };

        showEditedTransport();
    }, [editedTransportId, succesMsg]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (
            !managerId ||
            !employeeId ||
            !transportFrom ||
            !transportTo ||
            !orderingPhoneNumber
        ) {
            setErrorMsg("Nie podano wszystkich danych do przewozu");
            setSuccesMsg("");
            return;
        }

        const dataToSend = {
            managerId,
            employeeId,
            transportFrom,
            transportTo,
            orderingPhoneNumber,
        };

        try {
            const response = await fetch(
                "/api/leader/order-transport/add-transport",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataToSend),
                }
            );

            if (!response.ok) {
                setErrorMsg("Nie udało się wysłać danych");
                setSuccesMsg("");
            }

            const { id_transport_order } = await response.json();

            const tasksDataToSend = {
                id_transport_order,
                managerId,
                employeeId,
                transportFrom,
            };

            const addTasksResponse = await fetch(
                "/api/leader/order-transport/add-transport-tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(tasksDataToSend),
                }
            );

            if (!addTasksResponse.ok) {
                setErrorMsg("Nie udało się wysłać danych");
                setSuccesMsg("");
            }

            try {
                const result = await sendTransportAddEmail(
                    `w65470@student.wsiz.edu.pl`,
                    transportFrom,
                    transportTo,
                    orderingPhoneNumber
                );
                console.log("E-mail wysłany pomyślnie");
            } catch (error) {
                console.error("Błąd podczas wysyłania e-maila:", error);
            }

            setSuccesMsg("Zlecenie zostało wysłane!");
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

    const onUpdate = async (e) => {
        e.preventDefault();

        if (!transportFrom || !transportTo || !orderingPhoneNumber) {
            setErrorMsg("Nie podano wszystkich danych do przewozu");
            setSuccesMsg("");
            return;
        }

        const dataToSend = {
            transportFrom,
            transportTo,
            orderingPhoneNumber,
            editedTransportId,
        };

        try {
            const response = await fetch(
                "/api/leader/order-transport/edit-transport",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataToSend),
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
                        <p>Dane potrzebne do przewozu</p>
                    </div>

                    <div className={styles.inputContainer}>
                        <div className={styles.selectContainer}>
                            <label>Kierownik</label>

                            <select
                                onChange={(e) => setManagerId(e.target.value)}
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
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                            {/* <select
                                onChange={(e) => {
                                    const selectedEmployee = employees.find(
                                        (emp) => emp.id_users === e.target.value
                                    );
                                    setManagerId(e.target.value);
                                    setManagerEmail(
                                        selectedEmployee
                                            ? selectedEmployee.email
                                            : ""
                                    ); // Ustawienie e-maila menedżera
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
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select> */}
                        </div>
                        <div className={styles.selectContainer}>
                            <label>Pracownik</label>
                            <select
                                onChange={(e) => setEmployeeId(e.target.value)}
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
                                            {employee.employeeData}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.inputContainer}>
                        <Input
                            nameAndId={"TransportZ"}
                            label={"Transport z"}
                            value={transportFrom}
                            onChange={(e) => setTransportFrom(e.target.value)}
                        />
                        <Input
                            nameAndId={"TransportTo"}
                            label={"Transport do"}
                            value={transportTo}
                            onChange={(e) => setTransportTo(e.target.value)}
                        />
                    </div>

                    <Input
                        min={1}
                        max={999999999}
                        type="number"
                        nameAndId={"orderingPhoneNumber"}
                        label={"Numer tel. zleceniodawcy"}
                        value={orderingPhoneNumber}
                        onChange={(e) => setOrderingPhoneNumber(e.target.value)}
                    />
                    <div className={styles.inputContainer}>
                        <Button fontSize="14px">Zleć przewóz</Button>
                    </div>
                    <p className={styles.errorMessage}>{errorMsg}</p>
                    <p className={styles.errorMessage}>{succesMsg}</p>
                </form>
            )}

            {isEdited && (
                <form className={styles.container} onSubmit={onUpdate}>
                    <div className={styles.stepName}>
                        <p>Edytujesz przewóz nr.{editedTransportId}</p>
                    </div>

                    <div className={styles.inputContainer}>
                        {editedTransportData.map((transport) => (
                            <Input
                                disabled
                                key={transport.id_transport_orders}
                                nameAndId={"Kierownik"}
                                label={"Kierownik"}
                                value={transport.manager}
                            />
                        ))}

                        {editedTransportData.map((transport) => (
                            <Input
                                disabled
                                key={transport.id_transport_orders}
                                nameAndId={"Pracownik"}
                                label={"Pracownik"}
                                value={transport.employee}
                            />
                        ))}
                    </div>

                    <div className={styles.inputContainer}>
                        {editedTransportData.map((transport) => (
                            <Input
                                key={transport.id_transport_orders}
                                nameAndId={"TransportZ"}
                                label={"Transport z"}
                                placeholder={transport.transport_from}
                                value={transportFrom}
                                onChange={(e) =>
                                    setTransportFrom(e.target.value)
                                }
                            />
                        ))}
                        {editedTransportData.map((transport) => (
                            <Input
                                key={transport.id_transport_orders}
                                nameAndId={"TransportTo"}
                                label={"Transport do"}
                                placeholder={transport.transport_to}
                                value={transportTo}
                                onChange={(e) => setTransportTo(e.target.value)}
                            />
                        ))}
                    </div>
                    {editedTransportData.map((transport) => (
                        <Input
                            key={transport.id_transport_orders}
                            min={1}
                            max={999999999}
                            type="number"
                            nameAndId={"orderingPhoneNumber"}
                            label={"Numer tel. zleceniodawcy"}
                            placeholder={transport.contact_number}
                            value={orderingPhoneNumber}
                            onChange={(e) =>
                                setOrderingPhoneNumber(e.target.value)
                            }
                        />
                    ))}
                    <div className={styles.inputContainer}>
                        <Button fontSize="14px">Zapisz</Button>
                    </div>
                    <p className={styles.errorMessage}>{errorMsg}</p>
                    <p className={styles.succesMessage}>{succesMsg}</p>
                </form>
            )}
        </>
    );
}
