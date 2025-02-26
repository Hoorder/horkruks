"use client";

import { useEffect, useState } from "react";
import styles from "./TransportList.module.css";
import Image from "next/image";

export function TransportList({
    isClicked,
    setIsAdd,
    setIsEdited,
    setEditedTransportId,
}) {
    const [transportData, setTransportData] = useState([]);
    const [errorMsg, setErrorMsg] = useState();

    useEffect(() => {
        const showTransports = async () => {
            try {
                const response = await fetch("/api/leader/order-transport");

                if (!response.ok) {
                    setErrorMsg("Brak danych do wyświetlenia");
                }

                const data = await response.json();
                setTransportData(data);
            } catch (error) {
                setErrorMsg("Błąd poczas próby wyświetlenia");
            }
        };

        showTransports();
    }, [isClicked]);

    const deleteTransportOrder = async (transportOrderId) => {
        const confirmDelete = window.confirm(
            "Czy na pewno chcesz usunąć to zlecenie?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                "/api/leader/order-transport/edit-transport",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ transportOrderId }),
                }
            );

            if (!response.ok) {
                setErrorMsg("Błąd podczas usuwania");
            }

            setTransportData((prevTasks) =>
                prevTasks.filter(
                    (task) => task.id_transport_orders !== transportOrderId
                )
            );
        } catch (error) {
            setErrorMsg("Błąd poczas próby wyświetlenia");
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <p>Historia przewozów</p>
                    <p>
                        Kliknij na dany przejazd aby sprawdzić szczegóły
                        zlecenia
                    </p>
                </div>

                <div className={styles.body}>
                    <button
                        className={styles.button}
                        onClick={() => {
                            setIsAdd(true);
                            setIsEdited(false);
                        }}
                    >
                        Dodaj przewóz
                    </button>

                    <div className={styles.tableContainer}>
                        <p className={styles.errorMsg}>{errorMsg}</p>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Kierownik</th>
                                    <th>Miejsce</th>
                                    <th>Akcja</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transportData.map((transport) => (
                                    <tr key={transport.id_transport_orders}>
                                        <td>{transport.id_transport_orders}</td>
                                        <td>{transport.manager_name}</td>
                                        <td>{transport.transport_from}</td>
                                        <td>
                                            <div
                                                className={
                                                    styles.tdActionContainer
                                                }
                                            >
                                                <Image
                                                    className={styles.editBtn}
                                                    onClick={() => {
                                                        setIsAdd(false);
                                                        setIsEdited(true);
                                                        setEditedTransportId(
                                                            transport.id_transport_orders
                                                        );
                                                    }}
                                                    src={"/pencil-edit.svg"}
                                                    width={"20"}
                                                    height={"20"}
                                                    alt="Delete"
                                                />

                                                <Image
                                                    className={styles.editBtn}
                                                    onClick={() =>
                                                        deleteTransportOrder(
                                                            transport.id_transport_orders
                                                        )
                                                    }
                                                    src={"/trash.svg"}
                                                    width={"20"}
                                                    height={"20"}
                                                    alt="Delete"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
