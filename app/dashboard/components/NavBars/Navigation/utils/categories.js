const defaultHref = `/dashboard/employee`;

export const categories = [
    {
        name: "Dashboard",
        allowedRoles: ["employee", "manager", "leader"],
        items: [{ name: "Strona główna", href: `${defaultHref}` }],
    },
    {
        name: "Ceremonia",
        allowedRoles: ["leader"],
        items: [
            { name: "Dodaj pogrzeb", href: `${defaultHref}/dodaj-pogrzeb` },
            { name: "Zleć przewóz", href: `${defaultHref}/zlec-przewoz` },
            { name: "Historia ceremonii", href: `${defaultHref}/historia` },
        ],
    },
    {
        name: "Ceremonia",
        allowedRoles: ["manager"],
        items: [
            {
                name: "Dodaj zlecenie",
                href: `${defaultHref}/dodaj-pogrzeb`,
            },
            { name: "Przewozy", href: `${defaultHref}/zlec-przewoz` },
            { name: "Historia ceremonii", href: `${defaultHref}/historia` },
        ],
    },
    {
        name: "Ceremonia",
        allowedRoles: ["employee"],
        items: [
            {
                name: "Dodaj zlecenie",
                href: `${defaultHref}/dodaj-pogrzeb`,
            },
            { name: "Historia ceremonii", href: `${defaultHref}/historia` },
        ],
    },
    {
        name: "Personel",
        allowedRoles: ["leader"],
        items: [
            { name: "Dodaj pracownika", href: `${defaultHref}/dodaj` },
            { name: "Pracownicy", href: `${defaultHref}/personel` },
            { name: "Zespoły", href: `${defaultHref}/zespoly` },
        ],
    },
    {
        name: "Personel",
        allowedRoles: ["employee", "manager"],
        items: [{ name: "Mój zespół", href: `${defaultHref}/dodaj` }],
    },
    {
        name: "Analityka",
        allowedRoles: ["employee", "manager", "leader"],
        items: [
            { name: "Statystyki", href: `${defaultHref}/statystyki` },
            { name: "Wyszukiwarka", href: `${defaultHref}/wyszukiwarka` },
        ],
    },
    {
        name: "Finanse",
        allowedRoles: ["leader"],
        items: [
            { name: "Wypłaty", href: `${defaultHref}/wyplaty` },
            { name: "Faktury", href: `${defaultHref}/faktury` },
        ],
    },
    {
        name: "Finanse",
        allowedRoles: ["employee", "manager"],
        items: [
            { name: "Wypłaty", href: `${defaultHref}/wyplaty` },
            { name: "Rozliczenie", href: `${defaultHref}/rozliczenie` },
        ],
    },
    {
        name: "Inne",
        allowedRoles: ["employee", "manager", "leader"],
        items: [{ name: "Ustawienia", href: `${defaultHref}/ustawienia` }],
    },
];
