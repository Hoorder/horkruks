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
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        if (!startDate && !endDate) {
            return jsonResponse({ error: "Wprowadź dane" });
        }

        const session = await getSession();

        if (!session.user_id) {
            return jsonResponse({ error: "Nie ma takiego ID" }, 401);
        }

        const query = `
        SELECT
        ROW_NUMBER() OVER(ORDER BY task_date) as result_number,
        funeral_ceremony_place,
        DATE_FORMAT(task_date, '%Y-%m-%d') as task_date
        FROM funeral_tasks
        WHERE task_date BETWEEN ? AND ?
        AND id_users_fk = ?
        AND funeral_ceremony_payout > 0
        ORDER BY task_date DESC;
        `;

        const [rows] = await db.query(query, [
            startDate,
            endDate,
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
            { error: "Błąd poczas pobierania danych z BD" },
            500
        );
    }
}
