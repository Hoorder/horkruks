import db from "@/app/auth/lib/db_connect";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(req) {
    try {
        const { actualYear } = await req.json();
        const yearsQuery = `
        SELECT DISTINCT YEAR(order_created_at) AS funeral_years
        FROM funeral_cards
        ORDER BY funeral_years DESC;
        `;

        const dataQuery = `
        SELECT
            -- Wszystkie dane
            fc.*,
            
            -- Formatowanie dat
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
            CONCAT(mo7.first_name, " ", mo7.last_name) AS mourner_seven_name

        FROM funeral_cards fc
        LEFT JOIN users m ON m.id_users = fc.team_manager_id_fk
        LEFT JOIN users mo1 ON mo1.id_users = fc.mourner_one_id_fk
        LEFT JOIN users mo2 ON mo2.id_users = fc.mourner_two_id_fk
        LEFT JOIN users mo3 ON mo3.id_users = fc.mourner_three_id_fk
        LEFT JOIN users mo4 ON mo4.id_users = fc.mourner_four_id_fk
        LEFT JOIN users mo5 ON mo5.id_users = fc.mourner_five_id_fk
        LEFT JOIN users mo6 ON mo6.id_users = fc.mourner_six_id_fk
        LEFT JOIN users mo7 ON mo7.id_users = fc.mourner_seven_id_fk

        WHERE YEAR(fc.order_created_at) = ?
        ORDER BY fc.id_funeral_cards DESC;
        `;

        const [years] = await db.query(yearsQuery);
        const [data] = await db.query(dataQuery, [actualYear]);

        return jsonResponse({
            funeral_years: years,
            funeral_data: data,
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
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
        const { ceremonyId, oldEmployeeId, newEmployeeId } = await req.json();

        const updateTasksQuery = `
            UPDATE funeral_tasks
            SET 
                id_users_fk = ?,
                funeral_ceremony_payout = 100,
                confirmation = '0'
            WHERE 
                id_funeral_cards_fk = ? 
                AND id_users_fk = ?;
        `;

        const [tasksResult] = await connection.query(updateTasksQuery, [
            newEmployeeId,
            ceremonyId,
            oldEmployeeId,
        ]);

        const updateCardsQuery = `
            UPDATE funeral_cards
            SET 
                mourner_one_id_fk = CASE WHEN mourner_one_id_fk = ? THEN ? ELSE mourner_one_id_fk END,
                mourner_two_id_fk = CASE WHEN mourner_two_id_fk = ? THEN ? ELSE mourner_two_id_fk END,
                mourner_three_id_fk = CASE WHEN mourner_three_id_fk = ? THEN ? ELSE mourner_three_id_fk END,
                mourner_four_id_fk = CASE WHEN mourner_four_id_fk = ? THEN ? ELSE mourner_four_id_fk END,
                mourner_five_id_fk = CASE WHEN mourner_five_id_fk = ? THEN ? ELSE mourner_five_id_fk END,
                mourner_six_id_fk = CASE WHEN mourner_six_id_fk = ? THEN ? ELSE mourner_six_id_fk END,
                mourner_seven_id_fk = CASE WHEN mourner_seven_id_fk = ? THEN ? ELSE mourner_seven_id_fk END
            WHERE 
                id_funeral_cards = ?
                AND (
                    mourner_one_id_fk = ? OR
                    mourner_two_id_fk = ? OR
                    mourner_three_id_fk = ? OR
                    mourner_four_id_fk = ? OR
                    mourner_five_id_fk = ? OR
                    mourner_six_id_fk = ? OR
                    mourner_seven_id_fk = ?
                );
        `;

        const [cardsResult] = await connection.query(updateCardsQuery, [
            oldEmployeeId,
            newEmployeeId,
            oldEmployeeId,
            newEmployeeId,
            oldEmployeeId,
            newEmployeeId,
            oldEmployeeId,
            newEmployeeId,
            oldEmployeeId,
            newEmployeeId,
            oldEmployeeId,
            newEmployeeId,
            oldEmployeeId,
            newEmployeeId,

            ceremonyId,

            oldEmployeeId,
            oldEmployeeId,
            oldEmployeeId,
            oldEmployeeId,
            oldEmployeeId,
            oldEmployeeId,
            oldEmployeeId,
        ]);

        if (tasksResult.affectedRows === 0 || cardsResult.affectedRows === 0) {
            await connection.rollback();
            return jsonResponse(
                { message: "Nie znaleziono rekordów do aktualizacji" },
                404
            );
        }

        await connection.commit();
        return jsonResponse({
            message: "Dane pogrzebu zostały zaktualizowane",
        });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        return jsonResponse({ error: "Błąd podczas aktualizacji danych" }, 500);
    } finally {
        connection.release();
    }
}
