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
   id_users,
   first_name,
   last_name,
   phone_number,
   role_handling,
   position,
   funeral_service,
   transport_body,
   hourly_rate,
   dressing_body,
   email
FROM users 
WHERE id_users = ?;
`;

        const [rows] = await db.query(query, [
            session.user_id
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
