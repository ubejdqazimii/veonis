import { StandardPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "private-clients");

export default function Page() {
  return <StandardPage locale="en" pageKey="private-clients" />;
}
