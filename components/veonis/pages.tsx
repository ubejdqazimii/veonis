import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Calculator,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock,
  ClipboardCheck,
  FileSearch,
  Handshake,
  House,
  Landmark,
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
import { HomeV3FinanceCockpit, HomeV3ServicesTabs } from "@/components/veonis/home-v3-interactive";
import { HomeV3SegmentedPanel } from "@/components/veonis/home-v3-segmented-panel";
import { HomepageVersionSelector } from "@/components/veonis/homepage-version-selector";
import { Hero } from "@/components/veonis/hero";
import { LegalNoticeBlock } from "@/components/veonis/legal-notice-block";
import { ProcessTimeline } from "@/components/veonis/process-timeline";
import { SectionHeader } from "@/components/veonis/section-header";
import { ServiceCard } from "@/components/veonis/service-card";
import { ValueCard } from "@/components/veonis/value-card";
import { cn } from "@/lib/utils";
import { getManagedBlogArticle, getManagedBlogPosts, getManagedPage } from "@/lib/cms";
import type { BlogPost, CardContent, ContentSection, Locale, PageKey } from "@/lib/veonis-content";
import {
  brand,
  getBlogPostPath,
  getLocalizedPath,
  getPage,
  services,
  valueCards,
} from "@/lib/veonis-content";

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

export async function HomePage({ locale }: Pick<PageProps, "locale">) {
  const [page, managedPosts] = await Promise.all([
    getManagedPage(locale, "home"),
    getManagedBlogPosts(locale),
  ]);

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
      <AnalysisSection locale={locale} section={page.sections[1]} />
      <HomeFocusTabsSection />
      <ServicesEditorialSection locale={locale} />
      <DigitalClaritySection />
      <AdvisoryMomentsSection />
      <WhyVeonisSection cards={page.sections[3].cards ?? []} />
      <CollaborationSection steps={page.sections[4].steps ?? []} />
      <AudienceSection cards={page.sections[5].cards ?? []} />
      <LatestBlogPostsSection locale={locale} posts={managedPosts.slice(0, 5)} />
      <CTASection locale={locale} />
    </>
  );
}

export async function HomePageVersion2({ locale }: Pick<PageProps, "locale">) {
  const [page, managedPosts] = await Promise.all([
    getManagedPage(locale, "home-v2"),
    getManagedBlogPosts(locale),
  ]);

  return (
    <>
      <V2HeroSection locale={locale} page={page} />
      <V2OverviewSection locale={locale} />
      <V2ServicesSection locale={locale} />
      <V2CollaborationSection locale={locale} />
      <V2LatestBlogPostsSection locale={locale} posts={managedPosts.slice(0, 5)} />
      <V2CTASection locale={locale} />
    </>
  );
}

export async function HomePageVersion3({ locale }: Pick<PageProps, "locale">) {
  const [page, managedPosts] = await Promise.all([
    getManagedPage(locale, "home-v3"),
    getManagedBlogPosts(locale),
  ]);

  return (
    <>
      <V3HeroSection locale={locale} page={page} />
      <V3RedCoverSection locale={locale} />
      <V3FinanceMapSection locale={locale} />
      <V3SituationSection locale={locale} />
      <V3WhyVeonisStrip />
      <V3HumanMomentsSection locale={locale} />
      <V3ServicesMatrixSection locale={locale} />
      <V3SnapCardsSection locale={locale} />
      <V3InsightsSection locale={locale} posts={managedPosts.slice(0, 5)} />
      <V2CTASection locale={locale} />
    </>
  );
}

function V3RedCoverSection({ locale }: { locale: Locale }) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="relative max-w-full rounded-lg bg-[linear-gradient(135deg,#24191c_0%,#6f2431_48%,#c63d4d_100%)] p-2 text-white shadow-[0_30px_90px_rgba(83,25,36,0.24)] sm:p-3">
          <div className="relative min-h-[430px] overflow-hidden rounded-lg bg-[#24191c] sm:min-h-[520px] lg:min-h-[580px]">
            <Image
              alt={
                locale === "de"
                  ? "Strategische Beratungssituation bei Veonis"
                  : "Strategic advisory setting at Veonis"
              }
              className="object-cover object-[54%_center]"
              fill
              priority={false}
              sizes="(min-width: 1024px) 1120px, 100vw"
              src="/brand/photos/veonis-creative-advisory-v2.jpg"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,25,28,0.86)_0%,rgba(76,28,36,0.42)_42%,rgba(36,25,28,0.08)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#24191c]/78 via-[#24191c]/16 to-transparent" />
            <div className="absolute left-4 top-4 rounded-full border border-white/24 bg-white/12 px-4 py-2 text-xs font-semibold uppercase text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur sm:left-6 sm:top-6">
              {locale === "de" ? "Beratungsprinzip" : "Advisory principle"}
            </div>
            <div className="absolute bottom-6 left-5 max-w-[17rem] sm:bottom-8 sm:left-8 sm:max-w-sm">
              <p className="text-xs font-semibold uppercase text-[#ffb1ba]">Veonis</p>
              <p className="mt-2 text-sm leading-6 text-white/74">
                {locale === "de"
                  ? "Struktur, Ruhe und klare Prioritäten für finanzielle Entscheidungen."
                  : "Structure, calm and clear priorities for financial decisions."}
              </p>
            </div>
          </div>
          <div className="relative z-10 -mt-24 ml-auto mr-3 max-w-full rounded-lg border border-white/22 bg-[#9f2f42]/82 p-5 text-white shadow-[0_24px_80px_rgba(61,16,25,0.32)] backdrop-blur-xl sm:-mt-28 sm:mr-8 sm:w-[70%] sm:p-7 lg:mr-12 lg:w-[48%]">
            <p className="display-title text-2xl leading-tight text-white sm:text-3xl">
              {locale === "de"
                ? "“Gute Beratung beginnt mit den richtigen Fragen, nicht mit einem Produkt.”"
                : "“Good advice starts with the right questions, not with a product.”"}
            </p>
            <p className="mt-4 text-sm font-semibold text-white/72">
              {locale === "de" ? "Veonis Beratungsprinzip" : "Veonis advisory principle"}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export async function BlogPage({ locale }: Pick<PageProps, "locale">) {
  const [page, managedPosts] = await Promise.all([
    getManagedPage(locale, "blog"),
    getManagedBlogPosts(locale),
  ]);

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
      <BlogPostsGrid locale={locale} posts={managedPosts} />
      <CTASection
        button={locale === "de" ? "Eigene Finanzfragen besprechen" : "Discuss your financial questions"}
        locale={locale}
        title={locale === "de" ? "Lesen ist gut. Einordnung ist besser." : "Reading helps. Context helps more."}
      />
    </>
  );
}

