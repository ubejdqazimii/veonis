import { ContactPage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "contact");

export default function Page() {
  return <ContactPage locale="en" />;
}
