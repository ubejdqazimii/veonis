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
      title: "Alle Finanzthemen auf einer Oberfläche.",
      text: "Versicherungen, Vorsorge, Hypothek, Steuern, Anlagen und Liquidität werden nicht isoliert betrachtet.",
      metrics: [
        ["5", "Themenfelder"],
        ["1", "Struktur"],
        ["360°", "Überblick"],
      ],
      notes: ["Zusammenhänge sichtbar machen", "Doppelspurigkeiten erkennen", "Kosten und Risiken einordnen"],
    },
    {
      label: "360° Analyse",
      title: "Bestehende Lösungen werden sauber geprüft.",
      text: "Veonis ordnet Unterlagen, Verträge und Ziele so, dass Lücken, Überschneidungen und Handlungsfelder klar werden.",
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
      title: "Not everything has to be decided at once.",
      text: "The analysis creates a sequence based on impact, urgency and personal situation.",
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
      label: "Absicherung",
      title: "Schutz, Kosten und Risiken passend abstimmen.",
      image: "/brand/photos/veonis-advisor-conversation-optimized.jpg",
      alt: "Persönliche Beratung zu Absicherung und Vorsorge",
      points: ["Krankenkasse und Zusatzversicherung", "Haushalt, Rechtsschutz und Haftpflicht", "Erwerbsunfähigkeit und Todesfall"],
    },
    {
      label: "Immobilien",
      title: "Wohneigentum im Gesamtbild prüfen.",
      image: "/brand/photos/veonis-corporate-meeting-optimized.jpg",
      alt: "Beratung zu Hypothek und Immobilienplanung",
      points: ["Tragbarkeit und Eigenkapital", "Hypothekarmodelle vergleichen", "Amortisation und Steuerfolgen"],
    },
    {
      label: "Steuern & Planung",
      title: "Planungsspielräume früh erkennen.",
      image: "/brand/photos/veonis-planning-session-optimized.jpg",
      alt: "Finanzplanung mit Dokumenten und digitaler Übersicht",
      points: ["Säule 3a und Pensionskasse", "Steuerliche Abzüge", "Liquidität und Pensionierung"],
    },
    {
      label: "Vermögen",
      title: "Vermögen mit Ziel, Zeit und Risiko strukturieren.",
      image: "/brand/photos/veonis-digital-collaboration-optimized.jpg",
      alt: "Digitale Zusammenarbeit zur Vermögensplanung",
      points: ["Ziele und Risikobereitschaft", "Bestehende Anlagen prüfen", "Vorsorge und Anlagen verbinden"],
    },
    {
      label: "Unternehmen",
      title: "Firmenrisiken und Vorsorge professionell ordnen.",
      image: "/brand/photos/veonis-corporate-workshop-optimized.jpg",
      alt: "Firmenkundenberatung in einem Workshop",
      points: ["Firmenversicherungen", "Betriebliche Vorsorge", "Mitarbeiterlösungen"],
    },
  ],
  en: [
    {
      label: "Protection",
      title: "Align coverage, costs and risks.",
      image: "/brand/photos/veonis-advisor-conversation-optimized.jpg",
      alt: "Personal advice on protection and pensions",
      points: ["Health and supplementary insurance", "Household, legal and liability cover", "Disability and death protection"],
    },
    {
      label: "Real estate",
      title: "Review home ownership in context.",
      image: "/brand/photos/veonis-corporate-meeting-optimized.jpg",
      alt: "Advice on mortgages and real estate planning",
      points: ["Affordability and equity", "Compare mortgage models", "Amortization and tax effects"],
    },
    {
      label: "Taxes & planning",
      title: "Identify planning options early.",
      image: "/brand/photos/veonis-planning-session-optimized.jpg",
      alt: "Financial planning with documents and a digital overview",
      points: ["Pillar 3a and pension fund", "Tax deductions", "Liquidity and retirement"],
    },
    {
      label: "Wealth",
      title: "Structure wealth by goal, time and risk.",
      image: "/brand/photos/veonis-digital-collaboration-optimized.jpg",
      alt: "Digital collaboration for wealth planning",
      points: ["Goals and risk appetite", "Review existing investments", "Connect pensions and investments"],
    },
    {
      label: "Companies",
      title: "Organize business risks and pensions professionally.",
      image: "/brand/photos/veonis-corporate-workshop-optimized.jpg",
      alt: "Corporate advisory workshop",
      points: ["Business insurance", "Occupational pensions", "Employee solutions"],
    },
  ],
};

const topicIcons = [ShieldCheck, Landmark, House, Calculator, ChartNoAxesCombined];

export function HomeV3FinanceCockpit({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const tabs = cockpitContent[locale];
  const current = tabs[active];
  const topics =
    locale === "de"
      ? ["Versicherungen", "Vorsorge", "Hypotheken", "Steuern", "Anlagen"]
      : ["Insurance", "Pensions", "Mortgages", "Taxes", "Investments"];

  return (
    <div className="rounded-lg border border-[#ead9dc] bg-white/86 p-3 shadow-[0_24px_70px_rgba(68,24,32,0.12)] backdrop-blur">
      <div className="flex gap-2 overflow-x-auto rounded-lg bg-[#24191c] p-1 [-webkit-overflow-scrolling:touch]" role="tablist">
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

      <div className="mt-3 grid gap-3 lg:grid-cols-[0.88fr_1.12fr]">
        <article className="rounded-lg bg-[linear-gradient(135deg,#24191c_0%,#4b2028_52%,#9f2f42_100%)] p-5 text-white sm:p-6">
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

        <div className="grid gap-3">
          <div className="grid gap-2 sm:grid-cols-5">
            {topics.map((topic, index) => {
              const Icon = topicIcons[index] ?? Layers3;

              return (
                <div className="rounded-lg border border-[#ead9dc] bg-[#fbf7f5] p-3" key={topic}>
                  <Icon className="size-4 text-[#c63d4d]" />
                  <p className="mt-3 text-xs font-semibold leading-tight text-[#24191c]">{topic}</p>
                </div>
              );
            })}
          </div>
          <div className="rounded-lg border border-[#ead9dc] bg-white p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#24191c]">
              <ClipboardCheck className="size-4 text-[#c63d4d]" />
              {locale === "de" ? "Nächste Einordnung" : "Next context"}
            </div>
            <div className="grid gap-2">
              {current.notes.map((note) => (
                <div className="flex items-center gap-3 rounded-lg bg-[#f7f2ef] px-3 py-2 text-sm font-semibold text-[#5f6368]" key={note}>
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
    <div className="rounded-lg border border-[#e6e2dc] bg-[#f7f7f6] p-3 shadow-[0_20px_60px_rgba(17,24,39,0.06)]">
      <div className="flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]" role="tablist">
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

      <article className="mt-3 grid overflow-hidden rounded-lg bg-white lg:grid-cols-[0.95fr_1.05fr]">
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
        <div className="flex flex-col justify-center p-5 sm:p-7">
          <div className="flex size-11 items-center justify-center rounded-lg bg-[#fff0f2] text-[#c63d4d]">
            <FileSearch className="size-5" />
          </div>
          <h3 className="mt-5 text-2xl font-semibold leading-tight text-[#111827]">{current.title}</h3>
          <div className="mt-5 grid gap-2">
            {current.points.map((point) => (
              <div className="flex items-center gap-3 rounded-lg border border-[#ead9dc] bg-[#fbf7f5] px-3 py-3 text-sm font-semibold text-[#5f6368]" key={point}>
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
