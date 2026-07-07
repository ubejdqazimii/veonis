import { StandardPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "veonis-360-analysis");

export default function Page() {
  return <StandardPage locale="de" pageKey="veonis-360-analysis" />;
}
