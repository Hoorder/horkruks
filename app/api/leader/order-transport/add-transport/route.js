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
            managerId,
            employeeId,
            transportFrom,
            transportTo,
            orderingPhoneNumber,
        } = body;

        const query = `INSERT INTO transport_orders
            (manager_id_fk,
            employee_id_fk,
            transport_from,
            transport_to,
            contact_number,
            order_created_at)
            VALUES (?,?,?,?,?,CURRENT_TIMESTAMP())`;

        const [result] = await db.query(query, [
            managerId,
            employeeId,
            transportFrom,
            transportTo,
            orderingPhoneNumber,
        ]);

        if (result.affectedRows === 1) {
            const [idResult] = await db.query(
                "SELECT LAST_INSERT_ID() as id_transport_orders"
            );
            const id_transport_order = idResult[0].id_transport_orders;

            return jsonResponse({
                message: "Dane zostały zapisane pomyślnie!",
                id_transport_order,
            });
        } else {
            return jsonResponse(
                { error: "Nie udało się zapisać danych." },
                500
            );
        }
    } catch (error) {
        console.error(error);
        return jsonResponse(
            { error: "Wystąpił błąd podczas dodawania zadania." },
            500
        );
    }
}

export async function GET() {
    try {
        const query = `
        SELECT
        id_users,
        CONCAT(first_name," ", last_name) AS employeeData,
        first_name,
        last_name,
        position,
        email
        FROM users WHERE position != "leader";
        `;

        const [rows] = await db.query(query);

        return jsonResponse(rows);
    } catch (error) {
        console.error(error);
        return jsonResponse(
            { error: "Wystąpił błąd podczas dodawania zadania." },
            500
        );
    }
}
