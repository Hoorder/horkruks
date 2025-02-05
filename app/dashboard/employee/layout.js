"use client";

import { useState } from "react";
import { MobileNav } from "../components/NavBars/MobileNav/MobileNav";
import { Navigation } from "../components/NavBars/Navigation/Navigation";
import { TopBar } from "../components/NavBars/TopBar/TopBar";
import styles from "./Layout.module.css";

export default function Dashboard({ children }) {
    const [isMenuShown, setIsMenuShown] = useState(false);

    return (
        <>
            <div className={styles.dashboard}>
                <TopBar />
                <div className={styles.mainContainer}>
                    <Navigation isMenuShown={isMenuShown} />
                    <div className={styles.content}>{children}</div>
                </div>
            </div>
            <MobileNav setIsMenuShown={setIsMenuShown} />
        </>
    );
}
