import { LegalPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "legal/information-according-to-art-45-isa");

export default function Page() {
  return <LegalPage locale="en" pageKey="legal/information-according-to-art-45-isa" />;
}
