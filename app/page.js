import Link from "next/link";

export default function Home() {
    return (
        <Link href="/auth/login">
            <button type="button">Logowanie</button>
        </Link>
    );
}
