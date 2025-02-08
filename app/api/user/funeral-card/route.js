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

        const query = `
SELECT
    f.id_funeral_cards,
    f.funeral_locality AS locality,
    DATE_FORMAT(f.funeral_date, '%Y-%m-%d') AS funeral_date,
    CONCAT(u.first_name, " ", u.last_name) AS manager,
    f.flower_notes,
    DATE_FORMAT(f.meeting_time, '%H:%i') AS meeting_time,
    DATE_FORMAT(f.entrance_time, '%H:%i') AS entrance_time,
    DATE_FORMAT(f.funeral_time, '%H:%i') AS funeral_time,
    DATE_FORMAT(
        (SELECT MAX(funeral_date)
         FROM funeral_cards
         WHERE funeral_locality = f.funeral_locality),
        '%Y-%m-%d'
    ) AS last_funeral_date,
    t.confirmation
FROM funeral_cards f
INNER JOIN users u ON f.team_manager_id_fk = u.id_users
LEFT JOIN funeral_tasks t ON t.id_funeral_cards_fk = f.id_funeral_cards AND t.id_users_fk = ?
WHERE CONCAT(
        mourner_one_id_fk, mourner_two_id_fk, mourner_three_id_fk, 
        mourner_four_id_fk, mourner_five_id_fk, mourner_six_id_fk, 
        mourner_seven_id_fk
    ) LIKE '%?%'
AND f.funeral_date >= CURDATE()
AND f.order_completed_at IS NULL;
        `;

        const [rows] = await db.query(query, [
            session.user_id,
            session.user_id,
        ]);

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

export async function PUT(request) {
    try {
        const session = await getSession();

        if (!session.user_id) {
            return jsonResponse({ error: "Brak id" }, 401);
        }

        const { funeral_card_id, confirmation } = await request.json();

        if (!funeral_card_id) {
            return jsonResponse({ error: "Brak ID pogrzebu" }, 400);
        }

        const query = `

        UPDATE funeral_tasks
        SET confirmation = ?
        WHERE id_funeral_cards_fk = ? AND id_users_fk = ?;

        `;

        const values = [confirmation, funeral_card_id, session.user_id];

        const [result] = await db.query(query, values);

        if (result.affectedRows === 0) {
            return jsonResponse(
                { error: "Nie znaleziono pogrzebu lub brak zmian" },
                404
            );
        }

        return jsonResponse({
            message: "Dane pogrzebu zostały zaktualizowane",
        });
    } catch (error) {
        return jsonResponse({ error: "Błąd podczas aktualizacji danych" }, 500);
    }
}

