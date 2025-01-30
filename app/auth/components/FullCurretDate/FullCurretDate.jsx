import { useState, useEffect } from "react";
import styles from "./FullCurretDate.module.css";

export function FullCurretDate() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const daysOfWeek = [
        "Niedziela",
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
    ];

    return (
        <div className={styles.container}>
            <p>{daysOfWeek[now.getDay()]}</p>
            <div className={styles.data_container}>
                <p>
                    {now.getHours().toString().padStart(2, "0")}:
                    {now.getMinutes().toString().padStart(2, "0")}
                </p>
            </div>
            <p>
                {now.getDate().toString().padStart(2, "0")}.
                {(now.getMonth() + 1).toString().padStart(2, "0")} .
                {now.getFullYear()}
            </p>
        </div>
    );
}
