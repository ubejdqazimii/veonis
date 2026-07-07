"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BadgeCheck,
  Calculator,
  ChartNoAxesCombined,
  Check,
  ClipboardCheck,
  FileSearch,
  House,
  Landmark,
  Layers3,
  ScanSearch,
  ShieldCheck,
} from "lucide-react";

import type { Locale } from "@/lib/veonis-content";
import { cn } from "@/lib/utils";

const cockpitContent = {
  de: [
    {
      label: "Gesamtbild",
      title: "Der Veonis 360°-Check",
      text: "Der Veonis 360°-Check ist der Einstieg in unsere Beratung. Er zeigt, wo Sie heute stehen, welche Themen bereits gut geregelt sind und wo Optimierungspotenzial besteht.",
      metrics: [
        ["5", "Themenfelder"],
        ["1", "Struktur"],
        ["360°", "Überblick"],
      ],
      notes: ["Bestehende Verträge prüfen", "Vorsorge und Absicherung einordnen", "Prioritäten und nächste Schritte klären"],
    },
    {
      label: "360°-Check",
      title: "Was passt, was fehlt, was zuerst kommt.",
      text: "Wir prüfen bestehende Verträge, Vorsorgelösungen, Absicherung, Hypothekarsituation, Steuerpotenzial, Anlagen und Ihre finanzielle Struktur.",
      metrics: [
        ["01", "Unterlagen"],
        ["02", "Einordnung"],
        ["03", "Empfehlung"],
      ],
      notes: ["Verträge und Vorsorge prüfen", "Hypothek und Steuern verbinden", "Anlagen nach Ziel und Risiko beurteilen"],
    },
    {
      label: "Prioritäten",
      title: "Nicht alles muss gleichzeitig entschieden werden.",
      text: "Aus der Analyse entsteht eine Reihenfolge nach Wirkung, Dringlichkeit und persönlicher Situation.",
      metrics: [
        ["A", "Dringend"],
        ["B", "Planbar"],
        ["C", "Beobachten"],
      ],
      notes: ["Erste Schritte definieren", "Zeitpunkt und Wirkung klären", "Umsetzung ruhig begleiten"],
    },
  ],
  en: [
    {
      label: "Overall view",
      title: "All financial topics on one surface.",
      text: "Insurance, pensions, mortgages, taxes, investments and liquidity are reviewed as connected decisions.",
      metrics: [
        ["5", "Topic fields"],
        ["1", "Structure"],
        ["360°", "Overview"],
      ],
      notes: ["Make connections visible", "Identify overlaps", "Put costs and risks into context"],
    },
    {
      label: "360° analysis",
      title: "Existing solutions are reviewed clearly.",
      text: "Veonis organizes documents, contracts and goals so gaps, overlaps and action fields become visible.",
      metrics: [
        ["01", "Documents"],
        ["02", "Context"],
        ["03", "Recommendation"],
      ],
      notes: ["Review contracts and pensions", "Connect mortgages and taxes", "Assess investments by goal and risk"],
    },
    {
      label: "Priorities",
      title: "Clear priorities and recommendations.",
      text: "The result is a clear overview with priorities, recommendations and possible next steps.",
      metrics: [
        ["A", "Urgent"],
        ["B", "Planned"],
        ["C", "Observe"],
      ],
      notes: ["Define first steps", "Clarify timing and effect", "Guide execution calmly"],
    },
  ],
};

