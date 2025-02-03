import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/auth/lib/session";
import db from "@/app/auth/lib/db_connect";

async function getSession() {
    const cookieStore = await cookies();
    return getIronSession(cookieStore, sessionOptions);
}

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function GET() {
    try {
        const session = await getSession();

        if (!session.user_id) {
            return jsonResponse({ error: "Brak id" }, 401);
        }

        const query = `SELECT
        id_funeral_cards,
        funeral_locality AS locality,
        DATE_FORMAT(f.funeral_date, '%Y-%m-%d') AS funeral_date,
        CONCAT(u.first_name," ",u.last_name) AS manager,
        flower_notes,
        DATE_FORMAT(meeting_time, '%H:%i') AS meeting_time,
        DATE_FORMAT(entrance_time, '%H:%i') AS entrance_time,
        DATE_FORMAT(funeral_time, '%H:%i') AS funeral_time,
        DATE_FORMAT((SELECT MAX(funeral_date)
            FROM funeral_cards
            WHERE funeral_locality = f.funeral_locality),'%Y-%m-%d') AS last_funeral_date
        FROM funeral_cards f
        INNER JOIN users u ON f.team_manager_id_fk = u.id_users
        WHERE CONCAT(mourner_one_id_fk, mourner_two_id_fk) LIKE '%?%'
        AND f.funeral_date >= CURDATE()
        AND f.order_completed_at IS NULL;`;

        const [rows] = await db.query(query, [session.user_id]);

        if (rows.length === 0) {
            return jsonResponse(
                { error: "Nie jesteś przypisany do żadnego pogrzebu." },
                401
            );
        }

        return jsonResponse(rows);
    } catch (error) {
        return jsonResponse(
            { error: "Błąd podczas pobierania danych z BD" },
            500
        );
    }
}
