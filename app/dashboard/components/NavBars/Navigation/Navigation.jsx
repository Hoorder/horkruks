"use client";

import styles from "./Navigation.module.css";
import { useEffect, useState } from "react";
import { NavigationItem } from "./NavigationItem/NavigationItem";
import { categories } from "./utils/categories";

export function Navigation() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const response = await fetch("/api/session");
                if (!response.ok)
                    throw new Error("Błąd podczas pobierania roli");

                const { role } = await response.json();
                setRole(role);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRole();
    }, []);

    return (
        <div className={`${styles.container} ${styles.toggle}`}>
            {categories
                .filter(({ allowedRoles }) => allowedRoles.includes(role))
                .map(({ name, items }) => (
                    <div className={styles.category} key={name}>
                        <p className={styles.categoryName}>{name}</p>
                        <ul>
                            {items.map(({ name, href }) => (
                                <NavigationItem
                                    key={name}
                                    name={name}
                                    href={`/dashboard/${
                                        role ?? `${role}`
                                    }${href}`}
                                />
                            ))}
                        </ul>
                    </div>
                ))}
        </div>
    );
}
