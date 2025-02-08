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

        const { id_transport_orders } = await request.json();

        if (!id_transport_orders) {
            return jsonResponse({ error: "Brak ID przewozu" }, 400);
        }

        const query = `

        UPDATE transport_orders
        SET order_confirmed_at = CURRENT_TIMESTAMP() 
        WHERE id_transport_orders = ? AND manager_id_fk = ?  AND order_confirmed_at IS NULL ;
        `;

        const values = [id_transport_orders, session.user_id];

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
