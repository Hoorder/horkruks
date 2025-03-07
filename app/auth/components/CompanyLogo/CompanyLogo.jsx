import Image from "next/image";
import styles from "./CompanyLogo.module.css";

export function CompanyLogo() {
    return (
        <div className={styles.logo_container}>
            <Image
                src="/logo.svg"
                width={500}
                height={130}
                alt="Picture of the author"
                priority={true}
                style={{ width: "100%", height: "auto" }}
            />

            <p className={styles.company_description}>
                System do zarządzania zakładem pogrzebowym
            </p>
        </div>
    );
}
