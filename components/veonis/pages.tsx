import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  Handshake,
  ScanSearch,
  Smartphone,
} from "lucide-react";

import { ContactForm } from "@/components/veonis/contact-form";
import { Container } from "@/components/veonis/container";
import { CTASection } from "@/components/veonis/cta-section";
import { FAQAccordion } from "@/components/veonis/faq-accordion";
import {
  ConnectedFinanceSection,
  HomeTrustStrip,
  ServicesEditorialSection,
  WhyVeonisSection,
} from "@/components/veonis/home-editorial-sections";
import { HomeFocusTabsSection } from "@/components/veonis/home-focus-tabs-section";
import { Hero } from "@/components/veonis/hero";
import { LegalNoticeBlock } from "@/components/veonis/legal-notice-block";
import { ProcessTimeline } from "@/components/veonis/process-timeline";
import { SectionHeader } from "@/components/veonis/section-header";
import { ServiceCard } from "@/components/veonis/service-card";
import { TabsSection } from "@/components/veonis/tabs-section";
import { ValueCard } from "@/components/veonis/value-card";
import { cn } from "@/lib/utils";
import type { CardContent, Locale, PageKey } from "@/lib/veonis-content";
import { brand, getLocalizedPath, getPage } from "@/lib/veonis-content";

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
        variant="home"
      />
      <HomeTrustStrip />
      <ConnectedFinanceSection section={page.sections[0]} />
      <HumanAdvisorySection />
      <AnalysisSection locale={locale} />
      <HomeFocusTabsSection />
      <ServicesEditorialSection locale={locale} />
      <DigitalClaritySection />
      <AdvisoryMomentsSection />
      <WhyVeonisSection cards={page.sections[3].cards ?? []} />
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

