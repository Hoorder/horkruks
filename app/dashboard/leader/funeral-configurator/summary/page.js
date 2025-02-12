"use client";

import { useFormContext } from "../context/FormContext";
import { useRouter } from "next/navigation";

export default function Summary() {
    const { state, dispatch } = useFormContext();
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/leader/funeral-configurator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(state),
            });

            if (response.ok) {
                alert("Dane wysłane pomyślnie!");
                dispatch({ type: "RESET" });
                router.push("/dashboard/leader/funeral-configurator");
            } else {
                alert("Coś poszło nie tak, spróbuj ponownie.");
            }
        } catch (error) {
            console.error("Błąd wysyłania danych:", error);
            alert("Błąd serwera.");
        }
    };

    return (
        <div>
            <h2>Podsumowanie</h2>
            <p>
                <strong>Imię:</strong> {state.deceasedName}
            </p>
            <p>
                <strong>Email:</strong> {state.deceasedSurname}
            </p>
            <p>
                <strong>Wiek:</strong> {state.deceasedPesel}
            </p>
            <p>
                <strong>Wybrana opcja:</strong> {state.deceasedBirthDate}
            </p>
            <p>
                <strong>Wybrana usługa:</strong> {state.deceasedDeathDate}
            </p>
            <p>
                <strong>NIE:</strong> {state.noInsurance}
            </p>
            <p>
                <strong>ZUS:</strong> {state.insuranceAtZUS}
            </p>
            <p>
                <strong>KRUS:</strong> {state.insuranceAtKRUS}
            </p>
            <br />
            <p>
                <strong>Wiek:</strong> {state.orderingName}
            </p>{" "}
            <p>
                <strong>Wiek:</strong> {state.orderingSurname}
            </p>{" "}
            <p>
                <strong>Wiek:</strong> {state.orderingPhoneNumber}
            </p>{" "}
            <p>
                <strong>Wiek:</strong> {state.orderingCity}
            </p>{" "}
            <p>
                <strong>Wiek:</strong> {state.orderingHouseNumber}
            </p>{" "}
            <p>
                <strong>Wiek:</strong> {state.orderingPostCode}
            </p>{" "}
            <p>
                <strong>Wiek:</strong> {state.orderingLocality}
            </p>{" "}
            <br />
            <p>
                <strong>Wiek:</strong> {state.funeralDate}
            </p>{" "}
            <p>
                <strong>Wiek:</strong> {state.funeralLocality}
            </p>{" "}
            <p>
                <strong>Wiek:</strong> {state.funeralTime}
            </p>{" "}
            <p>
                <strong>Wiek:</strong> {state.funeralEnteryTime}
            </p>{" "}
            <p>
                <strong>Wiek:</strong> {state.funeralGroupUpTime}
            </p>{" "}
            <p>
                <strong>Wiek:</strong> {state.funeralFlowers}
            </p>{" "}
            <p>
                <strong>Wiek:</strong> {state.funeralFlowersNote}
            </p>{" "}
            <br />
            <p>
                <strong>Blaszak:</strong> {state.burialInAnUrn}
            </p>{" "}
            <p>
                <strong>Paka:</strong> {state.burialInACoffin}
            </p>{" "}
            <br />
            <p>
                <strong>Kieras:</strong> {state.manager}
            </p>
            <p>
                <strong>Żałobnik:</strong> {state.mournerOne}
            </p>
            <p>
                <strong>Żałobnik:</strong> {state.mournerTwo}
            </p>
            <p>
                <strong>Żałobnik:</strong> {state.mournerThree}
            </p>
            <p>
                <strong>Żałobnik:</strong> {state.mournerFour}
            </p>
            <p>
                <strong>Żałobnik:</strong> {state.mournerFive}
            </p>
            <p>
                <strong>Żałobnik:</strong> {state.mournerSix}
            </p>
            <p>
                <strong>Żałobnik:</strong> {state.mournerSeven}
            </p>
            <br />
            <p>
                <strong>Transport:</strong> {state.transport}
            </p>
            <p>
                <strong>body:</strong>
                {state.bodyPrepary}
            </p>
            <p>
                <strong>body:</strong>
                {state.tent}
            </p>
            <p>
                <strong>body:</strong>
                {state.cross}
            </p>
            <p>
                <strong>body:</strong>
                {state.musicalarrangement}
            </p>
            <p>
                <strong>body:</strong>
                {state.musicalarrangementNote}
            </p>
            <br />
            <p>
                <strong>Transport:</strong> {state.coffinPrice}
                <strong>Transport:</strong> {state.urnPrice}
                <strong>Transport:</strong> {state.funeralService}
                <strong>Transport:</strong> {state.bodyTransportPrice}
                <strong>Transport:</strong> {state.crossPrice}
                <strong>Transport:</strong> {state.bodyPreparyPrice}
                <strong>Transport:</strong> {state.musicalarrangementPrice}
                <strong>Transport:</strong> {state.flowersPrice}
                <strong>Transport:</strong> {state.invoiceName}
            </p>
            <button
                onClick={() =>
                    router.push(
                        "/dashboard/leader/funeral-configurator/step-four"
                    )
                }
            >
                Wstecz
            </button>
            <button onClick={handleSubmit}>Zatwierdź i wyślij</button>
        </div>
    );
}
