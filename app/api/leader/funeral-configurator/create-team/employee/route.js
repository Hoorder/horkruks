import db from "@/app/auth/lib/db_connect";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function GET() {
    try {
        const query = `
        SELECT id_users, first_name, last_name
        FROM users
        WHERE position = "employee" AND account_status = "active";
        `;

        const [rows] = await db.query(query);

        if (rows.length === 0) {
            return jsonResponse(
                { error: "Nie jesteś przypisany do żadnego przewozu." },
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
