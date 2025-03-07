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
        id_teams,
        team_name,
        CONCAT(m.first_name," ",m.last_name) AS manager,
        CONCAT(mo1.first_name," ",mo1.last_name) AS mourner1,
        CONCAT(mo2.first_name," ",mo2.last_name) AS mourner2,
        CONCAT(mo3.first_name," ",mo3.last_name) AS mourner3,
        CONCAT(mo4.first_name," ",mo4.last_name) AS mourner4,
        CONCAT(mo5.first_name," ",mo5.last_name) AS mourner5,
        CONCAT(mo6.first_name," ",mo6.last_name) AS mourner6,
        CONCAT(mo7.first_name," ",mo7.last_name) AS mourner7
        FROM teams
        LEFT JOIN users m ON m.id_users = team_manager_id_fk
        LEFT JOIN users mo1 ON mo1.id_users = mourner_one_id_fk
        LEFT JOIN users mo2 ON mo2.id_users = mourner_two_id_fk
        LEFT JOIN users mo3 ON mo3.id_users = mourner_three_id_fk
        LEFT JOIN users mo4 ON mo4.id_users = mourner_four_id_fk
        LEFT JOIN users mo5 ON mo5.id_users = mourner_five_id_fk
        LEFT JOIN users mo6 ON mo6.id_users = mourner_six_id_fk
        LEFT JOIN users mo7 ON mo7.id_users = mourner_seven_id_fk;
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

export async function DELETE(req) {
    try {
        const { teamId } = await req.json();
        const deleteQuery = `
            DELETE
            FROM teams
            WHERE id_teams = ?
            `;
        const [result] = await db.query(deleteQuery, [teamId]);

        if (result.affectedRows === 0) {
            return jsonResponse(
                { error: "Nie znaleziono zespołu do usunięcia" },
                404
            );
        }

        return jsonResponse({ message: "Zespół został usunięty" });
    } catch (error) {
        return jsonResponse({ error: "Błąd podczas usuwania zadania" }, 500);
    }
}

export async function POST() {
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
