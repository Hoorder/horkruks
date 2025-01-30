import db from "@/app/auth/lib/db_connect";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function GET() {
    try {
        const [rows] = await db.query(
            "SELECT * FROM users WHERE id_users = 1" //TODO: DODAC ROLE
        );
        return jsonResponse(rows);
    } catch (error) {
        return jsonResponse({ error: "Wystąpił błąd" }, 500);
    }
}

//TOD: SPRAWDZIĆ CZY FETCH MUSI BYC WIDOCZNY CZY DA SIE ZA POMOCOCA POST WYSLAC NA BACKEND I TAM OBSLUZYC

//TODO: CO BRAC POD UWAGE PODCZAS WALIDACJI WPROWADZONYCH DANYCH
//TOD: 1.Trim (sprawdzam czy niema biały znakow np. spacja)
//TOD: 2.Czy inputy nie są puste
//TOO: 3.Sprawdzam maksymalna dlugosc wprowadzanych danych logowania
//TOD: 4.Sprawdzam czy nie ma znaków specjalnych w loginie
//TOD: Sprawdzam czy login wystepuje w bazie jesli nie to info ze nie ma hasla lub login
//TOD: Sprawdzam czy konto jest zablokowane jak nie to zwrotka
//TOD: Sprawdzam czy hasło prawidłowe jak nie to zwrotka
