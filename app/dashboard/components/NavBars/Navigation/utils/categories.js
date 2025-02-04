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
            { name: "Zleć przewóz", href: `/order-transport` },
            { name: "Historia ceremonii", href: `/history-ceremony` },
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
            { name: "Przewozy", href: `/order-transport` },
            { name: "Historia ceremonii", href: `/history-ceremony` },
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
            { name: "Historia zleceń", href: `/history-ceremony` },
        ],
    },
    {
        name: "Personel",
        allowedRoles: ["leader"],
        items: [
            { name: "Dodaj pracownika", href: `/add-employee` },
            { name: "Pracownicy", href: `/employees` },
            { name: "Zespoły", href: `/teams` },
        ],
    },
    {
        name: "Personel",
        allowedRoles: ["employee", "manager"],
        items: [{ name: "Mój zespół", href: `/my-team` }],
    },
    {
        name: "Analityka",
        allowedRoles: ["employee", "manager", "leader"],
        items: [
            { name: "Statystyki", href: `/stats` },
            { name: "Wyszukiwarka", href: `/search` },
        ],
    },
    {
        name: "Finanse",
        allowedRoles: ["leader"],
        items: [
            { name: "Wypłaty", href: `/withdrawals` },
            { name: "Faktury", href: `/invoices` },
        ],
    },
    {
        name: "Finanse",
        allowedRoles: ["employee", "manager"],
        items: [
            { name: "Wypłaty", href: `/withdrawals` },
            { name: "Rozliczenie", href: `/bill` },
        ],
    },
    {
        name: "Inne",
        allowedRoles: ["employee", "manager", "leader"],
        items: [{ name: "Ustawienia", href: `/settings` }],
    },
];
