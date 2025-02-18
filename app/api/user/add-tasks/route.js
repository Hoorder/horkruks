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
            id_users_fk,
            task_date,
            funeral_ceremony_place,
            funeral_transport_place,
            body_preparation_place,
            working_hours_number,
            funeral_ceremony_payout,
            funeral_transport_payout,
            body_preparation_payout,
            working_hours_payout,
        } = body;

        if (working_hours_number < 0 || working_hours_number > 10) {
            return jsonResponse(
                { error: "Liczba godzin musi być od 1 do 10." },
                401
            );
        }

        if (
            !funeral_ceremony_place &&
            !funeral_transport_place &&
            !body_preparation_place &&
            working_hours_number === 0
        ) {
            return jsonResponse({ error: "Uzupełnij pola danymi." }, 401);
        }

        await db.query(
            `INSERT INTO funeral_tasks 
            (id_users_fk, task_date, funeral_ceremony_place, funeral_transport_place, 
            body_preparation_place, working_hours_number, funeral_ceremony_payout, 
            funeral_transport_payout, body_preparation_payout, working_hours_payout) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id_users_fk,
                task_date,
                funeral_ceremony_place,
                funeral_transport_place,
                body_preparation_place,
                working_hours_number,
                funeral_ceremony_payout,
                funeral_transport_payout,
                body_preparation_payout,
                working_hours_payout,
            ]
        );

        return jsonResponse({ message: "Pomyślnie dodano do bazy." });
    } catch (error) {
        console.error(error);
        return jsonResponse(
            { error: "Wystąpił błąd podczas dodawania zadania." },
            500
        );
    }
}
