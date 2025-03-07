import db from "@/app/auth/lib/db_connect";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function PUT(req) {
    try {
        const { ceremonyId } = await req.json();

        const query = `

        UPDATE funeral_cards
        SET order_completed_at = CURRENT_TIMESTAMP() 
        WHERE id_funeral_cards = ? AND order_completed_at IS NULL ;
        `;

        const [result] = await db.query(query, [ceremonyId]);

        if (result.affectedRows === 0) {
            return jsonResponse(
                { message: "Pole już zostało ustawione wcześniej" },
                200
            );
        }

        return jsonResponse({
            message: "Dane pogrzebu zostały zaktualizowane",
        });
    } catch (error) {
        return jsonResponse({ error: "Błąd podczas aktualizacji danych" }, 500);
    }
}
