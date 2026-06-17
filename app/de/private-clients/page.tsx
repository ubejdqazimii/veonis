import { StandardPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "private-clients");

export default function Page() {
  return <StandardPage locale="de" pageKey="private-clients" />;
}
