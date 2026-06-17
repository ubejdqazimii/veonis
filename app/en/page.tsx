import { HomePage, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "home");

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
