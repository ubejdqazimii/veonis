import Link from "next/link";
import { ArrowRight, CalendarCheck, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/veonis/container";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/veonis-content";
import { brand, getLocalizedPath } from "@/lib/veonis-content";

type CTASectionProps = {
  locale: Locale;
  title?: string;
  text?: string;
  button?: string;
};

export function CTASection({
  locale,
  title = "Bereit für mehr Überblick?",
  text = "Ein Gespräch reicht oft aus, um die wichtigsten Themen zu erkennen. Wir nehmen uns Zeit für Ihre Fragen und zeigen Ihnen, welche nächsten Schritte sinnvoll sind.",
  button = "Kostenloses Erstgespräch vereinbaren",
}: CTASectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f6f2ef] py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(198,61,77,0.16),transparent_22rem),linear-gradient(180deg,#ffffff_0%,#f6f2ef_100%)]" />
      <Container>
        <div className="veonis-gloss-dark grid min-w-0 gap-8 rounded-lg p-6 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              {[CalendarCheck, ShieldCheck, Sparkles].map((Icon, index) => (
                <span className="flex size-10 items-center justify-center rounded-lg border border-white/14 bg-white/10 text-[#ef7d8b] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]" key={index}>
                  <Icon className="size-5" />
                </span>
              ))}
            </div>
            <p className="mt-7 text-xs font-semibold uppercase text-[#ef7d8b]">{brand.claim}</p>
            <h2 className="display-title mt-3 text-3xl text-white sm:text-5xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/64">{text}</p>
          </div>
          <Button asChild className="h-auto min-h-12 w-full rounded-full bg-white px-6 py-3 text-center text-[#8f2535] shadow-[0_18px_46px_rgba(0,0,0,0.18)] hover:bg-[#fff4f5] sm:w-auto">
            <Link href={getLocalizedPath(locale, "contact")}>
              {button}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
