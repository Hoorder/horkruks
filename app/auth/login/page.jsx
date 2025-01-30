"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { FullCurretDate } from "../components/FullCurretDate/FullCurretDate";
import styles from "./page.module.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrMsg, setLoginErrMsg] = useState("");
    const router = useRouter();

    const rolePath = {
        leader: "/dashboard/leader",
        manager: "/dashboard/manager",
        employee: "/dashboard/employee",
    };

    //TODO: Zrobić w obiekcie opcje idąc od usera np. user ma 4 opcje managerowi dodają sie dwie kolejne a leaderowi 5 kolejnych i wyswietlac je w zlaoznosci od rangi ranga usera / ranga usera + manager / leader

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch("/api/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 401) {
                    setLoginErrMsg(errorData.error);
                } else {
                    throw new Error(`Resp: ${response.statusText}`);
                }
                return;
            }

            const loginData = await response.json();
            const destination = rolePath[loginData.role];

            if (destination) {
                router.replace(destination);
            }
        } catch (error) {
            console.error("Błąd w trakcie żądania:", error);
        }
    };

    function employeeLogin() {
        setEmail("mateusz.gergont@o2.pl");
        setPassword("7822Dupaa");
    }

    function leaderLogin() {
        setEmail("kamil.czenczek@o2.pl");
        setPassword("7822Dupaa");
    }

    return (
        <>
            <nav className={styles.nav}>
                <FullCurretDate />
            </nav>
            <div className={styles.container}>
                <Image
                    src="/logo.svg"
                    width={500}
                    height={130}
                    alt="Picture of the author"
                    priority={true}
                />
                <p>System do zarządzania zakładem pogrzebowym</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">E-mail:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <label htmlFor="name">Hasło:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br />
                    <br />
                    <button type="submit">Zaloguj</button>
                    <p>{loginErrMsg}</p>
                </form>

                <button onClick={employeeLogin}>Employee</button>
                <button onClick={leaderLogin}>Leader</button>
            </div>
        </>
    );
}
