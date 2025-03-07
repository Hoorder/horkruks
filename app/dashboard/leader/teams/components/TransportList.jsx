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
    const [teamsData, setTeamsData] = useState([]);
    const [errorMsg, setErrorMsg] = useState();
    const [succesMsg, setSuccesMsg] = useState();

    useEffect(() => {
        const showTransports = async () => {
            try {
                const response = await fetch("/api/leader/teams");

                if (!response.ok) {
                    setErrorMsg("Brak danych do wyświetlenia");
                }

                const data = await response.json();
                setTeamsData(data);
            } catch (error) {
                setErrorMsg("Błąd poczas próby wyświetlenia");
            }
        };

        showTransports();
    }, [isClicked]);

    const deleteTeam = async (teamId) => {
        const confirmDelete = window.confirm(
            "Czy na pewno chcesz usunąć zespół?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch("/api/leader/teams", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ teamId }),
            });

            if (!response.ok) {
                setErrorMsg("Błąd podczas usuwania");
                setSuccesMsg("");
                return;
            }

            setTeamsData((prevTasks) =>
                prevTasks.filter(
                    (task) => task.id_teams !== teamId
                )
            );

            setSuccesMsg("Pomyślnie usunięto zespół");
            setErrorMsg("");
        } catch (error) {
            setErrorMsg("Błąd poczas próby wyświetlenia");
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <p>Zespoły obsługi</p>
                    <p>Kliknij na dany zespół aby zobaczyć szczegółowy skład</p>
                </div>

                <div className={styles.body}>
                    <button
                        className={styles.button}
                        onClick={() => {
                            setIsAdd(true);
                            setIsEdited(false);
                        }}
                    >
                        Dodaj zespół
                    </button>

                    <div className={styles.tableContainer}>
                        <p className={styles.errorMsg}>{errorMsg}</p>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Kierownik</th>
                                    <th>Nazwa zespołu</th>
                                    <th>Akcja</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamsData.map((team) => (
                                    <tr key={team.id_teams}>
                                        <td>{team.id_teams}</td>
                                        <td>{team.manager}</td>
                                        <td>{team.team_name}</td>
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
                                                            team.id_teams
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
                                                        deleteTeam(
                                                            team.id_teams
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
