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
        SELECT *,
        fc.principal_name,
        fc.principal_surname,
        fc.principal_phone_number,
        fc.principal_city
        FROM invoices
        LEFT JOIN funeral_cards fc ON fc.id_funeral_cards = id_funeral_cards_fk;
        `;

        const [rows] = await db.query(query);

        if (rows.length === 0) {
            return jsonResponse({ error: "Nie znaleziono faktur." }, 401);
        }

        return jsonResponse(rows);
    } catch (error) {
        return jsonResponse(
            { error: "Błąd podczas pobierania danych z BD" },
            500
        );
    }
}
