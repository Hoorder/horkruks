"use client";

import { useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import styles from "./MyTeam.module.css";

export default function Settings() {
    const [isLoading, setIsLoading] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [errorMsg, setErrorMsg] = useState();

    useEffect(() => {
        setIsLoading(true);
        const fetchTeamData = async () => {
            try {
                const response = await fetch("/api/user/settings");

                if (!response.ok) {
                    const errorData = await response.json();
                    setErrorMsg(errorData.error);
                    return;
                }

                const teamData = await response.json();
                setTeamData(teamData);
            } catch (error) {
                setErrorMsg("Sprawdź połączenie z end-pointem.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeamData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <p>Zarządzanie profilem</p>
                <p>Sprawdź swoje dane osobowe i finansowe</p>
            </div>

            {isLoading && <p className={styles.loadingMsg}>Ładowanie...</p>}
            {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

            {!isLoading &&
                !errorMsg &&
                teamData.map((team) => (
                    <div className={styles.wrapper} key={team.id_users}>
                        <div className={styles.teamCard}>
                            <div className={styles.sectionTitle}>
                                <p>Dane osobowe</p>
                                <div className="bar"></div>
                            </div>

                            <div className={styles.inputContainer}>
                                <Input
                                    label={"Imię"}
                                    nameAndId={"userName"}
                                    disabled={true}
                                    value={team.first_name}
                                />
                                <Input
                                    label={"Nazwisko"}
                                    nameAndId={"userSurname"}
                                    disabled={true}
                                    value={team.last_name}
                                />
                                <Input
                                    label={"Numer telefonu"}
                                    nameAndId={"userPhoneNr"}
                                    disabled={true}
                                    value={team.phone_number}
                                />
                                <Input
                                    label={"Obsługje"}
                                    nameAndId={"userObs"}
                                    disabled={true}
                                    value={team.role_handling}
                                />
                                <Input
                                    label={"Zespół"}
                                    nameAndId={"userTeam"}
                                    disabled={true}
                                    value={team.team_name}
                                />
                                <Input
                                    label={"Stanowisko"}
                                    nameAndId={"userRole"}
                                    disabled={true}
                                    value={team.position}
                                />
                            </div>
                        </div>

                        <div className={styles.teamCard}>
                            <div className={styles.sectionTitle}>
                                <p>Dane finansowe</p>
                                <div className="bar"></div>
                            </div>
                            <div className={styles.inputContainer}>
                                <Input
                                    label={"Obsługa pogrzebu"}
                                    disabled={true}
                                    nameAndId={"userFuneralFee"}
                                    value={team.funeral_service}
                                />
                                <Input
                                    label={"Przewóz zwłok"}
                                    disabled={true}
                                    nameAndId={"userTransportFee"}
                                    value={team.transport_body}
                                />
                                <Input
                                    label={"Przygotowanie zwłok"}
                                    disabled={true}
                                    nameAndId={"userBodyPrepFee"}
                                    value={team.hourly_rate}
                                />
                                <Input
                                    label={"Stawka godzinowa"}
                                    disabled={true}
                                    nameAndId={"userHourlyFee"}
                                    value={team.dressing_body}
                                />
                            </div>
                        </div>

                        <div className={styles.teamCard}>
                            <div className={styles.sectionTitle}>
                                <p>Dane logowania</p>
                                <div className="bar"></div>
                            </div>
                            <div className={styles.inputContainer}>
                                <Input
                                    label={"E-mail"}
                                    disabled={true}
                                    nameAndId={"userEmail"}
                                    value={team.email}
                                />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}
