import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RUA — IA Socio‑Estratégica · TSolutions IPIDD",
  description: "RUA es el co-fundador digital de TSolutions IPIDD. Sistema operativo cognitivo empresarial para gestión estratégica, proyectos y operaciones.",
  keywords: ["RUA", "TSolutions", "IPIDD", "IA Estratégica", "gestión empresarial"],
  authors: [{ name: "TSolutions IPIDD" }],
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
