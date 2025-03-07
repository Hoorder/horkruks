"use client";

import styles from "./page.module.css";
import { FullCurrentDate } from "../../dashboard/components/FullCurrentDate/FullCurrentDate";
import { CompanyLogo } from "../components/CompanyLogo/CompanyLogo";
import { LoginForm } from "../components/LoginForm/LoginForm";

export default function Login() {
    return (
        <>
            <nav className={styles.nav}>
                <FullCurrentDate />
            </nav>

            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <CompanyLogo />
                </div>
                <div className={styles.fomContainer}>
                    <LoginForm />
                </div>
            </div>
        </>
    );
}
