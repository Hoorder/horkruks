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

        const query = `SELECT 
    CURDATE() AS "unique_key",
    
    SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(CURDATE(), '%Y-%m-01') AND LAST_DAY(CURDATE()) 
             THEN funeral_ceremony_payout + funeral_transport_payout + body_preparation_payout + working_hours_payout 
             ELSE 0 END) AS "current_account_balance",
    
    SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR), '%Y-%m-01') 
             AND LAST_DAY(DATE_SUB(CURDATE(), INTERVAL 1 YEAR)) 
             THEN funeral_ceremony_payout + funeral_transport_payout + body_preparation_payout + working_hours_payout 
             ELSE 0 END) AS "account_balance_last_year",

    COUNT(CASE WHEN task_date BETWEEN DATE_FORMAT(CURDATE(), '%Y-%m-01') AND LAST_DAY(CURDATE()) 
               AND funeral_ceremony_payout > 0 THEN 1 END) AS "current_month_funeral_count",

    COUNT(CASE WHEN task_date BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR), '%Y-%m-01') 
               AND LAST_DAY(DATE_SUB(CURDATE(), INTERVAL 1 YEAR)) 
               AND funeral_ceremony_payout > 0 THEN 1 END) AS "last_year_month_funeral_count",

    COUNT(CASE WHEN task_date BETWEEN DATE_FORMAT(CURDATE(), '%Y-%m-01') AND LAST_DAY(CURDATE()) 
               AND funeral_transport_payout > 0 THEN 1 END) AS "current_month_transport_count",

    COUNT(CASE WHEN task_date BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR), '%Y-%m-01') 
               AND LAST_DAY(DATE_SUB(CURDATE(), INTERVAL 1 YEAR)) 
               AND funeral_transport_payout > 0 THEN 1 END) AS "last_year_month_transport_count",

    COUNT(CASE WHEN task_date BETWEEN DATE_FORMAT(CURDATE(), '%Y-%m-01') AND LAST_DAY(CURDATE()) 
               AND body_preparation_payout > 0 THEN 1 END) AS "current_month_preparation_count",

    COUNT(CASE WHEN task_date BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR), '%Y-%m-01') 
               AND LAST_DAY(DATE_SUB(CURDATE(), INTERVAL 1 YEAR)) 
               AND body_preparation_payout > 0 THEN 1 END) AS "last_year_month_preparation_count",

    SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(CURDATE(), '%Y-%m-01') AND LAST_DAY(CURDATE()) 
             THEN working_hours_place ELSE 0 END) AS "current_month_working_hours",

    SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR), '%Y-%m-01') 
             AND LAST_DAY(DATE_SUB(CURDATE(), INTERVAL 1 YEAR)) 
             THEN working_hours_place ELSE 0 END) AS "last_year_same_month_working_hours"

FROM funeral_tasks 
WHERE id_users_fk = "?";

`;

        const [rows] = await db.query(query, [session.user_id]);

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
