"use client";

import { useState } from "react";
import { AddOrderForm } from "./components/AddOrderForm";
import { LastTasks } from "./components/LastTasks";
import styles from "./page.module.css";

export default function AddFuneral() {
    const [isClicked, setIsClicked] = useState(false);
    return (
        <>
            <div className={styles.container}>
                <AddOrderForm setIsClicked={setIsClicked} />
                <LastTasks isClicked={isClicked} />
            </div>
        </>
    );
}
