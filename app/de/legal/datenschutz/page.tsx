import { LegalPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "legal/datenschutz");

export default function Page() {
  return <LegalPage locale="de" pageKey="legal/datenschutz" />;
}
