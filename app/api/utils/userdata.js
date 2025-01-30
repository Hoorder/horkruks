import db from "@/app/auth/lib/db_connect";

export async function findUserByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
    ]);
    return rows;
}
