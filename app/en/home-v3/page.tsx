import { HomePageVersion3, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "home-v3");

export default function EnglishHomePageVersion3() {
  return <HomePageVersion3 locale="en" />;
}
