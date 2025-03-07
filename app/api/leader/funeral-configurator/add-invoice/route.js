import db from "@/app/auth/lib/db_connect";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            invoiceName,
            invoicePath,
            id_funeral_cards,
            bodyBox,
            funeralService,
            funeralTransport,
            funeralBodyPrep,
            funeralCross,
            musicalArrangement,
            funeralFlowers,
            insurance,
            totalAmount,
        } = body;

        if (!invoiceName) {
            return jsonResponse({ error: "Brak wymaganych danych." }, 400);
        }

        const [result] = await db.query(
            `INSERT INTO invoices(
            invoices_number,
            path,
            id_funeral_cards_fk,
            body_box,
            funeral_service,
            funeral_transport,
            body_preparation,
            funeral_cross,
            musical_arrangement,
            flowers,
            benefit,
            total_price)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                invoiceName,
                invoicePath,
                id_funeral_cards,
                bodyBox,
                funeralService,
                funeralTransport,
                funeralBodyPrep,
                funeralCross,
                musicalArrangement,
                funeralFlowers,
                insurance,
                totalAmount,
            ]
        );

        if (result.affectedRows === 1) {
            return jsonResponse({
                message: "Dane zostały zapisane pomyślnie!",
            });
        } else {
            return jsonResponse(
                { error: "Nie udało się zapisać danych." },
                500
            );
        }
    } catch (error) {
        console.error("Błąd API:", {
            message: error.message,
            stack: error.stack,
            details: error,
        });
        return jsonResponse({ error: "Wystąpił błąd serwera." }, 500);
    }
}
