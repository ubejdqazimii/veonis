import { StandardPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "about-veonis");

export default function Page() {
  return <StandardPage locale="en" pageKey="about-veonis" />;
}
