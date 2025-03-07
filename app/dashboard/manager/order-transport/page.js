"use client";

import { useState } from "react";
import { AddOrderForm } from "./components/AddOrderForm";
import { LastTasks } from "./components/LastTasks";
import styles from "./page.module.css";

export default function OrderTransport() {
    const [transportId, setTransportId] = useState(null);

    return (
        <div className={styles.container}>
            <AddOrderForm transportId={transportId} />
            <LastTasks setTransportId={setTransportId} />
        </div>
    );
}
