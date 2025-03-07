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

        const { id_transport_order, managerId, employeeId,transportFrom } = body;

        const users = [managerId, employeeId]
            .filter(user => user !== null && user !== undefined && user !== "")
            .map(user => parseInt(user, 10))
            .filter(user => !isNaN(user) && user > 0); 

        if (users.length === 0) {
            return jsonResponse(
                { message: "Brak poprawnych identyfikatorów użytkowników do przetworzenia." },
                400
            );
        }

        const [userData] = await db.query(
            `SELECT id_users, transport_body FROM users WHERE id_users IN (?)`,
            [users]
        );

        const userServiceMap = new Map();
        for (const user of userData) {
            userServiceMap.set(user.id_users, user.transport_body);
        }

        for (const user of users) {
            const transport_body = userServiceMap.get(user);

            if (transport_body === undefined) {
                return jsonResponse(
                    {
                        error: `Nie znaleziono danych użytkownika o ID: ${user}`,
                    },
                    404
                );
            }

            const [result] = await db.query(
                `INSERT INTO funeral_tasks(
                    id_transport_orders_fk,
                    id_users_fk,
                    funeral_transport_place,
                    funeral_transport_payout,
                    funeral_ceremony_payout,
                    body_preparation_payout,
                    working_hours_payout,
                    task_date)
                VALUES (?,?,?,?,?,?,?, CURRENT_DATE())`,
                [
                    id_transport_order,
                    user,
                    transportFrom,
                    transport_body,
                    0,
                    0,
                    0,
                ]
            );

            if (result.affectedRows !== 1) {
                return jsonResponse(
                    {
                        error:
                            "Nie udało się zapisać danych dla użytkownika: " +
                            user,
                    },
                    500
                );
            }
        }

        return jsonResponse({
            message: "Dane zostały zapisane pomyślnie!",
        });
    } catch (error) {
        console.error("Błąd API:", {
            message: error.message,
            stack: error.stack,
            details: error,
        });
        return jsonResponse({ error: "Wystąpił błąd serwera." }, 500);
    }
}
