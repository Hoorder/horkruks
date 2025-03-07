import db from "@/app/auth/lib/db_connect";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(req) {
    try {
        const { accountStatus } = await req.json();

        const query = `
        SELECT *
        FROM users
        WHERE position = "employee" AND account_status = ?;
        `;

        const [rows] = await db.query(query, [accountStatus]);

        if (rows.length === 0) {
            return jsonResponse({ error: "Nie znaleziono pracowników." }, 401);
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
        const { employeeId, accountStatus } = await req.json();

        const query = `

        UPDATE users
        SET account_status = ?
        WHERE id_users = ?
        `;

        const [result] = await db.query(query, [accountStatus, employeeId]);

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

export async function DELETE(req) {
    try {
        const { employeeId } = await req.json();
        const deleteQuery = `
            DELETE
            FROM users
            WHERE id_users = ?
            `;
        const [result] = await db.query(deleteQuery, [employeeId]);

        if (result.affectedRows === 0) {
            return jsonResponse(
                { error: "Nie znaleziono pracownika do usunięcia" },
                404
            );
        }

        return jsonResponse({ message: "Pracownik został usunięty" });
    } catch (error) {
        return jsonResponse({ error: "Błąd podczas usuwania zadania" }, 500);
    }
}
