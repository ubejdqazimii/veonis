"use client";

import { createHomepageCopy, type HomepageContent } from "@/lib/homepage-content";


import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, FileText, Fingerprint, Focus, House, Layers3, ScanLine, Sparkles, Users, BriefcaseBusiness, Compass } from "lucide-react";
import { getLocalizedPath, type Locale } from "@/lib/veonis-content";
import s from "./innovation-sections.module.css";

const defaultStages = [
  { icon: Layers3, de: ["Zusammenführen", "Einzelne Unterlagen. Ein gemeinsamer Blick.", "Policen, Vorsorge und Finanzierungsfragen bilden die Grundlage für Ihr persönliches Gespräch.", "Versicherungen", "Vorsorge", "Finanzierung"], en: ["Bring together", "Separate documents. One shared picture.", "Policies, pensions and financing questions form the starting point for your personal consultation.", "Insurance", "Pensions", "Financing"] },
  { icon: ScanLine, de: ["Zusammenhänge sehen", "Was zusammenhängt, gehört zusammen.", "Wir prüfen, wie Absicherung, Liquidität und langfristige Ziele aufeinander wirken.", "Absicherung", "Liquidität", "Lebensziele"], en: ["See connections", "Connected decisions belong together.", "We review how protection, liquidity and long-term goals affect one another.", "Protection", "Liquidity", "Life goals"] },
  { icon: Focus, de: ["Prioritäten setzen", "Aus vielen Fragen wird ein nächster Schritt.", "Sie besprechen mit uns, welche Themen zuerst Aufmerksamkeit brauchen und wie es weitergeht.", "Überblick", "Empfehlungen", "Begleitung"], en: ["Set priorities", "Many questions. One clear next step.", "Together, we discuss which areas need attention first and how to move forward.", "Overview", "Recommendations", "Ongoing support"] },
];
const defaultSituations = [
  { icon: Compass, de: ["Mehr Überblick", "Ihre Finanzen als Gesamtbild.", "Der 360°-Check ist ein möglicher Einstieg, wenn Sie Ihre bestehenden Lösungen gemeinsam betrachten möchten.", "Bestehende Verträge sammeln", "Ihre wichtigsten Fragen notieren", "Ziele im Erstgespräch besprechen"], en: ["More clarity", "Your finances as one picture.", "The 360° check can be a starting point when you want to review your existing arrangements together.", "Gather existing contracts", "Note your main questions", "Discuss goals in an initial consultation"] },
  { icon: House, de: ["Ein Eigenheim", "Wohnen beginnt mit einem guten Plan.", "Finanzierung, Vorsorge und Steuern greifen ineinander. Im Gespräch klären wir, welche Fragen für Ihr Vorhaben wichtig sind.", "Eigenkapital und Budget einordnen", "Bestehende Vorsorge berücksichtigen", "Finanzierungsmöglichkeiten besprechen"], en: ["A home of my own", "A good home starts with a good plan.", "Financing, pensions and taxes are connected. In a consultation, we clarify the questions relevant to your plans.", "Review equity and budget", "Consider existing pensions", "Discuss financing options"] },
  { icon: Users, de: ["Meine Familie", "Für heute sorgen. An morgen denken.", "Wenn sich Ihr Leben verändert, lohnt sich ein gemeinsamer Blick auf Absicherung, Vorsorge und rechtliche Vorsorgethemen.", "Absicherung der Familie prüfen", "Vorsorgeziele neu einordnen", "Vorsorgeauftrag und Nachlass ansprechen"], en: ["My family", "Care for today. Think about tomorrow.", "When life changes, it helps to review protection, pensions and future care arrangements together.", "Review family protection", "Revisit pension goals", "Discuss advance directives and estate planning"] },
  { icon: BriefcaseBusiness, de: ["Mein Unternehmen", "Unternehmerisch denken. Ganzheitlich planen.", "Wir betrachten Ihre geschäftliche Absicherung und Ihre persönliche Situation im Zusammenhang.", "Betriebliche Risiken besprechen", "Mitarbeitervorsorge einordnen", "Private und geschäftliche Planung verbinden"], en: ["My business", "Think business. Plan comprehensively.", "We consider your business protection in the context of your personal situation.", "Discuss business risks", "Review employee pensions", "Connect business and personal planning"] },
];

