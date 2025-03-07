import db from "@/app/auth/lib/db_connect";
import bcrypt from "bcrypt";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(req) {
    try {
        const {
            name,
            surname,
            phoneNumber,
            supports,
            role,
            funeralService,
            transportService,
            prepareService,
            hourService,
            email,
            password,
            notes,
        } = await req.json();

        const checkEmailQuery = `SELECT id_users FROM users WHERE email = ?`;
        const [existingUser] = await db.query(checkEmailQuery, [email]);

        if (existingUser.length > 0) {
            return jsonResponse(
                { error: "Podany e-mail jest już zajęty." },
                400
            );
        }

        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const insertQuery = `
        INSERT INTO users(
            first_name,
            last_name,
            phone_number,
            role_handling,
            position,
            funeral_service,
            transport_body,
            dressing_body,
            hourly_rate,
            email,
            password,
            notes)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

        const [result] = await db.query(insertQuery, [
            name,
            surname,
            phoneNumber,
            supports,
            role,
            funeralService,
            transportService,
            prepareService,
            hourService,
            email,
            hashedPassword,
            notes,
        ]);

        if (result.affectedRows !== 1) {
            return jsonResponse(
                { error: "Nie udało się zapisać danych dla użytkownika" },
                500
            );
        }

        return jsonResponse({ message: "Dane zostały zapisane pomyślnie!" });
    } catch (error) {
        console.error(error);
        return jsonResponse(
            { error: "Wystąpił błąd podczas dodawania użytkownika." },
            500
        );
    }
}
