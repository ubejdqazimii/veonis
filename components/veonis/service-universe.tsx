"use client";

import { createHomepageCopy, type HomepageContent } from "@/lib/homepage-content";


import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Building2, ChartNoAxesCombined, Check, ChevronLeft, ChevronRight, House, Pause, Play, Scale, ShieldCheck, Wallet } from "lucide-react";
import { getLocalizedPath, type Locale } from "@/lib/veonis-content";
import styles from "./service-universe.module.css";

const defaultTopics = [
  { icon: ShieldCheck, de: ["Absichern", "Versicherungen & Vorsorge", "Bin ich richtig abgesichert?", "Wir prüfen Ihre Versicherungen und Vorsorge gemeinsam – passend zu Ihrer Lebensphase.", "Lücken und doppelte Deckungen erkennen", "Krankenkasse, Haushalt und Rechtsschutz", "Säule 3a und berufliche Vorsorge"], en: ["Protect", "Insurance & pensions", "Am I properly protected?", "We review your insurance and pension arrangements together, in the context of your life stage.", "Identify gaps and overlapping cover", "Health, household and legal insurance", "Pillar 3a and occupational pensions"] },
  { icon: House, de: ["Wohnen", "Hypotheken & Immobilien", "Kann ich mir mein Eigenheim leisten?", "Wir verbinden Ihre Immobilienfinanzierung mit Ihrer gesamten Finanzplanung.", "Tragbarkeit und Eigenkapital prüfen", "Hypothekarmodelle vergleichen", "Liquidität und Amortisation einordnen"], en: ["Own a home", "Mortgages & property", "Can I afford my own home?", "We connect your property financing with your wider financial plan.", "Review affordability and equity", "Compare mortgage models", "Understand liquidity and repayments"] },
  { icon: Wallet, de: ["Planen", "Steuern & Finanzplanung", "Wie bringe ich Ordnung in meine Finanzen?", "Wir betrachten Steuern, Vorsorge und Liquidität im Zusammenhang.", "Steuerliche Möglichkeiten erkennen", "Einnahmen und Ausgaben einordnen", "Pensionierung vorausschauend planen"], en: ["Plan ahead", "Taxes & financial planning", "How do I put my finances in order?", "We look at tax, pensions and liquidity as parts of one financial picture.", "Identify tax planning opportunities", "Review income and expenditure", "Plan ahead for retirement"] },
  { icon: ChartNoAxesCombined, de: ["Aufbauen", "Anlagen & Vermögensaufbau", "Wie baue ich langfristig Vermögen auf?", "Zuerst klären wir Ihre Ziele, Ihren Zeithorizont und Ihre Risikobereitschaft.", "Bestehende Anlagen und Kosten prüfen", "Vorsorge und Anlagen verbinden", "Eine langfristige Strategie entwickeln"], en: ["Build wealth", "Investments & wealth building", "How can I build wealth over time?", "We start with your goals, time horizon and appetite for risk.", "Review existing investments and costs", "Connect pensions and investments", "Develop a long-term strategy"] },
  { icon: Scale, de: ["Nachlass", "Vorsorge & Nachlass", "Was passiert, wenn ich nicht entscheiden kann?", "Wir erkennen Handlungsbedarf und koordinieren bei Bedarf geeignete Fachpersonen.", "Vorsorgeauftrag und Patientenverfügung", "Testament und Nachlassplanung", "Familie und Nachfolge berücksichtigen"], en: ["Pass it on", "Future care & estate planning", "What if I can no longer make decisions?", "We identify areas to address and coordinate with suitable specialists when needed.", "Advance care and healthcare directives", "Wills and estate planning", "Consider family and succession"] },
  { icon: Building2, de: ["Unternehmen", "Firmenkunden", "Wie sichere ich mein Unternehmen ab?", "Wir ordnen betriebliche Absicherung und Vorsorge – auch mit Blick auf Sie als Inhaber.", "Firmen-, Unfall- und Krankentaggeldversicherung", "Betriebliche Vorsorge und Mitarbeiterlösungen", "Private und geschäftliche Finanzen strukturieren"], en: ["Run a business", "Business clients", "How do I protect my business?", "We review business protection and pensions, including your needs as an owner.", "Business, accident and daily sickness cover", "Occupational pensions and employee solutions", "Structure personal and business finances"] },
];

