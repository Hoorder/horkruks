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
            id_funeral_cards,
            manager,
            mournerOne,
            mournerTwo,
            mournerThree,
            mournerFour,
            mournerFive,
            mournerSix,
            mournerSeven,
            funeralLocality,
        } = body;

        if (!manager) {
            return jsonResponse({ error: "Brak wymaganych danych." }, 400);
        }

        const users = [
            manager,
            mournerOne,
            mournerTwo,
            mournerThree,
            mournerFour,
            mournerFive,
            mournerSix,
            mournerSeven,
        ].filter((user) => user !== null && user !== undefined && user !== "");

        const [userData] = await db.query(
            `SELECT id_users, funeral_service FROM users WHERE id_users IN (?)`,
            [users]
        );

        const userServiceMap = new Map();
        for (const user of userData) {
            userServiceMap.set(user.id_users, user.funeral_service);
        }

        for (const user of users) {
            const funeralService = userServiceMap.get(user);

            if (funeralService === undefined) {
                return jsonResponse(
                    {
                        error: `Nie znaleziono danych użytkownika o ID: ${user}`,
                    },
                    404
                );
            }

            const [result] = await db.query(
                `INSERT INTO funeral_tasks(
                    id_funeral_cards_fk,
                    id_users_fk,
                    funeral_ceremony_place,
                    funeral_ceremony_payout,
                    funeral_transport_payout,
                    body_preparation_payout,
                    working_hours_payout,
                    task_date)
                VALUES (?,?,?,?,?,?,?, CURRENT_DATE())`,
                [
                    id_funeral_cards,
                    user,
                    funeralLocality,
                    funeralService,
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
