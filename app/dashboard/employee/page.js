"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch("/api/session", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok)
                    throw new Error(
                        `Nie udało się pobrać danych z sesji: ${response.statusText}`
                    );
                setLoading(false);
                const data = await response.json();
                // if (data.username === "") router.push("/auth/login");
                setUsername(data.username);
                setPassword(data.password);
                setRole(data.role);
            } catch (error) {
                console.error("Błąd w trakcie żądania:", error);
            }
        };

        fetchUsername();
    }, []);

    const handleCLickDelete = async () => {
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

            router.push("/auth/login");
            return;
        } catch (error) {
            console.error("Błąd w trakcie żądania:", error);
        }
    };

    if (loading) {
        return <h1>Ładowanie danych...</h1>; // Wyświetlany podczas ładowania danych
    }

    return (
        <>
            <h1>Zalogowano</h1>
            {username ? (
                <div>
                    <p>Email: {username}!</p>
                    <p>Password: {password}</p>
                    <p>Ranga: {role}</p>
                </div>
            ) : (
                <h1>Nie ma imienia</h1>
            )}

            <Link href="/dashboard/manager">
                <button type="button">Manager</button>
            </Link>
            <Link href="/dashboard/leader">
                <button type="button">Ledaer</button>
            </Link>

            <button onClick={handleCLickDelete}>Wyloguj</button>
        </>
    );
}
