import { FAQPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "faq");

export default function Page() {
  return <FAQPage locale="en" />;
}
