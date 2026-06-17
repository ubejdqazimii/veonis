import { HomePage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "home");

export default function GermanHomePage() {
  return <HomePage locale="de" />;
}
