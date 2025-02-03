// const defaultHref = `/dashboard/employee`;

export const categories = [
    {
        name: "Dashboard",
        allowedRoles: ["employee", "manager", "leader"],
        items: [{ name: "Strona główna", href: `` }],
    },
    {
        name: "Ceremonia",
        allowedRoles: ["leader"],
        items: [
            { name: "Dodaj pogrzeb", href: `/add-funeral` },
            { name: "Zleć przewóz", href: `/zlec-przewoz` },
            { name: "Historia ceremonii", href: `/historia` },
        ],
    },
    {
        name: "Ceremonia",
        allowedRoles: ["manager"],
        items: [
            {
                name: "Dodaj zlecenie",
                href: `/add-funeral`,
            },
            { name: "Przewozy", href: `/zlec-przewoz` },
            { name: "Historia ceremonii", href: `/historia` },
        ],
    },
    {
        name: "Ceremonia",
        allowedRoles: ["employee"],
        items: [
            {
                name: "Dodaj zlecenie",
                href: `/add-funeral`,
            },
            { name: "Historia ceremonii", href: `/historia` },
        ],
    },
    {
        name: "Personel",
        allowedRoles: ["leader"],
        items: [
            { name: "Dodaj pracownika", href: `/dodaj` },
            { name: "Pracownicy", href: `/personel` },
            { name: "Zespoły", href: `/zespoly` },
        ],
    },
    {
        name: "Personel",
        allowedRoles: ["employee", "manager"],
        items: [{ name: "Mój zespół", href: `/dodaj` }],
    },
    {
        name: "Analityka",
        allowedRoles: ["employee", "manager", "leader"],
        items: [
            { name: "Statystyki", href: `/statystyki` },
            { name: "Wyszukiwarka", href: `/wyszukiwarka` },
        ],
    },
    {
        name: "Finanse",
        allowedRoles: ["leader"],
        items: [
            { name: "Wypłaty", href: `/wyplaty` },
            { name: "Faktury", href: `/faktury` },
        ],
    },
    {
        name: "Finanse",
        allowedRoles: ["employee", "manager"],
        items: [
            { name: "Wypłaty", href: `/wyplaty` },
            { name: "Rozliczenie", href: `/rozliczenie` },
        ],
    },
    {
        name: "Inne",
        allowedRoles: ["employee", "manager", "leader"],
        items: [{ name: "Ustawienia", href: `/ustawienia` }],
    },
];
