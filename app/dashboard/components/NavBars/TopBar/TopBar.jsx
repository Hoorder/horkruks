import Image from "next/image";
import styles from "./TopBar.module.css";
import { FullCurrentDate } from "@/app/dashboard/components/FullCurrentDate/FullCurrentDate";
import { HelloNav } from "../../HelloNav/HelloNav";

export function TopBar() {
    return (
        <>
            <div className={styles.container}>
                <Image
                    src="/logo.svg"
                    width={140}
                    height={45}
                    alt="Picture of the author"
                    priority={true}
                />

                <FullCurrentDate className={styles.currentDate} />

                <HelloNav />
            </div>
        </>
    );
}
