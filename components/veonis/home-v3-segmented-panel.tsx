"use client";

import { useState } from "react";
import { BadgeCheck, BriefcaseBusiness, Building2, CircleUserRound, House, Users } from "lucide-react";

import type { Locale } from "@/lib/veonis-content";
import { cn } from "@/lib/utils";

const panelContent = {
  de: [
    {
      label: "Privatkunden",
      title: "Klarheit über Absicherung, Vorsorge und Vermögensaufbau.",
      text: "Typische Fragen: Bin ich richtig versichert? Passt meine Säule 3a? Welche Anlagen passen zu meinen Zielen?",
      icon: CircleUserRound,
      points: ["Versicherungsanalyse", "Vorsorgeplanung", "Anlagen einordnen"],
      next: "Persönliche 360° Standortbestimmung",
    },
    {
      label: "Familien & Eigenheim",
      title: "Wohneigentum, Familie und langfristige Sicherheit verbinden.",
      text: "Typische Fragen: Können wir uns ein Eigenheim leisten? Wie sichern wir Familie und Einkommen ab? Welche Steuerfolgen entstehen?",
      icon: House,
      points: ["Hypothek prüfen", "Familie absichern", "Steuern planen"],
      next: "Tragbarkeit und Vorsorge gemeinsam prüfen",
    },
    {
      label: "Selbstständige",
      title: "Private und geschäftliche Finanzen sauber strukturieren.",
      text: "Typische Fragen: Wie plane ich Vorsorge ohne klassische Arbeitgeberlösung? Welche Risiken gehören ins Unternehmen, welche privat?",
      icon: BriefcaseBusiness,
      points: ["Liquidität", "Absicherung", "Vorsorge & Steuern"],
      next: "Private und geschäftliche Struktur trennen",
    },
    {
      label: "Unternehmen",
      title: "Risiken, Vorsorge und Mitarbeiterlösungen im Überblick.",
      text: "Typische Fragen: Sind Firmenrisiken passend abgesichert? Ist die berufliche Vorsorge sauber gelöst? Was brauchen Mitarbeitende?",
      icon: Building2,
      points: ["Firmenversicherungen", "BVG", "Krankentaggeld & Unfall"],
      next: "Unternehmensstruktur und Risiken prüfen",
    },
  ],
  en: [
    {
      label: "Private clients",
      title: "Clarity across protection, pension planning and wealth building.",
      text: "Typical questions: Am I properly insured? Does my pillar 3a fit? Which investments match my goals?",
      icon: CircleUserRound,
      points: ["Insurance review", "Pension planning", "Investment context"],
      next: "Personal 360° situation review",
    },
    {
      label: "Families & homes",
      title: "Connect home ownership, family and long-term security.",
      text: "Typical questions: Can we afford a home? How do we protect family and income? What tax effects arise?",
      icon: House,
      points: ["Mortgage review", "Family protection", "Tax planning"],
      next: "Review affordability and pension planning together",
    },
    {
      label: "Self-employed",
      title: "Structure private and business finances clearly.",
      text: "Typical questions: How do I plan pensions without a classic employer setup? Which risks belong to the company, which are private?",
      icon: BriefcaseBusiness,
      points: ["Liquidity", "Protection", "Pensions & taxes"],
      next: "Separate private and business structure",
    },
    {
      label: "Companies",
      title: "Overview for risks, pensions and employee solutions.",
      text: "Typical questions: Are business risks covered properly? Is occupational pension planning set up clearly? What do employees need?",
      icon: Building2,
      points: ["Business insurance", "Occupational pensions", "Sickness & accident"],
      next: "Review company structure and risks",
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
        <div aria-label={locale === "de" ? "Zielgruppen auswählen" : "Choose client situation"} className="grid gap-2" role="tablist">
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
          <Users className="size-5 text-white/36" />
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
        <div className="mt-4 rounded-lg border border-white/12 bg-white/8 p-4 text-sm font-semibold text-white/82">
          {locale === "de" ? "Nächster Schritt: " : "Next step: "}
          {current.next}
        </div>
      </article>
    </div>
  );
}
