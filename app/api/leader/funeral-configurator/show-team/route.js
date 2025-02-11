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
        SELECT id_teams, team_name, team_manager_id_fk, mourner_one_id_fk, mourner_two_id_fk, mourner_three_id_fk, mourner_four_id_fk, mourner_five_id_fk, mourner_six_id_fk, mourner_seven_id_fk,
        CONCAT(u.first_name, " ", u.last_name) AS manager,
        CONCAT(m1.first_name, " ", m1.last_name) AS mourner_one,
        CONCAT(m2.first_name, " ", m2.last_name) AS mourner_two,
        CONCAT(m3.first_name, " ", m3.last_name) AS mourner_three,
        CONCAT(m4.first_name, " ", m4.last_name) AS mourner_four,
        CONCAT(m5.first_name, " ", m5.last_name) AS mourner_five,
        CONCAT(m6.first_name, " ", m6.last_name) AS mourner_six,
        CONCAT(m7.first_name, " ", m7.last_name) AS mourner_seven
        FROM teams t
        LEFT JOIN users u ON t.team_manager_id_fk = u.id_users
        LEFT JOIN users m1 ON t.mourner_one_id_fk = m1.id_users
        LEFT JOIN users m2 ON t.mourner_two_id_fk = m2.id_users
        LEFT JOIN users m3 ON t.mourner_three_id_fk = m3.id_users
        LEFT JOIN users m4 ON t.mourner_four_id_fk = m4.id_users
        LEFT JOIN users m5 ON t.mourner_five_id_fk = m5.id_users
        LEFT JOIN users m6 ON t.mourner_six_id_fk = m6.id_users
        LEFT JOIN users m7 ON t.mourner_seven_id_fk = m7.id_users

        `;

        const [rows] = await db.query(query);

        if (rows.length === 0) {
            return jsonResponse(
                { error: "Nie jesteś przypisany do żadnego przewozu." },
                401
            );
        }

        return jsonResponse(rows);
    } catch (error) {
        return jsonResponse(
            { error: "Błąd podczas pobierania danych z BD" },
            500
        );
    }
}
