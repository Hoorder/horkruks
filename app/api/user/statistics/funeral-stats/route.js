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
        
        SUM(task_date = CURDATE() AND funeral_ceremony_payout > 0) AS "funerals_today",
        SUM(task_date = DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND funeral_ceremony_payout >  0) AS "funerals_one_year_ago",
        
        SUM(YEAR(task_date) = YEAR(CURDATE()) 
        AND MONTH(task_date) = MONTH(CURDATE()) 
        AND funeral_ceremony_payout > 0) AS funerals_this_month,
        
        SUM(YEAR(task_date) = YEAR(CURDATE()) - 1 
        AND MONTH(task_date) = MONTH(CURDATE()) 
        AND funeral_ceremony_payout > 0) AS funerals_last_year_same_month,
        
        
        SUM(task_date BETWEEN DATE_FORMAT(CURDATE(), '%Y-01-01') AND CURDATE() 
        AND funeral_ceremony_payout > 0) AS funerals_this_year_to_date,
        
        SUM(YEAR(task_date) = YEAR(CURDATE()) - 1 
        AND funeral_ceremony_payout > 0) AS funerals_last_year


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
