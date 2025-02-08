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

export async function PUT(request) {
    try {
        const session = await getSession();

        if (!session.user_id) {
            return jsonResponse({ error: "Brak id" }, 401);
        }

        const { funeral_card_id } = await request.json();

        if (!funeral_card_id) {
            return jsonResponse({ error: "Brak ID przewozu" }, 400);
        }

        const query = `

        UPDATE funeral_cards
        SET order_displayed_at = CURRENT_TIMESTAMP() 
        WHERE id_funeral_cards = ? AND team_manager_id_fk = ?  AND order_displayed_at IS NULL ;
        `;

        const values = [funeral_card_id, session.user_id];

        const [result] = await db.query(query, values);

        if (result.affectedRows === 0) {
            return jsonResponse(
                { message: "Pole już zostało ustawione wcześniej" },
                200
            );
        }

        return jsonResponse({
            message: "Dane pogrzebu zostały zaktualizowane",
        });
    } catch (error) {
        return jsonResponse({ error: "Błąd podczas aktualizacji danych" }, 500);
    }
}
