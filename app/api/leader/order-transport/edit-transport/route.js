import db from "@/app/auth/lib/db_connect";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function GET(req) {
    // const { editedTransportId } = await req.json();

    const { searchParams } = new URL(req.url);
    const editedTransportId = searchParams.get("editedTransportId");

    try {
        const query = `
        SELECT 
        id_transport_orders,
        manager_id_fk,
        CONCAT(manager.first_name," ",manager.last_name) AS manager,
        manager.first_name AS manager_name,
        employee_id_fk,
        CONCAT(employee.first_name," ",employee.last_name) AS employee,
        transport_from,
        transport_to,
        contact_number,
        DATE_FORMAT(order_created_at, '%H:%i') AS order_created_time, 
        DATE_FORMAT(order_displayed_at, '%H:%i') AS order_displayed_time, 
        DATE_FORMAT(order_confirmed_at, '%H:%i') AS order_confirmed_time, 
        DATE_FORMAT(order_completed_at, '%H:%i') AS order_completed_time 
        FROM transport_orders
        LEFT JOIN users manager ON manager.id_users = manager_id_fk
        LEFT JOIN users employee ON employee.id_users = employee_id_fk
        WHERE id_transport_orders = ?
        `;

        const [rows] = await db.query(query, [editedTransportId]);

        return jsonResponse(rows);
    } catch (error) {
        console.error(error);
        return jsonResponse(
            { error: "Wystąpił błąd podczas dodawania zadania." },
            500
        );
    }
}

export async function PUT(request) {
    try {
        const {
            transportFrom,
            transportTo,
            orderingPhoneNumber,
            editedTransportId,
        } = await request.json();

        const query = `

        UPDATE transport_orders
        SET transport_from = ?,
        transport_to= ?,
        contact_number= ?
        WHERE id_transport_orders = ?

        `;

        const values = [
            transportFrom,
            transportTo,
            orderingPhoneNumber,
            editedTransportId,
        ];

        const [result] = await db.query(query, values);

        if (result.affectedRows === 0) {
            return jsonResponse(
                { error: "Nie znaleziono przewozu lub brak zmian" },
                404
            );
        }

        return jsonResponse({
            message: "Dane pogrzebu zostały zaktualizowane",
        });
    } catch (error) {
        return jsonResponse({ error: "Błąd podczas aktualizacji danych" }, 500);
    }
}

export async function DELETE(request) {
    try {
        const body = await request.json();
        const transportOrderId = body.transportOrderId;

        const deleteQuery =
            "DELETE FROM `transport_orders` WHERE id_transport_orders = ?";

        const [result] = await db.query(deleteQuery, [transportOrderId]);

        if (result.affectedRows === 0) {
            return jsonResponse(
                { error: "Nie znaleziono zadania do usunięcia" },
                404
            );
        }

        return jsonResponse({ message: "Zadanie zostało usunięte" });
    } catch (error) {
        return jsonResponse({ error: "Błąd podczas usuwania zadania" }, 500);
    }
}
