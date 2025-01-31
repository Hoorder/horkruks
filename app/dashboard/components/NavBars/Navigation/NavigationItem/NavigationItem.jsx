import Image from "next/image";
import Link from "next/link";
import { categoryIcons } from "../utils/categoryIcons";

export function NavigationItem({ name, href }) {
    return (
        <Link href={href}>
            <li>
                <Image
                    src={categoryIcons[name] || "/icons/default.svg"}
                    width={20}
                    height={20}
                    alt={name}
                    priority
                />
                <p>{name}</p>
            </li>
        </Link>
    );
}
