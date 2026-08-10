import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Mail, MapPin, ShieldCheck } from "lucide-react";

import { Container } from "@/components/veonis/container";
import type { ManagedNavigationItem } from "@/lib/cms";
import type { Locale } from "@/lib/veonis-content";
import { brand, getNavItemLabel, legalDisclaimer, legalLinks, localizedHomeHref, navItems } from "@/lib/veonis-content";

type FooterProps = {
  locale: Locale;
  navigation?: ManagedNavigationItem[] | null;
};

export function Footer({ locale, navigation }: FooterProps) {
  const managedNavigation = navigation?.filter((item) => item.group !== "footer");
  const managedLegal = navigation?.filter((item) => item.group === "footer");
  const contactItems = [
    { icon: Mail, label: brand.email, href: `mailto:${brand.email}` },
    { icon: MapPin, label: "Schweiz", href: localizedHomeHref[locale] },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-[#24191c] py-14 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:py-18">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#24191c_0%,#351b21_48%,#5d1d29_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-white/18" />
      <div className="absolute right-0 top-0 -z-10 h-72 w-72 bg-[radial-gradient(circle,rgba(239,125,139,0.18),transparent_68%)]" />
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="rounded-lg border border-white/12 bg-white/7 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur-md sm:p-8">
            <Link href={localizedHomeHref[locale]} aria-label="Veonis Home">
              <img className="h-16 w-auto" src="/brand/veonis-footer.svg" alt="Veonis" />
            </Link>
            <p className="mt-7 max-w-xl text-xl leading-8 text-white/82">
              Veonis begleitet Privat- und Firmenkunden in der Schweiz bei Versicherungen,
              Vorsorge, Hypotheken, Steuern, Anlagen und finanzieller Planung.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/7 p-3 text-sm text-white/72 transition hover:border-white/20 hover:bg-white/12 hover:text-white"
                    href={item.href}
                    key={item.label}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#ef7d8b]">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 break-words">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-normal text-white/54">Navigation</h2>
              <div className="mt-5 grid gap-3">
                {(managedNavigation ?? navItems.map((item) => ({
                  label: getNavItemLabel(item, locale),
                  href: item[locale],
                }))).map((item) => (
                  <Link
                    className="group flex items-center justify-between gap-3 text-sm text-white/72 transition hover:text-white"
                    href={item.href}
                    key={`${item.label}-${item.href}`}
                  >
                    {item.label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-normal text-white/54">Legal</h2>
              <div className="mt-5 grid gap-3">
                {(managedLegal ?? legalLinks[locale]).map((item) => (
                  <Link
                    className="group flex items-start justify-between gap-3 text-sm leading-5 text-white/72 transition hover:text-white"
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                    <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
              <div className="mt-6 rounded-lg border border-white/12 bg-white/7 p-4 text-sm leading-6 text-white/66">
                <ShieldCheck className="mb-3 size-5 text-[#ef7d8b]" />
                Transparente Offenlegung zu Registrierung, Vermittlerstatus, Partnergesellschaften
                und Entschädigungsmodell.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-y border-white/10 py-5 md:grid-cols-3">
          {["Ganzheitliche Analyse", "Persönliche Begleitung", "Klare Empfehlungen"].map((item) => (
            <div className="flex items-center gap-3 text-sm font-semibold text-white/76" key={item}>
              <BadgeCheck className="size-4 text-[#ef7d8b]" />
              {item}
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 text-sm text-white/48 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <p>© {new Date().getFullYear()} Veonis. All rights reserved.</p>
          <div className="space-y-2 leading-6 lg:text-right">
            <p>{legalDisclaimer[locale]}</p>
            <p className="text-xs leading-5 text-white/34">
            Bildquellen: Rawpixel Ltd und Amtec Photos, jeweils via Wikimedia Commons,
            Lizenz CC BY 2.0; weitere Bildquellen via Unsplash.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
