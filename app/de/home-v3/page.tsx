import { HomePageVersion3, createPageMetadata } from "@/components/veonis/pages";

export const metadata = createPageMetadata("de", "home-v3");

export default function GermanHomePageVersion3() {
  return <HomePageVersion3 locale="de" />;
}
