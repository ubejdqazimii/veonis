import { ContactPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "contact");

export default function Page() {
  return <ContactPage locale="de" />;
}
