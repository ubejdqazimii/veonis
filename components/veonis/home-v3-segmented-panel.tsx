"use client";

import { useState } from "react";
import { BadgeCheck, Building2, Handshake, Layers3, ScanSearch } from "lucide-react";

import type { Locale } from "@/lib/veonis-content";
import { cn } from "@/lib/utils";

const panelContent = {
  de: [
    {
      label: "Services",
      title: "Beratungsthemen als kompaktes Entscheidungsboard.",
      text: "Versicherungen, Vorsorge, Hypotheken, Steuern und Anlagen werden nicht nacheinander verkauft, sondern in einer priorisierten Gesamtlogik eingeordnet.",
      icon: Layers3,
      points: ["Versicherungen & Vorsorge", "Hypotheken & Steuern", "Anlagen & Vermögensaufbau"],
    },
    {
      label: "Ablauf",
      title: "Drei Schritte bis zur klaren Empfehlung.",
      text: "Kennenlernen, 360° Check und persönlicher Umsetzungsplan. So bleibt die Beratung hochwertig, aber die Seite kurz und handlungsorientiert.",
      icon: Handshake,
      points: ["Situation verstehen", "Wechselwirkungen prüfen", "Nächste Schritte begleiten"],
    },
    {
      label: "Zielgruppen",
      title: "Privat, Firma und Selbstständigkeit in einem System.",
      text: "Version 3 spart Länge durch einen einzigen Segmentbereich für die wichtigsten Kundensituationen.",
      icon: Building2,
      points: ["Privatkunden", "Unternehmen", "Selbstständige"],
    },
  ],
  en: [
    {
      label: "Services",
      title: "Advisory topics as a compact decision board.",
      text: "Insurance, pensions, mortgages, taxes and investments are not sold in sequence, but ordered inside one prioritized financial logic.",
      icon: Layers3,
      points: ["Insurance & pensions", "Mortgages & taxes", "Investments & wealth building"],
    },
    {
      label: "Flow",
      title: "Three steps to a clear recommendation.",
      text: "First conversation, 360° check and personal action plan. The advisory experience stays premium while the page remains compact.",
      icon: Handshake,
      points: ["Understand the situation", "Review connections", "Guide next steps"],
    },
    {
      label: "Audiences",
      title: "Private, business and self-employment in one system.",
      text: "Version 3 saves vertical space by grouping the core client situations into one segmented area.",
      icon: Building2,
      points: ["Private clients", "Companies", "Self-employed"],
    },
  ],
};

export function HomeV3SegmentedPanel({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const tabs = panelContent[locale];
  const current = tabs[active];
  const Icon = current.icon;

  return (
    <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
      <div className="rounded-lg border border-white/12 bg-white/8 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur">
        <div aria-label="Homepage Version 3 segments" className="grid gap-2" role="tablist">
          {tabs.map((tab, index) => {
            const TabIcon = tab.icon;
            const selected = active === index;

            return (
              <button
                aria-selected={selected}
                className={cn(
                  "flex items-center justify-between rounded-lg px-4 py-4 text-left text-sm font-semibold transition",
                  selected ? "bg-white text-[#2a1d21]" : "text-white/72 hover:bg-white/10 hover:text-white",
                )}
                key={tab.label}
                onClick={() => setActive(index)}
                role="tab"
                type="button"
              >
                <span className="flex items-center gap-3">
                  <TabIcon className={cn("size-5", selected ? "text-[#c63d4d]" : "text-[#ef7d8b]")} />
                  {tab.label}
                </span>
                {selected ? <BadgeCheck className="size-4 text-[#c63d4d]" /> : null}
              </button>
            );
          })}
        </div>
      </div>

      <article className="rounded-lg border border-white/14 bg-white/10 p-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_70px_rgba(0,0,0,0.14)] backdrop-blur-md sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="flex size-12 items-center justify-center rounded-lg border border-white/16 bg-white/12 text-[#ef7d8b]">
            <Icon className="size-6" />
          </span>
          <ScanSearch className="size-5 text-white/36" />
        </div>
        <h3 className="display-title mt-8 text-3xl leading-tight text-white sm:text-4xl">{current.title}</h3>
        <p className="mt-4 max-w-2xl leading-7 text-white/66">{current.text}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {current.points.map((point) => (
            <div className="rounded-lg border border-white/12 bg-white/8 p-3 text-sm font-semibold text-white/78" key={point}>
              {point}
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
