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
        SELECT 
        id_transport_orders,
        manager_id_fk,
        CONCAT(manager.first_name," ",manager.last_name) AS manager,
        manager.first_name AS manager_name,
        employee_id_fk,
        CONCAT(employee.first_name," ",employee.last_name) AS employee,
        transport_from,
        manager.email AS manager_email,
        employee.email AS employee_email
        FROM transport_orders
        LEFT JOIN users manager ON manager.id_users = manager_id_fk
        LEFT JOIN users employee ON employee.id_users = employee_id_fk;
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
