"use client";

import { useState } from "react";
import { TransportDataForm } from "./components/TransportDataForm";
import styles from "./page.module.css";
import { TransportList } from "./components/TransportList";

export default function Teams() {
    const [isClicked, setIsClicked] = useState(false);
    const [isAdd, setIsAdd] = useState(true);
    const [isEdited, setIsEdited] = useState(false);
    const [editedTransportId, setEditedTransportId] = useState();
    return (
        <>
            <div className={styles.container}>
                <TransportList
                    isClicked={isClicked}
                    setIsAdd={setIsAdd}
                    setIsEdited={setIsEdited}
                    setEditedTransportId={setEditedTransportId}
                />
                <TransportDataForm
                    setIsClicked={setIsClicked}
                    isAdd={isAdd}
                    isEdited={isEdited}
                    editedTransportId={editedTransportId}
                />
            </div>
        </>
    );
}
