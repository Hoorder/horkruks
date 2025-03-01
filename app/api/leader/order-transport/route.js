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
        employee.email AS employee_email,
        DATE_FORMAT(order_created_at, '%H:%i') AS order_created_time, 
        DATE_FORMAT(order_displayed_at, '%H:%i') AS order_displayed_time, 
        DATE_FORMAT(order_confirmed_at, '%H:%i') AS order_confirmed_time, 
        DATE_FORMAT(order_completed_at, '%H:%i') AS order_completed_time 
        FROM transport_orders
        LEFT JOIN users manager ON manager.id_users = manager_id_fk
        LEFT JOIN users employee ON employee.id_users = employee_id_fk
        ORDER BY id_transport_orders DESC
        LIMIT 10;
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
