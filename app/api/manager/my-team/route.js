import { cookies } from "next/headers"; // Aby pobrać ciasteczka

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
        t.id_teams, 
        t.team_name, 
        CONCAT(tm.first_name, ' ', tm.last_name) AS manager_name,
        CONCAT(u1.first_name, ' ', u1.last_name) AS mourner_one_name,
        CONCAT(u2.first_name, ' ', u2.last_name) AS mourner_two_name,
        CONCAT(u3.first_name, ' ', u3.last_name) AS mourner_three_name,
        CONCAT(u4.first_name, ' ', u4.last_name) AS mourner_four_name,
        CONCAT(u5.first_name, ' ', u5.last_name) AS mourner_five_name,
        CONCAT(u6.first_name, ' ', u6.last_name) AS mourner_six_name,
        CONCAT(u7.first_name, ' ', u7.last_name) AS mourner_seven_name
    FROM 
        teams t
    LEFT JOIN 
        users tm ON t.team_manager_id_fk = tm.id_users
    LEFT JOIN 
        users u1 ON t.mourner_one_id_fk = u1.id_users
    LEFT JOIN 
        users u2 ON t.mourner_two_id_fk = u2.id_users
    LEFT JOIN 
        users u3 ON t.mourner_three_id_fk = u3.id_users
    LEFT JOIN 
        users u4 ON t.mourner_four_id_fk = u4.id_users
    LEFT JOIN 
        users u5 ON t.mourner_five_id_fk = u5.id_users
    LEFT JOIN 
        users u6 ON t.mourner_six_id_fk = u6.id_users
    LEFT JOIN 
        users u7 ON t.mourner_seven_id_fk = u7.id_users
    WHERE 
        t.team_manager_id_fk = ?;
`;

        const [rows] = await db.query(query, [session.user_id]);

        if (rows.length === 0) {
            return jsonResponse(
                {
                    error: "Nie jesteś przypisany do żadnego zespołu. Skontaktuj się z administratorem.",
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
