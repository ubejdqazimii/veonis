import { StandardPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "about-veonis");

export default function Page() {
  return <StandardPage locale="de" pageKey="about-veonis" />;
}
