import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
    <section className="bg-[#f7f7f6] py-16 sm:py-20">
      <Container>
        <div className="grid min-w-0 gap-8 rounded-[2rem] border border-[#e6e2dc] bg-white p-6 shadow-[0_24px_70px_rgba(17,24,39,0.08)] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <p className="eyebrow">{brand.claim}</p>
            <h2 className="display-title mt-3 text-3xl text-[#111827] sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5f6368]">{text}</p>
          </div>
          <Button asChild className="h-auto min-h-12 w-full rounded-full bg-[#c63d4d] px-6 py-3 text-center whitespace-normal text-white hover:bg-[#b23443] sm:w-auto sm:whitespace-nowrap">
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
