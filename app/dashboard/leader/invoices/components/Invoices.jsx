"use client";

import Image from "next/image";
import styles from "./Invoices.module.css";
import { useEffect, useState } from "react";

export function Invoices() {
    const [invoiceData, setInvoiceData] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const showInvoices = async () => {
            try {
                const response = await fetch("/api/leader/invoices");

                if (!response.ok) {
                    setErrorMessage("Nie znaleziono pracowników");
                    setSuccessMessage("");
                    return;
                }

                const data = await response.json();
                setInvoiceData(data);
            } catch (error) {
                console.error(error);
            }
        };

        showInvoices();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Imię</th>
                                <th>Nazwisko</th>
                                <th>Numer telefonu</th>
                                <th>Miasto</th>
                                <th>Numer FV</th>
                                <th>Kwota</th>
                                <th>Pobierz</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.map((invoice) => (
                                <tr key={invoice.id_invoices}>
                                    <td>{invoice.id_invoices}</td>
                                    <td>{invoice.principal_name}</td>
                                    <td>{invoice.principal_surname}</td>
                                    <td>{invoice.principal_phone_number}</td>
                                    <td>{invoice.principal_city}</td>
                                    <td>{invoice.invoices_number}</td>
                                    <td>{invoice.total_price}</td>
                                    <td>
                                        <a
                                            href={`/invoices/${invoice.path}`}
                                            download
                                        >
                                            <Image
                                                src={"/download.svg"}
                                                width={25}
                                                height={25}
                                                alt="donwload"
                                            />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
