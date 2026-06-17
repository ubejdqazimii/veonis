import { LegalPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "legal/informationen-gemaess-art-45-vag");

export default function Page() {
  return <LegalPage locale="de" pageKey="legal/informationen-gemaess-art-45-vag" />;
}
