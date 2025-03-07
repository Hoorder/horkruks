import Image from "next/image";
import Link from "next/link";
import styles from "./NavigationItem.module.css";
import { categoryIcons } from "../utils/categoryIcons";
import { usePathname } from "next/navigation";

export function NavigationItem({ name, href }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href}>
            <li className={`${styles.li} ${isActive ? styles.active : ""}`}>
                <Image
                    src={categoryIcons[name] || "/icons/default.svg"}
                    width={20}
                    height={20}
                    alt={name}
                    priority
                    unoptimized
                    className={styles.svgIcon}
                />
                <p>{name}</p>
            </li>
        </Link>
    );
}
