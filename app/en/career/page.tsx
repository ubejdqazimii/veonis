import { StandardPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "career");

export default function Page() {
  return <StandardPage locale="en" pageKey="career" />;
}
