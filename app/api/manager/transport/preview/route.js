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

export async function GET(request) {
    try {
        const session = await getSession();

        if (!session.user_id) {
            return jsonResponse({ error: "Brak id" }, 401);
        }

        const url = new URL(request.url);
        const transportId = url.searchParams.get("transportId");

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
        WHERE t.manager_id_fk = ? AND t.id_transport_orders = ?;

        `;

        const [rows] = await db.query(query, [session.user_id, transportId]);

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

// export async function DELETE(request) {
//     try {
//         const session = await getSession();

//         if (!session.user_id) {
//             return jsonResponse({ error: "Brak id" }, 401);
//         }

//         const body = await request.json();
//         const taskId = body.taskId;

//         if (!taskId) {
//             return jsonResponse({ error: "Brak ID zadania" }, 400);
//         }

//         const deleteQuery =
//             "DELETE FROM funeral_tasks WHERE id_tasks = ? AND id_users_fk = ?";
//         const [result] = await db.query(deleteQuery, [taskId, session.user_id]);

//         if (result.affectedRows === 0) {
//             return jsonResponse(
//                 { error: "Nie znaleziono zadania do usunięcia" },
//                 404
//             );
//         }

//         return jsonResponse({ message: "Zadanie zostało usunięte" });
//     } catch (error) {
//         return jsonResponse({ error: "Błąd podczas usuwania zadania" }, 500);
//     }
// }