function AdvisoryMomentsSection() {
  const moments = [
    {
      title: "Erstgespräch",
      text: "Ziele, Fragen und Unterlagen werden persönlich eingeordnet.",
      image: "/brand/photos/veonis-client-discussion-optimized.jpg",
      alt: "Beratungsteam bei einer gemeinsamen Besprechung",
      icon: Handshake,
      position: "object-[52%_center]",
    },
    {
      title: "Digitale Übersicht",
      text: "Wichtige Informationen bleiben greifbar und sauber strukturiert.",
      image: "/brand/photos/veonis-planning-session-optimized.jpg",
      alt: "Digitales Arbeiten mit Weitblick in einem modernen Büro",
      icon: Smartphone,
      position: "object-[44%_center]",
    },
    {
      title: "Firmenkunden",
      text: "Risiken, Vorsorge und Verantwortung werden zusammen betrachtet.",
      image: "/brand/photos/veonis-corporate-workshop-optimized.jpg",
      alt: "Firmenteam bei der strukturierten Planung",
      icon: Building2,
      position: "object-center",
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
          <div>
            <p className="eyebrow">Mehr Nähe im Ablauf</p>
            <h2 className="display-title mt-3 text-3xl text-[#111827] sm:text-4xl">
              Beratung wird besser, wenn man die Situation sieht.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5f6368]">
              Deshalb zeigt die Homepage mehr konkrete Beratungsmomente: Gespräch, digitale Ordnung
              und geschäftliche Verantwortung.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {moments.map((moment) => {
              const Icon = moment.icon;

              return (
                <article
                  className="group overflow-hidden rounded-lg border border-[#e6e2dc] bg-[#f7f7f6]"
                  key={moment.title}
                >
                  <div className="relative aspect-[0.92] min-h-[280px] overflow-hidden">
                    <Image
                      alt={moment.alt}
                      className={cn("object-cover transition duration-500 group-hover:scale-[1.035]", moment.position)}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 768px) 30vw, 90vw"
                      src={moment.image}
                    />
                    <div className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-lg border border-white/70 bg-white/84 text-[#c63d4d] shadow-[inset_0_1px_0_white,0_12px_32px_rgba(83,25,36,0.12)] backdrop-blur">
                      <Icon className="size-5" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[#111827]">{moment.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5f6368]">{moment.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
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
            <h1 className="display-title mt-4 text-4xl text-[#111827] sm:text-5xl">{page.title}</h1>
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
                  <h2 className="display-title text-2xl text-[#111827]">{section.title}</h2>
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

function HumanAdvisorySection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative min-h-[520px]">
            <div className="absolute inset-y-0 left-0 right-12 overflow-hidden rounded-lg bg-[#24191c] shadow-[0_26px_80px_rgba(72,25,34,0.15)] sm:right-20">
              <Image
                alt="Zwei Beraterinnen in einem persönlichen Gespräch"
                className="object-cover object-center"
                fill
                sizes="(min-width: 1024px) 48vw, 90vw"
                src="/brand/photos/veonis-advisor-conversation-optimized.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#351c22]/42 via-transparent to-transparent" />
            </div>
            <div className="veonis-gloss-red absolute bottom-7 right-0 w-[76%] rounded-lg p-6 text-white shadow-[0_20px_60px_rgba(83,25,36,0.22)] sm:w-[64%]">
              <p className="display-title text-2xl leading-tight">
                “Gute Beratung beginnt mit den richtigen Fragen, nicht mit einem Produkt.”
              </p>
              <p className="mt-4 text-sm font-semibold text-white/72">Veonis Beratungsprinzip</p>
            </div>
          </div>
          <div>
            <SectionHeader
              eyebrow="Persönliche Beratung"
              intro="Premium bedeutet bei Veonis nicht lauter aufzutreten. Es bedeutet, komplexe Themen ruhig, sauber und verständlich zu ordnen."
              title="Menschen entscheiden besser, wenn das Gesamtbild sichtbar wird."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: ScanSearch, label: "Analyse", text: "Bestehende Lösungen sauber prüfen." },
                { icon: Handshake, label: "Begleitung", text: "Ein Ansprechpartner mit Überblick." },
                { icon: BadgeCheck, label: "Klarheit", text: "Empfehlungen ohne Druck." },
              ].map((item) => (
                <div className="rounded-lg border border-[#e6e2dc] bg-[#f7f7f6] p-5" key={item.label}>
                  <item.icon className="size-5 text-[#c63d4d]" />
                  <p className="mt-4 font-semibold text-[#111827]">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[#5f6368]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function DigitalClaritySection() {
  return (
    <section className="bg-[#f4f3f1] py-20 sm:py-24">
      <Container>
        <div className="grid overflow-hidden rounded-lg bg-white shadow-[0_24px_70px_rgba(17,24,39,0.07)] lg:grid-cols-[0.78fr_1.22fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="eyebrow">Modern arbeiten</p>
            <h2 className="display-title mt-3 text-3xl text-[#111827] sm:text-4xl">
              Beratung darf persönlich sein und trotzdem digital klar.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5f6368]">
              Veonis verbindet persönliche Gespräche mit strukturierter Übersicht. So bleiben Dokumente,
              Ziele und Prioritäten greifbar - vom ersten Finanzcheck bis zur laufenden Betreuung.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-px bg-[#e6e2dc]">
              {[
                ["Dokumente", "geordnet"],
                ["Prioritäten", "sichtbar"],
                ["Fortschritt", "nachvollziehbar"],
                ["Betreuung", "laufend"],
              ].map(([label, value]) => (
                <div className="bg-white p-4" key={label}>
                  <p className="text-xs uppercase text-[#939598]">{label}</p>
                  <p className="mt-2 font-semibold text-[#111827]">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[430px]">
            <Image
              alt="Digitale Zusammenarbeit mit Smartphones und Notizen auf einem Beratungstisch"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              src="/brand/photos/veonis-digital-meeting-optimized.jpg"
            />
            <div className="absolute inset-x-0 top-0 h-px bg-white/80" />
          </div>
        </div>
      </Container>
    </section>
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
    <section className="bg-[linear-gradient(135deg,#24191c_0%,#351b21_55%,#551c27_100%)] py-20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase text-[#ef7d8b]">{section.eyebrow}</p>
            <h2 className="display-title mt-4 text-4xl text-white sm:text-5xl">{section.title}</h2>
            <p className="mt-6 text-lg leading-8 text-white/62">{section.intro}</p>
            <Link
              className="mt-8 inline-flex items-center rounded-full bg-[#c63d4d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#b23443]"
              href={getLocalizedPath(locale, "veonis-360-analysis")}
            >
              {section.cta}
              <ChevronRight className="ml-2 size-4" />
            </Link>
          </div>
          <div className="grid border-l border-t border-white/12 sm:grid-cols-2">
            {(section.items ?? []).map((item, index) => (
              <div className="flex min-h-28 items-start gap-4 border-b border-r border-white/12 p-5 sm:p-6" key={item}>
                <span className="text-xs font-semibold text-[#ef7d8b]">{String(index + 1).padStart(2, "0")}</span>
                <p className="font-medium leading-6 text-white/82">{item}</p>
              </div>
            ))}
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
