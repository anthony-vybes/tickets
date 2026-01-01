import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Vybes - Live Stream Tickets",
    description: "Get your tickets for exclusive live-streamed events on Vybes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
