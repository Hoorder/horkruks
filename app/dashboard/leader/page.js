"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [funeralData, setFuneralData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sessionRes, funeralsRes] = await Promise.all([
                    fetch("/api/session/"),
                    fetch("/api/leader/"),
                ]);

                if (!sessionRes.ok || !funeralsRes.ok) {
                    throw new Error("Błąd pobierania danych");
                }

                const userResData = await sessionRes.json();
                const funeralResData = await funeralsRes.json();

                setUserData(userResData);
                setFuneralData(funeralResData);
            } catch (error) {
                console.error("Błąd w trakcie żądania:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <h1>Ładowanie danych...</h1>;
    }

    return (
        <>
            <h1>Dashboard</h1>
            <div>
                <p>ID: {userData.user_id}</p>
                <p>Imie: {userData.username}</p>
                <p>Ranga: {userData.role}</p>
            </div>

            <h2>Pogrzeby</h2>

            {funeralData.map((funeral) => (
                <div key={funeral.funeral_card_id}>
                    <p>MIEJSCOWOŚĆ: {funeral.miejscowosc}</p>
                    <p>DATA POGRZEBU: {funeral.data_pogrzebu}</p>
                    <p>
                        KIEROWNIK: {funeral.kierownik_imie}{" "}
                        {funeral.kierownik_nazwisko}
                    </p>
                    <p>NOTATKI KWIATOWE: {funeral.notatki_kwiatowe}</p>
                    <p>GODZINA ZBIÓRKI: {funeral.zbiorka}</p>
                    <p>GODZINA WNIESIENIA: {funeral.wniesienie}</p>
                    <p>GODZINA MSZY ŚWIĘTEJ: {funeral.msza_swietna}</p>
                    <p>OBSŁUGA CEREMONII: {funeral.obsluga}</p>
                    <p>
                        OSTATNI POGRZEB W MIEJSCOWOŚCI:{" "}
                        {funeral.ostatni_pogrzeb}
                    </p>
                </div>
            ))}
        </>
    );
}
