import { StandardPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "corporate-clients");

export default function Page() {
  return <StandardPage locale="en" pageKey="corporate-clients" />;
}
