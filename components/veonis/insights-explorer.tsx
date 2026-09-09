"use client";

import { createHomepageCopy, type HomepageContent } from "@/lib/homepage-content";


import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, BookOpen, Clock3, Search, Sparkles } from "lucide-react";
import { getBlogPostPath, getLocalizedPath, type BlogPost, type Locale } from "@/lib/veonis-content";
import s from "./insights-explorer.module.css";

export function InsightsExplorer({ locale, posts, homepageContent }: { locale: Locale; posts: BlogPost[]; homepageContent?: HomepageContent }) {
  const copy = createHomepageCopy(homepageContent?.insights);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const de = locale === "de";
  const categories = [...new Set(posts.map(post => post.category[locale]))];
  const filtered = posts.filter(post => (!category || post.category[locale] === category) && `${post.title[locale]} ${post.excerpt[locale]} ${post.category[locale]}`.toLocaleLowerCase(locale).includes(query.trim().toLocaleLowerCase(locale)));
  const featured = filtered.find(post => post.slug === selected) ?? filtered[0];
  if (!posts.length) return null;
  return <section id="insights" className={s.section} aria-labelledby="insights-title"><div className={s.inner}>
    <header className={s.header}><div><p className={s.eyebrow}><Sparkles size={14} /> VEONIS INSIGHTS</p><h2 id="insights-title">{de ? copy("Wissen, das verbindet.") : copy("Knowledge that connects.")}</h2><p className={s.intro}>{de ? copy("Neue Perspektiven auf Ihre Finanzen. Entdecken Sie die Themen, die Sie weiterbringen.") : copy("Fresh perspectives on your finances. Explore the topics that move you forward.")}</p></div><Link className={s.all} href={getLocalizedPath(locale,"blog")}>{de ? copy("Zum Journal") : copy("Explore the journal")}<ArrowUpRight size={18}/></Link></header>
    <div className={s.toolbar}><div className={s.filters} aria-label={de ? copy("Artikelthemen") : copy("Article topics")}>{["",...categories].map(item => <button type="button" key={item} aria-pressed={item === category} onClick={() => {setCategory(item);setSelected(null);}}>{item || (de ? copy("Alle Themen") : copy("All topics"))}</button>)}</div><label className={s.search}><Search size={16}/><input aria-label={de ? copy("Beiträge durchsuchen") : copy("Search articles")} placeholder={de ? copy("Wissen entdecken …") : copy("Explore insights …")} value={query} onChange={event => {setQuery(event.target.value);setSelected(null);}} type="search" /></label></div>
    <div className={s.status} role="status">{filtered.length} {de ? (filtered.length === 1 ? copy("Beitrag zum Entdecken") : copy("Beiträge zum Entdecken")) : (filtered.length === 1 ? copy("article to explore") : copy("articles to explore"))}<span>{de ? copy("Ein Thema wählen. Zusammenhänge verstehen.") : copy("Choose a topic. Understand the connections.")}</span></div>
    {featured ? <div className={s.layout}>
      <article className={s.featured} key={featured.slug}>
        <div className={s.photo}><Image src={featured.image} alt={featured.alt[locale]} fill sizes="(min-width: 900px) 55vw, 100vw" className={s.image}/><div className={s.overlay}/><span className={s.photoLabel}><BookOpen size={13}/>{de ? copy("IM FOKUS") : copy("IN FOCUS")}</span><Link href={getBlogPostPath(locale,featured.slug)} aria-label={featured.title[locale]} className={s.photoLink}><ArrowUpRight size={25}/></Link></div>
        <div className={s.featureBody}><div className={s.meta}><span>{featured.category[locale]}</span><span><Clock3 size={13}/>{featured.readTime[locale]}</span></div><Link href={getBlogPostPath(locale,featured.slug)}><h3>{featured.title[locale]}</h3></Link><p>{featured.excerpt[locale]}</p><Link className={s.read} href={getBlogPostPath(locale,featured.slug)}>{de ? copy("Perspektive entdecken") : copy("Explore this perspective")}<ArrowRight size={17}/></Link></div>
      </article>
      <aside className={s.index} aria-label={de ? copy("Artikelauswahl") : copy("Article selection")}><div className={s.indexHeader}><span><Sparkles size={14}/>{de ? copy("IHR WISSENSKOMPASS") : copy("YOUR KNOWLEDGE COMPASS")}</span><span>{String(filtered.length).padStart(2,"0")}</span></div><div className={s.entries}>{filtered.map((post,i) => <button type="button" className={s.entry} key={post.slug} aria-pressed={post.slug === featured.slug} onClick={() => setSelected(post.slug)}><span className={s.number}>{String(i+1).padStart(2,"0")}</span><span className={s.entryCopy}><span className={s.entryMeta}>{post.category[locale]} · {post.readTime[locale]}</span><strong>{post.title[locale]}</strong></span><ArrowUpRight size={16}/></button>)}</div><div className={s.indexFooter}><span>{de ? copy("Gute Fragen sind der Anfang.") : copy("Good questions are the beginning.")}</span><p>{de ? copy("Unsere Beiträge helfen Ihnen, Finanzthemen einzuordnen und das nächste Gespräch vorzubereiten.") : copy("Our articles help you understand financial topics and prepare for your next conversation.")}</p><Link href={getLocalizedPath(locale,"contact")}>{de ? copy("Ihre Fragen mit uns besprechen") : copy("Discuss your questions with us")}<ArrowRight size={14}/></Link></div></aside>
    </div> : <div className={s.empty}><Search size={28}/><h3>{de ? copy("Noch kein passender Beitrag.") : copy("No matching articles yet.")}</h3><p>{de ? copy("Versuchen Sie einen anderen Suchbegriff oder zeigen Sie alle Themen an.") : copy("Try a different search term or show all topics.")}</p><button type="button" onClick={() => {setCategory("");setQuery("");setSelected(null);}}>{de ? copy("Alle Beiträge anzeigen") : copy("Show all articles")}<ArrowRight size={16}/></button></div>}
  </div></section>;
}
