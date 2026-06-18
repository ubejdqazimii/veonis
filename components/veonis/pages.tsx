import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  BookOpen,
  Building2,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock,
  ClipboardCheck,
  FileSearch,
  Handshake,
  Layers3,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
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
import { HomepageVersionSelector } from "@/components/veonis/homepage-version-selector";
import { Hero } from "@/components/veonis/hero";
import { LegalNoticeBlock } from "@/components/veonis/legal-notice-block";
import { ProcessTimeline } from "@/components/veonis/process-timeline";
import { SectionHeader } from "@/components/veonis/section-header";
import { ServiceCard } from "@/components/veonis/service-card";
import { TabsSection } from "@/components/veonis/tabs-section";
import { ValueCard } from "@/components/veonis/value-card";
import { cn } from "@/lib/utils";
import type { BlogPost, CardContent, Locale, PageKey } from "@/lib/veonis-content";
import { blogPosts, brand, getLocalizedPath, getPage, services } from "@/lib/veonis-content";

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
      <VersionSelectorBand current="v1" locale={locale} />
      <HomeTrustStrip />
      <ConnectedFinanceSection section={page.sections[0]} />
      <HumanAdvisorySection />
      <AnalysisSection locale={locale} />
      <HomeFocusTabsSection />
      <ServicesEditorialSection locale={locale} />
      <DigitalClaritySection />
      <AdvisoryMomentsSection />
      <WhyVeonisSection cards={page.sections[3].cards ?? []} />
      <CollaborationSection steps={page.sections[4].steps ?? []} />
      <AudienceSection cards={page.sections[5].cards ?? []} />
      <LatestBlogPostsSection locale={locale} posts={blogPosts.slice(0, 5)} />
      <CTASection locale={locale} />
    </>
  );
}

export function HomePageVersion2({ locale }: Pick<PageProps, "locale">) {
  const page = getPage(locale, "home-v2");
  const homePage = getPage(locale, "home");

  return (
    <>
      <Hero
        cta={page.cta}
        description={page.description}
        eyebrow={page.eyebrow}
        locale={locale}
        secondaryCta={page.secondaryCta}
        title={page.title}
        visualLabel="Version 2"
        variant="home"
      />
      <VersionSelectorBand current="v2" locale={locale} />
      <HomeTrustStrip />
      <V2OverviewSection locale={locale} />
      <V2ServicesSection locale={locale} />
      <CollaborationSection steps={(homePage.sections[4].steps ?? []).slice(0, 4)} />
      <LatestBlogPostsSection locale={locale} posts={blogPosts.slice(0, 5)} />
      <CTASection
        button={locale === "de" ? "Erstgespräch für meine Situation anfragen" : "Request an initial conversation"}
        locale={locale}
        text={
          locale === "de"
            ? "Version 2 führt schneller zur Entscheidung: Wenn Sie Ihre Situation prüfen möchten, starten wir mit einem ruhigen Erstgespräch und einer klaren Einordnung."
            : "Version 2 moves faster toward a decision: if you want to review your situation, we start with a calm initial conversation and a clear assessment."
        }
        title={locale === "de" ? "Bereit für die nächste klare Entscheidung?" : "Ready for the next clear decision?"}
      />
    </>
  );
}

export function BlogPage({ locale }: Pick<PageProps, "locale">) {
  const page = getPage(locale, "blog");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#f6f2ef] py-16 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(198,61,77,0.14),transparent_22rem)]" />
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="eyebrow">{page.eyebrow}</p>
              <h1 className="display-title mt-4 text-4xl leading-tight text-[#111827] sm:text-6xl">
                {page.title}
              </h1>
            </div>
            <div className="max-w-2xl space-y-4 text-lg leading-8 text-[#5f6368] lg:justify-self-end">
              {page.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <BlogPostsGrid locale={locale} posts={blogPosts} />
      <CTASection
        button={locale === "de" ? "Eigene Finanzfragen besprechen" : "Discuss your financial questions"}
        locale={locale}
        title={locale === "de" ? "Lesen ist gut. Einordnung ist besser." : "Reading helps. Context helps more."}
      />
    </>
  );
}

