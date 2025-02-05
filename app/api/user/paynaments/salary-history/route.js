import { cookies } from "next/headers";
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
    const cookieStore = await cookies();
    return getIronSession(cookieStore, sessionOptions);
}

export async function GET(request) {
    try {
        const session = await getSession();
        if (!session.user_id) {
            return jsonResponse({ error: "Nieautoryzowany dostęp" }, 401);
        }

        const { searchParams } = new URL(request.url);
        const selectedYear =
            searchParams.get("year") || new Date().getFullYear();

        const tasksQuery = `
            SELECT
                DATE_FORMAT(task_date, '%Y-%m') AS month,
                SUM(funeral_ceremony_payout > 0) AS number_of_funerals,
                SUM(funeral_transport_payout > 0) AS number_of_transports,
                SUM(body_preparation_payout > 0) AS number_of_body_prep,
                SUM(working_hours_place) AS number_of_work_hours,
                FORMAT(SUM(funeral_ceremony_payout + funeral_transport_payout + body_preparation_payout + working_hours_payout), 2, 'pl_PL') AS total
            FROM funeral_tasks
            WHERE
                id_users_fk = ?
                AND YEAR(task_date) = ?
                AND task_date <= LAST_DAY(NOW())
            GROUP BY month
            ORDER BY month ASC;
        `;

        const yearsQuery = `
            SELECT DISTINCT YEAR(task_date) AS year
            FROM funeral_tasks
            WHERE id_users_fk = ?
            ORDER BY year DESC;
        `;

        const [tasks] = await db.query(tasksQuery, [
            session.user_id,
            selectedYear,
        ]);
        const [years] = await db.query(yearsQuery, [session.user_id]);

        return jsonResponse({
            years: years.map((row) => row.year),
            tasks,
        });
    } catch (error) {
        console.error(error);
        return jsonResponse({ error: "Wystąpił błąd serwera" }, 500);
    }
}
