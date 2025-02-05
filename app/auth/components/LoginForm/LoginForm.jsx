"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";
import { useState } from "react";
import { Input } from "@/app/dashboard/components/Input/Input";
import { Button } from "@/app/dashboard/components/Button/Button";

const rolePath = {
    leader: "/dashboard/leader",
    manager: "/dashboard/manager",
    employee: "/dashboard/employee",
};

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginErrMsg, setLoginErrMsg] = useState("");
    const router = useRouter();

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

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    width="275px"
                    fontWeight={"500"}
                    label={"E-mail:"}
                    nameAndId={"name"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    width="275px"
                    label={"Hasło:"}
                    fontWeight={"500"}
                    type={"password"}
                    nameAndId={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className={styles.passwordContainer}>
                    <Link href="/" className={styles.link}>
                        Zapomniałem hasła
                    </Link>
                    <Button>Zaloguj</Button>
                </div>
                <p className={styles.errorMsg}>{loginErrMsg}</p>
            </form>
        </>
    );
}
