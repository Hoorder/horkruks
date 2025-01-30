import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata = {
    title: "Horkruks | 01.02.2025",
    description: "System do zarządzania firmą pogrzebową",
};

export default function RootLayout({ children }) {
    return (
        <html lang="pl">
            <body className={`${geistSans.variable}`}>{children}</body>
        </html>
    );
}
