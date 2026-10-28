import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Refugio del Sur | Cabañas en Lago Ranco", description: "Alojamiento boutique entre bosque, lago y montaña en el sur de Chile.", icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body>{children}</body></html>; }
