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

export async function GET() {
    try {
        const session = await getSession();

        if (!session.user_id) {
            return jsonResponse({ error: "Nieautoryzowany dostęp" }, 401);
        }

        const query = `
SELECT
    DATE_FORMAT(task_date, '%Y-%m') AS month,
    SUM(funeral_ceremony_payout > 0) AS number_of_funerals,
    SUM(funeral_transport_payout > 0) AS number_of_transports,
    SUM(body_preparation_payout > 0) AS number_of_body_prep,
    SUM(working_hours_place) AS number_of_work_hours,
    FORMAT(SUM(funeral_ceremony_payout + funeral_transport_payout + body_preparation_payout + working_hours_payout), 2, 'pl_PL') AS total,
    FORMAT(SUM(funeral_ceremony_payout), 2, 'pl_PL') AS total_funeral_ceremony_payout,
    FORMAT(SUM(funeral_transport_payout), 2, 'pl_PL') AS total_funeral_transport_payout,
    FORMAT(SUM(body_preparation_payout), 2, 'pl_PL') AS total_body_preparation_payout,
    FORMAT(SUM(working_hours_payout), 2, 'pl_PL') AS total_working_hours_payout
FROM funeral_tasks
WHERE
    id_users_fk = ? 
    AND YEAR(task_date) = YEAR(CURDATE())
    AND MONTH(task_date) = MONTH(CURDATE())
    AND task_date <= LAST_DAY(NOW())
GROUP BY month
ORDER BY month ASC;
`;

        const [rows] = await db.query(query, [session.user_id]);

        if (rows.length === 0) {
            return jsonResponse(
                {
                    error: "Nie uczestniczyłeś jeszcze w żadnym zleceniu.",
                },
                401
            );
        }
        return jsonResponse(rows);
    } catch (error) {
        console.error(error);
        return jsonResponse({ error: "Wystąpił błąd" }, 500);
    }
}
