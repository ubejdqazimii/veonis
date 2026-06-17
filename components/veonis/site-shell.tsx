import type { ReactNode } from "react";

import { Footer } from "@/components/veonis/footer";
import { Header } from "@/components/veonis/header";
import type { Locale } from "@/lib/veonis-content";

type SiteShellProps = {
  children: ReactNode;
  locale: Locale;
};

export function SiteShell({ children, locale }: SiteShellProps) {
  return (
    <>
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
