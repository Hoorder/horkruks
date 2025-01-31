"use client";

import { useEffect, useState } from "react";
import styles from "./HelloNav.module.css";
import { useRouter } from "next/navigation";

export function HelloNav() {
    const [name, setName] = useState("");
    const [firstLetter, setFirstLetter] = useState("");
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchName = async () => {
            try {
                const response = await fetch("/api/session");

                if (!response.ok)
                    throw new Error("Błąd podczas ładowania imienia");

                const { username } = await response.json();
                setName(username);
                setFirstLetter(
                    username ? username.charAt(0).toUpperCase() : ""
                );
            } catch (error) {
                console.error(error);
            }
        };

        fetchName();
    }, []);

    const handleCLickLogOut = async () => {
        try {
            const response = await fetch("/api/session", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok)
                throw new Error(
                    `Nie udało się pobrać danych z sesji: ${response.statusText}`
                );

            router.replace("/auth/login");
            return;
        } catch (error) {
            console.error("Błąd w trakcie żądania:", error);
        }
    };

    function handleClick() {
        setIsActive((prev) => !prev);
    }

    return (
        <div className={styles.container}>
            <div className={styles.welcome}>
                <p>Witaj, {name}!</p>
            </div>

            <div className={styles.photo} onClick={handleClick}>
                <p>{firstLetter}</p>
            </div>

            <div
                className={`${styles.actions} ${
                    isActive ? styles.visible : ""
                }`}
            >
                <button className={styles.logOut} onClick={handleCLickLogOut}>
                    Wyloguj się
                </button>
            </div>
        </div>
    );
}
