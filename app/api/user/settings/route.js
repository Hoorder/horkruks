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
    u.id_users,
    u.first_name,
    u.last_name,
    u.phone_number,
    u.role_handling,
    t.team_name,
    u.position,
    u.funeral_service,
    u.transport_body,
    u.hourly_rate,
    u.dressing_body,
    u.email
FROM users u
LEFT JOIN teams t ON 
    u.id_users = t.team_manager_id_fk OR
    u.id_users = t.mourner_one_id_fk OR
    u.id_users = t.mourner_two_id_fk OR
    u.id_users = t.mourner_three_id_fk OR
    u.id_users = t.mourner_four_id_fk OR
    u.id_users = t.mourner_five_id_fk OR
    u.id_users = t.mourner_six_id_fk OR
    u.id_users = t.mourner_seven_id_fk
WHERE u.id_users = ?;
`;

        const [rows] = await db.query(query, [
            session.user_id,
            session.user_id,
            session.user_id,
            session.user_id,
            session.user_id,
            session.user_id,
            session.user_id,
        ]);

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
