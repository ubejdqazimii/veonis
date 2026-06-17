import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";

import { ContactForm } from "@/components/veonis/contact-form";
import { Container } from "@/components/veonis/container";
import { CTASection } from "@/components/veonis/cta-section";
import { FAQAccordion } from "@/components/veonis/faq-accordion";
import { Hero } from "@/components/veonis/hero";
import { LegalNoticeBlock } from "@/components/veonis/legal-notice-block";
import { ProcessTimeline } from "@/components/veonis/process-timeline";
import { SectionHeader } from "@/components/veonis/section-header";
import { ServiceCard } from "@/components/veonis/service-card";
import { TabsSection } from "@/components/veonis/tabs-section";
import { ValueCard } from "@/components/veonis/value-card";
import type { CardContent, Locale, PageKey } from "@/lib/veonis-content";
import { brand, getLocalizedPath, getPage, services } from "@/lib/veonis-content";

export function createPageMetadata(locale: Locale, key: PageKey): Metadata {
  const page = getPage(locale, key);

  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: {
      canonical: getLocalizedPath(locale, key),
    },
  };
}

type PageProps = {
  locale: Locale;
  pageKey: PageKey;
};

export function HomePage({ locale }: Pick<PageProps, "locale">) {
  const page = getPage(locale, "home");

  return (
    <>
      <Hero
        cta={page.cta}
        description={page.description}
        eyebrow={page.eyebrow}
        locale={locale}
        secondaryCta={page.secondaryCta}
        title={page.title}
        visualLabel="Finanzielle Klarheit"
      />
      <SectionBlock section={page.sections[0]} />
      <AnalysisSection locale={locale} />
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow={page.sections[2].eyebrow}
            intro={page.sections[2].intro}
            title={page.sections[2].title}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 5).map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-[#f7f7f6] py-16 sm:py-20">
        <Container>
          <SectionHeader eyebrow="Warum Veonis" title="Warum Veonis?" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {page.sections[3].cards?.map((card) => <ValueCard key={card.title} {...card} />)}
          </div>
        </Container>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <SectionHeader eyebrow="Zusammenarbeit" title="So funktioniert die Zusammenarbeit" />
          <div className="mt-10">
            <ProcessTimeline steps={page.sections[4].steps ?? []} />
          </div>
        </Container>
      </section>
      <CardsSection cards={page.sections[5].cards ?? []} eyebrow="Zielgruppen" title="Für wen ist Veonis da?" />
      <CTASection locale={locale} />
    </>
  );
}

export function StandardPage({ locale, pageKey }: PageProps) {
  const page = getPage(locale, pageKey);
  const isServices = pageKey === "services";
  const isAnalysis = pageKey === "veonis-360-analysis";

  return (
    <>
      <Hero
        cta={page.cta}
        description={page.description}
        eyebrow={page.eyebrow}
        locale={locale}
        subtitle={page.subtitle}
        title={page.title}
        visualLabel={isAnalysis ? "Veonis 360°" : page.eyebrow}
      />
      {isServices ? (
        <section className="bg-white py-16 sm:py-20">
          <Container>
            <SectionHeader
              eyebrow="Services"
              intro="Wählen Sie ein Thema und sehen Sie, wie Veonis die wichtigsten Finanzbereiche zusammenführt."
              title="Beratung mit System"
            />
            <div className="mt-10">
              <TabsSection />
            </div>
          </Container>
        </section>
      ) : null}
      {page.sections.map((section, index) => (
        <SectionBlock key={`${section.title}-${index}`} section={section} tone={index % 2 === 0 ? "white" : "grey"} />
      ))}
      <CTASection locale={locale} button={page.cta ?? "Jetzt Kontakt aufnehmen"} />
    </>
  );
}