function VersionSelectorBand({ current, locale }: { current: "v1" | "v2"; locale: Locale }) {
  return (
    <section className="border-b border-[#e6e2dc] bg-[#f7f7f6] py-4">
      <Container>
        <HomepageVersionSelector current={current} locale={locale} />
      </Container>
    </section>
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
            <LegalNoticeBlock locale={locale} />
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

function V2OverviewSection({ locale }: { locale: Locale }) {
  const section = getPage(locale, "home").sections[0];
  const analysis = getPage(locale, "home").sections[1];

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12">
          <article className="veonis-gloss-dark rounded-lg p-7 text-white lg:col-span-5 sm:p-8">
            <p className="text-xs font-semibold uppercase text-[#ef7d8b]">{section.eyebrow}</p>
            <h2 className="display-title mt-4 text-4xl leading-tight text-white sm:text-5xl">{section.title}</h2>
            <p className="mt-6 text-lg leading-8 text-white/66">{section.paragraphs?.[0]}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Versicherungen", "Vorsorge", "Hypotheken", "Steuern"].map((item) => (
                <div className="rounded-lg border border-white/12 bg-white/8 p-4 text-sm font-semibold text-white/80" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="relative min-h-[460px] overflow-hidden rounded-lg bg-[#24191c] lg:col-span-4">
            <Image
              alt="Digitale Finanzübersicht in einer Beratung"
              className="object-cover object-[45%_center]"
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              src="/brand/photos/veonis-digital-collaboration-optimized.jpg"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,25,28,0.05),rgba(36,25,28,0.78))]" />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/18 bg-white/14 p-5 text-white backdrop-blur-md">
              <p className="text-xs font-semibold uppercase text-[#ef7d8b]">360° Analyse</p>
              <p className="mt-2 text-sm leading-6 text-white/76">{analysis.intro}</p>
            </div>
          </article>

          <article className="veonis-soft-service rounded-lg p-7 lg:col-span-3 sm:p-8">
            <ScanSearch className="size-6 text-[#c63d4d]" />
            <h3 className="display-title mt-8 text-3xl leading-tight text-[#111827]">
              {locale === "de" ? "Weniger Scrollen, mehr Orientierung." : "Less scrolling, more orientation."}
            </h3>
            <p className="mt-5 leading-7 text-[#5f6368]">
              {locale === "de"
                ? "Version 2 bündelt wiederholte Vertrauenssignale und stellt Entscheidungspunkte früher sichtbar dar."
                : "Version 2 groups repeated trust signals and makes decision points visible earlier."}
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
}

