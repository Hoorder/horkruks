// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function Home() {
//     const router = useRouter();
//     const [username, setUsername] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const fetchUsername = async () => {
//             try {
//                 const response = await fetch("/api/session", {
//                     method: "GET",
//                     headers: { "Content-Type": "application/json" },
//                 });

//                 if (!response.ok)
//                     throw new Error(
//                         `Nie udało się pobrać danych z sesji: ${response.statusText}`
//                     );

//                 setLoading(false);

//                 const data = await response.json();
//                 setUsername(data.username);
//             } catch (error) {
//                 console.error("Błąd w trakcie żądania:", error);
//             }
//         };

//         fetchUsername();
//     }, [router]);

//     //WYPISYWANIKE DANYCH
//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await fetch("/api/users", {
//                     method: "GET",
//                     headers: { "Content-Type": "application/json" },
//                 });

//                 if (!response.ok)
//                     throw new Error(`Resp: ${response.statusText}`);
//                 const data = await response.json();
//                 setUsers(data);
//             } catch (error) {
//                 console.error(`Problem podczas pobierania danych`);
//             }
//         };

//         fetchOrders();
//     }, []);

//     const handleCLickDelete = async () => {
//         try {
//             const response = await fetch("/api/session", {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (!response.ok)
//                 throw new Error(
//                     `Nie udało się pobrać danych z sesji: ${response.statusText}`
//                 );

//             router.replace("/auth/login");
//             return;
//         } catch (error) {
//             console.error("Błąd w trakcie żądania:", error);
//         }
//     };

//     if (loading) {
//         return <h1>Ładowanie danych...</h1>; // Wyświetlany podczas ładowania danych
//     }

//     return (
//         <>
//             <h1>Zalogowano</h1>
//             {username ? (
//                 <div>
//                     <p>Witaj: {username}!</p>
//                 </div>
//             ) : (
//                 <h1>Nie ma imienia</h1>
//             )}

//             <Link href="/dashboard/manager">
//                 <button type="button">Manager</button>
//             </Link>
//             <Link href="/dashboard/leader">
//                 <button type="button">Ledaer</button>
//             </Link>

//             <button onClick={handleCLickDelete}>Wyloguj</button>

//             <h1>Użytkownicy</h1>
//             {users.map((user) => (
//                 <div key={user.id_users}>
//                     <p>ID: {user.id_users}</p>
//                     <p>IMIE: {user.first_name}</p>
//                     <p>NAZWISKO: {user.last_name}</p>
//                     <p>NR. TEL: {user.phone_number}</p>
//                     <p>OBSŁUGUJE: {user.role_handling}</p>
//                     <p>ROLA: {user.position}</p>
//                     <p>ZA POGRZEB: {user.funeral_service} PLN</p>
//                     <p>ZA ZWÓZKE: {user.transport_body} PLN</p>
//                     <p>ZA UBIERANIE: {user.dressing_body} PLN</p>
//                     <p>NA GODZINE: {user.hourly_rate} PLN</p>
//                     <p>EMAIL: {user.email}</p>
//                     <p>STATUS KONTA: {user.account_status}</p>
//                     <p>UWAGI: {user.notes}</p>
//                     <p>DATA UTWORZENIA KONTA: {user.created_at}</p>
//                     <p>OSTATNIA AKTUALIZACJA KONTA: {user.updated_at}</p>
//                 </div>
//             ))}
//         </>
//     );
// }
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
                <h3>Podstawowe dane:</h3>
                <p>ID: {userData.user_id}</p>
                <p>Imie: {userData.username}</p>
                <p>Ranga: {userData.role}</p>
                <h3>Stawki:</h3>
                <p>Za pogrzeb: {userData.funeral_fee}</p>
                <p>Za zwózke: {userData.transport_fee}</p>
                <p>Za ubieranie: {userData.dressing_body_fee}</p>
                <p>Za godzine: {userData.hourly_fee}</p>
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
