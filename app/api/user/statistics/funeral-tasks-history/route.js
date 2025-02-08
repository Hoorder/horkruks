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

        const year = request.headers.get("X-Year") || new Date().getFullYear();

        const yearsQuery = `
            SELECT DISTINCT YEAR(task_date) AS year
            FROM funeral_tasks
            WHERE id_users_fk = ?
            ORDER BY year DESC;
        `;

        const [yearsRows] = await db.query(yearsQuery, [session.user_id]);

        if (yearsRows.length === 0) {
            return jsonResponse(
                { error: "Nie jesteś przypisany do żadnego pogrzebu." },
                404
            );
        }

        const query = `
            SELECT
                id_tasks,
                funeral_ceremony_place,
                funeral_transport_place,
                body_preparation_place,
                working_hours_number,
                DATE_FORMAT(task_date, '%Y-%m-%d') AS task_date
            FROM funeral_tasks
            WHERE id_users_fk = ?
            AND YEAR(task_date) = ?
            ORDER BY funeral_tasks.id_tasks DESC;
        `;

        const [tasksRows] = await db.query(query, [session.user_id, year]);

        return jsonResponse({ years: yearsRows, tasks: tasksRows });
    } catch (error) {
        return jsonResponse(
            { error: "Błąd podczas pobierania danych z BD" },
            500
        );
    }
}

export async function DELETE(request) {
    try {
        const session = await getSession();

        if (!session.user_id) {
            return jsonResponse({ error: "Brak id" }, 401);
        }

        const body = await request.json();
        const taskId = body.taskId;

        if (!taskId) {
            return jsonResponse({ error: "Brak ID zadania" }, 400);
        }

        const deleteQuery =
            "DELETE FROM funeral_tasks WHERE id_tasks = ? AND id_users_fk = ?";
        const [result] = await db.query(deleteQuery, [taskId, session.user_id]);

        if (result.affectedRows === 0) {
            return jsonResponse(
                { error: "Nie znaleziono zadania do usunięcia" },
                404
            );
        }

        return jsonResponse({ message: "Zadanie zostało usunięte" });
    } catch (error) {
        return jsonResponse({ error: "Błąd podczas usuwania zadania" }, 500);
    }
}
