import db from "@/app/auth/lib/db_connect";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(req) {
    try {
        const { employeeId } = await req.json();

        const query = `
        SELECT *
        FROM users
        WHERE id_users = ?;
        `;

        const [rows] = await db.query(query, [employeeId]);

        if (rows.length === 0) {
            return jsonResponse({ error: "Nie znaleziono pracownika." }, 401);
        }

        return jsonResponse(rows);
    } catch (error) {
        return jsonResponse(
            { error: "Błąd podczas pobierania danych z BD" },
            500
        );
    }
}

export async function PUT(req) {
    try {
        const {
            employeeId,
            name,
            surname,
            phoneNumber,
            supports,
            role,
            funeralService,
            transportService,
            prepareService,
            hourService,
            email,
        } = await req.json();

        const query = `

        UPDATE users
        SET first_name = ?,
        last_name = ?,
        phone_number = ?,
        role_handling = ?,
        position = ?,
        funeral_service = ?,
        transport_body = ?,
        dressing_body = ?,
        hourly_rate = ?,
        email = ?
        WHERE id_users = ?
        `;

        const [result] = await db.query(query, [
            name,
            surname,
            phoneNumber,
            supports,
            role,
            funeralService,
            transportService,
            prepareService,
            hourService,
            email,
            employeeId,
        ]);

        if (result.affectedRows === 0) {
            return jsonResponse(
                { message: "Pole już zostało ustawione wcześniej" },
                200
            );
        }

        return jsonResponse({
            message: "Dane pracownika zostały zaktualizowane",
        });
    } catch (error) {
        return jsonResponse({ error: "Błąd podczas aktualizacji danych" }, 500);
    }
}
