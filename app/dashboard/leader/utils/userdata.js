import db from "@/app/auth/lib/db_connect";

export async function userData(user_id) {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE id_users = ?",
        user_id
    );
    return rows;
}
