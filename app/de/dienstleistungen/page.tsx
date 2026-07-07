import { StandardPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "services");

export default function Page() {
  return <StandardPage locale="de" pageKey="services" />;
}
