import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  ChartNoAxesCombined,
  CircleUserRound,
  Compass,
  House,
  Landmark,
  Layers3,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { Container } from "@/components/veonis/container";
import { SectionHeader } from "@/components/veonis/section-header";
import type { CardContent, Locale } from "@/lib/veonis-content";
import { getLocalizedPath, services } from "@/lib/veonis-content";

const connectedTopics = [
  { icon: ShieldCheck, label: "Versicherungen" },
  { icon: Landmark, label: "Vorsorge" },
  { icon: House, label: "Hypotheken" },
  { icon: Calculator, label: "Steuern" },
  { icon: ChartNoAxesCombined, label: "Anlagen" },
  { icon: BriefcaseBusiness, label: "Unternehmen" },
];

export function HomeTrustStrip() {
  const items = [
    { icon: ScanSearch, label: "Ganzheitliche Analyse" },
    { icon: CircleUserRound, label: "Persönliche Begleitung" },
    { icon: Compass, label: "Klare Empfehlungen" },
    { icon: Building2, label: "Privat- & Firmenkunden" },
  ];

  return (
    <section className="border-b border-[#e6e2dc] bg-white">
      <Container>
        <div className="grid divide-y divide-[#e6e2dc] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {items.map((item) => (
            <div className="flex min-h-24 items-center gap-3 px-2 py-5 sm:px-5" key={item.label}>
              <item.icon className="size-5 shrink-0 text-[#c63d4d]" />
              <p className="text-sm font-semibold text-[#2c333d]">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ConnectedFinanceSection({
  section,
}: {
  section: {
    eyebrow?: string;
    title: string;
    paragraphs?: string[];
  };
}) {
  return (
    <section className="bg-[#f4f3f1] py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div>
            <p className="eyebrow">{section.eyebrow}</p>
            <h2 className="display-title mt-4 max-w-xl text-4xl leading-[1.05] text-[#111827] sm:text-5xl">
              {section.title}
            </h2>
            <div className="mt-7 max-w-xl space-y-5 text-lg leading-8 text-[#5f6368]">
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-[#171c24] text-white shadow-[0_28px_80px_rgba(17,24,39,0.16)]">
            <div className="grid border-b border-white/12 sm:grid-cols-[0.7fr_1.3fr]">
              <div className="flex min-h-48 flex-col justify-between border-b border-white/12 p-6 sm:border-b-0 sm:border-r sm:p-8">
                <Layers3 className="size-7 text-[#ef7d8b]" />
                <div>
                  <p className="display-title text-5xl text-white">360°</p>
                  <p className="mt-2 text-sm leading-6 text-white/58">Ein System statt einzelner Verträge.</p>
                </div>
              </div>
              <div className="flex min-h-48 items-end p-6 sm:p-8">
                <p className="display-title max-w-md text-2xl leading-tight text-white sm:text-3xl">
                  Jede Entscheidung wird im Zusammenhang mit Ihrem gesamten Finanzbild betrachtet.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3">
              {connectedTopics.map((topic) => (
                <div className="flex min-h-28 flex-col justify-between border-b border-r border-white/10 p-5" key={topic.label}>
                  <topic.icon className="size-5 text-[#ef7d8b]" />
                  <p className="mt-5 text-sm font-semibold text-white/86">{topic.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ServicesEditorialSection({ locale }: { locale: Locale }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeader
            eyebrow="Services"
            intro="Von der ersten Standortbestimmung bis zur langfristigen Begleitung: Veonis verbindet Fachthemen mit Ihrer tatsächlichen Lebens- und Unternehmenssituation."
            title="Beratung, die nicht bei einzelnen Produkten endet."
          />
          <p className="max-w-xl text-lg leading-8 text-[#5f6368] lg:justify-self-end">
            Statt fünf isolierter Gespräche erhalten Sie eine klare Reihenfolge, verständliche
            Optionen und einen Ansprechpartner, der die Wechselwirkungen im Blick behält.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <article className="group relative min-h-[430px] overflow-hidden rounded-lg bg-[#111827] lg:col-span-7">
            <Image
              alt="Persönliche Beratung zwischen zwei Geschäftsfrauen"
              className="object-cover object-center transition duration-700 group-hover:scale-[1.025]"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              src="/brand/photos/veonis-advisor-conversation-optimized.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/38 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <div className="flex size-11 items-center justify-center border border-white/20 bg-white/12 backdrop-blur">
                <ShieldCheck className="size-5 text-[#f18a96]" />
              </div>
              <h3 className="mt-5 max-w-xl text-2xl font-semibold sm:text-3xl">{services[0].title}</h3>
              <p className="mt-3 max-w-xl leading-7 text-white/72">{services[0].text}</p>
              <Link
                className="mt-6 inline-flex items-center text-sm font-semibold text-white"
                href={getLocalizedPath(locale, "services")}
              >
                {services[0].cta}
                <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </div>
          </article>

          <article className="flex min-h-[430px] flex-col justify-between rounded-lg bg-[#c63d4d] p-7 text-white lg:col-span-5 sm:p-8">
            <div className="flex items-start justify-between">
              <House className="size-7" />
              <span className="display-title text-6xl text-white/22">02</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{services[1].title}</h3>
              <p className="mt-4 leading-7 text-white/74">{services[1].text}</p>
              <ul className="mt-6 grid gap-2 text-sm text-white/82">
                {services[1].items?.slice(0, 3).map((item) => (
                  <li className="flex items-center gap-2" key={item}>
                    <BadgeCheck className="size-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {services.slice(2, 5).map((service, index) => {
            const icons = [Calculator, ChartNoAxesCombined, Sparkles];
            const Icon = icons[index];

            return (
              <article
                className="group flex min-h-72 flex-col justify-between rounded-lg border border-[#dedbd6] bg-[#f7f7f6] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_50px_rgba(17,24,39,0.08)] lg:col-span-4"
                key={service.title}
              >
                <div className="flex items-start justify-between">
                  <Icon className="size-6 text-[#c63d4d]" />
                  <span className="text-xs font-semibold text-[#a5a7aa]">0{index + 3}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#111827]">{service.title}</h3>
                  <p className="mt-3 leading-7 text-[#5f6368]">{service.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function WhyVeonisSection({ cards }: { cards: CardContent[] }) {
  const icons = [ScanSearch, Users, Sparkles, Compass, BadgeCheck, Layers3];

  return (
    <section className="bg-[#171c24] py-20 text-white sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-semibold uppercase text-[#ef7d8b]">Warum Veonis</p>
            <h2 className="display-title mt-4 max-w-md text-4xl text-white sm:text-5xl">
              Ruhige Beratung. Klare Wirkung.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/62">
              Premium zeigt sich nicht in Lautstärke, sondern in Übersicht, Präzision und einer
              Zusammenarbeit, die auch bei komplexen Entscheidungen verständlich bleibt.
            </p>
          </div>
          <div className="grid border-l border-t border-white/12 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => {
              const Icon = icons[index] ?? BadgeCheck;

              return (
                <article className="min-h-52 border-b border-r border-white/12 p-6" key={card.title}>
                  <Icon className="size-5 text-[#ef7d8b]" />
                  <h3 className="mt-8 text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/58">{card.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
