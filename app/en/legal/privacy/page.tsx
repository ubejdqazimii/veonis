import { LegalPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "legal/privacy");

export default function Page() {
  return <LegalPage locale="en" pageKey="legal/privacy" />;
}