export async function BlogArticlePage({ locale, slug }: { locale: Locale; slug: string }) {
  const [managedArticle, managedPosts] = await Promise.all([
    getManagedBlogArticle(locale, slug),
    getManagedBlogPosts(locale),
  ]);

  if (!managedArticle) {
    notFound();
  }

  const { post, article } = managedArticle;
  const relatedPosts = managedPosts.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#f6f2ef] py-12 sm:py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_8%,rgba(198,61,77,0.15),transparent_24rem)]" />
        <Container>
          <Link
            className="inline-flex items-center text-sm font-semibold text-[#c63d4d]"
            href={getLocalizedPath(locale, "blog")}
          >
            <ChevronRight className="mr-1 size-4 rotate-180" />
            {locale === "de" ? "Zurück zum Blog" : "Back to blog"}
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow">
                {post.category[locale]} · {post.readTime[locale]}
              </p>
              <h1 className="display-title mt-4 text-4xl leading-tight text-[#111827] sm:text-6xl">
                {post.title[locale]}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#5f6368]">{post.excerpt[locale]}</p>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-lg bg-[#24191c] shadow-[0_24px_80px_rgba(68,24,32,0.18)] sm:min-h-[430px]">
              <Image
                alt={post.alt[locale]}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                src={post.image}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,25,28,0.02),rgba(36,25,28,0.24))]" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(18rem,0.28fr)] lg:items-start">
            <article className="min-w-0 rounded-lg border border-[#e6e2dc] bg-white p-5 shadow-[0_20px_60px_rgba(17,24,39,0.06)] sm:p-8 lg:p-10">
              <div className="space-y-5 text-lg leading-8 text-[#3f4348]">
                {article.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 space-y-10">
                {article.sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-2xl font-semibold leading-tight text-[#111827] sm:text-3xl">{section.title}</h2>
                    <div className="mt-4 space-y-4 text-base leading-8 text-[#5f6368]">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-10 rounded-lg bg-[#f7f7f6] p-5 sm:p-6">
                <h2 className="text-lg font-semibold text-[#111827]">
                  {locale === "de" ? "Kurz zusammengefasst" : "In brief"}
                </h2>
                <div className="mt-4 grid gap-3">
                  {article.takeaways.map((item) => (
                    <div className="flex gap-3 text-sm leading-6 text-[#4b5563]" key={item}>
                      <Check className="mt-1 size-4 shrink-0 text-[#c63d4d]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <aside className="grid gap-4 lg:sticky lg:top-28">
              <div className="rounded-lg border border-[#e6e2dc] bg-[#f7f7f6] p-5">
                <p className="eyebrow">{locale === "de" ? "Mehr lesen" : "Read more"}</p>
                <div className="mt-4 grid gap-3">
                  {relatedPosts.map((item) => (
                    <Link
                      className="group rounded-lg bg-white p-4 shadow-[0_12px_34px_rgba(17,24,39,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(68,24,32,0.1)]"
                      href={getBlogPostPath(locale, item.slug)}
                      key={item.slug}
                    >
                      <span className="text-xs font-semibold text-[#c63d4d]">{item.category[locale]}</span>
                      <span className="mt-2 block text-sm font-semibold leading-6 text-[#111827] group-hover:text-[#8f2535]">
                        {item.title[locale]}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-[#24191c] p-5 text-white">
                <p className="text-sm font-semibold text-[#ef7d8b]">{brand.claim}</p>
                <p className="mt-3 text-lg font-semibold leading-7">
                  {locale === "de" ? "Möchten Sie Ihre Situation persönlich einordnen?" : "Would you like to review your situation personally?"}
                </p>
                <Link
                  className="mt-5 inline-flex items-center text-sm font-semibold text-white"
                  href={getLocalizedPath(locale, "contact")}
                >
                  {locale === "de" ? "Erstgespräch vereinbaren" : "Book an initial conversation"}
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CTASection
        button={locale === "de" ? "Kostenloses Erstgespräch vereinbaren" : "Book a free initial conversation"}
        locale={locale}
        title={locale === "de" ? "Aus einem Artikel wird Klarheit im Gespräch." : "An article becomes clarity in conversation."}
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

function V2HeroSection({
  locale,
  page,
}: {
  locale: Locale;
  page: ReturnType<typeof getPage>;
}) {
  const proofPoints =
    locale === "de"
      ? ["Ganzheitliche Analyse", "Unabhängiger Blick", "Persönliche Begleitung", "Klare Empfehlungen"]
      : ["Holistic analysis", "Independent perspective", "Personal guidance", "Clear recommendations"];

  return (
    <section className="relative isolate overflow-hidden bg-[#24191c] text-white">
      <Image
        alt={locale === "de" ? "Premium Beratungssituation bei Veonis" : "Premium advisory setting at Veonis"}
        className="object-cover object-[54%_center] opacity-74"
        fill
        preload
        quality={76}
        sizes="100vw"
        src="/brand/photos/veonis-team-workshop-optimized.jpg"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,19,24,0.98)_0%,rgba(47,22,28,0.9)_44%,rgba(72,25,34,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_28%,rgba(239,125,139,0.2),transparent_28rem)]" />
      <Container className="relative grid min-h-[560px] items-center gap-8 py-12 sm:min-h-[600px] lg:grid-cols-[0.92fr_0.58fr]">
        <div className="max-w-3xl">
          <h1 className="display-title mt-6 text-4xl leading-[1.02] text-white sm:text-6xl lg:text-[4.25rem]">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/74 sm:text-lg sm:leading-8">
            {page.description[0]}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#c63d4d] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_18px_46px_rgba(83,25,36,0.28)] transition hover:bg-[#ad3040]"
              href={getLocalizedPath(locale, "contact")}
            >
              {page.cta}
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/28 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/18"
              href={getLocalizedPath(locale, "veonis-360-analysis")}
            >
              {page.secondaryCta}
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-white/14 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_26px_70px_rgba(0,0,0,0.16)] backdrop-blur-md sm:p-5">
          <p className="text-xs font-semibold uppercase text-[#ef7d8b]">
            {locale === "de" ? "Veonis Prinzip" : "Veonis principle"}
          </p>
          <div className="mt-4 grid gap-2">
            {proofPoints.map((point) => (
              <div className="flex items-center gap-3 rounded-lg bg-white/9 p-3 text-sm font-semibold text-white/82" key={point}>
                <ShieldCheck className="size-4 shrink-0 text-[#ef7d8b]" />
                {point}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function V3HeroSection({
  locale,
  page,
}: {
  locale: Locale;
  page: ReturnType<typeof getPage>;
}) {
  const proof =
    locale === "de"
      ? ["Ganzheitliche Analyse", "Unabhängiger Blick", "Persönliche Begleitung", "Klare Empfehlungen"]
      : ["Holistic analysis", "Independent perspective", "Personal guidance", "Clear recommendations"];

  return (
    <section className="relative isolate overflow-hidden bg-[#21191c] text-white">
      <Image
        alt={locale === "de" ? "Beratungssituation bei Veonis" : "Advisory setting at Veonis"}
        className="object-cover object-[56%_center] opacity-78"
        fill
        preload
        quality={78}
        sizes="100vw"
        src="/brand/photos/veonis-lounge-consultation-optimized.jpg"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(31,23,26,0.98)_0%,rgba(43,24,29,0.9)_48%,rgba(92,28,39,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_20%,rgba(239,125,139,0.22),transparent_24rem)]" />
      <Container className="relative grid min-h-[610px] items-center gap-8 py-14 lg:grid-cols-[0.9fr_0.62fr]">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/12 px-3 py-2 text-xs font-semibold uppercase text-white/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-md">
            <Landmark className="size-4 text-[#ef7d8b]" />
            {page.eyebrow}
          </p>
          <h1 className="display-title mt-6 text-4xl leading-[1.02] text-white sm:text-6xl lg:text-[4.4rem]">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/74 sm:text-lg sm:leading-8">
            {page.description[0]}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#c63d4d] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_46px_rgba(83,25,36,0.3)] transition hover:bg-[#ad3040]"
              href={getLocalizedPath(locale, "contact")}
            >
              {page.cta}
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/28 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/18"
              href={getLocalizedPath(locale, "veonis-360-analysis")}
            >
              {page.secondaryCta}
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-white/14 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_28px_80px_rgba(0,0,0,0.2)] backdrop-blur-md sm:p-5">
          <div className="grid gap-3">
            {proof.map((item, index) => (
              <div className="rounded-lg border border-white/10 bg-white/8 p-4" key={item}>
                <p className="text-xs font-semibold text-[#ef7d8b]">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-lg font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
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

export async function StandardPage({ locale, pageKey }: PageProps) {
  const page = await getManagedPage(locale, pageKey);
  const isServices = pageKey === "services";
  const isAnalysis = pageKey === "veonis-360-analysis";
  const isPrivateClients = pageKey === "private-clients";
  const isAboutVeonis = pageKey === "about-veonis";
  const ctaTitle = isPrivateClients
    ? locale === "de"
      ? "Bereit für mehr Klarheit?"
      : "Ready for more clarity?"
    : isAnalysis
      ? locale === "de"
        ? "Bereit für den 360°-Check?"
        : "Ready for the 360° Check?"
      : isServices
        ? locale === "de"
          ? "Bereit für mehr Klarheit?"
          : "Ready for more clarity?"
        : isAboutVeonis
          ? locale === "de"
            ? "Lernen Sie Veonis kennen"
            : "Get to know Veonis"
          : undefined;
  const ctaText = isPrivateClients
    ? locale === "de"
      ? "Ein erstes Gespräch reicht oft aus, um die wichtigsten Themen sichtbar zu machen. Wir hören zu, ordnen ein und zeigen Ihnen, welche nächsten Schritte sinnvoll sind. Unverbindlich. Persönlich. Klar."
      : "An initial conversation is often enough to make the most important topics visible. We listen, put things into context and show which next steps make sense. Non-binding. Personal. Clear."
    : isAnalysis
      ? locale === "de"
        ? "Ein erstes Gespräch reicht oft aus, um zu erkennen, ob ein 360°-Check für Sie sinnvoll ist. Unverbindlich. Persönlich. Mit klarem Blick auf Ihre Interessen."
        : "An initial conversation is often enough to see whether a 360° Check makes sense for you. Non-binding. Personal. With a clear view of your interests."
      : isServices
        ? locale === "de"
          ? "Ein erstes Gespräch reicht oft aus, um zu erkennen, welches Thema bei Ihnen Priorität hat. Unverbindlich. Persönlich. Klar."
          : "An initial conversation is often enough to identify which topic has priority for you. Non-binding. Personal. Clear."
        : isAboutVeonis
          ? locale === "de"
            ? "Ein erstes Gespräch reicht oft aus, um zu spüren, ob die Zusammenarbeit passt. Wir nehmen uns Zeit, hören zu und zeigen Ihnen, wie wir Ihre Situation einordnen würden. Persönlich. Verständlich. Verbindlich."
            : "An initial conversation is often enough to sense whether working together fits. We take time, listen and show how we would classify your situation. Personal. Understandable. Reliable."
          : undefined;

  return (
    <>
      <Hero
        cta={page.cta}
        description={page.description}
        eyebrow={page.eyebrow}
        locale={locale}
        subtitle={page.subtitle}
        title={page.title}
        visualLabel={isAnalysis ? (locale === "de" ? "360°-Check" : "360° Check") : page.eyebrow}
      />
      {page.sections.map((section, index) => (
        <SectionBlock key={`${section.title}-${index}`} section={section} tone={index % 2 === 0 ? "white" : "grey"} />
      ))}
      <CTASection
        locale={locale}
        button={page.cta ?? "Jetzt Kontakt aufnehmen"}
        title={ctaTitle}
        text={ctaText}
      />
    </>
  );
}

export async function ContactPage({ locale }: Pick<PageProps, "locale">) {
  const page = await getManagedPage(locale, "contact");

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
              </div>
            </div>
            <ContactForm locale={locale} />
          </div>
        </Container>
      </section>
    </>
  );
}

export async function FAQPage({ locale }: Pick<PageProps, "locale">) {
  const page = await getManagedPage(locale, "faq");

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

export async function LegalPage({ locale, pageKey }: PageProps) {
  const page = await getManagedPage(locale, pageKey);

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
                  {section.content?.map((block, index) => {
                    if (block.type === "paragraph") {
                      return (
                        <p className="mt-4 leading-7 text-[#5f6368]" key={`paragraph-${index}`}>
                          {block.text}
                        </p>
                      );
                    }

                    if (block.type === "details") {
                      return <LegalDetails items={block.items} key={`details-${index}`} />;
                    }

                    return <LegalList items={block.items} key={`list-${index}`} />;
                  })}
                  {section.paragraphs?.map((paragraph) => (
                    <p className="mt-4 leading-7 text-[#5f6368]" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                  {section.items ? <LegalList items={section.items} /> : null}
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

function V3FinanceMapSection({ locale }: { locale: Locale }) {
  const effects =
    locale === "de"
      ? [
          { title: "Gesamtbild statt Einzelentscheid", text: "Wir betrachten Versicherungen, Vorsorge, Steuern, Hypotheken und Anlagen gemeinsam." },
          { title: "Prioritäten vor Produkten", text: "Zuerst klären wir, was wirklich wichtig ist - erst danach geht es um mögliche Lösungen." },
          { title: "Beratung mit Umsetzungsplan", text: "Sie erhalten verständliche Empfehlungen und konkrete nächste Schritte." },
        ]
      : [
          { title: "Overall picture before single decisions", text: "We look at insurance, pensions, taxes, mortgages and investments together." },
          { title: "Priorities before products", text: "First we clarify what truly matters - only then do possible solutions come into focus." },
          { title: "Advice with an implementation plan", text: "You receive understandable recommendations and concrete next steps." },
        ];
  const paragraphs =
    locale === "de"
      ? [
          "Viele Menschen haben Versicherungen, Vorsorgelösungen, Hypotheken, Anlagen und Steuerfragen an verschiedenen Orten geregelt. Jede einzelne Lösung kann sinnvoll wirken - aber erst im Zusammenspiel zeigt sich, ob wirklich alles zusammenpasst.",
          "Ihre Vorsorge beeinflusst Ihre Steuern. Ihre Hypothek beeinflusst Ihre Liquidität. Ihre Versicherungen beeinflussen Ihre monatlichen Kosten. Ihre Anlagen sollten zu Ihren Zielen, Ihrer Risikobereitschaft und Ihrer Lebensphase passen.",
          "Veonis betrachtet diese Themen nicht einzeln, sondern als Gesamtbild. So entstehen klare Prioritäten statt isolierte Entscheidungen.",
        ]
      : [
          "Many people have insurance, pension solutions, mortgages, investments and tax questions arranged in different places. Each solution can look sensible on its own - but only the interaction shows whether everything truly fits together.",
          "Your pension planning affects your taxes. Your mortgage affects your liquidity. Your insurance affects your monthly costs. Your investments should fit your goals, risk appetite and life phase.",
          "Veonis does not review these topics in isolation, but as one overall picture. That creates clear priorities instead of isolated decisions.",
        ];

  return (
    <section className="bg-[#f6f2ef] py-12 sm:py-16">
      <Container>
        <div className="grid min-w-0 gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <article className="rounded-lg bg-[#24191c] p-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-8">
            <p className="text-xs font-semibold uppercase text-[#ef7d8b]">{locale === "de" ? "Gesamtbild" : "Overall picture"}</p>
            <h2 className="display-title mt-4 text-3xl leading-tight text-white sm:text-5xl">
              {locale === "de"
                ? "Finanzielle Klarheit beginnt nicht bei einem Produkt, sondern beim Gesamtbild."
                : "Financial clarity does not start with a product, but with the overall picture."}
            </h2>
            <div className="mt-5 space-y-4 leading-7 text-white/66">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 grid gap-2">
              {effects.map((effect, index) => (
                <div className="rounded-lg border border-white/12 bg-white/8 p-3 text-sm text-white/78" key={effect.title}>
                  <p className="text-xs font-semibold text-[#ef7d8b]">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-1 font-semibold text-white">{effect.title}</p>
                  <p className="mt-1 leading-6 text-white/64">{effect.text}</p>
                </div>
              ))}
            </div>
          </article>

          <HomeV3FinanceCockpit locale={locale} />
        </div>
      </Container>
    </section>
  );
}

function V3SituationSection({ locale }: { locale: Locale }) {
  return (
    <section className="bg-[linear-gradient(135deg,#21191c_0%,#351b21_48%,#661f2d_100%)] py-14 text-white sm:py-20">
      <Container>
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase text-[#ef7d8b]">
            {locale === "de" ? "Zielgruppen" : "Client situations"}
          </p>
          <h2 className="display-title mt-3 text-3xl leading-tight text-white sm:text-5xl">
            {locale === "de"
              ? "Die Beratung passt zu Ihrer Ausgangslage."
              : "Advice matched to your starting point."}
          </h2>
        </div>
        <HomeV3SegmentedPanel locale={locale} />
      </Container>
    </section>
  );
}

function V3WhyVeonisStrip() {
  const icons = [Layers3, CircleUserRound, BadgeCheck, ShieldCheck, ClipboardCheck, Handshake];

  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {valueCards.map((card, index) => {
            const Icon = icons[index] ?? BadgeCheck;

            return (
              <article className="rounded-lg border border-[#e6e2dc] bg-[#f7f7f6] p-4" key={card.title}>
                <Icon className="size-5 text-[#c63d4d]" />
                <h3 className="mt-4 font-semibold text-[#111827]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f6368]">{card.text}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function V3HumanMomentsSection({ locale }: { locale: Locale }) {
  const moments =
    locale === "de"
      ? [
          {
            title: "Persönliches Erstgespräch",
            text: "Ziele, Fragen und Unterlagen werden gemeinsam eingeordnet.",
            badge: "Erstgespräch",
            image: "/brand/photos/veonis-client-discussion-optimized.jpg",
            alt: "Persönliches Beratungsgespräch bei Veonis",
          },
          {
            title: "Digitale Übersicht",
            text: "Dokumente, Prioritäten und nächste Schritte bleiben greifbar.",
            badge: "Übersicht",
            image: "/brand/photos/veonis-digital-collaboration-v2.jpg",
            alt: "Digitale Übersicht in einer Beratungssituation",
          },
          {
            title: "Unternehmerische Verantwortung",
            text: "Private und geschäftliche Finanzthemen werden sauber verbunden.",
            badge: "Firmenkunden",
            image: "/brand/photos/veonis-team-workshop-optimized.jpg",
            alt: "Firmenkundenberatung in einem Workshop",
          },
        ]
      : [
          {
            title: "Personal first conversation",
            text: "Goals, questions and documents are put into context together.",
            badge: "First meeting",
            image: "/brand/photos/veonis-client-discussion-optimized.jpg",
            alt: "Personal advisory conversation at Veonis",
          },
          {
            title: "Digital overview",
            text: "Documents, priorities and next steps remain easy to access.",
            badge: "Overview",
            image: "/brand/photos/veonis-digital-collaboration-v2.jpg",
            alt: "Digital overview in an advisory setting",
          },
          {
            title: "Entrepreneurial responsibility",
            text: "Private and business financial topics are connected clearly.",
            badge: "Companies",
            image: "/brand/photos/veonis-team-workshop-optimized.jpg",
            alt: "Corporate advisory workshop",
          },
        ];

  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.56fr_1.44fr] lg:items-end">
          <SectionHeader
            eyebrow={locale === "de" ? "Persönliche Beratung" : "Personal advice"}
            intro={
              locale === "de"
                ? "Finanzielle Entscheidungen brauchen Struktur, aber auch ein Gespräch, das die Situation wirklich versteht."
                : "Financial decisions need structure, but also a conversation that truly understands the situation."
            }
            title={locale === "de" ? "Beratung bleibt menschlich." : "Advice remains human."}
          />
          <div className="hidden h-px bg-[#ead9dc] lg:block" />
        </div>
        <div className="mt-8 flex max-w-full min-w-0 snap-x gap-4 overflow-x-auto overflow-y-hidden pb-4 [-webkit-overflow-scrolling:touch] lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {moments.map((moment) => (
            <article className="group relative min-h-[430px] min-w-[84%] snap-start overflow-hidden rounded-lg bg-[#24191c] shadow-[0_22px_70px_rgba(17,24,39,0.14)] sm:min-w-[52%] lg:min-w-0" key={moment.title}>
              <div className="absolute inset-0">
                <Image
                  alt={moment.alt}
                  className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  fill
                  sizes="(min-width: 1024px) 31vw, 88vw"
                  src={moment.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24191c]/82 via-[#24191c]/22 to-transparent" />
              </div>
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#c63d4d]/82 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {moment.badge}
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/18 bg-white/13 p-4 text-white backdrop-blur-md">
                <h3 className="text-xl font-semibold">{moment.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/72">{moment.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function V3ServicesMatrixSection({ locale }: { locale: Locale }) {
  return (
    <section className="bg-[#f6f2ef] py-12 sm:py-16">
      <Container>
        <div className="grid min-w-0 gap-6 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
          <SectionHeader
            eyebrow="Services"
            intro={
              locale === "de"
                ? "Je nach Situation starten wir dort, wo der grösste Handlungsbedarf besteht. Der Unterschied zu klassischer Beratung: Wir betrachten jedes Thema im Zusammenhang mit Ihrer gesamten finanziellen Situation."
                : "Depending on your situation, we start where the greatest need for action exists. The difference to classic advice: every topic is considered in relation to your overall financial situation."
            }
            title={locale === "de" ? "Drei Einstiege. Ein Gesamtbild." : "Three entry points. One overall picture."}
          />
          <HomeV3ServicesTabs locale={locale} />
        </div>
      </Container>
    </section>
  );
}

function V3CommandSection({ locale }: { locale: Locale }) {
  const items =
    locale === "de"
      ? [
          { icon: ShieldCheck, label: "Absicherung", text: "Risiken, Kosten und Schutz sauber abgleichen." },
          { icon: House, label: "Immobilien", text: "Hypothek, Liquidität und Steuern verbunden denken." },
          { icon: Calculator, label: "Steuern", text: "Vorsorge- und Planungseffekte früh sichtbar machen." },
          { icon: ChartNoAxesCombined, label: "Vermögen", text: "Anlagen nach Ziel, Zeit und Risiko strukturieren." },
        ]
      : [
          { icon: ShieldCheck, label: "Protection", text: "Align risks, costs and coverage clearly." },
          { icon: House, label: "Real estate", text: "Connect mortgage, liquidity and taxes." },
          { icon: Calculator, label: "Taxes", text: "Make pension and planning effects visible early." },
          { icon: ChartNoAxesCombined, label: "Wealth", text: "Structure investments by goal, time and risk." },
        ];

  return (
    <section className="bg-[#f6f2ef] py-14 sm:py-20">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          <article className="veonis-gloss-dark rounded-lg p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase text-[#ef7d8b]">Gesamtbild</p>
            <h2 className="display-title mt-4 text-3xl leading-tight text-white sm:text-5xl">
              {locale === "de"
                ? "Finanzielle Klarheit beginnt mit dem Gesamtbild."
                : "Financial clarity starts with the overall picture."}
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-white/66">
              {locale === "de"
                ? "Veonis ordnet Versicherungen, Vorsorge, Hypotheken, Steuern und Anlagen gemeinsam, damit Prioritäten und nächste Schritte klar werden."
                : "Veonis brings insurance, pension planning, mortgages, taxes and investments together so priorities and next steps become clear."}
            </p>
          </article>
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <article className="rounded-lg border border-white/70 bg-white/78 p-5 shadow-[0_18px_50px_rgba(68,24,32,0.08)] backdrop-blur" key={item.label}>
                  <Icon className="size-5 text-[#c63d4d]" />
                  <h3 className="mt-5 text-lg font-semibold text-[#111827]">{item.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f6368]">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function V3SegmentedSection({ locale }: { locale: Locale }) {
  return (
    <section className="bg-[linear-gradient(135deg,#21191c_0%,#351b21_48%,#661f2d_100%)] py-14 text-white sm:py-20">
      <Container>
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase text-[#ef7d8b]">
            {locale === "de" ? "Beratung im Überblick" : "Advisory overview"}
          </p>
          <h2 className="display-title mt-3 text-3xl leading-tight text-white sm:text-5xl">
            {locale === "de"
              ? "Ihre wichtigsten Finanzthemen klar geordnet."
              : "Your most important financial topics clearly organized."}
          </h2>
        </div>
        <HomeV3SegmentedPanel locale={locale} />
      </Container>
    </section>
  );
}

function V3SnapCardsSection({ locale }: { locale: Locale }) {
  const cards =
    locale === "de"
      ? [
          { number: "01", title: "Kennenlernen", text: "In einem unverbindlichen Erstgespräch klären wir Ihre Situation, Ihre Ziele und Ihre wichtigsten Fragen. Sie erhalten eine erste Einschätzung, welche Themen für Sie aktuell relevant sind.", icon: Handshake },
          { number: "02", title: "360° Check", text: "Wir prüfen Ihre Unterlagen, Verträge und finanziellen Themen im Zusammenhang. Dabei erkennen wir Lücken, Doppelspurigkeiten, Risiken und mögliche Optimierungen.", icon: ScanSearch },
          { number: "03", title: "Plan", text: "Sie erhalten eine klare Übersicht mit Prioritäten und konkreten Empfehlungen. Auf Wunsch begleiten wir Sie auch bei Offerten, Vergleichen, Anpassungen und der weiteren Umsetzung.", icon: ClipboardCheck },
        ]
      : [
          { number: "01", title: "First conversation", text: "In a non-binding initial conversation, we clarify your situation, goals and most important questions. You receive a first assessment of which topics are currently relevant.", icon: Handshake },
          { number: "02", title: "360° check", text: "We review your documents, contracts and financial topics in context. This reveals gaps, overlaps, risks and possible optimizations.", icon: ScanSearch },
          { number: "03", title: "Plan", text: "You receive a clear overview with priorities and concrete recommendations. If desired, we also support offers, comparisons, adjustments and further implementation.", icon: ClipboardCheck },
        ];

  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="veonis-gloss-red max-w-full overflow-hidden rounded-lg p-5 text-white shadow-[0_26px_80px_rgba(112,31,44,0.2)] sm:p-8">
          <div className="grid min-w-0 gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase text-white/68">
                {locale === "de" ? "Zusammenarbeit" : "Collaboration"}
              </p>
              <h2 className="display-title mt-3 max-w-xl text-3xl leading-tight text-white sm:text-5xl">
                {locale === "de" ? "Klarer Ablauf. Persönliche Begleitung." : "Clear process. Personal guidance."}
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-white/70">
                {locale === "de"
                  ? "Bei Veonis wissen Sie von Anfang an, was geprüft wird, warum es relevant ist und welcher Schritt als Nächstes sinnvoll ist. Unsere Beratung bleibt persönlich, verständlich und strukturiert."
                  : "With Veonis, you know from the beginning what is being reviewed, why it matters and which next step makes sense. Our advice remains personal, understandable and structured."}
              </p>
            </div>
            <div className="min-w-0 rounded-lg border border-white/14 bg-white/10 p-4 backdrop-blur">
              <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-white/78">
                <div className="rounded-lg bg-white/10 px-3 py-3">{locale === "de" ? "Persönlich" : "Personal"}</div>
                <div className="rounded-lg bg-white/10 px-3 py-3">{locale === "de" ? "Strukturiert" : "Structured"}</div>
                <div className="rounded-lg bg-white/10 px-3 py-3">{locale === "de" ? "Verständlich" : "Clear"}</div>
                <div className="rounded-lg bg-white/10 px-3 py-3">{locale === "de" ? "Laufend" : "Ongoing"}</div>
              </div>
            </div>
          </div>
          <div className="mt-7 flex max-w-full min-w-0 snap-x gap-4 overflow-x-auto overflow-y-hidden pb-1 [-webkit-overflow-scrolling:touch] lg:grid lg:grid-cols-3 lg:overflow-visible">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <article className="min-w-[78%] snap-start rounded-lg border border-white/14 bg-white/10 p-5 backdrop-blur sm:min-w-[44%] lg:min-w-0" key={card.title}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex size-11 items-center justify-center rounded-lg border border-white/14 bg-white/10 text-[#ffb1ba]">
                      <Icon className="size-5" />
                    </span>
                    <span className="display-title text-4xl text-white/24">{card.number}</span>
                  </div>
                  <h3 className="mt-7 text-xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/68">{card.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function V3InsightsSection({ locale, posts }: { locale: Locale; posts: BlogPost[] }) {
  const [featured, ...rest] = posts;

  if (!featured) {
    return null;
  }

  const featuredHref = getBlogPostPath(locale, featured.slug);

  return (
    <section className="bg-[#f6f2ef] py-12 sm:py-16">
      <Container>
        <div className="mb-7 flex items-end justify-between gap-5">
          <SectionHeader
            eyebrow={locale === "de" ? "Aktuelle Impulse" : "Latest insights"}
            intro={
              locale === "de"
                ? "Im Veonis Blog erklären wir Finanzthemen so, wie sie im echten Leben vorkommen: vernetzt, verständlich und mit Blick auf die Schweiz."
                : "In the Veonis blog, we explain financial topics as they appear in real life: connected, understandable and with a Swiss perspective."
            }
            title={locale === "de" ? "Finanzwissen, das Entscheidungen einfacher macht." : "Financial knowledge that makes decisions easier."}
          />
        </div>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="group overflow-hidden rounded-lg border border-[#e6e2dc] bg-white shadow-[0_20px_60px_rgba(17,24,39,0.07)]">
            <div className="relative aspect-[1.8] overflow-hidden sm:aspect-[1.55]">
              <Image
                alt={featured.alt[locale]}
                className="object-cover transition duration-500 group-hover:scale-[1.035]"
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                src={featured.image}
              />
              <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/86 px-3 py-1 text-xs font-semibold text-[#8f2535] shadow-[inset_0_1px_0_white] backdrop-blur">
                {featured.category[locale]} · {featured.readTime[locale]}
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <p className="eyebrow">{locale === "de" ? "Fokusbeitrag" : "Featured insight"}</p>
              <Link href={featuredHref}>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-[#111827] transition hover:text-[#8f2535]">
                  {featured.title[locale]}
                </h2>
              </Link>
              <p className="mt-3 line-clamp-3 leading-7 text-[#5f6368]">{featured.excerpt[locale]}</p>
              <Link className="mt-5 inline-flex items-center text-sm font-semibold text-[#c63d4d]" href={featuredHref}>
                <BookOpen className="mr-2 size-4" />
                {locale === "de" ? "Artikel lesen" : "Read article"}
              </Link>
            </div>
          </article>

          <div className="rounded-lg border border-[#e6e2dc] bg-white p-3 shadow-[0_20px_60px_rgba(17,24,39,0.06)] sm:p-4">
            <p className="eyebrow">{locale === "de" ? "Weitere Impulse" : "More insights"}</p>
            <div className="mt-4 grid gap-3">
              {rest.slice(0, 4).map((post) => {
                const href = getBlogPostPath(locale, post.slug);

                return (
                  <article className="grid grid-cols-[5rem_1fr] gap-3 rounded-lg bg-[#f7f7f6] p-2 sm:grid-cols-[6.5rem_1fr] sm:p-3" key={post.slug}>
                    <Link className="relative min-h-24 overflow-hidden rounded-lg bg-[#24191c]" href={href}>
                      <Image
                        alt={post.alt[locale]}
                        className="object-cover transition duration-500 hover:scale-[1.04]"
                        fill
                        sizes="112px"
                        src={post.image}
                      />
                      <div className="absolute inset-0 bg-[#8f2535]/14" />
                    </Link>
                    <div className="min-w-0 py-1">
                      <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#939598]">
                        <span className="text-[#c63d4d]">{post.category[locale]}</span>
                        <span>{post.readTime[locale]}</span>
                      </div>
                      <Link href={href}>
                        <h3 className="mt-2 text-base font-semibold leading-tight text-[#111827] transition hover:text-[#8f2535]">
                          {post.title[locale]}
                        </h3>
                      </Link>
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#5f6368]">{post.excerpt[locale]}</p>
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

function V2OverviewSection({ locale }: { locale: Locale }) {
  const overview =
    locale === "de"
      ? {
          eyebrow: "Gesamtbild",
          title: "Finanzielle Klarheit beginnt nicht bei einem Produkt, sondern beim Gesamtbild.",
          paragraphs: [
            "Viele Menschen haben einzelne Lösungen an unterschiedlichen Orten: eine Versicherung hier, eine Vorsorge dort, eine Hypothek bei einer Bank, Anlagen an anderer Stelle.",
            "Doch finanzielle Entscheidungen wirken selten isoliert. Vorsorge beeinflusst Steuern. Eine Hypothek beeinflusst Liquidität. Versicherungen beeinflussen Sicherheit und Planungsspielraum.",
          ],
          analysis:
            "Der Veonis 360°-Check zeigt, was passt, was fehlt und was zuerst angegangen werden sollte.",
        }
      : {
          eyebrow: "Overall picture",
          title: "Financial clarity does not start with a product, but with the full picture.",
          paragraphs: [
            "Many people have individual solutions in different places: one insurance policy here, pension planning there, a mortgage at one bank and investments somewhere else.",
            "Financial decisions rarely work in isolation. Pension planning affects taxes. A mortgage affects liquidity. Insurance affects security and planning room.",
          ],
          analysis:
            "The Veonis 360° analysis shows what fits, what is missing and what should be addressed first.",
        };
  const cards =
    locale === "de"
      ? [
          ["01", "Gesamtbild statt Einzelentscheid", "Versicherungen, Vorsorge, Steuern, Hypotheken und Anlagen werden gemeinsam betrachtet."],
          ["02", "Prioritäten vor Produkten", "Zuerst klären wir, was wirklich wichtig ist - danach geht es um mögliche Lösungen."],
          ["03", "Beratung mit Umsetzungsplan", "Sie erhalten verständliche Empfehlungen und konkrete nächste Schritte."],
        ]
      : [
          ["01", "Overall picture before isolated decisions", "Insurance, pension planning, taxes, mortgages and investments are reviewed together."],
          ["02", "Priorities before products", "First we clarify what truly matters - then we look at possible solutions."],
          ["03", "Advice with an action plan", "You receive understandable recommendations and clear next steps."],
        ];

  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <div className="grid gap-5 lg:grid-cols-12">
          <article className="veonis-gloss-dark rounded-lg p-6 text-white sm:p-8 lg:col-span-5">
            <p className="text-xs font-semibold uppercase text-[#ef7d8b]">{overview.eyebrow}</p>
            <h2 className="display-title mt-4 text-3xl leading-tight text-white sm:text-5xl">{overview.title}</h2>
            <div className="mt-5 grid gap-3 text-base leading-7 text-white/68">
              {overview.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <article className="relative min-h-[640px] overflow-hidden sm:min-h-[560px] lg:min-h-[420px] rounded-lg bg-[#24191c] lg:col-span-7">
            <Image
              alt={locale === "de" ? "Digitale Finanzübersicht in einer Beratung" : "Digital financial overview in an advisory meeting"}
              className="object-cover object-[45%_center]"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              src="/brand/photos/veonis-digital-collaboration-optimized.jpg"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,25,28,0.05),rgba(36,25,28,0.82))]" />
            <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-lg border border-white/18 bg-white/14 p-4 text-white backdrop-blur-md sm:p-5 lg:grid-cols-3">
              {cards.map(([number, title, text]) => (
                <div className="rounded-lg border border-white/12 bg-white/10 p-4" key={title}>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#ef7d8b]">
                    <Check className="size-4" />
                    {number}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold leading-5 text-white">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-white/70">{text}</p>
                </div>
              ))}
              <p className="rounded-lg border border-white/12 bg-[#c63d4d]/76 p-4 text-sm font-semibold leading-6 text-white lg:col-span-3">
                {overview.analysis}
              </p>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}

function V2ServicesSection({ locale }: { locale: Locale }) {
  const highlights =
    locale === "de"
      ? [
          {
            title: "Versicherungen & Vorsorge",
            text: "Veonis prüft, ob Absicherung, Vorsorge und Lebensphase zusammenpassen - verständlich, unabhängig und mit Blick auf Ihre Prioritäten.",
            questions: ["Bin ich richtig abgesichert?", "Wie wirkt sich Vorsorge auf Steuern aus?"],
          },
          {
            title: "Hypotheken & Immobilien",
            text: "Wir ordnen Finanzierung, Tragbarkeit, Zinsrisiken und Liquidität ein, damit Wohneigentum zur gesamten Planung passt.",
            questions: ["Welche Hypothek passt?", "Was bleibt langfristig finanziell tragbar?"],
          },
          {
            title: "Steuern, Anlagen & Finanzplanung",
            text: "Steuerfragen, Anlagen und Liquidität werden nicht isoliert betrachtet, sondern als Teil einer klaren Finanzstruktur.",
            questions: ["Wo lassen sich Steuern optimieren?", "Wie soll freies Kapital eingesetzt werden?"],
          },
        ]
      : [
          {
            title: "Insurance & pension planning",
            text: "Veonis reviews whether protection, pension planning and life stage fit together - clearly, independently and with your priorities in view.",
            questions: ["Am I properly protected?", "How does pension planning affect taxes?"],
          },
          {
            title: "Mortgages & real estate",
            text: "We put financing, affordability, interest-rate risk and liquidity into context so home ownership fits the full plan.",
            questions: ["Which mortgage fits?", "What remains sustainable long term?"],
          },
          {
            title: "Taxes, investments & planning",
            text: "Tax questions, investments and liquidity are not reviewed in isolation, but as part of a clear financial structure.",
            questions: ["Where can taxes be optimized?", "How should free capital be used?"],
          },
        ];
  const icons = [ShieldCheck, House, ChartNoAxesCombined];

  return (
    <section className="bg-[#f6f2ef] py-14 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.66fr_1.34fr] lg:items-start">
          <SectionHeader
            eyebrow="Services"
            intro={
              locale === "de"
                ? "Je nach Situation starten wir dort, wo der grösste Handlungsbedarf besteht. Entscheidend bleibt immer der Zusammenhang zwischen allen Finanzthemen."
                : "Depending on your situation, we start where the greatest need for action exists. The connection between all financial topics remains decisive."
            }
            title={locale === "de" ? "Drei Einstiege. Ein Gesamtbild." : "Three entry points. One overall picture."}
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {highlights.map((service, index) => {
              const Icon = icons[index] ?? BadgeCheck;

              return (
                <article className="rounded-lg border border-white/70 bg-white/82 p-5 shadow-[0_18px_50px_rgba(68,24,32,0.08)] backdrop-blur" key={service.title}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-[#c63d4d]/10 text-[#c63d4d]">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-semibold text-[#c63d4d]">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold leading-tight text-[#111827]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5f6368]">{service.text}</p>
                  <div className="mt-4 grid gap-2">
                    {service.questions.map((question) => (
                      <div className="flex items-start gap-2 rounded-lg bg-[#f6f2ef] px-3 py-2 text-xs font-semibold leading-5 text-[#5f6368]" key={question}>
                        <Check className="mt-0.5 size-3.5 shrink-0 text-[#c63d4d]" />
                        {question}
                      </div>
                    ))}
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

function V2CollaborationSection({ locale }: { locale: Locale }) {
  const steps =
    locale === "de"
      ? [
          ["Kennenlernen", "Wir sprechen über Ihre Situation, Ihre Fragen und die Unterlagen, die für den Überblick wichtig sind."],
          ["360° Check", "Wir prüfen Zusammenhänge, Prioritäten, mögliche Lücken und bestehende Verträge."],
          ["Empfehlung & Begleitung", "Sie erhalten klare Empfehlungen und werden bei den sinnvollen nächsten Schritten begleitet."],
        ]
      : [
          ["First conversation", "We talk about your situation, your questions and the documents needed for a clear overview."],
          ["360° check", "We review connections, priorities, potential gaps and existing contracts."],
          ["Recommendation & guidance", "You receive clear recommendations and guidance through the next sensible steps."],
        ];

  return (
    <section className="bg-white py-14 sm:py-20">
      <Container>
        <div className="veonis-gloss-red grid overflow-hidden rounded-lg text-white lg:grid-cols-[0.76fr_1.24fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase text-white/70">{locale === "de" ? "Zusammenarbeit" : "Collaboration"}</p>
            <h2 className="display-title mt-4 text-3xl leading-tight text-white sm:text-5xl">
              {locale === "de" ? "Klarer Ablauf. Persönliche Begleitung." : "Clear process. Personal guidance."}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/72">
              {locale === "de"
                ? "Bei Veonis wissen Sie von Anfang an, was geprüft wird, warum es relevant ist und welche Entscheidung als Nächstes sinnvoll ist."
                : "With Veonis, you know from the beginning what is being reviewed, why it matters and which decision makes sense next."}
            </p>
          </div>
          <div className="grid border-t border-white/14 lg:grid-cols-3 lg:border-l lg:border-t-0">
            {steps.map(([title, text], index) => {
              const icons = [Handshake, ScanSearch, ClipboardCheck];
              const Icon = icons[index] ?? BadgeCheck;

              return (
                <article className="min-h-44 border-b border-white/14 p-5 last:border-b-0 sm:p-6 lg:border-b-0 lg:border-r lg:last:border-r-0" key={title}>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-11 items-center justify-center rounded-lg border border-white/18 bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                      <Icon className="size-5" />
                    </span>
                    <span className="display-title text-4xl text-white/24">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
                </article>
              );
            })}
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

function AnalysisSection({ locale, section }: { locale: Locale; section: ContentSection }) {

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

function V2LatestBlogPostsSection({ locale, posts }: { locale: Locale; posts: BlogPost[] }) {
  const [featured, ...smallPosts] = posts;

  if (!featured) {
    return null;
  }

  const featuredHref = getBlogPostPath(locale, featured.slug);

  return (
    <section className="bg-[#f7f7f6] py-14 sm:py-20">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow={locale === "de" ? "Aktuelle Impulse" : "Latest insights"}
            intro={
              locale === "de"
                ? "Im Veonis Blog erklären wir Finanzthemen so, dass Sie Entscheidungen besser einordnen und im Gespräch die richtigen Fragen stellen können."
                : "In the Veonis blog, we explain financial topics so you can better assess decisions and ask the right questions in conversation."
            }
            title={locale === "de" ? "Finanzwissen, das Entscheidungen einfacher macht." : "Financial knowledge that makes decisions easier."}
          />
          <Link
            className="inline-flex items-center text-sm font-semibold text-[#c63d4d]"
            href={getLocalizedPath(locale, "blog")}
          >
            {locale === "de" ? "Alle Beiträge" : "All posts"}
            <ChevronRight className="ml-1 size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="group overflow-hidden rounded-lg border border-[#e6e2dc] bg-white shadow-[0_20px_60px_rgba(17,24,39,0.07)]">
            <div className="relative aspect-[1.55] overflow-hidden">
              <Image
                alt={featured.alt[locale]}
                className="object-cover transition duration-500 group-hover:scale-[1.035]"
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                src={featured.image}
              />
              <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/86 px-3 py-1 text-xs font-semibold text-[#8f2535] shadow-[inset_0_1px_0_white] backdrop-blur">
                {featured.category[locale]} · {featured.readTime[locale]}
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <Link href={featuredHref}>
                <h3 className="text-2xl font-semibold leading-tight text-[#111827] transition hover:text-[#8f2535]">
                  {featured.title[locale]}
                </h3>
              </Link>
              <p className="mt-3 leading-7 text-[#5f6368]">{featured.excerpt[locale]}</p>
              <Link
                className="mt-5 inline-flex items-center text-sm font-semibold text-[#c63d4d]"
                href={featuredHref}
              >
                <BookOpen className="mr-2 size-4" />
                {locale === "de" ? "Artikel lesen" : "Read article"}
              </Link>
            </div>
          </article>

          <div className="grid gap-3 sm:grid-cols-2">
            {smallPosts.slice(0, 4).map((post) => {
              const href = getBlogPostPath(locale, post.slug);

              return (
                <article className="rounded-lg border border-[#e6e2dc] bg-white p-5 shadow-[0_16px_44px_rgba(17,24,39,0.05)]" key={post.slug}>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#939598]">
                    <span className="text-[#c63d4d]">{post.category[locale]}</span>
                    <span>·</span>
                    <span>{post.readTime[locale]}</span>
                  </div>
                  <Link href={href}>
                    <h3 className="mt-4 text-lg font-semibold leading-tight text-[#111827] transition hover:text-[#8f2535]">
                      {post.title[locale]}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm leading-6 text-[#5f6368]">{post.excerpt[locale]}</p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function V2CTASection({ locale }: { locale: Locale }) {
  return (
    <section className="relative isolate overflow-hidden bg-white py-14 sm:py-20">
      <Container>
        <div className="veonis-gloss-dark grid gap-6 rounded-lg p-5 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-[#ef7d8b]">{brand.claim}</p>
            <h2 className="display-title mt-3 max-w-3xl text-3xl leading-tight text-white sm:text-5xl">
              {locale === "de" ? "Bereit für mehr Überblick?" : "Ready for more overview?"}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/66">
              {locale === "de"
                ? "Ein erstes Gespräch reicht oft aus, um die wichtigsten Themen sichtbar zu machen. Wir nehmen uns Zeit für Ihre Fragen, ordnen Ihre Situation ein und zeigen Ihnen, welche nächsten Schritte sinnvoll sind. Unverbindlich. Persönlich. Mit klarem Blick auf Ihre finanzielle Gesamtsituation."
                : "An initial conversation is often enough to make the most important topics visible. We take time for your questions, put your situation into context and show which next steps make sense. Non-binding. Personal. With a clear view of your overall financial situation."}
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 w-full min-w-0 items-center justify-center rounded-full bg-white px-5 py-3 text-center text-sm font-semibold leading-5 text-[#8f2535] shadow-[0_18px_46px_rgba(0,0,0,0.18)] transition hover:bg-[#fff4f5] sm:w-auto"
            href={getLocalizedPath(locale, "contact")}
          >
            <span className="min-w-0 break-words">
              {locale === "de" ? "Kostenloses Erstgespräch vereinbaren" : "Book a free initial conversation"}
            </span>
            <ArrowRight className="ml-2 size-4 shrink-0" />
          </Link>
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
          {posts.map((post, index) => {
            const href = getBlogPostPath(locale, post.slug);

            return (
              <article
                className={cn(
                  "group overflow-hidden rounded-lg border border-[#e6e2dc] bg-white shadow-[0_18px_50px_rgba(17,24,39,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(68,24,32,0.12)]",
                  !compact && index === 0 ? "lg:col-span-2" : "",
                )}
                key={post.slug}
              >
                <Link className={cn("relative block overflow-hidden", compact ? "aspect-[1.05]" : "aspect-[1.45]")} href={href}>
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
                </Link>
                <div className={cn("p-5", compact ? "" : "sm:p-6")}>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#939598]">
                    <Clock className="size-3.5" />
                    {post.readTime[locale]}
                  </div>
                  <Link href={href}>
                    <h3 className={cn("mt-4 font-semibold leading-tight text-[#111827] transition hover:text-[#8f2535]", compact ? "text-base" : "text-2xl")}>
                      {post.title[locale]}
                    </h3>
                  </Link>
                  <p className={cn("mt-3 leading-6 text-[#5f6368]", compact ? "text-sm" : "")}>{post.excerpt[locale]}</p>
                  {!compact ? (
                    <Link
                      className="mt-5 inline-flex items-center text-sm font-semibold text-[#c63d4d]"
                      href={href}
                    >
                      <BookOpen className="mr-2 size-4" />
                      {locale === "de" ? "Artikel lesen" : "Read article"}
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function LegalDetails({ items }: { items: string[] }) {
  return (
    <div className="mt-4 space-y-1 rounded-2xl bg-[#f7f7f6] p-5 text-[#5f6368]">
      {items.map((item) => (
        <p className="leading-7" key={item}>
          {item}
        </p>
      ))}
    </div>
  );
}

function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 pl-5 text-[#5f6368]">
      {items.map((item) => (
        <li className="list-disc leading-7" key={item}>
          {item}
        </li>
      ))}
    </ul>
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
