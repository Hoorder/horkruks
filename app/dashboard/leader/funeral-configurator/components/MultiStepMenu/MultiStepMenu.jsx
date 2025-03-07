"use client";

import { usePathname } from "next/navigation";
import styles from "./MultiStepMenu.module.css";

export function MultiStepMenu() {
    const pathname = usePathname();
    const pathLink = "/dashboard/leader/funeral-configurator";

    const steps = [
        { id: 1, path: `${pathLink}`, title: "Osoba zmarła" },
        { id: 2, path: `${pathLink}/step-two`, title: "Zleceniodawca" },
        { id: 3, path: `${pathLink}/step-three`, title: "Ceremonia" },
        { id: 4, path: `${pathLink}/step-four`, title: "Trumna/Urna" },
        { id: 5, path: `${pathLink}/step-five`, title: "Obsługa" },
        { id: 6, path: `${pathLink}/step-six`, title: "Pozostałe" },
        { id: 7, path: `${pathLink}/step-seven`, title: "Kosztorys" },
        { id: 8, path: `${pathLink}/step-eight`, title: "Faktura" },
        { id: 9, path: `${pathLink}/summary`, title: "Podsumowanie" },
    ];

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.sectionDescription}>
                        <p>Karta pogrzebu</p>
                        <p>
                            Przejdź przez wszystkie poniższe kroki aby dodać
                            nowe zlecenie.
                        </p>
                    </div>

                    <div className={styles.menuContainer}>
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className={`${styles.step} ${
                                    step.path === pathname && styles.stepActive
                                }`}
                            >
                                <div
                                    className={`${styles.progressCircle}`}
                                ></div>
                                <p>{step.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
