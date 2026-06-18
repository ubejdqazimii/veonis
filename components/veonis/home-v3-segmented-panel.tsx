"use client";

import { useState } from "react";
import { BadgeCheck, Building2, Handshake, Layers3, ScanSearch } from "lucide-react";

import type { Locale } from "@/lib/veonis-content";
import { cn } from "@/lib/utils";

const panelContent = {
  de: [
    {
      label: "Services",
      title: "Services, die Ihre Finanzthemen verbinden.",
      text: "Versicherungen, Vorsorge, Hypotheken, Steuern und Anlagen werden gemeinsam betrachtet, damit Empfehlungen zur gesamten Situation passen.",
      icon: Layers3,
      points: ["Versicherungen & Vorsorge", "Hypotheken & Steuern", "Anlagen & Vermögensaufbau"],
    },
    {
      label: "Ablauf",
      title: "Drei Schritte bis zur klaren Empfehlung.",
      text: "Kennenlernen, Veonis 360° Analyse und persönlicher Umsetzungsplan. So bleibt der Weg nachvollziehbar und gut begleitet.",
      icon: Handshake,
      points: ["Situation verstehen", "Wechselwirkungen prüfen", "Nächste Schritte begleiten"],
    },
    {
      label: "Zielgruppen",
      title: "Privatkunden, Unternehmen und Selbstständige im Blick.",
      text: "Veonis unterstützt Menschen und Firmen, die Finanzthemen nicht isoliert, sondern als verbundenes Gesamtbild verstehen möchten.",
      icon: Building2,
      points: ["Privatkunden", "Unternehmen", "Selbstständige"],
    },
  ],
  en: [
    {
      label: "Services",
      title: "Services that connect your financial topics.",
      text: "Insurance, pension planning, mortgages, taxes and investments are reviewed together so recommendations fit the full situation.",
      icon: Layers3,
      points: ["Insurance & pensions", "Mortgages & taxes", "Investments & wealth building"],
    },
    {
      label: "Flow",
      title: "Three steps to a clear recommendation.",
      text: "First conversation, Veonis 360° analysis and a personal action plan. The path remains clear, understandable and well supported.",
      icon: Handshake,
      points: ["Understand the situation", "Review connections", "Guide next steps"],
    },
    {
      label: "Audiences",
      title: "Private clients, companies and self-employed people in view.",
      text: "Veonis supports people and businesses who want to understand financial topics as a connected overall picture.",
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
        <div aria-label={locale === "de" ? "Beratungsthemen im Überblick" : "Advisory topics overview"} className="grid gap-2" role="tablist">
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
