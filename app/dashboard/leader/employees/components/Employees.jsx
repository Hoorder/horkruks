"use client";

import Image from "next/image";
import styles from "./Employees.module.css";
import { useEffect, useState } from "react";
import { EmployeeDetails } from "./EmployeeDetails";

export function Employees() {
    const [employeeData, setEmployeeData] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [refresh, setRefresh] = useState(false);
    const [accountStatus, setAccountStatus] = useState("active");

    const [cEmployeedId, setCEmployeedId] = useState();

    const [hide, setHide] = useState(true);

    useEffect(() => {
        const showEmployees = async () => {
            try {
                const response = await fetch("/api/leader/employee", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ accountStatus }),
                });

                if (!response.ok) {
                    setErrorMessage("Nie znaleziono pracowników");
                    setSuccessMessage("");
                    return;
                }

                const data = await response.json();
                setEmployeeData(data);
            } catch (error) {
                console.error(error);
            }
        };

        showEmployees();
    }, [refresh]);

    const handleDeleteEmployee = async (employeeId) => {
        const confirmDelete = window.confirm(
            "Czy na pewno chcesz usunąć tego pracownika?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const respone = await fetch("/api/leader/employee", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ employeeId }),
            });

            if (!respone.ok) {
                const error = await respone.json();
                console.log(error);
            }

            setRefresh((prev) => !prev);
        } catch (error) {
            console.log("Sprawdź API");
        }
    };

    const handleChangeAccoutStatus = async (employeeId, accountStatus) => {
        const confirmDelete = window.confirm(
            "Czy na pewno chcesz zablokować pracownika?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const respone = await fetch("/api/leader/employee", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ employeeId, accountStatus }),
            });

            if (!respone.ok) {
                const error = await respone.json();
                console.log(error);
            }

            setRefresh((prev) => !prev);
        } catch (error) {
            console.log("Sprawdź API");
        }
    };

    return (
        <>
            {hide ? null : <EmployeeDetails employeeId={cEmployeedId} />}

            <div className={styles.container}>
                <div className={styles.dataFilterButtonContainer}>
                    <button
                        className={
                            accountStatus === "active" ? styles.activeBtn : null
                        }
                        value={"active"}
                        onClick={(e) => {
                            setAccountStatus(e.target.value);
                            setRefresh((prev) => !prev);
                        }}
                    >
                        Aktywni
                    </button>
                    <button
                        className={
                            accountStatus === "blocked"
                                ? styles.activeBtn
                                : null
                        }
                        value={"blocked"}
                        onClick={(e) => {
                            setAccountStatus(e.target.value);
                            setRefresh((prev) => !prev);
                        }}
                    >
                        Zablokowani
                    </button>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imię</th>
                                <th>Nazwisko</th>
                                <th>Numer telefonu</th>
                                <th>Obsługuje</th>
                                <th>Rola</th>
                                <th>Uwagi</th>
                                <th>Akcja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeData.map((employee) => (
                                <tr key={employee.id_users}>
                                    <td>{employee.id_users}</td>
                                    <td>{employee.first_name}</td>
                                    <td>{employee.last_name}</td>
                                    <td>{employee.phone_number}</td>
                                    <td>{employee.role_handling}</td>
                                    <td>{employee.position}</td>
                                    <td>
                                        {employee.notes
                                            ? employee.notes
                                            : "Brak"}
                                    </td>
                                    <td>
                                        <div
                                            className={styles.tdActionContainer}
                                        >
                                            <Image
                                                className={styles.editBtn}
                                                src={"/user-settingss.svg"}
                                                width={"20"}
                                                height={"20"}
                                                alt="Edit"
                                                onClick={() => {
                                                    setHide(false);
                                                    setCEmployeedId(
                                                        employee.id_users
                                                    );
                                                }}
                                            />
                                            {accountStatus === "active" ? (
                                                <Image
                                                    className={styles.deleteBtn}
                                                    src={"/slash.svg"}
                                                    width={"20"}
                                                    height={"20"}
                                                    alt="Block"
                                                    onClick={() =>
                                                        handleChangeAccoutStatus(
                                                            employee.id_users,
                                                            "blocked"
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <Image
                                                    className={styles.deleteBtn}
                                                    src={"/plus-circlee.svg"}
                                                    width={"20"}
                                                    height={"20"}
                                                    alt="active"
                                                    onClick={() =>
                                                        handleChangeAccoutStatus(
                                                            employee.id_users,
                                                            "active"
                                                        )
                                                    }
                                                />
                                            )}
                                            <Image
                                                className={styles.deleteBtn}
                                                src={"/user-cross.svg"}
                                                width={"20"}
                                                height={"20"}
                                                alt="Delete"
                                                onClick={() =>
                                                    handleDeleteEmployee(
                                                        employee.id_users
                                                    )
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
