import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "./app/auth/lib/session";

export async function middleware(req) {
    const res = NextResponse.next();
    const session = await getIronSession(req, res, sessionOptions);

    const { role, loggedIn } = session;
    const path = req.nextUrl.pathname;

    //TODO: Jeśli /strona-ktra-nie-istenieje to /dashboard jesli zalogowany jeśli nie to /auth/login
    //FIXME: elo

    if (path === "/" || (path.startsWith("/dashboard") && !loggedIn)) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (
        (path.startsWith("/auth/login") && loggedIn) ||
        (path === "/dashboard" && loggedIn)
    ) {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }

    if (
        (path.startsWith("/dashboard/employee") && role !== "employee") ||
        (path.startsWith("/dashboard/manager") && role !== "manager") ||
        (path.startsWith("/dashboard/leader") && role !== "leader")
    ) {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }

    return res;
}
