import { LegalPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "legal/imprint");

export default function Page() {
  return <LegalPage locale="en" pageKey="legal/imprint" />;
}
