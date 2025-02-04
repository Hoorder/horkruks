"use client";

import Image from "next/image";
import styles from "./MobileNav.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export function MobileNav() {
    const [role, setRole] = useState("");
    const path = `/dashboard/${role}`;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/session/");

                if (!response.ok) {
                    throw new Error("Błąd poczas pobierania danych");
                }

                const userData = await response.json();
                setRole(userData.role);
            } catch (error) {
                throw new Error(`Sprawdź end-point ${error}`);
            }
        };

        fetchUserData();
    }, []);
    //TODO: Sprawdzić czy data jest dzisiejsza w dodawanym zleceniu
    //TODO: Ogarnąć wysuwanie menu

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Link
                        href={`${path}/add-funeral`}
                        className={styles.option}
                    >
                        <Image
                            src={"/menu.svg"}
                            width={20}
                            height={20}
                            alt="Menu"
                        />
                        <p>Menu</p>
                    </Link>
                    <Link
                        href={`${path}/add-funeral`}
                        className={styles.option}
                    >
                        <Image
                            src={"/plus-circle.svg"}
                            width={20}
                            height={20}
                            alt="AddFuneral"
                        />
                        <p>Zlecenie</p>
                    </Link>
                    <Link
                        href={`${path}/history-ceremony`}
                        className={styles.option}
                    >
                        <Image
                            src={"/book-open.svg"}
                            width={20}
                            height={20}
                            alt="HistoryCeremony"
                        />
                        <p>Historia</p>
                    </Link>
                    <Link href={`${path}/settings`} className={styles.option}>
                        <Image
                            src={"/user-settings.svg"}
                            width={20}
                            height={20}
                            alt="Profile"
                        />
                        <p>Profil</p>
                    </Link>
                </div>
            </div>
        </>
    );
}
