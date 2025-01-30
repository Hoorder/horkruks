import { cookies } from "next/headers"; // Aby pobrać ciasteczka

import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/auth/lib/session";
import db from "@/app/auth/lib/db_connect";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

async function getSession() {
    const cookieStore = await cookies(); // Pobieramy ciasteczka
    return getIronSession(cookieStore, sessionOptions); // Zwracamy sesję na podstawie ciasteczek
}

export async function GET() {
    try {
        const session = await getSession();

        if (!session.user_id) {
            return jsonResponse({ error: "Nieautoryzowany dostęp" }, 401);
        }

        const [rows] = await db.query(
            `SELECT 
                f.id_funeral_cards AS funeral_card_id,
                f.funeral_locality AS miejscowosc,
                DATE_FORMAT(f.funeral_date, '%Y-%m-%d') AS data_pogrzebu,
                u.first_name AS kierownik_imie,
                u.last_name AS kierownik_nazwisko,
                GROUP_CONCAT(DISTINCT CONCAT(m.first_name, ' ', m.last_name) ORDER BY m.id_users) AS obsluga,
                DATE_FORMAT(f.meeting_time, '%H:%i') AS zbiorka,
                DATE_FORMAT(f.entrance_time, '%H:%i') AS wniesienie,
                DATE_FORMAT(f.funeral_time, '%H:%i') AS msza_swietna,
                f.flower_notes AS notatki_kwiatowe,
                DATE_FORMAT((SELECT MAX(funeral_date) 
                      FROM funeral_cards 
                      WHERE funeral_locality = f.funeral_locality), '%Y-%m-%d') AS ostatni_pogrzeb
            FROM funeral_cards f
            JOIN users u ON f.team_manager_id_fk = u.id_users
            LEFT JOIN users m ON m.id_users IN (f.mourner_one_id_fk, f.mourner_two_id_fk, f.mourner_three_id_fk, f.mourner_four_id_fk, f.mourner_five_id_fk, f.mourner_six_id_fk, f.mourner_seven_id_fk)
            WHERE f.id_funeral_cards = 1
            GROUP BY f.id_funeral_cards, f.funeral_locality, f.funeral_date, u.first_name, u.last_name, f.meeting_time, f.entrance_time, f.funeral_time, f.flower_notes;`
        );

        if (rows.length === 0) {
            return jsonResponse({ error: "Użytkownik nie znaleziony" }, 404);
        }

        return jsonResponse(rows);
    } catch (error) {
        console.error(error);
        return jsonResponse({ error: "Wystąpił błąd" }, 500);
    }
}
// SELECT
//     f.id_funeral_cards AS funeral_card_id,
//     f.funeral_locality AS miejscowosc,
//     f.funeral_date AS data_pogrzebu,
//     u.first_name AS kierownik_imie,
//     u.last_name AS kierownik_nazwisko,
//     GROUP_CONCAT(DISTINCT CONCAT(m.first_name, ' ', m.last_name) ORDER BY m.id_users) AS obsluga,
//     DATE_FORMAT(f.meeting_time, '%H:%i') AS zbiorka,
//     DATE_FORMAT(f.entrance_time, '%H:%i') AS wniesienie,
//     DATE_FORMAT(f.funeral_time, '%H:%i') AS msza_swietna,
//     f.flower_notes AS notatki_kwiatowe,
//     (SELECT MAX(funeral_date)
//      FROM funeral_cards
//      WHERE funeral_locality = f.funeral_locality) AS ostatni_pogrzeb
// FROM funeral_cards f
// JOIN users u ON f.team_manager_id_fk = u.id_users
// LEFT JOIN users m ON m.id_users IN (f.mourner_one_id_fk, f.mourner_two_id_fk, f.mourner_three_id_fk, f.mourner_four_id_fk, f.mourner_five_id_fk, f.mourner_six_id_fk, f.mourner_seven_id_fk)
// GROUP BY f.id_funeral_cards, f.funeral_locality, f.funeral_date, u.first_name, u.last_name, f.meeting_time, f.entrance_time, f.funeral_time, f.flower_notes;
