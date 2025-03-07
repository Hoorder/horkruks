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
    
    -- Kwota zarobiona ogólnie w tym roku z pogrzebów, przewozów, ubierań i godzin
    FORMAT(SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(CURDATE(), '%Y-01-01') AND LAST_DAY(CURDATE()) 
                    THEN funeral_ceremony_payout + funeral_transport_payout + body_preparation_payout + working_hours_payout 
                    ELSE 0 END), 2, 'de_DE') AS "current_year_total_revenue",

    -- Kwota zarobiona ogólnie w roku ubiegłym z pogrzebów, przewozów, ubierań i godzin (pełny rok)
    FORMAT(SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR), '%Y-01-01') 
                    AND DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-01-01'), INTERVAL 1 DAY) 
                    THEN funeral_ceremony_payout + funeral_transport_payout + body_preparation_payout + working_hours_payout 
                    ELSE 0 END), 2, 'de_DE') AS "last_year_total_revenue",

    -- Kwota zarobiona z pogrzebów w tym roku
    FORMAT(SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(CURDATE(), '%Y-01-01') AND LAST_DAY(CURDATE()) 
                    AND funeral_ceremony_payout > 0 
                    THEN funeral_ceremony_payout 
                    ELSE 0 END), 2, 'de_DE') AS "current_year_funeral_revenue",

    -- Kwota zarobiona z pogrzebów w ubiegłym roku (pełny rok)
    FORMAT(SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR), '%Y-01-01') 
                    AND DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-01-01'), INTERVAL 1 DAY) 
                    AND funeral_ceremony_payout > 0 
                    THEN funeral_ceremony_payout 
                    ELSE 0 END), 2, 'de_DE') AS "last_year_funeral_revenue",

    -- Kwota zarobiona z przewozów w tym roku
    FORMAT(SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(CURDATE(), '%Y-01-01') AND LAST_DAY(CURDATE()) 
                    AND funeral_transport_payout > 0 
                    THEN funeral_transport_payout 
                    ELSE 0 END), 2, 'de_DE') AS "current_year_transport_revenue",

    -- Kwota zarobiona z przewozów w ubiegłym roku (pełny rok)
    FORMAT(SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR), '%Y-01-01') 
                    AND DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-01-01'), INTERVAL 1 DAY) 
                    AND funeral_transport_payout > 0 
                    THEN funeral_transport_payout 
                    ELSE 0 END), 2, 'de_DE') AS "last_year_transport_revenue",

    -- Kwota zarobiona z ubierań w tym roku
    FORMAT(SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(CURDATE(), '%Y-01-01') AND LAST_DAY(CURDATE()) 
                    AND body_preparation_payout > 0 
                    THEN body_preparation_payout 
                    ELSE 0 END), 2, 'de_DE') AS "current_year_preparation_revenue",

    -- Kwota zarobiona z ubierań w ubiegłym roku (pełny rok)
    FORMAT(SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR), '%Y-01-01') 
                    AND DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-01-01'), INTERVAL 1 DAY) 
                    AND body_preparation_payout > 0 
                    THEN body_preparation_payout 
                    ELSE 0 END), 2, 'de_DE') AS "last_year_preparation_revenue",

    -- Kwota zarobiona z godzin w tym roku
    FORMAT(SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(CURDATE(), '%Y-01-01') AND LAST_DAY(CURDATE()) 
                    AND working_hours_payout > 0 
                    THEN working_hours_payout 
                    ELSE 0 END), 2, 'de_DE') AS "current_year_working_hours_revenue",

    -- Kwota zarobiona z godzin w ubiegłym roku (pełny rok)
    FORMAT(SUM(CASE WHEN task_date BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR), '%Y-01-01') 
                    AND DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-01-01'), INTERVAL 1 DAY) 
                    AND working_hours_payout > 0 
                    THEN working_hours_payout 
                    ELSE 0 END), 2, 'de_DE') AS "last_year_working_hours_revenue"

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
