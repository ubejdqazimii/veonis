import type { Metadata } from "next";
import { AnalyticsTracker } from "@/components/veonis/analytics-tracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://veonis.ch"),
  title: {
    default: "Veonis - Finanzberatung, Versicherungen & Vorsorge",
    template: "%s",
  },
  description:
    "Veonis begleitet Privat- und Firmenkunden in der Schweiz bei Versicherungen, Vorsorge, Hypotheken, Steuern, Anlagen und finanzieller Planung.",
  openGraph: {
    title: "Veonis - Ein Ansprechpartner für Ihre Finanzen",
    description:
      "Ganzheitliche Finanzberatung für Privat- und Firmenkunden in der Schweiz.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-full flex-col bg-white text-[#111827]">
        {children}
        <AnalyticsTracker />
      </body>
    </html>
  );
}
