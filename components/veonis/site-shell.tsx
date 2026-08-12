import type { ReactNode } from "react";

import { Footer } from "@/components/veonis/footer";
import { Header } from "@/components/veonis/header";
import { getManagedNavigation, getManagedSiteSettings } from "@/lib/cms";
import type { Locale } from "@/lib/veonis-content";

type SiteShellProps = {
  children: ReactNode;
  locale: Locale;
};

export async function SiteShell({ children, locale }: SiteShellProps) {
  const [navigation, siteSettings] = await Promise.all([
    getManagedNavigation(locale),
    getManagedSiteSettings(),
  ]);

  return (
    <>
      <Header locale={locale} navigation={navigation} siteSettings={siteSettings} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} navigation={navigation} siteSettings={siteSettings} />
    </>
  );
}
