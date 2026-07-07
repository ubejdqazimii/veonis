import Link from "next/link";

import { Container } from "@/components/veonis/container";
import { HomeVersionNav } from "@/components/veonis/home-version-nav";
import { MobileMenu } from "@/components/veonis/mobile-menu";
import { PreHeader } from "@/components/veonis/pre-header";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/veonis-content";
import { getLocalizedPath, getNavItemLabel, localizedHomeHref, primaryNavItems } from "@/lib/veonis-content";

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
  const otherLocale = locale === "de" ? "en" : "de";

  return (
    <header className="sticky top-0 z-40 border-b border-[#e6e2dc]/80 bg-white/92 backdrop-blur-xl">
      <PreHeader locale={locale} />
      <Container className="relative flex min-h-20 items-center justify-between gap-5 py-3">
        <Link className="shrink-0" href={localizedHomeHref[locale]} aria-label="Veonis Home">
          <img className="h-12 w-auto" src="/brand/veonis-header.svg" alt="Veonis" />
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          <HomeVersionNav locale={locale} />
          {primaryNavItems.map((item) => (
            <Link
              className="rounded-full px-3 py-2 text-sm font-medium text-[#4b5563] transition hover:bg-[#f7f7f6] hover:text-[#111827]"
              href={item[locale]}
              key={getNavItemLabel(item, locale)}
            >
              {getNavItemLabel(item, locale)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            className="rounded-full px-3 py-2 text-sm font-semibold uppercase tracking-normal text-[#939598] hover:text-[#c63d4d]"
            href={localizedHomeHref[otherLocale]}
          >
            {otherLocale}
          </Link>
          <Button asChild className="h-11 rounded-full bg-[#c63d4d] px-5 text-white hover:bg-[#b23443]">
            <Link href={getLocalizedPath(locale, "contact")}>Termin vereinbaren</Link>
          </Button>
        </div>
        <MobileMenu locale={locale} />
      </Container>
    </header>
  );
}
