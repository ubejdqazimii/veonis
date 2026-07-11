import { HomePageVersion2, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "home-v2");

export default function GermanHomePage() {
  return <HomePageVersion2 locale="de" />;
}