export function InnovationSections({ locale, homepageContent }: { locale: Locale; homepageContent?: HomepageContent }) {
  const copy = createHomepageCopy(homepageContent?.innovation);
  const stages = defaultStages.map(item => ({ ...item, [locale]: item[locale].map(copy) }));
  const situations = defaultSituations.map(item => ({ ...item, [locale]: item[locale].map(copy) }));
  const [stage, setStage] = useState(0);
  const [situation, setSituation] = useState(0);
  const de = locale === "de";
  const step = stages[stage][locale];
  const choice = situations[situation][locale];
  const StageIcon = stages[stage].icon;
  return <>
    <section className={s.dark} id="connected-intelligence" aria-labelledby="innovation-title">
      <div className={s.inner}>
        <div className={s.topline}><span><Sparkles size={15} /> VEONIS · CONNECTED THINKING</span><span>01 — 03</span></div>
        <div className={s.grid}>
          <div className={s.intro}><h2 id="innovation-title">{de ? copy("Komplexität wird") : copy("Complexity becomes")}<br /><em>{de ? copy("Klarheit.") : copy("clarity.")}</em></h2><p>{de ? copy("Ihre finanzielle Welt ist vernetzt. Unsere Beratung auch. Entdecken Sie, wie aus einzelnen Themen eine gemeinsame Richtung entsteht.") : copy("Your financial world is connected. So is our advice. Explore how separate topics come together in one direction.")}</p>
            <div className={s.steps} aria-label={de ? copy("Beratungsablauf entdecken") : copy("Explore the advisory process")}>{stages.map((item, i) => <button key={i} type="button" aria-pressed={stage === i} aria-controls="innovation-demo" onClick={() => setStage(i)}><span>0{i + 1}</span>{item[locale][0]}<ArrowRight size={16} /></button>)}</div>
            <span className={s.caption}>{de ? copy("Interaktive Darstellung unseres Beratungsansatzes") : copy("Interactive illustration of our advisory approach")}</span>
          </div>
          <div id="innovation-demo" className={s.console} aria-live="polite">
            <div className={s.consoleTop}><span><Fingerprint size={16} /> VEONIS 360°</span><span>{de ? copy("DER WEG ZUM ÜBERBLICK") : copy("THE PATH TO CLARITY")}</span></div>
            <div key={stage} className={s.demo}>
              <div className={s.stream}>{step.slice(3).map((label, i) => <div key={label} style={{animationDelay:`${i * 110}ms`}}><FileText size={18} /><span>{label}</span><Check size={14} /></div>)}</div>
              <div className={s.connector} aria-hidden="true"><span /></div>
              <div className={s.processor}><StageIcon size={34} strokeWidth={1.25} /></div>
              <div className={s.result}><span>0{stage + 1} / 03</span><h3>{step[1]}</h3><p>{step[2]}</p></div>
            </div>
            <div className={s.consoleBottom}><span>{de ? copy("Vernetzt betrachtet.") : copy("Connected thinking.")}</span><span>{de ? copy("Persönlich besprochen.") : copy("Personal conversation.")}</span></div>
          </div>
        </div>
      </div>
    </section>
    <section className={s.guide} id="your-next-step" aria-labelledby="next-step-title"><div className={s.inner}>
      <div className={s.guideHeading}><span className={s.eyebrow}><Compass size={15} /> {de ? copy("IHR NÄCHSTER SCHRITT") : copy("YOUR NEXT STEP")}</span><h2 id="next-step-title">{de ? copy("Was bewegt Sie gerade?") : copy("What’s on your mind?")}</h2><p>{de ? copy("Wählen Sie Ihre Situation. Entdecken Sie einen passenden Gesprächseinstieg.") : copy("Choose your situation. Find a useful starting point for a conversation.")}</p></div>
      <div className={s.choices} aria-label={de ? copy("Ihre Situation") : copy("Your situation")}>{situations.map((item, i) => {const Icon = item.icon;return <button key={i} type="button" aria-pressed={situation === i} aria-controls="situation-result" onClick={() => setSituation(i)}><Icon size={20}/>{item[locale][0]}<ArrowRight size={16}/></button>;})}</div>
      <div id="situation-result" className={s.recommendation} aria-live="polite"><div key={situation} className={s.recommendationCopy}><span className={s.eyebrow}>{de ? copy("DAS KÖNNEN WIR GEMEINSAM KLÄREN") : copy("WHAT WE CAN EXPLORE TOGETHER")}</span><h3>{choice[1]}</h3><p>{choice[2]}</p></div><div className={s.nextSteps}><ol key={situation}>{choice.slice(3).map((label, i) => <li key={label}><span>0{i + 1}</span>{label}</li>)}</ol><Link href={getLocalizedPath(locale, "contact")}>{de ? copy("Darüber sprechen") : copy("Let’s talk")}<ArrowRight size={17}/></Link></div></div>
      <p className={s.note}>{de ? copy("Eine erste Orientierung. Ihre persönliche Empfehlung entsteht im Gespräch.") : copy("An initial orientation. Your personal recommendation starts with a conversation.")}</p>
    </div></section>
  </>;
}
