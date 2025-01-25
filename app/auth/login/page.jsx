"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrMsg, setLoginErrMsg] = useState("");
    const router = useRouter();

    const rolePath = {
        leader: "/dashboard/leader",
        manager: "/dashboard/manager",
        employee: "/dashboard/employee",
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (username.length === 0) return;

            const response = await fetch("/api/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (!response.ok) throw new Error(`Resp: ${response.statusText}`);

            const data = await response.json();
            const destination = rolePath[data.role];

            if (destination) {
                router.push(destination);
            } else {
                setLoginErrMsg("Wprowadzone dane są nieprawidłowe");
            }

            return;
        } catch (error) {
            console.error("Błąd w trakcie żądania:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Podaj mail</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label htmlFor="name">Podaj hasło</label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />
                <br />
                <input type="submit" value="Nadaj imie" />
                <p>{loginErrMsg}</p>
            </form>
        </>
    );
}
