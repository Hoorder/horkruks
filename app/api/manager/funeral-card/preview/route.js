import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/auth/lib/session";
import db from "@/app/auth/lib/db_connect";

async function getSession() {
  const cookieStore = await cookies();
  return getIronSession(cookieStore, sessionOptions);
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(request) {
  try {
    const session = await getSession();

    if (!session.user_id) {
      return jsonResponse({ error: "Brak id" }, 401);
    }

    const url = new URL(request.url);
    const selectedId = url.searchParams.get("selectedId");

    const query = `
        SELECT
            id_funeral_cards,
            DATE_FORMAT(order_created_at, '%H:%i') AS order_created_time, 
            DATE_FORMAT(order_displayed_at, '%H:%i') AS order_displayed_time, 
            DATE_FORMAT(order_confirmed_at, '%H:%i') AS order_confirmed_time, 
            DATE_FORMAT(order_completed_at, '%H:%i') AS order_completed_time 
        FROM funeral_cards
        WHERE team_manager_id_fk = ? AND id_funeral_cards = ?;

        `;

    const [rows] = await db.query(query, [session.user_id, selectedId]);

    if (rows.length === 0) {
      return jsonResponse({ error: "Brak danych." }, 401);
    }

    return jsonResponse(rows);
  } catch (error) {
    return jsonResponse({ error: "Błąd podczas pobierania danych z BD" }, 500);
  }
}
