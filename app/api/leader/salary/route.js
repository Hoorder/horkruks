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
            u.id_users,
            u.first_name,
            u.last_name,
            SUM(ft.funeral_ceremony_payout) AS total_funeral_ceremony_payout,
            SUM(ft.funeral_transport_payout) AS total_funeral_transport_payout,
            SUM(ft.body_preparation_payout) AS total_body_preparation_payout,
            SUM(ft.working_hours_payout) AS total_working_hours_payout,
            COUNT(DISTINCT ft.id_funeral_cards_fk) AS total_funerals,
            COUNT(DISTINCT ft.id_transport_orders_fk) AS total_transports,
            COUNT(DISTINCT ft.body_preparation_place) AS total_body_preparations,
            SUM(ft.working_hours_number) AS total_working_hours,
            (
                SUM(ft.funeral_ceremony_payout) +
                SUM(ft.funeral_transport_payout) +
                SUM(ft.body_preparation_payout) +
                SUM(ft.working_hours_payout)
            ) AS total_payout
        FROM funeral_tasks ft
        LEFT JOIN users u ON u.id_users = ft.id_users_fk
        WHERE MONTH(ft.task_date) = MONTH(CURRENT_DATE()) 
        AND YEAR(ft.task_date) = YEAR(CURRENT_DATE())
        GROUP BY u.id_users, u.first_name, u.last_name;
        `;

    const [rows] = await db.query(query);

    if (rows.length === 0) {
      return jsonResponse({ error: "Brak wypłat do wyświetlenia." }, 401);
    }

    return jsonResponse(rows);
  } catch (error) {
    return jsonResponse({ error: "Błąd podczas pobierania danych z BD" }, 500);
  }
}
