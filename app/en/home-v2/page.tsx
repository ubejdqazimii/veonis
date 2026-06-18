import { HomePageVersion2, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("en", "home-v2");

export default function EnglishHomePageVersion2() {
  return <HomePageVersion2 locale="en" />;
}