const serviceContent = {
  de: [
    {
      label: "Versicherungen & Vorsorge",
      title: "Gut abgesichert zu sein bedeutet nicht, möglichst viele Versicherungen zu haben.",
      text: "Entscheidend ist, dass Ihre Absicherung zu Ihrer Lebenssituation, Ihren Verpflichtungen und Ihren langfristigen Zielen passt. Wir prüfen, ob Leistungen, Prämien, Vorsorge und Risiken sinnvoll aufeinander abgestimmt sind - privat wie geschäftlich.",
      image: "/brand/photos/veonis-advisor-conversation-optimized.jpg",
      alt: "Persönliche Beratung zu Absicherung und Vorsorge",
      points: ["Bin ich richtig abgesichert?", "Zahle ich für doppelte oder unnötige Versicherungen?", "Passt meine Vorsorge zu Familie, Einkommen und Zukunftsplänen?"],
    },
    {
      label: "Hypotheken & Immobilien",
      title: "Eine Immobilie beeinflusst mehr als nur Ihre Wohnkosten.",
      text: "Sie wirkt sich auf Liquidität, Steuern, Vorsorge, Risikoabsicherung und langfristige Planung aus. Veonis hilft Ihnen, Hypotheken nicht nur über den Zinssatz zu beurteilen, sondern im Zusammenhang mit Ihrer gesamten finanziellen Situation.",
      image: "/brand/photos/veonis-corporate-meeting-optimized.jpg",
      alt: "Beratung zu Hypothek und Immobilienplanung",
      points: ["Welche Hypothekarstrategie passt zu mir?", "Wie wirkt sich die Finanzierung auf Steuern und Vorsorge aus?", "Bleibt die Belastung langfristig tragbar?"],
    },
    {
      label: "Steuern, Anlagen & Finanzplanung",
      title: "Viele finanzielle Entscheidungen haben steuerliche Auswirkungen.",
      text: "Vorsorge, Wohneigentum, Anlagen, Selbstständigkeit und Nachlassplanung greifen oft ineinander. Wir helfen Ihnen, Ihre Möglichkeiten zu erkennen, Prioritäten zu setzen und Entscheidungen verständlich zu planen.",
      image: "/brand/photos/veonis-planning-session-optimized.jpg",
      alt: "Finanzplanung mit Dokumenten und digitaler Übersicht",
      points: ["Wo gibt es steuerliches Optimierungspotenzial?", "Passt meine Anlagestruktur zu meinen Zielen?", "Wie kann ich Liquidität, Risiko und Vermögensaufbau besser koordinieren?"],
    },
  ],
  en: [
    {
      label: "Insurance & pension planning",
      title: "Being well protected does not mean having as many policies as possible.",
      text: "What matters is that protection fits your life situation, obligations and long-term goals. We review whether benefits, premiums, pensions and risks are meaningfully aligned - privately and professionally.",
      image: "/brand/photos/veonis-advisor-conversation-optimized.jpg",
      alt: "Personal advice on protection and pensions",
      points: ["Am I properly protected?", "Am I paying for duplicate or unnecessary insurance?", "Does my pension planning fit my family, income and future plans?"],
    },
    {
      label: "Mortgages & real estate",
      title: "A property affects more than your housing costs.",
      text: "It influences liquidity, taxes, pension planning, risk protection and long-term planning. Veonis helps you assess mortgages beyond the interest rate and in relation to your full financial situation.",
      image: "/brand/photos/veonis-corporate-meeting-optimized.jpg",
      alt: "Advice on mortgages and real estate planning",
      points: ["Which mortgage strategy fits me?", "How does financing affect taxes and pension planning?", "Will the burden remain sustainable long term?"],
    },
    {
      label: "Taxes, investments & financial planning",
      title: "Many financial decisions have tax implications.",
      text: "Pension planning, home ownership, investments, self-employment and estate planning often interact. We help you identify options, set priorities and plan decisions clearly.",
      image: "/brand/photos/veonis-planning-session-optimized.jpg",
      alt: "Financial planning with documents and a digital overview",
      points: ["Where is there tax optimization potential?", "Does my investment structure fit my goals?", "How can I coordinate liquidity, risk and wealth building better?"],
    },
  ],
};

