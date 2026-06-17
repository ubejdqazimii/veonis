import { StandardPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "services");

export default function Page() {
  return <StandardPage locale="en" pageKey="services" />;
}