function V2ServicesSection({ locale }: { locale: Locale }) {
  const highlights = services.slice(0, 4);

  return (
    <section className="bg-[#f6f2ef] py-20 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <SectionHeader
            eyebrow="Services"
            intro={
              locale === "de"
                ? "Die kompakte Version zeigt die wichtigsten Beratungsthemen als Entscheidungsfelder statt als lange Leistungsstrecke."
                : "The compact version presents key advisory topics as decision areas instead of a long service sequence."
            }
            title={locale === "de" ? "Vier Felder, ein Gesamtbild." : "Four areas, one overall picture."}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((service, index) => (
              <article className="rounded-lg border border-white/70 bg-white/78 p-6 shadow-[0_18px_50px_rgba(68,24,32,0.08)] backdrop-blur" key={service.title}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-[#c63d4d]">{String(index + 1).padStart(2, "0")}</span>
                  <BadgeCheck className="size-5 text-[#c63d4d]" />
                </div>
                <h3 className="mt-8 text-xl font-semibold text-[#111827]">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5f6368]">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function CollaborationSection({ steps }: { steps: { title: string; text: string }[] }) {
  const icons = [Handshake, FileSearch, ClipboardCheck, ShieldCheck, Sparkles];

  return (
    <section className="relative isolate overflow-hidden bg-[#f6f2ef] py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.76),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(198,61,77,0.16),transparent_22rem)]" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="eyebrow">Zusammenarbeit</p>
            <h2 className="display-title mt-3 max-w-md text-4xl leading-tight text-[#111827] sm:text-5xl">
              Ein klarer Ablauf, der sich persönlich anfühlt.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-[#5f6368]">
              Von der ersten Frage bis zur laufenden Betreuung bleibt sichtbar, was geprüft wird,
              warum es relevant ist und welcher Schritt als Nächstes sinnvoll ist.
            </p>
          </div>
          <div className="relative min-h-[440px] overflow-hidden rounded-lg bg-[#24191c] shadow-[0_30px_90px_rgba(68,24,32,0.18)]">
            <Image
              alt="Beratungsteam in einer fokussierten Zusammenarbeit"
              className="object-cover object-[48%_center] opacity-82"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              src="/brand/photos/veonis-team-workshop-optimized.jpg"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,25,28,0.84),rgba(36,25,28,0.22)_58%,rgba(36,25,28,0.08))]" />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Analyse"],
                ["02", "Prioritäten"],
                ["03", "Begleitung"],
              ].map(([number, label]) => (
                <div className="rounded-lg border border-white/18 bg-white/12 p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md" key={label}>
                  <p className="text-xs font-semibold text-[#ef7d8b]">{number}</p>
                  <p className="mt-2 text-sm font-semibold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = icons[index] ?? BadgeCheck;

            return (
              <article
                className="group relative min-h-72 overflow-hidden rounded-lg border border-white/70 bg-white/74 p-6 shadow-[0_20px_60px_rgba(68,24,32,0.08)] backdrop-blur transition hover:-translate-y-1 hover:bg-white"
                key={step.title}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#c63d4d,#ef7d8b,#ffffff)] opacity-80" />
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-lg border border-[#ead9dc] bg-[#fff7f8] text-[#c63d4d] shadow-[inset_0_1px_0_white]">
                    <Icon className="size-5" />
                  </span>
                  <span className="display-title text-5xl text-[#ead9dc] transition group-hover:text-[#e5c5ca]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-[#111827]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5f6368]">{step.text}</p>
              </article>
            );
          })}
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

function AudienceSection({ cards }: { cards: CardContent[] }) {
  const icons = [CircleUserRound, Building2, Sparkles, Users, Layers3];

  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[540px] overflow-hidden rounded-lg bg-[#24191c] shadow-[0_28px_90px_rgba(17,24,39,0.14)]">
            <Image
              alt="Premium Lounge Beratungssituation bei Veonis"
              className="object-cover object-[48%_center]"
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              src="/brand/photos/veonis-lounge-consultation-optimized.jpg"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,25,28,0.08),rgba(36,25,28,0.82))]" />
            <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/18 bg-white/14 p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_50px_rgba(17,24,39,0.18)] backdrop-blur-md">
              <p className="text-xs font-semibold uppercase text-[#ef7d8b]">Für Privat & Unternehmen</p>
              <p className="display-title mt-3 text-3xl leading-tight text-white">
                Ein System, das mit Lebensphasen und Unternehmensphasen mitwächst.
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Zielgruppen</p>
            <h2 className="display-title mt-3 max-w-xl text-4xl leading-tight text-[#111827] sm:text-5xl">
              Für Menschen, die Finanzfragen nicht einzeln lösen wollen.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cards.map((card, index) => {
                const Icon = icons[index] ?? BadgeCheck;

                return (
                  <article
                    className={cn(
                      "veonis-soft-service group rounded-lg p-5 transition hover:-translate-y-1 hover:bg-white",
                      index === 0 ? "sm:col-span-2" : "",
                    )}
                    key={card.title}
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-[#ead9dc] bg-[#fff7f8] text-[#c63d4d]">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-[#111827]">{card.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#5f6368]">{card.text}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function LatestBlogPostsSection({ locale, posts }: { locale: Locale; posts: BlogPost[] }) {
  return (
    <section className="bg-[#f7f7f6] py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow={locale === "de" ? "Aktuelle Impulse" : "Latest insights"}
            intro={
              locale === "de"
                ? "Fünf kurze Einstiege in Finanzfragen, die in der Schweizer Beratung häufig zusammenhängen."
                : "Five concise entry points into financial questions that are often connected in Swiss advisory work."
            }
            title={locale === "de" ? "Neu im Veonis Blog." : "New on the Veonis blog."}
          />
          <Link
            className="inline-flex items-center text-sm font-semibold text-[#c63d4d]"
            href={getLocalizedPath(locale, "blog")}
          >
            {locale === "de" ? "Alle Beiträge ansehen" : "View all posts"}
            <ChevronRight className="ml-1 size-4" />
          </Link>
        </div>
        <div className="mt-10">
          <BlogPostsGrid compact locale={locale} posts={posts} />
        </div>
      </Container>
    </section>
  );
}

function BlogPostsGrid({
  compact = false,
  locale,
  posts,
}: {
  compact?: boolean;
  locale: Locale;
  posts: BlogPost[];
}) {
  return (
    <section className={compact ? "" : "bg-white py-16 sm:py-20"}>
      <Container className={compact ? "px-0 sm:px-0 lg:px-0" : undefined}>
        <div className={cn("grid gap-5", compact ? "lg:grid-cols-5" : "md:grid-cols-2 lg:grid-cols-3")}>
          {posts.map((post, index) => (
            <article
              className={cn(
                "group overflow-hidden rounded-lg border border-[#e6e2dc] bg-white shadow-[0_18px_50px_rgba(17,24,39,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,24,32,0.12)]",
                !compact && index === 0 ? "lg:col-span-2" : "",
              )}
              key={post.slug}
            >
              <div className={cn("relative overflow-hidden", compact ? "aspect-[1.05]" : "aspect-[1.45]")}>
                <Image
                  alt={post.alt[locale]}
                  className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  fill
                  sizes={compact ? "(min-width: 1024px) 18vw, 90vw" : "(min-width: 1024px) 31vw, 90vw"}
                  src={post.image}
                />
                <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/86 px-3 py-1 text-xs font-semibold text-[#8f2535] shadow-[inset_0_1px_0_white] backdrop-blur">
                  {post.category[locale]}
                </div>
              </div>
              <div className={cn("p-5", compact ? "" : "sm:p-6")}>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#939598]">
                  <Clock className="size-3.5" />
                  {post.readTime[locale]}
                </div>
                <h3 className={cn("mt-4 font-semibold leading-tight text-[#111827]", compact ? "text-base" : "text-2xl")}>
                  {post.title[locale]}
                </h3>
                <p className={cn("mt-3 leading-6 text-[#5f6368]", compact ? "text-sm" : "")}>{post.excerpt[locale]}</p>
                {!compact ? (
                  <Link
                    className="mt-5 inline-flex items-center text-sm font-semibold text-[#c63d4d]"
                    href={getLocalizedPath(locale, "blog")}
                  >
                    <BookOpen className="mr-2 size-4" />
                    {locale === "de" ? "Im Blog einordnen" : "Read in the blog"}
                  </Link>
                ) : null}
              </div>
            </article>
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