export function HomeV3FinanceCockpit({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const tabs = cockpitContent[locale];
  const current = tabs[active];
  const topics =
    locale === "de"
      ? [
          { icon: ShieldCheck, label: "Versicherungen", text: "Schutz, Kosten und Risiken prüfen." },
          { icon: Landmark, label: "Vorsorge", text: "Säule 3a, Pensionskasse und Pensionierung einordnen." },
          { icon: House, label: "Hypotheken", text: "Tragbarkeit, Zinsmodell und Liquidität verbinden." },
          { icon: Calculator, label: "Steuern", text: "Abzüge, Planung und Wohneigentum berücksichtigen." },
          { icon: ChartNoAxesCombined, label: "Anlagen", text: "Ziele, Risiko und Vermögensaufbau strukturieren." },
        ]
      : [
          { icon: ShieldCheck, label: "Insurance", text: "Review protection, costs and risks." },
          { icon: Landmark, label: "Pensions", text: "Put pillar 3a, pension fund and retirement into context." },
          { icon: House, label: "Mortgages", text: "Connect affordability, rate model and liquidity." },
          { icon: Calculator, label: "Taxes", text: "Consider deductions, planning and home ownership." },
          { icon: ChartNoAxesCombined, label: "Investments", text: "Structure goals, risk and wealth building." },
        ];

  return (
    <div className="max-w-full min-w-0 overflow-hidden rounded-lg border border-[#ead9dc] bg-white/86 p-3 shadow-[0_24px_70px_rgba(68,24,32,0.12)] backdrop-blur">
      <div className="flex max-w-full min-w-0 gap-2 overflow-x-auto rounded-lg bg-[#24191c] p-1 [-webkit-overflow-scrolling:touch]" role="tablist">
        {tabs.map((tab, index) => (
          <button
            aria-selected={active === index}
            className={cn(
              "min-w-fit rounded-lg px-4 py-2 text-sm font-semibold transition",
              active === index ? "bg-white text-[#24191c]" : "text-white/70 hover:bg-white/10 hover:text-white",
            )}
            key={tab.label}
            onClick={() => setActive(index)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-3 grid min-w-0 gap-3 lg:grid-cols-[0.88fr_1.12fr]">
        <article className="min-w-0 rounded-lg bg-[linear-gradient(135deg,#24191c_0%,#4b2028_52%,#9f2f42_100%)] p-5 text-white sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="flex size-11 items-center justify-center rounded-lg border border-white/14 bg-white/10 text-[#ffb1ba]">
              <ScanSearch className="size-5" />
            </span>
            <span className="rounded-full border border-white/14 bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
              Veonis 360°
            </span>
          </div>
          <h3 className="display-title mt-6 text-3xl leading-tight text-white sm:text-4xl">{current.title}</h3>
          <p className="mt-4 leading-7 text-white/70">{current.text}</p>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {current.metrics.map(([value, label]) => (
              <div className="rounded-lg border border-white/12 bg-white/10 p-3" key={`${value}-${label}`}>
                <p className="display-title text-2xl text-white">{value}</p>
                <p className="mt-1 text-xs font-semibold text-white/58">{label}</p>
              </div>
            ))}
          </div>
        </article>

        <div className="grid min-w-0 gap-3">
          <div className="grid min-w-0 gap-2 sm:grid-cols-2">
            {topics.map((topic, index) => {
              const Icon = topic.icon ?? Layers3;

              return (
                <div
                  className={cn(
                    "min-w-0 rounded-lg border border-[#ead9dc] bg-[#fbf7f5] p-4",
                    index === topics.length - 1 && "sm:col-span-2",
                  )}
                  key={topic.label}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#fff0f2] text-[#c63d4d]">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-5 text-[#24191c]">{topic.label}</p>
                      <p className="mt-1 text-xs leading-5 text-[#6f6467]">{topic.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="min-w-0 rounded-lg border border-[#ead9dc] bg-white p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#24191c]">
              <ClipboardCheck className="size-4 text-[#c63d4d]" />
              {locale === "de" ? "Nächste Einordnung" : "Next context"}
            </div>
            <div className="grid gap-2">
              {current.notes.map((note) => (
                <div className="flex min-w-0 items-center gap-3 rounded-lg bg-[#f7f2ef] px-3 py-2 text-sm font-semibold text-[#5f6368]" key={note}>
                  <Check className="size-4 shrink-0 text-[#c63d4d]" />
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeV3ServicesTabs({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const tabs = serviceContent[locale];
  const current = tabs[active];

  return (
    <div className="max-w-full min-w-0 overflow-hidden rounded-lg border border-[#e6e2dc] bg-[#f7f7f6] p-3 shadow-[0_20px_60px_rgba(17,24,39,0.06)]">
      <div className="flex max-w-full min-w-0 gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]" role="tablist">
        {tabs.map((tab, index) => (
          <button
            aria-selected={active === index}
            className={cn(
              "min-w-fit rounded-lg px-4 py-3 text-sm font-semibold transition",
              active === index
                ? "bg-[#24191c] text-white shadow-[0_12px_30px_rgba(36,25,28,0.16)]"
                : "bg-white text-[#5f6368] hover:text-[#24191c]",
            )}
            key={tab.label}
            onClick={() => setActive(index)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      <article className="mt-3 grid min-w-0 overflow-hidden rounded-lg bg-white lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[250px] sm:min-h-[320px]">
          <Image
            alt={current.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            src={current.image}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#24191c]/66 via-[#611f2d]/16 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#c63d4d]/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {current.label}
          </div>
        </div>
        <div className="min-w-0 p-5 sm:p-7">
          <div className="flex size-11 items-center justify-center rounded-lg bg-[#fff0f2] text-[#c63d4d]">
            <FileSearch className="size-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold leading-tight text-[#111827]">{current.title}</h3>
          {"text" in current ? <p className="mt-3 text-sm leading-6 text-[#5f6368]">{current.text}</p> : null}
          <p className="mt-5 text-xs font-semibold uppercase text-[#c63d4d]">{locale === "de" ? "Typische Fragen" : "Typical questions"}</p>
          <div className="mt-3 grid gap-2">
            {current.points.map((point) => (
              <div className="flex min-w-0 items-center gap-3 rounded-lg border border-[#ead9dc] bg-[#fbf7f5] px-3 py-3 text-sm font-semibold text-[#5f6368]" key={point}>
                <BadgeCheck className="size-4 shrink-0 text-[#c63d4d]" />
                {point}
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