export function ContactPage({ locale }: Pick<PageProps, "locale">) {
  const page = getPage(locale, "contact");

  return (
    <>
      <Hero
        cta={page.cta}
        description={page.description}
        eyebrow={page.eyebrow}
        locale={locale}
        title={page.title}
        visualLabel="Kontakt"
      />
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionHeader
                eyebrow="Erstgespräch"
                intro={page.sections[0].paragraphs?.[0]}
                title={page.sections[0].title}
              />
              <div className="mt-8 rounded-3xl border border-[#e6e2dc] bg-[#f7f7f6] p-6">
                <p className="font-semibold text-[#111827]">Direkter Kontakt</p>
                <a className="mt-4 block text-[#c63d4d]" href={`mailto:${brand.email}`}>
                  {brand.email}
                </a>
                <a className="mt-2 block text-[#c63d4d]" href={`tel:${brand.phone}`}>
                  {brand.phone}
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

export function FAQPage({ locale }: Pick<PageProps, "locale">) {
  const page = getPage(locale, "faq");

  return (
    <>
      <Hero
        description={page.description}
        eyebrow={page.eyebrow}
        locale={locale}
        title={page.title}
        visualLabel="FAQ"
      />
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <FAQAccordion items={page.sections[0].cards ?? []} />
        </Container>
      </section>
      <CTASection locale={locale} />
    </>
  );
}

export function LegalPage({ locale, pageKey }: PageProps) {
  const page = getPage(locale, pageKey);

  return (
    <>
      <section className="bg-[#f7f7f6] py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold text-[#111827] sm:text-5xl">{page.title}</h1>
            <div className="mt-6 space-y-4 text-lg leading-8 text-[#5f6368]">
              {page.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
            <div className="space-y-6">
              {page.sections.map((section) => (
                <article className="premium-card p-6 sm:p-8" key={section.title}>
                  <h2 className="text-2xl font-semibold text-[#111827]">{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p className="mt-4 leading-7 text-[#5f6368]" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                  {section.items ? <Checklist items={section.items} /> : null}
                </article>
              ))}
            </div>
            <LegalNoticeBlock />
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionBlock({
  section,
  tone = "grey",
}: {
  section: {
    eyebrow?: string;
    title: string;
    intro?: string;
    paragraphs?: string[];
    items?: string[];
    cards?: CardContent[];
    steps?: { title: string; text: string }[];
  };
  tone?: "white" | "grey";
}) {
  return (
    <section className={tone === "white" ? "bg-white py-16 sm:py-20" : "bg-[#f7f7f6] py-16 sm:py-20"}>
      <Container>
        <SectionHeader eyebrow={section.eyebrow} intro={section.intro} title={section.title} />
        {section.paragraphs ? (
          <div className="mt-8 max-w-4xl space-y-5 text-lg leading-8 text-[#5f6368]">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
        {section.items ? <Checklist items={section.items} /> : null}
        {section.cards ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {section.cards.map((card) => (
              <ValueCard key={card.title} {...card} />
            ))}
          </div>
        ) : null}
        {section.steps ? (
          <div className="mt-10">
            <ProcessTimeline steps={section.steps} />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function AnalysisSection({ locale }: { locale: Locale }) {
  const section = getPage(locale, "home").sections[1];

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader eyebrow={section.eyebrow} intro={section.intro} title={section.title} />
          <div className="premium-card p-6 sm:p-8">
            <Checklist items={section.items ?? []} />
            <Link
              className="mt-8 inline-flex items-center rounded-full bg-[#c63d4d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#b23443]"
              href={getLocalizedPath(locale, "veonis-360-analysis")}
            >
              {section.cta}
              <ChevronRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CardsSection({
  cards,
  eyebrow,
  title,
}: {
  cards: CardContent[];
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="bg-[#f7f7f6] py-16 sm:py-20">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <ServiceCard key={card.title} {...card} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li className="flex items-start gap-3 rounded-2xl bg-[#f7f7f6] p-4 text-[#4b5563]" key={item}>
          <Check className="mt-0.5 size-5 shrink-0 text-[#c63d4d]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
