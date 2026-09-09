import { HomePreviewPage } from "@/components/veonis/pages";
import { getManagedPage } from "@/lib/cms";

export async function generateMetadata() {
  const page = await getManagedPage("en", "home-v2");
  return { metadataBase: new URL("https://www.veonissuisse.ch"), openGraph: { title: page.seoTitle, description: page.metaDescription, locale: "en_GB" }, title: page.seoTitle, description: page.metaDescription, alternates: { canonical: "/en", languages: { de: "/de", en: "/en" } } };
}

export default function HomePage() {
  return <HomePreviewPage locale="en" />;
}