export function ServiceUniverse({ locale, homepageContent }: { locale: Locale; homepageContent?: HomepageContent }) {
  const copy = createHomepageCopy(homepageContent?.services);
  const topics = defaultTopics.map(item => ({ ...item, [locale]: item[locale].map(copy) }));
  const de = locale === "de";
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLElement>(null);
  const content = topics[active][locale];
  const Icon = topics[active].icon;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(value => (value + 1) % topics.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [playing, visible, topics.length]);

  const select = (index: number) => { setActive((index + topics.length) % topics.length); setPlaying(false); };

  return (
    <section ref={root} id="service-universe" className={styles.section} aria-labelledby="universe-heading">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <div><p className={styles.eyebrow}>VEONIS 360° · {de ? copy("INTERAKTIVER ÜBERBLICK") : copy("INTERACTIVE OVERVIEW")}</p>
            <h2 id="universe-heading">{de ? copy("Ihr Leben. Ihre Ziele.") : copy("Your life. Your goals.")}<br /><em>{de ? copy("Alles verbunden.") : copy("Everything connected.")}</em></h2></div>
          <p>{de ? copy("Sechs Themen. Ein Ansprechpartner. Wählen Sie, was Sie bewegt – und entdecken Sie, wie wir Sie begleiten.") : copy("Six areas. One point of contact. Choose what matters to you and discover how we can help.")}</p>
        </header>
        <div className={styles.explorer}>
          <div className={styles.visual}>
            <div className={styles.scene} data-playing={playing && visible}>
              <div className={styles.orbit} aria-hidden="true"><span /><span /><span /></div>
              <div className={styles.core}><span>VEONIS</span><strong>360°</strong><small>{de ? copy("Sie im Mittelpunkt") : copy("You at the centre")}</small></div>
              {topics.map((topic, i) => {
                const TopicIcon = topic.icon;
                const angle = (i * 60 - 90) * Math.PI / 180;
                return <button key={topic.de[0]} type="button" className={styles.node} style={{ "--x": `${50 + Math.cos(angle) * 35}%`, "--y": `${50 + Math.sin(angle) * 36}%` } as CSSProperties} data-active={i === active} aria-pressed={i === active} aria-controls="service-description" onClick={() => select(i)}><TopicIcon aria-hidden="true" /><span>{topic[locale][0]}</span></button>;
              })}
            </div>
            <div className={styles.controls}>
              <button type="button" className={styles.tour} onClick={() => setPlaying(value => !value)}>{playing ? <Pause size={15} /> : <Play size={15} />} {playing ? (de ? copy("Tour pausieren") : copy("Pause tour")) : (de ? copy("Geführte Tour starten") : copy("Start guided tour"))}</button>
              <span>{de ? copy("oder ein Thema wählen") : copy("or choose a topic")}</span>
            </div>
          </div>
          <div id="service-description" className={styles.detail} aria-live={playing ? "off" : "polite"}>
            {playing && <div key={`progress-${active}`} className={styles.progress} data-running={visible} aria-hidden="true" />}
            <div className={styles.detailTop}><span><Icon size={20} /> {content[1]}</span><span>0{active + 1} / 06</span></div>
            <div key={active} className={styles.copy}>
              <h3>{content[2]}</h3><p>{content[3]}</p>
              <ul>{content.slice(4).map(item => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
            </div>
            <Link className={styles.cta} href={getLocalizedPath(locale, "contact")}>{de ? copy("Kostenloses Erstgespräch") : copy("Free initial consultation")}<ArrowRight size={17} /></Link>
            <div className={styles.detailBottom}><Link href={getLocalizedPath(locale, "services")}>{de ? copy("Alle Dienstleistungen") : copy("All services")}<ArrowRight size={14} /></Link><div><button type="button" aria-label={de ? copy("Vorheriges Thema") : copy("Previous topic")} onClick={() => select(active - 1)}><ChevronLeft size={18} /></button><button type="button" aria-label={de ? copy("Nächstes Thema") : copy("Next topic")} onClick={() => select(active + 1)}><ChevronRight size={18} /></button></div></div>
          </div>
        </div>
        <div className={styles.footer}><span>{de ? copy("Noch unsicher, wo Sie starten sollen?") : copy("Not sure where to start?")}</span><Link href={getLocalizedPath(locale, "veonis-360-analysis")}>{de ? copy("Mit dem 360°-Check das Gesamtbild sehen") : copy("See the full picture with a 360° check")}<ArrowRight size={16} /></Link></div>
      </div>
    </section>
  );
}
