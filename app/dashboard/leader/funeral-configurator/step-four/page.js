"use client";

import Link from "next/link";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import styles from "./page.module.css";
import Image from "next/image";

export default function StepFour() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.stepName}>
                    <p>Rodzaj pochówku</p>
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.options}>
                        <div>
                            <div>
                                <input
                                    type="radio"
                                    id="cofin"
                                    name="safecare"
                                    value="1"
                                />
                                <label htmlFor="cofin">Trumna</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="urn"
                                    name="safecare"
                                    value="1"
                                />
                                <label htmlFor="urn">Urna</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <Image
                        src={"/coffins/1.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/2.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/3.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/4.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/5.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/6.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/7.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/8.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/9.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/10.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/11.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/12.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/13.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/14.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/15.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                    <Image
                        src={"/coffins/16.jpg"}
                        width={200}
                        height={100}
                        alt="coffin-type-1"
                    />
                </div>

                <div className={`${styles.inputContainer} ${styles.button}`}>
                    <Link
                        href={
                            "/dashboard/leader/funeral-configurator/step-five"
                        }
                    >
                        <Button>Dalej</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
