import { StandardPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "corporate-clients");

export default function Page() {
  return <StandardPage locale="de" pageKey="corporate-clients" />;
}
