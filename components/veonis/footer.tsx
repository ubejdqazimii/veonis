import Link from "next/link";

import { Container } from "@/components/veonis/container";
import type { Locale } from "@/lib/veonis-content";
import { brand, legalLinks, localizedHomeHref, navItems } from "@/lib/veonis-content";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="bg-[linear-gradient(135deg,#24191c_0%,#351b21_55%,#551c27_100%)] py-14 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <div>
            <Link href={localizedHomeHref[locale]} aria-label="Veonis Home">
              <img className="h-16 w-auto" src="/brand/veonis-footer.svg" alt="Veonis" />
            </Link>
            <p className="mt-6 max-w-md leading-7 text-white/72">
              Veonis begleitet Privat- und Firmenkunden in der Schweiz bei Versicherungen,
              Vorsorge, Hypotheken, Steuern, Anlagen und finanzieller Planung - persönlich,
              unabhängig und verständlich.
            </p>
            <p className="mt-5 text-sm leading-6 text-white/58">{brand.disclaimer}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-normal text-white/60">Navigation</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {navItems.map((item) => (
                <Link className="text-sm text-white/75 hover:text-white" href={item[locale]} key={item.label}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-normal text-white/60">Legal</h2>
            <div className="mt-5 grid gap-3">
              {legalLinks[locale].map((item) => (
                <Link className="text-sm text-white/75 hover:text-white" href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/12 bg-white/6 p-4 text-sm leading-6 text-white/68">
              Veonis ist als Versicherungsbroker tätig. Informationen zu Registrierung,
              Vermittlerstatus, Partnergesellschaften und Entschädigungsmodell werden transparent offengelegt.
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/50">
          © {new Date().getFullYear()} Veonis. All rights reserved.
          <span className="mt-2 block text-xs leading-5 text-white/36">
            Bildquellen: Rawpixel Ltd und Amtec Photos, jeweils via Wikimedia Commons,
            Lizenz CC BY 2.0; weitere Bildquellen via Unsplash.
          </span>
        </div>
      </Container>
    </footer>
  );
}
