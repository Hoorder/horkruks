import db from "@/app/auth/lib/db_connect";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(req) {
    try {
        const { ceremonyId } = await req.json();

        const tasksQuery = `
        SELECT 
        id_funeral_cards_fk,
        id_users_fk,
        CONCAT(u.first_name," ", u.last_name) AS imienazwisko,
        confirmation,
        u.position
        FROM funeral_tasks 
        LEFT JOIN users u ON u.id_users = id_users_fk
        WHERE id_funeral_cards_fk = ?;
        `;

        const dataQuery = `
        SELECT
            -- Wszystkie dane
            fc.*,
            
            -- Formatowanie dat
            DATE_FORMAT(fc.birth_date, '%Y-%m-%d') AS birth_date,
            DATE_FORMAT(fc.death_date, '%Y-%m-%d') AS death_date,
            DATE_FORMAT(fc.funeral_date, '%Y-%m-%d') AS funeral_date,
            DATE_FORMAT(fc.order_created_at, '%H:%i') AS order_created_time, 
            DATE_FORMAT(fc.order_displayed_at, '%H:%i') AS order_displayed_time, 
            DATE_FORMAT(fc.order_confirmed_at, '%H:%i') AS order_confirmed_time, 
            DATE_FORMAT(fc.order_completed_at, '%H:%i') AS order_completed_time,

            -- Nazwy użytkowników
            CONCAT(m.first_name, " ", m.last_name) AS team_manager_name,
            CONCAT(mo1.first_name, " ", mo1.last_name) AS mourner_one_name,
            CONCAT(mo2.first_name, " ", mo2.last_name) AS mourner_two_name,
            CONCAT(mo3.first_name, " ", mo3.last_name) AS mourner_three_name,
            CONCAT(mo4.first_name, " ", mo4.last_name) AS mourner_four_name,
            CONCAT(mo5.first_name, " ", mo5.last_name) AS mourner_five_name,
            CONCAT(mo6.first_name, " ", mo6.last_name) AS mourner_six_name,
            CONCAT(mo7.first_name, " ", mo7.last_name) AS mourner_seven_name,

            -- Dane faktury
            inv.invoices_number

        FROM funeral_cards fc
        LEFT JOIN users m ON m.id_users = fc.team_manager_id_fk
        LEFT JOIN users mo1 ON mo1.id_users = fc.mourner_one_id_fk
        LEFT JOIN users mo2 ON mo2.id_users = fc.mourner_two_id_fk
        LEFT JOIN users mo3 ON mo3.id_users = fc.mourner_three_id_fk
        LEFT JOIN users mo4 ON mo4.id_users = fc.mourner_four_id_fk
        LEFT JOIN users mo5 ON mo5.id_users = fc.mourner_five_id_fk
        LEFT JOIN users mo6 ON mo6.id_users = fc.mourner_six_id_fk
        LEFT JOIN users mo7 ON mo7.id_users = fc.mourner_seven_id_fk
        LEFT JOIN invoices inv ON inv.id_funeral_cards_fk = fc.id_funeral_cards

        WHERE id_funeral_cards = ?
        ORDER BY fc.id_funeral_cards DESC;
        `;

        const employeeQuery = `
        SELECT
        *,
        CONCAT(first_name, " ", last_name) AS employee
        FROM users;
        `;

        const [data] = await db.query(dataQuery, [ceremonyId]);
        const [tasks] = await db.query(tasksQuery, [ceremonyId]);
        const [employee] = await db.query(employeeQuery);

        return jsonResponse({
            funeral_data: data,
            funeral_tasks: tasks,
            funeral_employee: employee,
        });
    } catch (error) {
        console.error(error);
        return jsonResponse(
            { error: "Wystąpił błąd podczas Pobierania zadania." },
            500
        );
    }
}

export async function PUT(req) {
    try {
        const { ceremonyId } = await req.json();

        const query = `

        UPDATE funeral_cards
        SET order_completed_at = CURRENT_TIMESTAMP() 
        WHERE id_funeral_cards = ? AND order_completed_at IS NULL ;
        `;

        const [result] = await db.query(query, [ceremonyId]);

        if (result.affectedRows === 0) {
            return jsonResponse(
                { message: "Pole już zostało ustawione wcześniej" },
                200
            );
        }

        return jsonResponse({
            message: "Dane pogrzebu zostały zaktualizowane",
        });
    } catch (error) {
        return jsonResponse({ error: "Błąd podczas aktualizacji danych" }, 500);
    }
}

export async function DELETE(req) {
    try {
        const { funeralOrderId } = await req.json();

        const deleteQuery = `
            DELETE
            FROM funeral_cards
            WHERE id_funeral_cards = ?
            `;
        const [result] = await db.query(deleteQuery, [funeralOrderId]);

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
