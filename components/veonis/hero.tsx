import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
}: HeroProps) {
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
