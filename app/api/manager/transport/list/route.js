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
            t.id_transport_orders,
            t.manager_id_fk,
            CONCAT(m.first_name, ' ', m.last_name) AS manager_name, 
            t.employee_id_fk,
            CONCAT(e.first_name, ' ', e.last_name) AS employee_name, 
            t.transport_from,
            t.transport_to,
            t.contact_number,
            DATE_FORMAT(t.order_created_at, '%Y-%m-%d') AS order_created_date, 
            DATE_FORMAT(t.order_created_at, '%H:%i') AS order_created_time, 
            DATE_FORMAT(t.order_displayed_at, '%H:%i') AS order_displayed_time, 
            DATE_FORMAT(t.order_confirmed_at, '%H:%i') AS order_confirmed_time, 
            DATE_FORMAT(t.order_completed_at, '%H:%i') AS order_completed_time 
        FROM transport_orders t
        LEFT JOIN users m ON t.manager_id_fk = m.id_users 
        LEFT JOIN users e ON t.employee_id_fk = e.id_users 
        WHERE t.manager_id_fk = ?
        AND t.order_created_at >= NOW() - INTERVAL 30 DAY
        ORDER BY t.id_transport_orders DESC; 
        `;

        const [rows] = await db.query(query, [session.user_id]);

        if (rows.length === 0) {
            return jsonResponse(
                { error: "Nie jesteś przypisany do żadnego przewozu." },
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

        const { id_transport_orders } = await request.json();

        if (!id_transport_orders) {
            return jsonResponse({ error: "Brak ID przewozu" }, 400);
        }

        const query = `

        UPDATE transport_orders
        SET order_displayed_at = CURRENT_TIMESTAMP() 
        WHERE id_transport_orders = ? AND manager_id_fk = ?  AND order_displayed_at IS NULL ;
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
