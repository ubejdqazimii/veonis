import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ScanSearch, ShieldCheck } from "lucide-react";

import { Container } from "@/components/veonis/container";
import { CoverVisual } from "@/components/veonis/cover-visual";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/veonis-content";
import { getLocalizedPath } from "@/lib/veonis-content";

type HeroProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle?: string;
  description: string[];
  cta?: string;
  secondaryCta?: string;
  visualLabel?: string;
  variant?: "default" | "home";
};

export function Hero({
  locale,
  eyebrow,
  title,
  subtitle,
  description,
  cta,
  secondaryCta,
  visualLabel,
  variant = "default",
}: HeroProps) {
  if (variant === "home") {
    return (
      <section className="relative min-h-[680px] overflow-hidden bg-[#111827] text-white lg:min-h-[720px]">
        <Image
          alt="Persönliche Finanzberatung in einem professionellen Meeting"
          className="object-cover object-[58%_center] sm:object-[62%_center]"
          fill
          preload
          quality={75}
          sizes="100vw"
          src="/brand/photos/veonis-corporate-meeting-v2.jpg"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,18,27,0.96)_0%,rgba(13,18,27,0.86)_38%,rgba(13,18,27,0.4)_67%,rgba(13,18,27,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.08)_0%,rgba(17,24,39,0.04)_56%,rgba(17,24,39,0.78)_100%)]" />
        <div className="absolute inset-y-0 left-[47%] hidden w-px bg-white/16 lg:block" />

        <Container className="relative flex min-h-[680px] items-center py-16 lg:min-h-[720px]">
          <div className="max-w-3xl pb-20 pt-6 sm:pb-16 lg:max-w-[43rem]">
            <p className="inline-flex items-center gap-2 border border-white/22 bg-white/10 px-3 py-2 text-xs font-semibold uppercase text-white/82 backdrop-blur-md">
              <BadgeCheck className="size-4 text-[#f18a96]" />
              {eyebrow}
            </p>
            <h1 className="display-title mt-7 text-5xl leading-[0.98] text-white sm:text-6xl lg:text-[4.75rem]">
              {title}
            </h1>
            {subtitle ? <p className="mt-5 text-xl font-medium text-[#f18a96]">{subtitle}</p> : null}
            <div className="mt-7 max-w-2xl space-y-4 text-lg leading-8 text-white/76">
              {description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {cta ? (
                <Button asChild className="h-12 rounded-full bg-[#c63d4d] px-6 text-white hover:bg-[#ad3040]">
                  <Link href={getLocalizedPath(locale, "contact")}>
                    {cta}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button
                  asChild
                  className="h-12 rounded-full border-white/28 bg-white/10 px-6 text-white backdrop-blur-md hover:bg-white/18"
                  variant="outline"
                >
                  <Link href={getLocalizedPath(locale, "veonis-360-analysis")}>{secondaryCta}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </Container>

        <div className="absolute inset-x-0 bottom-0 border-t border-white/14 bg-[#111827]/72 backdrop-blur-xl">
          <Container className="grid grid-cols-3">
            {[
              { icon: ScanSearch, label: "Gesamtbild", text: "Alle Finanzthemen verbunden" },
              { icon: ShieldCheck, label: "Unabhängig", text: "Möglichkeiten klar vergleichen" },
              { icon: BadgeCheck, label: "Persönlich", text: "Ein Ansprechpartner" },
            ].map((item) => (
              <div className="flex min-h-24 items-center gap-3 border-r border-white/12 px-3 last:border-r-0 sm:px-5" key={item.label}>
                <item.icon className="hidden size-5 shrink-0 text-[#f18a96] sm:block" />
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-1 hidden text-xs text-white/58 sm:block">{item.text}</p>
                </div>
              </div>
            ))}
          </Container>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#f7f7f6] py-14 sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-[#e6e2dc]" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div className="flex flex-col justify-center">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-title mt-5 max-w-4xl text-4xl leading-[1.04] tracking-normal text-[#111827] sm:text-6xl lg:text-[3.85rem] xl:text-[4.05rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 max-w-2xl text-xl font-medium text-[#c63d4d]">{subtitle}</p>
          ) : null}
          <div className="mt-7 max-w-2xl space-y-4 text-lg leading-8 text-[#555f68]">
            {description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {cta ? (
              <Button asChild className="h-12 rounded-full bg-[#c63d4d] px-6 text-white hover:bg-[#b23443]">
                <Link href={getLocalizedPath(locale, "contact")}>
                  {cta}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-[#d6d1c9] bg-white px-6 text-[#111827] hover:bg-[#f1f1ef]"
              >
                <Link href={getLocalizedPath(locale, "veonis-360-analysis")}>
                  {secondaryCta}
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
        <CoverVisual label={visualLabel} />
      </div>
    </section>
  );
}
