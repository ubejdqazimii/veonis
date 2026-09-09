import { HomePreviewPage } from "@/components/veonis/pages";
import { getManagedPage } from "@/lib/cms";

export async function generateMetadata() {
  const page = await getManagedPage("de", "home-v2");
  return { metadataBase: new URL("https://www.veonissuisse.ch"), openGraph: { title: page.seoTitle, description: page.metaDescription, locale: "de_CH" }, title: page.seoTitle, description: page.metaDescription, alternates: { canonical: "/de", languages: { de: "/de", en: "/en" } } };
}

export default function HomePage() {
  return <HomePreviewPage locale="de" />;
}
