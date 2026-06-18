"use client";

import Image from "next/image";
import { useId, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CircleUserRound,
} from "lucide-react";

import { Container } from "@/components/veonis/container";
import { cn } from "@/lib/utils";

const focusTabs = [
  {
    label: "Privatkunden",
    eyebrow: "Private Clients",
    title: "Ein klares Finanzbild, bevor Entscheidungen teuer werden.",
    text: "Veonis ordnet Vorsorge, Versicherungen, Hypothek, Steuern und Anlagen so, dass Sie Prioritäten erkennen und souverän entscheiden.",
    image: "/brand/photos/veonis-corporate-meeting-optimized.jpg",
    alt: "Persönliche Beratung mit Kunden in einem Meetingraum",
    icon: CircleUserRound,
    points: ["Vorsorge und Absicherung", "Hypothek und Wohneigentum", "Steuern und Anlagen"],
    accent: {
      text: "text-[#c63d4d]",
      soft: "bg-[#c63d4d]/10",
      ring: "ring-[#c63d4d]/18",
    },
  },
  {
    label: "Unternehmen",
    eyebrow: "Corporate Clients",
    title: "Firmenlösungen mit Blick auf Risiko, Vorsorge und Wachstum.",
    text: "Für Unternehmen verbinden wir Versicherungsfragen, Mitarbeiterlösungen und geschäftliche Strukturierung mit der privaten Situation der Inhaber.",
    image: "/brand/photos/veonis-digital-collaboration-optimized.jpg",
    alt: "Digitale Zusammenarbeit mit Smartphones und Unterlagen auf einem Beratungstisch",
    icon: Building2,
    points: ["Betriebliche Vorsorge", "Firmenversicherungen", "Inhaberabsicherung"],
    accent: {
      text: "text-[#8f2535]",
      soft: "bg-[#8f2535]/10",
      ring: "ring-[#8f2535]/18",
    },
  },
  {
    label: "Selbstständige",
    eyebrow: "Entrepreneurs",
    title: "Private und geschäftliche Finanzen sauber zusammendenken.",
    text: "Selbstständige brauchen Struktur zwischen Liquidität, Absicherung, Vorsorge und Steuern. Veonis bringt diese Ebenen in eine verständliche Reihenfolge.",
    image: "/brand/photos/veonis-corporate-meeting-optimized.jpg",
    alt: "Geschäftliche Beratungssituation mit mehreren Personen",
    icon: BriefcaseBusiness,
    points: ["Liquidität und Risiko", "Pensionskasse und Säule 3a", "Nachfolge und Familie"],
    accent: {
      text: "text-[#7a2f4d]",
      soft: "bg-[#7a2f4d]/10",
      ring: "ring-[#7a2f4d]/18",
    },
  },
];

const pointAccents = [
  {
    icon: "text-[#c63d4d]",
    chip: "border-[#f0cbd0] bg-white/72 text-[#3f2b30]",
  },
  {
    icon: "text-[#8f2535]",
    chip: "border-[#ead1d5] bg-[#fff8f8]/72 text-[#3f2b30]",
  },
  {
    icon: "text-[#7a2f4d]",
    chip: "border-[#ead4dd] bg-[#fbf6f8]/72 text-[#3f2b30]",
  },
];

export function HomeFocusTabsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const current = focusTabs[activeIndex];

  return (
    <section className="bg-[#c63d4d] py-16 text-white sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-normal text-white/72">Veonis Fokus</p>
            <h2 className="display-title mt-4 max-w-2xl text-3xl text-white sm:text-5xl">
              Für jede Situation die richtige Tiefe.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/76">
              Wechseln Sie zwischen den wichtigsten Kundensituationen. Die Struktur bleibt ruhig,
              aber die Beratung passt sich Ihrer Ausgangslage an.
            </p>

            <div aria-label="Veonis Fokusbereiche" className="mt-8 grid gap-3" role="tablist">
              {focusTabs.map((tab, index) => {
                const Icon = tab.icon;
                const selected = index === activeIndex;

                return (
                  <button
                    aria-controls={`${baseId}-panel`}
                    aria-selected={selected}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition",
                      selected
                        ? "border-white bg-white text-[#2b1b1e] shadow-[0_20px_60px_rgba(17,24,39,0.18)]"
                        : "border-white/22 bg-white/9 text-white hover:bg-white/14"
                    )}
                    id={`${baseId}-tab-${index}`}
                    key={tab.label}
                    onClick={() => setActiveIndex(index)}
                    role="tab"
                    type="button"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-xl ring-1",
                          selected
                            ? `${tab.accent.soft} ${tab.accent.text} ${tab.accent.ring}`
                            : "bg-white/12 text-white ring-white/12"
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span>
                        <span className={cn("block text-base font-semibold", selected ? tab.accent.text : "")}>
                          {tab.label}
                        </span>
                        <span className={cn("mt-1 block text-sm", selected ? "text-[#7d2430]" : "text-white/68")}>
                          {tab.eyebrow}
                        </span>
                      </span>
                    </span>
                    <ArrowRight className={cn("size-4 transition-transform group-hover:translate-x-1", selected ? tab.accent.text : "")} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex rounded-[2rem] border border-white/18 bg-white/14 p-3 shadow-[0_28px_90px_rgba(17,24,39,0.2)]">
            <div className="relative min-h-[460px] flex-1 overflow-hidden rounded-[1.65rem] bg-[#2b1b1e]">
              <Image
                alt={current.alt}
                className="object-cover opacity-88"
                fill
                key={current.image}
                priority={false}
                sizes="(min-width: 1024px) 58vw, 90vw"
                src={current.image}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#341b20]/66 via-[#3c1b22]/18 to-[#c63d4d]/24" />
              <div
                aria-labelledby={`${baseId}-tab-${activeIndex}`}
                className="veonis-focus-glass absolute inset-x-4 bottom-4 rounded-3xl p-5 text-[#111827] sm:inset-x-6 sm:bottom-6 sm:p-6"
                id={`${baseId}-panel`}
                role="tabpanel"
              >
                <p className={cn("text-xs font-semibold uppercase tracking-normal", current.accent.text)}>
                  {current.eyebrow}
                </p>
                <h3 className="display-title mt-2 text-2xl text-[#111827] sm:text-3xl">{current.title}</h3>
                <p className="mt-4 max-w-2xl leading-7 text-[#5f6368]">{current.text}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {current.points.map((point, index) => {
                    const pointAccent = pointAccents[index] ?? pointAccents[0];

                    return (
                      <div
                        className={cn(
                          "flex items-start gap-2 rounded-2xl border p-3 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md",
                          pointAccent.chip
                        )}
                        key={point}
                      >
                        <BadgeCheck className={cn("mt-0.5 size-4 shrink-0", pointAccent.icon)} />
                        <span>{point}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
