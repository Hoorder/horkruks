"use client";

import { Button } from "../../../components/Button/Button";
import styles from "./page.module.css";
import { useFormContext } from "../context/FormContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/app/dashboard/components/Input/Input";

export default function StepFive() {
    const { state, dispatch } = useFormContext();
    const router = useRouter();

    const [chooseTeam, setChooseTeam] = useState(false);
    const [createTeam, setCreateTeam] = useState(false);

    const [manager, setManager] = useState(state.manager);
    const [mournerOne, setMournerOne] = useState(state.mournerOne);
    const [mournerTwo, setMournerTwo] = useState(state.mournerTwo);
    const [mournerThree, setMournerThree] = useState(state.mournerThree);
    const [mournerFour, setMournerFour] = useState(state.mournerFour);
    const [mournerFive, setMournerFive] = useState(state.mournerFive);
    const [mournerSix, setMournerSix] = useState(state.mournerSix);
    const [mournerSeven, setMournerSeven] = useState(state.mournerSeven);

    const [errorMsg, setErrorMsg] = useState("");
    const [teamData, setTeamData] = useState([]);
    const [schowTeams, setSchowTeams] = useState([]);

    const [schowManagers, setSchowManagers] = useState([]);
    const [schowEmployee, setSchowEmployee] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch({
            type: "SET_FIELD",
            field: "manager",
            value: manager,
        });
        dispatch({
            type: "SET_FIELD",
            field: "mournerOne",
            value: mournerOne,
        });
        dispatch({
            type: "SET_FIELD",
            field: "mournerTwo",
            value: mournerTwo,
        });
        dispatch({
            type: "SET_FIELD",
            field: "mournerThree",
            value: mournerThree,
        });
        dispatch({
            type: "SET_FIELD",
            field: "mournerFour",
            value: mournerFour,
        });
        dispatch({
            type: "SET_FIELD",
            field: "mournerFive",
            value: mournerFive,
        });
        dispatch({
            type: "SET_FIELD",
            field: "mournerSix",
            value: mournerSix,
        });
        dispatch({
            type: "SET_FIELD",
            field: "mournerSeven",
            value: mournerSeven,
        });

        dispatch({ type: "NEXT_STEP" });
        router.push("/dashboard/leader/funeral-configurator/step-six");
    };

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const [response1, response2, response3] = await Promise.all([
                    fetch(`/api/leader/funeral-configurator/show-team`),
                    fetch(
                        `/api/leader/funeral-configurator/create-team/manager`
                    ),
                    fetch(
                        `/api/leader/funeral-configurator/create-team/employee`
                    ),
                ]);

                if (!response1.ok || !response2.ok || !response3.ok) {
                    const fetchError1 = await response1.json();
                    const fetchError2 = await response2.json();
                    const fetchError3 = await response3.json();
                    setErrorMsg(
                        fetchError1.error ||
                            fetchError2.error ||
                            fetchError3.error
                    );
                    return;
                }

                const data1 = await response1.json();
                const data2 = await response2.json();
                const data3 = await response3.json();

                setSchowTeams(data1);
                setSchowManagers(data2);
                setSchowEmployee(data3);
            } catch (error) {
                setErrorMsg(`Sprawdź end-point: ${error}`);
            }
        };

        dataFetch();
    }, []);

    const handleChooseTeam = async (teamId) => {
        console.log(teamId);

        try {
            const response = await fetch(
                `/api/leader/funeral-configurator/funeral-teams?selectedId=${teamId}`
            );

            if (!response.ok) {
                const fetchError = await response.json();
                setErrorMsg(fetchError.error);
                return;
            }

            const data = await response.json();
            setTeamData(data);

            setManager(data[0].team_manager_id_fk);
            setMournerOne(data[0].mourner_one_id_fk);
            setMournerTwo(data[0].mourner_two_id_fk);
            setMournerThree(data[0].mourner_three_id_fk);
            setMournerFour(data[0].mourner_four_id_fk);
            setMournerFive(data[0].mourner_five_id_fk);
            setMournerSix(data[0].mourner_six_id_fk);
            setMournerSeven(data[0].mourner_seven_id_fk);
        } catch (error) {
            setErrorMsg(`Sprawdź end-point: ${error}`);
        }
    };

    return (
        <>
            <form className={styles.container} onSubmit={onSubmit}>
                <div className={styles.stepName}>
                    <p>Dobierz zespół ceremonialny</p>
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.options}>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="chooseTeam"
                                    name="funeralTeamOrNo"
                                    value="coffin"
                                    onChange={() => {
                                        setChooseTeam(true);
                                        setCreateTeam(false);
                                    }}
                                />
                                <label htmlFor="chooseTeam">
                                    Wybierz zespół
                                </label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="createTeam"
                                    name="funeralTeamOrNo"
                                    value="urn"
                                    onChange={() => {
                                        setCreateTeam(true);
                                        setChooseTeam(false);
                                    }}
                                />
                                <label htmlFor="createTeam">
                                    Stwórz zespół
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {chooseTeam && (
                    <>
                        <div className={styles.inputContainer}>
                            <select
                                id="selectTeam"
                                className={styles.select}
                                onChange={(e) =>
                                    handleChooseTeam(e.target.value)
                                }
                            >
                                <option value="">Wybierz</option>
                                {schowTeams.map((team) => (
                                    <option
                                        value={team.id_teams}
                                        key={team.id_teams}
                                    >
                                        {team.team_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {teamData.map((team) => (
                            <div key={team.id_teams}>
                                <div className={styles.inputContainer}>
                                    <Input
                                        label="Nazwa zespołu"
                                        value={team.team_name}
                                        disabled
                                    />
                                    <Input
                                        label="Kierownik"
                                        value={team.manager}
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <Input
                                        label="Żałobnik 1"
                                        value={team.mourner_one}
                                        disabled
                                    />
                                    <Input
                                        label="Żałobnik 2"
                                        value={team.mourner_two}
                                        disabled
                                    />
                                    <Input
                                        label="Żałobnik 3"
                                        value={team.mourner_three}
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <Input
                                        label="Żałobnik 4"
                                        value={team.mourner_four}
                                        disabled
                                    />
                                    <Input
                                        label="Żałobnik 5"
                                        value={team.mourner_five}
                                        disabled
                                    />
                                    <Input
                                        label="Żałobnik 6"
                                        value={team.mourner_six}
                                        disabled
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <Input
                                        label="Żałobnik 7"
                                        value={team.mourner_seven}
                                        disabled
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {createTeam && (
                    <>
                        <div className={styles.inputContainer}>
                            <div className={styles.selectContainer}>
                                <label>Manager</label>

                                <select
                                    onChange={(e) => setManager(e.target.value)}
                                >
                                    <option value=""></option>
                                    {schowManagers.map((manager) => (
                                        <option
                                            value={manager.id_users}
                                            key={manager.id_users}
                                        >
                                            {" "}
                                            {manager.id_users}
                                            {" - "}
                                            {manager.first_name}{" "}
                                            {manager.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.inputContainer}>
                            <div className={styles.selectContainer}>
                                <label>Żałobnik 1</label>
                                <select
                                    onChange={(e) =>
                                        setMournerOne(e.target.value)
                                    }
                                >
                                    <option value=""></option>
                                    {schowEmployee.map((employee) => (
                                        <option
                                            value={employee.id_users}
                                            key={employee.id_users}
                                        >
                                            {" "}
                                            {employee.id_users}
                                            {" - "}
                                            {employee.first_name}{" "}
                                            {employee.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.selectContainer}>
                                <label>Żałobnik 2</label>
                                <select
                                    onChange={(e) =>
                                        setMournerTwo(e.target.value)
                                    }
                                >
                                    <option value=""></option>
                                    {schowEmployee.map((employee) => (
                                        <option
                                            value={employee.id_users}
                                            key={employee.id_users}
                                        >
                                            {" "}
                                            {employee.id_users}
                                            {" - "}
                                            {employee.first_name}{" "}
                                            {employee.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.selectContainer}>
                                <label>Żałobnik 3</label>
                                <select
                                    onChange={(e) =>
                                        setMournerThree(e.target.value)
                                    }
                                >
                                    <option value=""></option>
                                    {schowEmployee.map((employee) => (
                                        <option
                                            value={employee.id_users}
                                            key={employee.id_users}
                                        >
                                            {" "}
                                            {employee.id_users}
                                            {" - "}
                                            {employee.first_name}{" "}
                                            {employee.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.selectContainer}>
                                <label>Żałobnik 4</label>
                                <select
                                    onChange={(e) =>
                                        setMournerFour(e.target.value)
                                    }
                                >
                                    <option value=""></option>
                                    {schowEmployee.map((employee) => (
                                        <option
                                            value={employee.id_users}
                                            key={employee.id_users}
                                        >
                                            {" "}
                                            {employee.id_users}
                                            {" - "}
                                            {employee.first_name}{" "}
                                            {employee.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.selectContainer}>
                                <label>Żałobnik 5</label>
                                <select
                                    onChange={(e) =>
                                        setMournerFive(e.target.value)
                                    }
                                >
                                    <option value=""></option>
                                    {schowEmployee.map((employee) => (
                                        <option
                                            value={employee.id_users}
                                            key={employee.id_users}
                                        >
                                            {" "}
                                            {employee.id_users}
                                            {" - "}
                                            {employee.first_name}{" "}
                                            {employee.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.selectContainer}>
                                <label>Żałobnik 6</label>
                                <select
                                    onChange={(e) =>
                                        setMournerSix(e.target.value)
                                    }
                                >
                                    <option value=""></option>
                                    {schowEmployee.map((employee) => (
                                        <option
                                            value={employee.id_users}
                                            key={employee.id_users}
                                        >
                                            {" "}
                                            {employee.id_users}
                                            {" - "}
                                            {employee.first_name}{" "}
                                            {employee.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <div className={styles.selectContainer}>
                                <label>Żałobnik 7</label>
                                <select
                                    onChange={(e) =>
                                        setMournerSeven(e.target.value)
                                    }
                                >
                                    <option value=""></option>
                                    {schowEmployee.map((employee) => (
                                        <option
                                            value={employee.id_users}
                                            key={employee.id_users}
                                        >
                                            {employee.id_users}
                                            {" - "}
                                            {employee.first_name}{" "}
                                            {employee.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </>
                )}

                <div className={`${styles.inputContainer} ${styles.button}`}>
                    <Button type="submit">Dalej</Button>
                </div>
            </form>
        </>
    );
}
