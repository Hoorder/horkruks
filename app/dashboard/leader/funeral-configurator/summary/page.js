"use client";

import { Button } from "@/app/dashboard/components/Button/Button";
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

    return <Button></Button>;
}
