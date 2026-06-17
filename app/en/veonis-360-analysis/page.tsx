import { StandardPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "veonis-360-analysis");

export default function Page() {
  return <StandardPage locale="en" pageKey="veonis-360-analysis" />;
}
