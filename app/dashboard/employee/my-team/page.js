"use client";

import { useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import styles from "./MyTeam.module.css";

export default function MyTeam() {
    const [isLoading, setIsLoading] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [errorMsg, setErrorMsg] = useState();

    useEffect(() => {
        setIsLoading(true);
        const fetchTeamData = async () => {
            try {
                const response = await fetch("/api/user/my-team");

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
                <p>Aktualny zespół ceremonialny</p>
                <p>Sprawdź swój zespół, do którego jesteś przypisany</p>
            </div>

            {isLoading && <p className={styles.loadingMsg}>Ładowanie...</p>}
            {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

            {!isLoading &&
                !errorMsg &&
                teamData.map((team) => (
                    <div className={styles.wrapper} key={team.id_teams}>
                        <div className={styles.teamCard}>
                            <div className={styles.sectionTitle}>
                                <p>Podstawowe dane</p>
                                <div className="bar"></div>
                            </div>

                            <div className={styles.inputContainer}>
                                <Input
                                    label={"Nazwa zespołu"}
                                    nameAndId={"teamName"}
                                    disabled={true}
                                    value={team.team_name}
                                />
                                <Input
                                    label={"Kierownik"}
                                    nameAndId={"teamLeader"}
                                    disabled={true}
                                    value={team.manager_name}
                                />
                            </div>
                        </div>

                        <div className={styles.teamCard}>
                            <div className={styles.sectionTitle}>
                                <p>Skład obsługi</p>
                                <div className="bar"></div>
                            </div>
                            <div className={styles.inputContainer}>
                                <Input
                                    label={"Żałobnik 1"}
                                    disabled={true}
                                    nameAndId={"mournerOne"}
                                    value={team.mourner_one_name}
                                />
                                <Input
                                    label={"Żałobnik 2"}
                                    disabled={true}
                                    nameAndId={"mournerTwo"}
                                    value={team.mourner_two_name}
                                />
                                <Input
                                    label={"Żałobnik 3"}
                                    disabled={true}
                                    nameAndId={"mournerThree"}
                                    value={team.mourner_three_name}
                                />
                                <Input
                                    label={"Żałobnik 4"}
                                    disabled={true}
                                    nameAndId={"mournerFour"}
                                    value={team.mourner_four_name}
                                />
                                <Input
                                    label={"Żałobnik 5"}
                                    disabled={true}
                                    nameAndId={"mournerFive"}
                                    value={team.mourner_five_name}
                                />
                                <Input
                                    label={"Żałobnik 6"}
                                    disabled={true}
                                    nameAndId={"mournerSix"}
                                    value={team.mourner_six_name}
                                />
                                <Input
                                    label={"Żałobnik 7"}
                                    disabled={true}
                                    nameAndId={"mournerSeven"}
                                    value={team.mourner_seven_name}
                                />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}
