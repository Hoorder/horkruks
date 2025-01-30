import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/auth/lib/session";
import { combinedRegex } from "../utils/validators";
import { findUserByEmail } from "../utils/userdata";
import db from "@/app/auth/lib/db_connect";
import bcrypt from "bcrypt";

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

export async function POST(req) {
    try {
        const body = await req.json();

        const email = body.email.trim();
        const password = body.password.trim();

        if (email.length === 0 || password.length === 0) {
            return jsonResponse({ error: "Wprowadź wszystkie dane." }, 401);
        }

        if (email.length > 32) {
            return jsonResponse({ error: "Wprowadź poprawne dane." }, 401);
        }

        if (!email.match(combinedRegex)) {
            return jsonResponse({ error: "Sprawdź poprawność maila." }, 401);
        }

        const rows = await findUserByEmail(email);

        if (rows.length === 0) {
            return jsonResponse(
                { error: "Nieprawidłowy login lub hasło." },
                401
            );
        }

        if (rows[0].account_status === "blocked") {
            return jsonResponse(
                {
                    error: "Twoje konto zostało zablokowane. Skontaktuj się z administratorem.",
                },
                401
            );
        }

        if (rows[0].password === password) {
            const session = await getSession();

            session.loggedIn = "true";

            session.user_id = rows[0].id_users;
            session.username = rows[0].first_name;
            session.role = rows[0].position;

            session.funeral_fee = rows[0].funeral_service;
            session.transport_fee = rows[0].transport_body;
            session.dressing_body_fee = rows[0].dressing_body;
            session.hourly_fee = rows[0].hourly_rate;

            await session.save();

            return jsonResponse({
                role: session.role,
            });
        } else {
            return jsonResponse(
                { error: "Nieprawidłowy login lub hasło." },
                401
            );
        }
    } catch (error) {
        console.error(error);
        return jsonResponse({ error: "Wystąpił błąd" }, 500);
    }
}

export async function GET() {
    try {
        const session = await getSession();
        return jsonResponse({
            user_id: session.user_id,
            username: session.username,
            role: session.role,

            funeral_fee: session.funeral_fee,
            transport_fee: session.transport_fee,
            dressing_body_fee: session.dressing_body_fee,
            hourly_fee: session.hourly_fee,
        });
    } catch (error) {
        console.error(error);
        return jsonResponse({ error: "Wystąpił błąd" }, 500);
    }
}

export async function DELETE() {
    try {
        const session = await getSession();
        session.destroy();

        return jsonResponse({ message: "Sesja została zniszczona." });
    } catch (error) {
        console.error(error);
        return jsonResponse({ error: "Wystąpił błąd" }, 500);
    }
}
