import db from "@/app/auth/lib/db_connect";

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(req) {
    try {
        const body = await req.json();

        const {
            deceasedName,
            deceasedSurname,
            deceasedPesel,
            deceasedBirthDate,
            deceasedDeathDate,
            insuranceAtZUS,
            insuranceAtKRUS,
            orderingName,
            orderingSurname,
            orderingPhoneNumber,
            orderingCity,
            orderingHouseNumber,
            orderingPostCode,
            orderingLocality,
            funeralLocality,
            funeralDate,
            funeralTime,
            funeralEnteryTime,
            funeralGroupUpTime,
            burialInAnUrn,
            burialInACoffin,
            manager,
            mournerOne,
            mournerTwo,
            mournerThree,
            mournerFour,
            mournerFive,
            mournerSix,
            mournerSeven,
            transport,
            bodyPrepary,
            tent,
            cross,
            musicalarrangement,
            musicalarrangementNote,
            funeralFlowers,
            funeralFlowersNote,
        } = body;

        if (!deceasedName) {
            return jsonResponse({ error: "Brak wymaganych danych." }, 400);
        }

        const [result] = await db.query(
            `INSERT INTO funeral_cards(
                dead_person_name,
                dead_person_surname,
                pesel,
                birth_date,
                death_date,
                insured_in_zus,
                insured_in_krus,
                principal_name,
                principal_surname,
                principal_phone_number,
                principal_city,
                principal_house_number,
                principal_postal_code,
                principal_locality,
                funeral_locality,
                funeral_date,
                funeral_time,
                entrance_time,
                meeting_time,
                id_urns_fk,
                id_coffins_fk,
                team_manager_id_fk,
                mourner_one_id_fk,
                mourner_two_id_fk,
                mourner_three_id_fk,
                mourner_four_id_fk,
                mourner_five_id_fk,
                mourner_six_id_fk,
                mourner_seven_id_fk,
                transport,
                preparation_of_the_body,
                tent,
                funeral_cross,
                musical_arrangement,
                musical_notest,
                flowers,
                flower_notes
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                deceasedName,
                deceasedSurname,
                deceasedPesel,
                deceasedBirthDate,
                deceasedDeathDate,
                insuranceAtZUS,
                insuranceAtKRUS,
                orderingName,
                orderingSurname,
                orderingPhoneNumber,
                orderingCity,
                orderingHouseNumber,
                orderingPostCode,
                orderingLocality,
                funeralLocality,
                funeralDate,
                funeralTime,
                funeralEnteryTime,
                funeralGroupUpTime,
                burialInAnUrn,
                burialInACoffin,
                manager,
                mournerOne,
                mournerTwo,
                mournerThree,
                mournerFour,
                mournerFive,
                mournerSix,
                mournerSeven,
                transport,
                bodyPrepary,
                tent,
                cross,
                musicalarrangement,
                musicalarrangementNote,
                funeralFlowers,
                funeralFlowersNote,
            ]
        );

        if (result.affectedRows === 1) {
            // Pobierz ostatnio wstawione ID
            const [idResult] = await db.query("SELECT LAST_INSERT_ID() as id_funeral_cards");
            const id_funeral_cards = idResult[0].id_funeral_cards;

            return jsonResponse({
                message: "Dane zostały zapisane pomyślnie!",
                id_funeral_cards,
            });
        } else {
            return jsonResponse(
                { error: "Nie udało się zapisać danych." },
                500
            );
        }
    } catch (error) {
        console.error("Błąd API:", {
            message: error.message,
            stack: error.stack,
            details: error,
        });
        return jsonResponse({ error: "Wystąpił błąd serwera." }, 500);
    }
}