import { FAQPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "faq");

export default function Page() {
  return <FAQPage locale="de" />;
}
