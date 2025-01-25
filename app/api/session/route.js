import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/auth/lib/session";

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
        const session = await getSession();
        const body = await req.json();

        session.username = body.username;
        session.password = body.password;

        session.role = "employee";
        session.loggedIn = "true";

        await session.save();

        return jsonResponse({
            username: session.username,
            password: session.password,
            role: session.role,
        });
    } catch (error) {
        console.error(error);
        return jsonResponse({ error: "Wystąpił błąd" }, 500);
    }
}

export async function GET() {
    try {
        const session = await getSession();
        return jsonResponse({
            username: session.username || "",
            password: session.password || "",
            role: session.role || "",
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
