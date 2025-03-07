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

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const place = searchParams.get("place");
        const funeralYear = searchParams.get("funeralYear");

        if (!place || !funeralYear) {
            return jsonResponse(
                { error: "Wprowadź miejscowość i rok pogrzebu" },
                400
            );
        }

        const session = await getSession();

        if (!session.user_id) {
            return jsonResponse({ error: "Nieautoryzowany dostęp" }, 401);
        }

        const query = `
        SELECT
            ROW_NUMBER() OVER (ORDER BY task_date) AS result_number,
            funeral_ceremony_place,
            DATE_FORMAT(task_date, '%Y-%m-%d') as task_date
        FROM funeral_tasks
        WHERE funeral_ceremony_place = ?
        AND YEAR(task_date) = ? 
        AND funeral_ceremony_payout > 0
        AND id_users_fk = ?
        ORDER BY task_date DESC;
        `;

        const [rows] = await db.query(query, [
            place,
            funeralYear,
            session.user_id,
        ]);

        if (rows.length === 0) {
            return jsonResponse({ error: "Brak przypisanych pogrzebów" }, 404);
        }

        return jsonResponse(rows);
    } catch (error) {
        console.error("Błąd pobierania danych:", error);
        return jsonResponse(
            { error: "Błąd podczas pobierania danych z bazy" },
            500
        );
    }
}
