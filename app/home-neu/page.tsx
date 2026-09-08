import type { Metadata } from "next";
import { HomePreviewPage } from "@/components/veonis/pages";
import { SiteShell } from "@/components/veonis/site-shell";

export const metadata: Metadata = {
  title: "Veonis | Neue Homepage – Vorschau",
  robots: { index: false, follow: false },
};

export default function NewHomePreview() {
  return <SiteShell locale="de"><HomePreviewPage locale="de" /></SiteShell>;
}
