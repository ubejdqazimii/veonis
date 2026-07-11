export type Locale = "de" | "en";

export type PageKey =
  | "home"
  | "home-v2"
  | "home-v3"
  | "blog"
  | "private-clients"
  | "corporate-clients"
  | "services"
  | "veonis-360-analysis"
  | "about-veonis"
  | "career"
  | "contact"
  | "faq"
  | "legal/impressum"
  | "legal/datenschutz"
  | "legal/informationen-gemaess-art-45-vag"
  | "legal/imprint"
  | "legal/privacy"
  | "legal/information-according-to-art-45-isa";

export type CardContent = {
  title: string;
  text: string;
  ctaLabel?: string;
  href?: string;
};

export type ProcessStep = {
  title: string;
  text: string;
};

export type ContentSection = {
  eyebrow?: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  items?: string[];
  cards?: CardContent[];
  steps?: ProcessStep[];
  note?: string;
  cta?: string;
};

export type PageContent = {
  seoTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  description: string[];
  cta?: string;
  secondaryCta?: string;
  sections: ContentSection[];
};

export type BlogPost = {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  category: Record<Locale, string>;
  readTime: Record<Locale, string>;
  image: string;
  alt: Record<Locale, string>;
};

export const brand = {
  name: "Veonis",
  claim: "Ein Ansprechpartner für Ihre Finanzen.",
  email: "info@veonissuisse.ch",
  phone: "+41 79 812 81 88",
  disclaimer:
    "Die Informationen auf dieser Website dienen ausschliesslich allgemeinen Informationszwecken und stellen keine individuelle Finanz-, Rechts-, Steuer- oder Versicherungsberatung dar.",
};

export const legalDisclaimer: Record<Locale, string> = {
  de: brand.disclaimer,
  en: "The information on this website is provided for general information purposes only and does not constitute individual financial, legal, tax or insurance advice.",
};

export const localizedHomeHref: Record<Locale, string> = {
  de: "/de",
  en: "/en",
};

export type NavItem = {
  label: string;
  labelDe?: string;
  labelEn?: string;
  de: string;
  en: string;
};

export const navItems: NavItem[] = [
  { label: "Home", de: "/de", en: "/en" },
  { label: "Blog", de: "/de/blog", en: "/en/blog" },
  { label: "Private Clients", labelDe: "Privatkunden", labelEn: "Private Clients", de: "/de/privatkunden", en: "/en/private-clients" },
  { label: "Corporate Clients", labelDe: "Firmenkunden", labelEn: "Corporate Clients", de: "/de/corporate-clients", en: "/en/corporate-clients" },
  { label: "Services", labelDe: "Dienstleistungen", labelEn: "Services", de: "/de/dienstleistungen", en: "/en/services" },
  {
    label: "Veonis 360° Analysis",
    labelDe: "360°-Check",
    labelEn: "360° Check",
    de: "/de/360-check",
    en: "/en/veonis-360-analysis",
  },
  { label: "About Veonis", labelDe: "Über Veonis", labelEn: "About Veonis", de: "/de/ueber-veonis", en: "/en/about-veonis" },
  { label: "Career", labelDe: "Karriere", labelEn: "Career", de: "/de/career", en: "/en/career" },
  { label: "Contact", labelDe: "Kontakt", labelEn: "Contact", de: "/de/contact", en: "/en/contact" },
];

export function getNavItemLabel(item: NavItem, locale: Locale) {
  return locale === "de" ? item.labelDe ?? item.label : item.labelEn ?? item.label;
}

export const primaryNavItems = navItems.filter(
  (item) => !["Home", "Career", "Contact"].includes(item.label),
);

export const homepageVersions: Record<Locale, { label: string; value: "v1" | "v2" | "v3"; href: string; note: string }[]> = {
  de: [
    { label: "Homepage Version 1", value: "v1", href: "/de", note: "Ausführliche Premium-Homepage" },
    { label: "Homepage Version 2", value: "v2", href: "/de/home-v2", note: "Kompaktere Editorial-Version" },
    { label: "Homepage Version 3", value: "v3", href: "/de/home-v3", note: "Kompakte Beratungsübersicht mit klaren Entscheidungswegen." },
  ],
  en: [
    { label: "Homepage Version 1", value: "v1", href: "/en", note: "Detailed premium homepage" },
    { label: "Homepage Version 2", value: "v2", href: "/en/home-v2", note: "More compact editorial version" },
    { label: "Homepage Version 3", value: "v3", href: "/en/home-v3", note: "Compact advisory overview with clear decision paths." },
  ],
};

export const legalLinks: Record<Locale, { label: string; href: string }[]> = {
  de: [
    { label: "Impressum", href: "/de/legal/impressum" },
    { label: "Datenschutz", href: "/de/legal/datenschutz" },
    {
      label: "Informationen gemäss Art. 45 VAG",
      href: "/de/legal/informationen-gemaess-art-45-vag",
    },
  ],
  en: [
    { label: "Imprint", href: "/en/legal/imprint" },
    { label: "Privacy", href: "/en/legal/privacy" },
    {
      label: "Information according to Art. 45 ISA",
      href: "/en/legal/information-according-to-art-45-isa",
    },
  ],
};

export const valueCards: CardContent[] = [
  {
    title: "Ganzheitlich",
    text: "Wir betrachten Ihre finanzielle Situation als Ganzes - nicht nur einzelne Verträge.",
  },
  {
    title: "Persönlich",
    text: "Sie haben einen Ansprechpartner, der Ihre Situation kennt und Sie langfristig begleitet.",
  },
  {
    title: "Verständlich",
    text: "Wir erklären Finanzthemen klar, einfach und nachvollziehbar.",
  },
  {
    title: "Unabhängig",
    text: "Wir prüfen verschiedene Möglichkeiten und stellen Ihre Situation in den Mittelpunkt.",
  },
  {
    title: "Strukturiert",
    text: "Sie erhalten eine klare Übersicht, konkrete Empfehlungen und verständliche nächste Schritte.",
  },
  {
    title: "Langfristig",
    text: "Wir begleiten Sie nicht nur bei einer einzelnen Entscheidung, sondern auch bei Veränderungen.",
  },
];

export const services = [
  {
    title: "Versicherungen & Vorsorge",
    subtitle: "Richtig abgesichert. Langfristig vorbereitet.",
    text: "Gut abgesichert zu sein bedeutet nicht, möglichst viele Versicherungen zu haben. Entscheidend ist, dass Ihre Absicherung zu Ihrer Situation passt.",
    items: [
      "Krankenkasse und Zusatzversicherung",
      "Privathaftpflicht, Haushalt und Rechtsschutz",
      "Erwerbsunfähigkeit und Todesfallabsicherung",
      "Säule 3a und freie Vorsorge",
      "Berufliche Vorsorge und Lösungen für Selbstständige",
      "Krankentaggeld, Unfall- und Firmenversicherungen",
    ],
    cta: "Versicherungen und Vorsorge prüfen lassen",
  },
  {
    title: "Hypotheken & Immobilien",
    subtitle: "Immobilienentscheidungen finanziell richtig einordnen.",
    text: "Eine Immobilie beeinflusst Ihre Liquidität, Ihre Steuern, Ihre Vorsorge und Ihre langfristige Planung.",
    items: [
      "Tragbarkeit und Eigenkapital analysieren",
      "Hypothekarmodelle vergleichen",
      "Amortisation und Steuerfolgen einordnen",
      "Vorsorgegelder berücksichtigen",
      "Anschlussfinanzierung prüfen",
    ],
    cta: "Hypothek prüfen lassen",
  },
  {
    title: "Steuern & Finanzplanung",
    subtitle: "Steuerliche Möglichkeiten erkennen und sinnvoll nutzen.",
    text: "Viele steuerliche Möglichkeiten hängen mit Vorsorge, Wohneigentum, Anlagen oder Selbstständigkeit zusammen.",
    items: [
      "Säule 3a und Einkauf in die Pensionskasse",
      "Wohneigentum und Hypothek",
      "Steuerliche Abzüge und Liquiditätsplanung",
      "Anlagen und Steuerfolgen",
      "Selbstständigkeit und Pensionierung",
    ],
    cta: "Steuerpotenzial prüfen lassen",
  },
  {
    title: "Anlagen & Vermögensaufbau",
    subtitle: "Vermögen aufbauen mit einem klaren Plan.",
    text: "Bevor es um einzelne Produkte geht, klären wir Ziele, Anlagehorizont und Risikobereitschaft.",
    items: [
      "Ziele und Risikobereitschaft definieren",
      "Bestehende Anlagen prüfen",
      "Kosten und Struktur einordnen",
      "Vorsorge und Anlagen verbinden",
      "Langfristigen Vermögensaufbau planen",
    ],
    cta: "Anlagen besprechen",
  },
  {
    title: "Rechtliche Vorsorgethemen & Nachlass",
    subtitle: "Wichtige Entscheidungen rechtzeitig regeln.",
    text: "Veonis hilft, relevante Themen zu erkennen und bei Bedarf mit geeigneten Fachpersonen zu koordinieren.",
    items: [
      "Vorsorgeauftrag und Patientenverfügung",
      "Testament und Nachlassplanung",
      "Absicherung der Familie",
      "Unternehmensnachfolge",
      "Koordination mit Treuhand, Steuer- oder Rechtsexperten",
    ],
    cta: "Vorsorgethemen besprechen",
  },
  {
    title: "Firmenkunden-Services",
    subtitle: "Struktur, Absicherung und Vorsorge für Unternehmen.",
    text: "Unternehmen brauchen Lösungen, die zur Branche, Unternehmensgrösse und Zielsetzung passen.",
    items: [
      "Firmenversicherungen",
      "Betriebliche Vorsorge",
      "Krankentaggeld und Unfallversicherung",
      "Geschäftsinhaber-Absicherung",
      "Mitarbeiterlösungen",
      "Private und geschäftliche Strukturierung",
    ],
    cta: "Firmenberatung anfragen",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "Kennenlernen",
    text: "In einem unverbindlichen Erstgespräch lernen wir Ihre Situation, Ihre Ziele und Ihre wichtigsten Fragen kennen.",
  },
  {
    title: "Gesamtanalyse",
    text: "Wir prüfen bestehende Unterlagen, Verträge und finanziellen Möglichkeiten im Zusammenhang.",
  },
  {
    title: "Empfehlungen",
    text: "Sie erhalten eine verständliche Einschätzung mit konkreten Empfehlungen und Prioritäten.",
  },
  {
    title: "Umsetzung",
    text: "Wenn Sie möchten, begleiten wir Vergleiche, Offerten, Anpassungen und die Koordination mit Anbietern.",
  },
  {
    title: "Laufende Betreuung",
    text: "Finanzielle Situationen verändern sich. Deshalb überprüfen wir Ihre Lösungen regelmässig.",
  },
];

export const faqItems: CardContent[] = [
  {
    title: "Ist das Erstgespräch kostenlos?",
    text: "Ja. Im Erstgespräch klären wir Ihre Situation, Ihre Fragen und ob eine Zusammenarbeit sinnvoll ist.",
  },
  {
    title: "Was ist der Veonis 360°-Check?",
    text: "Der Veonis 360°-Check ist ein ganzheitlicher Finanzcheck. Wir prüfen Versicherungen, Vorsorge, Hypotheken, Steuern, Anlagen und weitere relevante Themen im Zusammenhang.",
  },
  {
    title: "Muss ich bereits Kunde sein?",
    text: "Nein. Sie können auch dann eine Analyse anfragen, wenn Sie Ihre bestehenden Lösungen einfach überprüfen lassen möchten.",
  },
  {
    title: "Arbeitet Veonis mit mehreren Anbietern zusammen?",
    text: "Ja. Als Broker prüfen wir verschiedene Möglichkeiten und zeigen Ihnen, welche Lösungen zu Ihrer Situation passen können.",
  },
  {
    title: "Kann ich auch nur ein einzelnes Thema prüfen lassen?",
    text: "Ja. Sie können zum Beispiel nur Ihre Versicherungen, Vorsorge, Hypothek oder Anlagen prüfen lassen. Wir zeigen Ihnen aber immer auch, wie das Thema mit Ihrer Gesamtsituation zusammenhängt.",
  },
  {
    title: "Berät Veonis auch Unternehmen?",
    text: "Ja. Veonis unterstützt Unternehmen, Selbstständige und Arbeitgeber bei Firmenversicherungen, beruflicher Vorsorge und finanzieller Strukturierung.",
  },
  {
    title: "Was unterscheidet Veonis von einzelnen Produktanbietern?",
    text: "Veonis betrachtet Ihre Situation ganzheitlich. Im Mittelpunkt steht nicht ein einzelnes Produkt, sondern die Frage, welche Lösung zu Ihrer gesamten finanziellen Situation passt.",
  },
  {
    title: "Unterstützt Veonis auch bei rechtlichen Themen?",
    text: "Veonis ersetzt keine anwaltliche oder notarielle Beratung. Wir helfen jedoch, relevante rechtliche Vorsorgethemen zu erkennen und bei Bedarf mit geeigneten Fachpersonen zu koordinieren.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "vorsorge-steuern-schweiz",
    title: {
      de: "Wie Vorsorge und Steuern in der Schweiz zusammenhängen",
      en: "How pension planning and taxes connect in Switzerland",
    },
    excerpt: {
      de: "Säule 3a, Pensionskasseneinkäufe und Wohneigentum wirken selten isoliert. Wer diese Themen gemeinsam betrachtet, erkennt schneller, wo Planung wirklich Mehrwert schafft.",
      en: "Pillar 3a, pension fund purchases and home ownership rarely work in isolation. Looking at these topics together shows more quickly where planning creates real value.",
    },
    category: { de: "Vorsorge", en: "Pension planning" },
    readTime: { de: "5 Min.", en: "5 min" },
    image: "/brand/photos/veonis-planning-session-optimized.jpg",
    alt: {
      de: "Planungssituation mit Dokumenten und digitaler Übersicht",
      en: "Planning session with documents and a digital overview",
    },
  },
  {
    slug: "hypothek-liquiditaet-tragbarkeit",
    title: {
      de: "Hypothek prüfen: Tragbarkeit ist nur der Anfang",
      en: "Reviewing a mortgage: affordability is only the beginning",
    },
    excerpt: {
      de: "Eine Hypothek beeinflusst Liquidität, Steuern, Vorsorge und Risikoabsicherung. Gute Beratung betrachtet deshalb mehr als nur den Zinssatz.",
      en: "A mortgage influences liquidity, taxes, pension planning and risk protection. Good advice looks beyond the interest rate.",
    },
    category: { de: "Hypotheken", en: "Mortgages" },
    readTime: { de: "6 Min.", en: "6 min" },
    image: "/brand/photos/veonis-corporate-meeting-optimized.jpg",
    alt: {
      de: "Beratungsgespräch zu Immobilien- und Finanzplanung",
      en: "Advisory conversation about real estate and financial planning",
    },
  },
  {
    slug: "versicherungen-doppelspurigkeiten",
    title: {
      de: "Versicherungen: Wo Doppelspurigkeiten häufig entstehen",
      en: "Insurance: where overlaps often appear",
    },
    excerpt: {
      de: "Viele Policen sind historisch gewachsen. Wer Verträge gemeinsam prüft, erkennt schneller Lücken, Überschneidungen und unnötige Kosten.",
      en: "Many policies have grown over time. Reviewing contracts together reveals gaps, overlaps and unnecessary costs faster.",
    },
    category: { de: "Versicherungen", en: "Insurance" },
    readTime: { de: "4 Min.", en: "4 min" },
    image: "/brand/photos/veonis-advisor-conversation-optimized.jpg",
    alt: {
      de: "Persönliche Versicherungsberatung im Gespräch",
      en: "Personal insurance advice in conversation",
    },
  },
  {
    slug: "selbststaendige-private-firmenfinanzen",
    title: {
      de: "Selbstständig: private und geschäftliche Finanzen sauber trennen",
      en: "Self-employed: separating private and business finances clearly",
    },
    excerpt: {
      de: "Für Selbstständige greifen Vorsorge, Absicherung, Steuern und Liquidität direkt ineinander. Struktur reduziert spätere Überraschungen.",
      en: "For self-employed people, pensions, protection, taxes and liquidity are tightly connected. Structure reduces later surprises.",
    },
    category: { de: "Unternehmen", en: "Business" },
    readTime: { de: "7 Min.", en: "7 min" },
    image: "/brand/photos/veonis-corporate-workshop-optimized.jpg",
    alt: {
      de: "Firmenteam bei strukturierter Finanzplanung",
      en: "Business team working on structured financial planning",
    },
  },
  {
    slug: "finanzcheck-lebensphasen",
    title: {
      de: "Wann ein Finanzcheck besonders sinnvoll ist",
      en: "When a financial check is especially useful",
    },
    excerpt: {
      de: "Berufseinstieg, Familie, Eigenheim, Selbstständigkeit oder Pensionierung verändern Prioritäten. Ein 360° Blick hilft, Entscheidungen rechtzeitig neu zu ordnen.",
      en: "Career start, family, home ownership, self-employment or retirement change priorities. A 360° view helps reorder decisions in time.",
    },
    category: { de: "360°-Check", en: "360° analysis" },
    readTime: { de: "5 Min.", en: "5 min" },
    image: "/brand/photos/veonis-client-discussion-optimized.jpg",
    alt: {
      de: "Beratungsgespräch zu Lebensphasen und Finanzfragen",
      en: "Advisory conversation about life phases and financial questions",
    },
  },
];

const home: PageContent = {
  seoTitle: "Veonis - Finanzberatung, Versicherungen & Vorsorge in der Schweiz",
  metaDescription:
    "Veonis begleitet Privat- und Firmenkunden in der Schweiz bei Versicherungen, Vorsorge, Hypotheken, Steuern, Anlagen und finanzieller Planung. Persönlich, unabhängig und verständlich.",
  eyebrow: "Veonis Schweiz",
  title: "Ein Ansprechpartner für Versicherungen, Vorsorge und Finanzen.",
  description: [
    "Versicherungen, Vorsorge, Steuern, Hypotheken und Anlagen hängen stärker zusammen, als viele denken. Eine Entscheidung in einem Bereich kann Auswirkungen auf Ihre gesamte finanzielle Situation haben.",
    "Veonis hilft Ihnen, den Überblick zu behalten. Wir prüfen Ihre aktuelle Situation, zeigen Ihnen verständlich Ihre Möglichkeiten und begleiten Sie bei Entscheidungen, die langfristig zu Ihnen passen.",
  ],
  cta: "Kostenloses Erstgespräch vereinbaren",
  secondaryCta: "360°-Check anfragen",
  sections: [
    {
      eyebrow: "Gesamtbild",
      title: "Finanzielle Klarheit beginnt mit dem Gesamtbild.",
      paragraphs: [
        "Viele Menschen haben verschiedene Verträge, Lösungen und Ansprechpartner: eine Versicherung hier, eine Vorsorgelösung dort, eine Hypothek bei der Bank und vielleicht Anlagen bei einem weiteren Anbieter.",
        "Das Problem: Diese Themen werden oft einzeln betrachtet, obwohl sie miteinander verbunden sind.",
        "Ihre Vorsorge beeinflusst Ihre Steuern. Ihre Hypothek beeinflusst Ihre Liquidität. Ihre Versicherungen beeinflussen Ihre monatlichen Kosten. Ihre Anlagen sollten zu Ihren Zielen und Ihrer Risikobereitschaft passen.",
        "Genau hier setzt Veonis an. Wir betrachten Ihre finanzielle Situation als Ganzes und schaffen eine klare Struktur.",
      ],
    },
    {
      eyebrow: "Analyse",
      title: "Der Veonis 360°-Check",
      intro:
        "Der Veonis 360°-Check ist der Ausgangspunkt unserer Beratung. Er zeigt, wo Sie heute stehen, welche Themen bereits gut geregelt sind und wo Optimierungspotenzial besteht.",
      items: [
        "Versicherungen",
        "Vorsorge und Säule 3a",
        "Hypotheken und Wohneigentum",
        "Steuern und Sparpotenzial",
        "Anlagen und Vermögensaufbau",
        "Absicherung bei Krankheit, Unfall und Erwerbsunfähigkeit",
        "Liquidität und monatliche Belastung",
        "Private und geschäftliche Finanzstruktur",
      ],
      cta: "360°-Check anfragen",
    },
    {
      eyebrow: "Services",
      title: "Unsere Services",
      intro:
        "Veonis bietet Beratung für Privatpersonen, Familien, Selbstständige und Unternehmen. Unser Ziel ist es, Ihre Finanzthemen verständlich zu ordnen und Lösungen zu entwickeln, die zu Ihrer Lebenssituation passen.",
      cards: services.slice(0, 5).map(({ title, text }) => ({ title, text })),
    },
    {
      eyebrow: "Warum Veonis",
      title: "Mehr Überblick. Bessere Entscheidungen.",
      cards: valueCards,
    },
    {
      eyebrow: "Zusammenarbeit",
      title: "So funktioniert die Zusammenarbeit",
      steps: processSteps,
      cta: "Termin vereinbaren",
    },
    {
      eyebrow: "Zielgruppen",
      title: "Für wen ist Veonis da?",
      cards: [
        {
          title: "Privatkunden",
          text: "Für Einzelpersonen, Paare und Familien, die Versicherungen, Vorsorge, Hypotheken, Steuern oder Anlagen sauber organisieren möchten.",
        },
        {
          title: "Firmenkunden",
          text: "Für Unternehmen, Selbstständige und Arbeitgeber, die Versicherungen, Vorsorgelösungen und Finanzthemen professionell strukturieren möchten.",
        },
        {
          title: "Junge Erwachsene",
          text: "Für Menschen, die ins Berufsleben starten und ihre Finanzen von Anfang an richtig aufbauen möchten.",
        },
        {
          title: "Familien",
          text: "Für Familien, die Absicherung, Vorsorge, Wohneigentum und langfristige Planung miteinander verbinden möchten.",
        },
        {
          title: "Unternehmer und Selbstständige",
          text: "Für Menschen, die private und geschäftliche Finanzthemen klar trennen und sinnvoll strukturieren möchten.",
        },
      ],
    },
  ],
};

const homeV2: PageContent = {
  ...home,
  seoTitle: "Veonis | Versicherungen, Vorsorge und Finanzen",
  metaDescription:
    "Veonis bringt Ordnung in Versicherungen, Vorsorge, Hypotheken, Steuern, Anlagen und finanzielle Planung in der Schweiz.",
  eyebrow: "Veonis Schweiz",
  title: "Ein Ansprechpartner für Versicherungen, Vorsorge und Finanzen.",
  description: [
    "Veonis bringt Ordnung in Ihre finanzielle Situation. Wir prüfen Versicherungen, Vorsorge, Hypotheken, Steuern und Anlagen im Zusammenhang - damit Sie klar erkennen, was passt, wo Lücken bestehen und welche nächsten Schritte sinnvoll sind.",
  ],
};

const homeV3: PageContent = {
  ...home,
  seoTitle: "Veonis Homepage Version 3 | Finanzberatung Schweiz",
  metaDescription:
    "Veonis bringt Ordnung in Versicherungen, Vorsorge, Hypotheken, Steuern, Anlagen und finanzielle Planung in der Schweiz.",
  eyebrow: "Veonis Schweiz",
  title: "Ein Ansprechpartner für Versicherungen, Vorsorge und Finanzen.",
  description: [
    "Veonis bringt Ordnung in Ihre finanzielle Situation. Wir prüfen Versicherungen, Vorsorge, Hypotheken, Steuern und Anlagen im Zusammenhang - damit Sie klar erkennen, was passt, wo Lücken bestehen und welche nächsten Schritte sinnvoll sind.",
  ],
};

const dePages: Record<PageKey, PageContent> = {
  home,
  "home-v2": homeV2,
  "home-v3": homeV3,
  blog: {
    seoTitle: "Blog | Veonis Finanzimpulse",
    metaDescription:
      "Thoughtful finance and Swiss advisory insights from Veonis about insurance, pension planning, mortgages, taxes and holistic financial decisions.",
    eyebrow: "Blog",
    title: "Finanzimpulse für bessere Entscheidungen.",
    description: [
      "Kurze, verständliche Beiträge zu Schweizer Finanzfragen: Vorsorge, Versicherungen, Hypotheken, Steuern, Selbstständigkeit und Lebensphasen.",
      "Die Inhalte ersetzen keine individuelle Beratung, helfen aber, die richtigen Fragen früher zu stellen.",
    ],
    sections: [],
  },
  "private-clients": {
    seoTitle: "Finanzberatung für Privatkunden in der Schweiz | Veonis",
    metaDescription:
      "Veonis begleitet Privatkunden bei Absicherung, Vorsorge, Eigenheim, Steuern, Vermögensaufbau und Pensionierung. Persönlich, verständlich und mit klarem Blick auf Ihre Lebenssituation.",
    eyebrow: "Privatkunden",
    title: "Finanzberatung für die Momente, in denen gute Entscheidungen zählen.",
    description: [
      "Finanzen verändern sich mit dem Leben. Ein neuer Job, eine Familie, ein Eigenheim, der Schritt in die Selbstständigkeit oder die Vorbereitung auf die Pensionierung bringen Fragen mit sich, die man nicht isoliert beantworten sollte.",
      "Veonis hilft Ihnen, Ihre Situation klar einzuordnen, Risiken zu erkennen und Entscheidungen bewusst zu treffen. Persönlich, verständlich und mit Blick auf das, was langfristig zu Ihnen passt.",
    ],
    cta: "Kostenloses Erstgespräch vereinbaren",
    sections: [
      {
        eyebrow: "Was Sie erwarten können",
        title: "Persönliche Beratung mit klarem Blick auf Ihre Lebenssituation.",
        cards: [
          { title: "Persönliche Beratung", text: "Ihre Fragen, Ziele und Lebensphase stehen im Mittelpunkt." },
          { title: "Unabhängiger Blick", text: "Bestehende Lösungen werden ruhig und nachvollziehbar eingeordnet." },
          { title: "Klare Prioritäten", text: "Sie sehen, welche Themen zuerst wichtig sind und warum." },
          { title: "Langfristige Begleitung", text: "Veonis bleibt Ansprechpartner, wenn sich Ihre Situation verändert." },
        ],
      },
      {
        eyebrow: "Wann lohnt sich ein Gespräch?",
        title: "Wenn sich Ihr Leben verändert, sollte Ihre Finanzstruktur mitziehen.",
        paragraphs: [
          "Viele Verträge und Lösungen entstehen Schritt für Schritt. Was vor einigen Jahren sinnvoll war, passt heute vielleicht nicht mehr zu Ihrer Lebenssituation.",
          "Ein Finanzcheck lohnt sich besonders, wenn Sie vor einer wichtigen Entscheidung stehen oder das Gefühl haben, dass Ihre Unterlagen, Policen und Vorsorgethemen nicht mehr wirklich übersichtlich sind.",
        ],
        items: [
          "Sie starten ins Berufsleben und möchten Ihre Vorsorge richtig aufbauen.",
          "Sie verdienen mehr und möchten Steuern und Vorsorge sinnvoll nutzen.",
          "Sie gründen eine Familie und möchten Verantwortung sauber absichern.",
          "Sie planen Wohneigentum oder möchten Ihre Hypothek prüfen.",
          "Sie sind selbstständig oder wollen private und geschäftliche Themen besser trennen.",
          "Sie nähern sich der Pensionierung und möchten rechtzeitig planen.",
          "Sie haben viele bestehende Verträge und wünschen sich endlich Überblick.",
        ],
      },
      {
        eyebrow: "Ihre Fragen",
        title: "Wir beginnen dort, wo bei Ihnen Unsicherheit besteht.",
        paragraphs: [
          "Bei Privatkunden geht es selten nur um eine einzelne Police oder ein einzelnes Finanzprodukt. Meist steht dahinter eine grössere Frage.",
          "Veonis ordnet diese Fragen gemeinsam mit Ihnen ein. Nicht kompliziert, nicht verkäuferisch, sondern verständlich und strukturiert.",
        ],
        items: [
          "Bin ich und meine Familie wirklich richtig abgesichert?",
          "Zahle ich für Leistungen, die ich gar nicht brauche?",
          "Was passiert finanziell bei Krankheit, Unfall oder Erwerbsunfähigkeit?",
          "Nutze ich meine Vorsorgemöglichkeiten sinnvoll?",
          "Wie wirkt sich ein Eigenheim auf meine langfristige Planung aus?",
          "Kann ich Vermögen aufbauen, ohne meine Liquidität zu gefährden?",
          "Was sollte ich heute klären, damit später keine Lücken entstehen?",
        ],
      },
      {
        eyebrow: "Lebenssituationen",
        title: "Beratung, die zu Ihrer aktuellen Phase passt.",
        cards: [
          { title: "Beruf & Einkommen", text: "Mit dem Einkommen entstehen neue Möglichkeiten, aber auch neue Verantwortungen. Wir prüfen, ob Absicherung, Vorsorge, Sparziele und Steuerfragen zu Ihrer aktuellen Situation passen." },
          { title: "Familie & Verantwortung", text: "Wenn Partner, Kinder oder gemeinsame Verpflichtungen dazukommen, zeigen wir, ob Einkommen, Risiken, Vorsorge und bestehende Lösungen sinnvoll aufeinander abgestimmt sind." },
          { title: "Eigenheim & Hypothek", text: "Wir betrachten Tragbarkeit, Amortisation, Steuern, Liquidität und Absicherung im Zusammenhang mit Ihrer gesamten Lebensplanung." },
          { title: "Selbstständigkeit", text: "Wir helfen Ihnen, private und geschäftliche Themen sauber zu trennen und wichtige Risiken frühzeitig zu erkennen." },
          { title: "Vermögen & Zukunft", text: "Vermögensaufbau beginnt mit klaren Zielen. Entscheidend ist, wofür Sie sparen, wie viel Risiko zu Ihnen passt und wie flexibel Sie bleiben möchten." },
          { title: "Pensionierung", text: "Kapital oder Rente, Pensionskasse, Steuern, Hypothek, Einkommen und Nachlass sollten rechtzeitig sichtbar werden." },
        ],
      },
      {
        eyebrow: "Was wir konkret prüfen",
        title: "Ein klarer Blick auf das, was für Sie relevant ist.",
        intro: "Je nach Situation prüfen wir unter anderem:",
        items: [
          "Bestehende Versicherungen und mögliche Doppelspurigkeiten",
          "Absicherung bei Krankheit, Unfall, Erwerbsunfähigkeit und Tod",
          "Säule 3a, Pensionskasse und Vorsorgepotenzial",
          "Steuerliche Möglichkeiten im Zusammenhang mit Vorsorge und Eigenheim",
          "Hypothek, Tragbarkeit, Amortisation und Finanzierungsspielraum",
          "Anlagen, Sparziele, Risiko und Liquidität",
          "Private und geschäftliche Finanzstruktur bei Selbstständigkeit",
          "Prioritäten für die nächsten Monate und Jahre",
        ],
        paragraphs: [
          "Sie erhalten keine unübersichtliche Produktliste, sondern eine verständliche Einschätzung mit klaren nächsten Schritten.",
        ],
      },
      {
        eyebrow: "Ergebnis",
        title: "Mehr Überblick. Bessere Entscheidungen. Weniger Unsicherheit.",
        paragraphs: [
          "Nach der Analyse wissen Sie, wo Sie stehen und welche Themen wirklich wichtig sind.",
          "Unser Ziel ist, dass Sie Ihre Entscheidungen verstehen und mit einem guten Gefühl treffen können.",
        ],
        items: [
          "Eine verständliche Übersicht Ihrer aktuellen Situation",
          "Eine Einschätzung zu Lücken, Risiken und unnötigen Überschneidungen",
          "Klare Prioritäten statt einzelne Produktvorschläge",
          "Konkrete Empfehlungen für die nächsten Schritte",
          "Begleitung bei Vergleichen, Offerten und Anpassungen",
          "Einen persönlichen Ansprechpartner für Ihre weiteren Fragen",
        ],
      },
      {
        eyebrow: "Zusammenarbeit",
        title: "Einfach, persönlich und transparent.",
        steps: [
          { title: "01 Erstgespräch", text: "Wir lernen Ihre Situation kennen und klären, welche Fragen für Sie aktuell am wichtigsten sind. Das Gespräch ist unverbindlich und dient der ersten Einordnung." },
          { title: "02 Analyse", text: "Wir prüfen die relevanten Unterlagen und betrachten Ihre Situation strukturiert. Dabei zeigen sich Lücken, Doppelspurigkeiten, Risiken und mögliche Optimierungen." },
          { title: "03 Empfehlung", text: "Sie erhalten eine klare Einschätzung mit Prioritäten und verständlichen Empfehlungen. Wir erklären Ihnen, warum ein Schritt sinnvoll ist und welche Alternativen bestehen." },
          { title: "04 Umsetzung", text: "Wenn Sie möchten, begleiten wir Sie bei Vergleichen, Offerten, Anpassungen und weiteren Entscheidungen. Auch danach bleiben wir Ihr Ansprechpartner." },
        ],
      },
      {
        eyebrow: "Warum Veonis",
        title: "Weil gute Beratung nicht beim Abschluss endet.",
        paragraphs: [
          "Finanzielle Entscheidungen begleiten Sie über viele Jahre. Deshalb braucht es nicht nur eine einmalige Empfehlung, sondern jemanden, der Ihre Situation versteht und Entwicklungen mitdenkt.",
          "Veonis steht für persönliche Beratung, klare Struktur und langfristige Begleitung. Wir möchten, dass Sie nicht einfach eine Lösung übernehmen, sondern verstehen, warum sie zu Ihnen passt.",
        ],
      },
    ],
  },

  "corporate-clients": {
    seoTitle: "Finanz- und Versicherungsberatung für Firmenkunden | Veonis",
    metaDescription:
      "Veonis unterstützt Unternehmen, Selbstständige und Arbeitgeber bei Firmenversicherungen, beruflicher Vorsorge und finanzieller Strukturierung.",
    eyebrow: "Firmenkunden",
    title: "Finanzberatung für Firmenkunden",
    description: [
      "Als Unternehmer tragen Sie Verantwortung: für Ihr Unternehmen, Ihre Mitarbeitenden und Ihre eigene finanzielle Zukunft.",
      "Veonis unterstützt Sie dabei, geschäftliche und private Finanzthemen sauber zu strukturieren. Wir helfen Ihnen, Risiken zu erkennen, Lösungen zu vergleichen und eine Absicherung aufzubauen, die zu Ihrem Unternehmen passt.",
    ],
    cta: "Firmenberatung anfragen",
    sections: [
      {
        title: "Klare Strukturen für Ihr Unternehmen",
        paragraphs: [
          "Firmenversicherungen, Pensionskasse, Krankentaggeld, Unfallversicherung, Geschäftsfahrzeuge, Cyberrisiken, Liquidität und Unternehmerabsicherung sind Themen, die regelmässig überprüft werden sollten.",
          "Viele Unternehmen wachsen, verändern sich oder stellen neue Mitarbeitende ein. Dadurch verändern sich auch Risiken, Pflichten und finanzielle Anforderungen.",
        ],
      },
      {
        title: "Services für Unternehmen",
        cards: [
          { title: "Unternehmensversicherungen", text: "Wir prüfen, welche Risiken relevant sind und welche Absicherung sinnvoll ist." },
          { title: "Berufliche Vorsorge", text: "Wir unterstützen bei Pensionskasse, Vorsorgeplänen und Lösungen für Mitarbeitende." },
          { title: "Krankentaggeld & Unfallversicherung", text: "Wir prüfen, ob Unternehmen und Mitarbeitende passend abgesichert sind." },
          { title: "Geschäftsinhaber-Absicherung", text: "Wir zeigen, wie Sie sich privat und geschäftlich besser absichern können." },
          { title: "Mitarbeiterlösungen", text: "Wir helfen, verständliche und attraktive Lösungen für Mitarbeitende aufzubauen." },
          { title: "Private und geschäftliche Strukturierung", text: "Wir helfen, private und geschäftliche Finanzthemen sauber zu ordnen." },
        ],
      },
      {
        title: "Ihr Vorteil",
        paragraphs: [
          "Sie erhalten keine Standardlösung. Wir analysieren Ihre Unternehmensstruktur, Ihre Risiken und Ihre Ziele.",
          "So gewinnen Sie Klarheit, sparen Zeit und können sich stärker auf Ihr Kerngeschäft konzentrieren.",
        ],
      },
    ],
  },
  services: {
    seoTitle: "Dienstleistungen | Vorsorge, Versicherungen, Anlagen, Hypotheken & Steuern | Veonis",
    metaDescription:
      "Veonis unterstützt Privatkunden, Selbstständige und Unternehmen in den Bereichen Vorsorge & Versicherungen, Finanzen & Anlagen, Hypotheken & Immobilien sowie Steuern & Recht.",
    eyebrow: "Dienstleistungen",
    title: "Vier Bereiche. Ein klarer Blick auf Ihre finanzielle Situation.",
    description: [
      "Finanzielle Entscheidungen entstehen selten isoliert. Vorsorge beeinflusst Steuern. Immobilien verändern Liquidität. Anlagen brauchen klare Ziele. Versicherungen sollen Risiken schützen - nicht unnötige Kosten verursachen.",
      "Veonis ordnet diese Themen verständlich ein und zeigt, wo Handlungsbedarf besteht.",
    ],
    cta: "Kostenloses Erstgespräch vereinbaren",
    sections: [
      {
        eyebrow: "Was Sie erwarten können",
        title: "Klare Analyse, unabhängiger Blick und persönliche Begleitung.",
        cards: [
          { title: "Klare Analyse", text: "Wir prüfen Ihre Ausgangslage strukturiert und verständlich." },
          { title: "Unabhängiger Blick", text: "Bestehende Lösungen und mögliche Alternativen werden fair eingeordnet." },
          { title: "Verständliche Empfehlungen", text: "Sie erhalten klare Prioritäten statt komplizierte Fachsprache." },
          { title: "Persönliche Begleitung", text: "Veonis bleibt Ansprechpartner bei Vergleichen, Offerten und Anpassungen." },
        ],
      },
      {
        eyebrow: "Unsere Dienstleistungen",
        title: "Kurz erklärt. Klar eingeordnet.",
        cards: [
          {
            title: "Vorsorge & Versicherungen",
            text: "Absicherung soll zu Ihrer Lebenssituation passen - nicht zu einem Standardformular. Wir prüfen bestehende Versicherungen, erkennen Lücken, Doppelspurigkeiten und unnötige Kosten. Gleichzeitig betrachten wir Säule 3a, Pensionskasse, Risikoabsicherung, Familie, Einkommen und Pensionierung. Relevant bei Familie, Eigenheim, Selbstständigkeit, höherem Einkommen, Pensionierungsplanung oder bestehenden Altverträgen.",
          },
          {
            title: "Finanzen & Anlagen",
            text: "Gute Finanzplanung beginnt nicht mit einem Produkt, sondern mit einem Ziel. Wir klären, was Sie erreichen möchten, wie viel Risiko zu Ihnen passt und wie flexibel Sie bleiben wollen. Darauf aufbauend ordnen wir Sparziele, Liquidität, Anlagehorizont und Vermögensaufbau verständlich ein. Relevant bei freiem Kapital, langfristigem Sparen, Vermögensaufbau, Vorsorgezielen oder finanzieller Neuordnung.",
          },
          {
            title: "Hypotheken & Immobilien",
            text: "Bei Immobilien zählt nicht nur der Zinssatz. Entscheidend ist, ob Finanzierung, Tragbarkeit, Amortisation, Steuern, Vorsorge und Absicherung zusammenpassen. Veonis hilft Ihnen, Immobilienentscheidungen nicht isoliert zu treffen, sondern langfristig sauber einzuordnen. Relevant bei Kauf, Verlängerung, Umschuldung, Eigenmittelplanung, Amortisation oder Prüfung der Tragbarkeit.",
          },
          {
            title: "Steuern & Recht",
            text: "Viele finanzielle Entscheidungen haben steuerliche und rechtliche Auswirkungen. Wer Vorsorge, Immobilien, Anlagen, Selbstständigkeit oder Nachlassfragen plant, sollte diese Schnittstellen frühzeitig berücksichtigen. Veonis hilft Ihnen, relevante Themen zu erkennen, Fragen richtig einzuordnen und bei Bedarf die passenden Fachstellen einzubeziehen. Relevant bei Säule 3a, Pensionskasseneinkauf, Wohneigentum, Selbstständigkeit, Nachlassplanung, Vertragsfragen oder steuerlicher Optimierung.",
          },
        ],
      },
      {
        eyebrow: "Der richtige Einstieg",
        title: "Wobei können wir Sie unterstützen?",
        cards: [
          {
            title: "Privatkunden",
            text: "Für Menschen, die Absicherung, Vorsorge, Eigenheim, Vermögensaufbau oder Pensionierung klarer planen möchten.",
            ctaLabel: "Zu Privatkunden",
            href: "/de/privatkunden",
          },
          {
            title: "Firmenkunden",
            text: "Für Selbstständige und KMU, die Risiken, Mitarbeitende, Pensionskasse, Krankentaggeld, Unfallversicherung und Unternehmensversicherungen professionell strukturieren möchten.",
            ctaLabel: "Zu Firmenkunden",
            href: "/de/corporate-clients",
          },
          {
            title: "360°-Check",
            text: "Für alle, die zuerst einen Gesamtüberblick wünschen, bevor einzelne Themen entschieden werden.",
            ctaLabel: "360°-Check ansehen",
            href: "/de/360-check",
          },
        ],
      },
      {
        eyebrow: "Was Sie von Veonis erwarten können",
        title: "Keine Produktliste. Eine klare Entscheidungsgrundlage.",
        paragraphs: [
          "Am Ende soll nicht mehr Verwirrung entstehen, sondern Klarheit. Sie sollen wissen, was wichtig ist, was warten kann und welche Schritte sinnvoll sind.",
        ],
        items: [
          "Eine klare Übersicht über Ihre Ausgangslage",
          "Eine Einschätzung zu Lücken, Risiken und Doppelspurigkeiten",
          "Prioritäten statt isolierte Einzelvorschläge",
          "Verständliche Empfehlungen mit nächsten Schritten",
          "Begleitung bei Vergleichen, Offerten und Anpassungen",
        ],
      },
    ],
  },

  "veonis-360-analysis": {
    seoTitle: "360°-Check | Finanzcheck, Vertragsanalyse & Verhandlung | Veonis",
    metaDescription:
      "Der Veonis 360°-Check prüft bestehende Verträge, erkennt Lücken und Doppelspurigkeiten, vergleicht Alternativen und unterstützt bei Verhandlungen mit Anbietern.",
    eyebrow: "360°-Check",
    title: "Klar sehen. Besser entscheiden. Stärker verhandeln.",
    description: [
      "Der Veonis 360°-Check zeigt, wo Sie finanziell stehen, welche Verträge wirklich passen und wo bessere Lösungen möglich sind.",
      "Wir prüfen nicht nur Unterlagen. Wir ordnen ein, vergleichen Alternativen und führen auf Wunsch die Gespräche mit Anbietern für Sie.",
      "Sie behalten die Entscheidung. Wir schaffen die Grundlage dafür.",
    ],
    cta: "Kostenloses Erstgespräch vereinbaren",
    sections: [
      {
        eyebrow: "Was Sie erwarten können",
        title: "Analyse, Marktvergleich, Verhandlung und Umsetzung aus einer Hand.",
        cards: [
          { title: "Analyse", text: "Wir prüfen Ihre Ausgangslage, Verträge, Unterlagen und offenen Fragen strukturiert." },
          { title: "Marktvergleich", text: "Wenn sinnvoll, vergleichen wir Alternativen nach Preis, Leistung, Bedingungen und langfristiger Wirkung." },
          { title: "Verhandlung", text: "Auf Wunsch führen wir Gespräche mit Versicherungen, Banken, Vorsorgeeinrichtungen oder weiteren Partnern." },
          { title: "Umsetzung", text: "Sie entscheiden. Wir begleiten Anpassungen, Wechsel, Kündigungen und die weitere Betreuung." },
        ],
      },
      {
        eyebrow: "Worum es geht",
        title: "Nicht mehr Unterlagen sammeln. Klarheit gewinnen.",
        paragraphs: [
          "Viele Menschen und Unternehmen haben über Jahre Verträge abgeschlossen, angepasst oder erweitert. Oft fehlt irgendwann der Überblick.",
          "Der 360°-Check macht genau diese Punkte sichtbar. Kurz gesagt: Sie erfahren, was bleiben kann, was verbessert werden sollte und welche Schritte Priorität haben.",
        ],
        items: [
          "Was ist noch sinnvoll?",
          "Was ist doppelt?",
          "Was ist zu teuer?",
          "Was fehlt?",
          "Wo lohnt sich eine Neuverhandlung?",
        ],
      },
      {
        eyebrow: "Was wir übernehmen",
        title: "Wir vertreten Ihre Interessen gegenüber Anbietern.",
        paragraphs: [
          "Veonis prüft bestehende Lösungen, holt bei Bedarf Alternativen ein und vergleicht nicht nur Preise, sondern auch Leistungen, Bedingungen und langfristige Wirkung.",
          "Auf Wunsch übernehmen wir auch die Verhandlungen mit Versicherungen, Vorsorgeeinrichtungen, Banken oder weiteren Partnern.",
          "Dabei geht es nicht darum, irgendein Angebot zu präsentieren. Es geht darum, für Ihre Situation die bessere Lösung zu finden.",
        ],
        items: [
          "Leistung statt nur Prämie",
          "Deckung statt nur Rabatt",
          "Flexibilität statt kurzfristiger Vorteil",
          "Verständlichkeit statt Fachsprache",
          "Langfristige Passung statt schneller Abschluss",
        ],
      },
      {
        eyebrow: "Ablauf",
        title: "Fünf Schritte. Ein klares Ergebnis.",
        steps: [
          { title: "01 Ausgangslage", text: "Wir klären Ihre Situation, Ihre Ziele und die wichtigsten offenen Fragen. Danach wissen wir, welche Themen wirklich geprüft werden müssen." },
          { title: "02 Unterlagen-Check", text: "Wir prüfen bestehende Verträge, Policen, Vorsorgeausweise, Hypotheken, Anlage- oder Finanzunterlagen - je nachdem, was für Sie relevant ist." },
          { title: "03 Bewertung", text: "Wir zeigen, wo Lücken, Doppelspurigkeiten, unnötige Kosten oder ungünstige Bedingungen bestehen." },
          { title: "04 Vergleich & Verhandlung", text: "Wenn Optimierungspotenzial besteht, holen wir Alternativen ein, vergleichen Angebote und führen auf Wunsch die Gespräche mit den Anbietern." },
          { title: "05 Empfehlung & Umsetzung", text: "Sie erhalten eine klare Empfehlung mit Prioritäten. Wenn Sie möchten, begleiten wir Kündigungen, Anpassungen, Wechsel und die weitere Betreuung." },
        ],
      },
      {
        eyebrow: "Ergebnis",
        title: "Keine Produktmappe. Eine Entscheidungsgrundlage.",
        paragraphs: [
          "Nach dem 360°-Check wissen Sie, welche Themen geregelt sind und wo Handlungsbedarf besteht.",
        ],
        items: [
          "Eine klare Übersicht Ihrer bestehenden Lösungen",
          "Eine Einschätzung zu Lücken, Risiken und Doppelspurigkeiten",
          "Hinweise auf unnötige Kosten oder ungünstige Bedingungen",
          "Vergleichbare Alternativen, falls sinnvoll",
          "Eine Empfehlung mit Prioritäten",
          "Unterstützung bei Verhandlungen und Umsetzung",
          "Einen Ansprechpartner für die weitere Betreuung",
        ],
      },
      {
        eyebrow: "Für wen",
        title: "Für alle, die nicht nur ein Angebot wollen, sondern eine klare Einordnung.",
        intro: "Der 360°-Check eignet sich besonders, wenn:",
        items: [
          "Sie mehrere Verträge haben und den Überblick verloren haben.",
          "Sie wissen möchten, ob Ihre heutigen Lösungen noch passen.",
          "Sie vor einer grösseren Entscheidung stehen.",
          "Sie bessere Konditionen oder Leistungen prüfen möchten.",
          "Sie als Unternehmer private und geschäftliche Themen trennen müssen.",
          "Sie nicht selbst mit mehreren Anbietern verhandeln möchten.",
        ],
      },
      {
        eyebrow: "Unser Anspruch",
        title: "Wir machen Empfehlungen nachvollziehbar.",
        paragraphs: [
          "Eine gute Entscheidung braucht keine komplizierte Erklärung. Sie braucht eine saubere Analyse, faire Vergleiche und transparente Empfehlungen.",
          "Deshalb zeigen wir Ihnen nicht nur, was wir empfehlen, sondern auch warum.",
          "Sie sollen am Ende nicht einfach unterschreiben. Sie sollen verstehen.",
        ],
      },
    ],
  },

  "about-veonis": {
    seoTitle: "Über Veonis | Persönliche Finanz- und Versicherungsberatung",
    metaDescription:
      "Veonis steht für persönliche, verständliche und langfristige Finanzberatung. Wir schaffen Klarheit, vergleichen Lösungen und begleiten Privat- und Firmenkunden bei wichtigen Entscheidungen.",
    eyebrow: "Über Veonis",
    title: "Beratung beginnt mit Vertrauen.",
    description: [
      "Finanzielle Entscheidungen sind persönlich. Es geht um Sicherheit, Familie, Verantwortung, Zukunft und manchmal auch um Unsicherheit.",
      "Veonis existiert, um Finanzberatung verständlicher, persönlicher und verbindlicher zu machen. Wir möchten, dass Kunden nicht einfach eine Lösung erhalten, sondern verstehen, warum sie zu ihrer Situation passt.",
    ],
    cta: "Veonis kennenlernen",
    sections: [
      {
        eyebrow: "Was Veonis ausmacht",
        title: "Persönlich, verständlich, verbindlich und langfristig.",
        cards: [
          { title: "Persönlich", text: "Sie sprechen mit Menschen, die Ihre Situation verstehen und erreichbar bleiben." },
          { title: "Verständlich", text: "Wir erklären Finanz- und Versicherungsthemen klar, ohne unnötige Fachsprache." },
          { title: "Verbindlich", text: "Empfehlungen werden nachvollziehbar begründet und sauber dokumentiert." },
          { title: "Langfristig", text: "Wir denken über den Abschluss hinaus und begleiten Veränderungen mit." },
        ],
      },
      {
        eyebrow: "Warum es Veonis gibt",
        title: "Weil viele Menschen Lösungen haben, aber keinen Überblick.",
        paragraphs: [
          "Viele Versicherungen, Vorsorgelösungen, Finanzentscheidungen und Verträge entstehen über Jahre hinweg. Oft bei verschiedenen Anbietern, zu verschiedenen Zeitpunkten und aus unterschiedlichen Gründen.",
          "Was dabei häufig fehlt, ist jemand, der die Situation als Ganzes einordnet, ehrlich priorisiert und verständlich erklärt, was wirklich wichtig ist.",
          "Genau dafür gibt es Veonis.",
          "Wir hören zu, schaffen Struktur und begleiten Entscheidungen mit klarem Blick auf das Interesse unserer Kunden.",
        ],
      },
      {
        eyebrow: "Unsere Haltung",
        title: "Wir beraten nicht für den schnellen Abschluss, sondern für die bessere Entscheidung.",
        paragraphs: [
          "Gute Beratung bedeutet für uns nicht, möglichst schnell ein Produkt zu platzieren. Gute Beratung bedeutet, die Ausgangslage zu verstehen, Optionen sauber zu vergleichen und Empfehlungen nachvollziehbar zu machen.",
          "Wir möchten, dass unsere Kunden am Ende sagen können:",
        ],
        items: [
          "Ich weiss, wo ich stehe.",
          "Ich verstehe meine Möglichkeiten.",
          "Ich kenne die nächsten sinnvollen Schritte.",
          "Ich habe einen Ansprechpartner, der meine Situation kennt.",
        ],
      },
      {
        eyebrow: "Wie wir arbeiten",
        title: "Klar, strukturiert und im Interesse unserer Kunden.",
        steps: [
          { title: "01 Zuhören", text: "Bevor wir etwas empfehlen, wollen wir verstehen, worum es wirklich geht: Ziele, Verpflichtungen, bestehende Lösungen, offene Fragen und persönliche Prioritäten." },
          { title: "02 Einordnen", text: "Wir übersetzen komplexe Themen in eine verständliche Übersicht. Nicht mit unnötiger Fachsprache, sondern so, dass Entscheidungen nachvollziehbar werden." },
          { title: "03 Vergleichen", text: "Wenn Alternativen sinnvoll sind, prüfen wir nicht nur den Preis. Wir achten auf Leistungen, Bedingungen, Flexibilität, Risiken und langfristige Wirkung." },
          { title: "04 Verhandeln", text: "Auf Wunsch führen wir Gespräche mit Versicherungen, Banken, Vorsorgeeinrichtungen oder weiteren Partnern. Unser Ziel ist, bessere Grundlagen für Ihre Entscheidung zu schaffen." },
          { title: "05 Begleiten", text: "Finanzielle Themen ändern sich mit dem Leben. Deshalb endet unsere Arbeit nicht mit einer Unterschrift. Wir bleiben Ansprechpartner, wenn sich Ihre Situation verändert." },
        ],
      },
      {
        eyebrow: "Was uns wichtig ist",
        title: "Beratung muss verständlich, transparent und menschlich bleiben.",
        cards: [
          { title: "Klarheit", text: "Wir reduzieren Komplexität, ohne wichtige Details zu übergehen." },
          { title: "Verantwortung", text: "Wir empfehlen nur, was zur Situation, zum Ziel und zum Bedarf passt." },
          { title: "Transparenz", text: "Wir erklären, wie eine Empfehlung zustande kommt und welche Alternativen bestehen." },
          { title: "Nähe", text: "Unsere Kunden sollen wissen, wer sie begleitet und an wen sie sich wenden können." },
          { title: "Langfristigkeit", text: "Wir denken nicht nur an den Abschluss, sondern an die Entwicklung danach." },
        ],
      },
      {
        eyebrow: "Die Menschen hinter Veonis",
        title: "Persönliche Beratung braucht persönliche Ansprechpartner.",
        paragraphs: [
          "Veonis wird von Menschen geführt, die Finanz- und Versicherungsthemen nicht abstrakt betrachten, sondern aus der Beratungspraxis kennen.",
          "Unser Anspruch ist, Kunden auf Augenhöhe zu begleiten: direkt, erreichbar und verständlich. Wir möchten nicht nur Verträge vermitteln, sondern Beziehungen aufbauen, die langfristig tragen.",
        ],
      },
      {
        eyebrow: "Unser Anspruch",
        title: "Sie sollen nicht einfach unterschreiben. Sie sollen verstehen.",
        paragraphs: [
          "Vertrauen entsteht nicht durch grosse Worte, sondern durch saubere Arbeit: zuhören, prüfen, erklären, vergleichen und begleiten.",
          "Wenn Sie mit Veonis arbeiten, sollen Sie wissen, welche Entscheidung Sie treffen, warum sie sinnvoll ist und welche Auswirkungen sie langfristig haben kann.",
        ],
      },
    ],
  },
  career: {
    seoTitle: "Karriere bei Veonis | Finanzberatung Schweiz",
    metaDescription:
      "Werden Sie Teil von Veonis und bauen Sie mit uns eine moderne, persönliche und verständliche Finanzberatung in der Schweiz auf.",
    eyebrow: "Karriere",
    title: "Karriere bei Veonis",
    description: [
      "Sie möchten Menschen beraten, Verantwortung übernehmen und Teil eines Unternehmens werden, das Finanzberatung persönlicher, verständlicher und moderner macht?",
      "Dann könnte Veonis zu Ihnen passen.",
    ],
    cta: "Jetzt bewerben",
    sections: [
      {
        title: "Was uns wichtig ist",
        paragraphs: [
          "Wir suchen Menschen, die nicht nur verkaufen wollen, sondern Kunden wirklich begleiten möchten.",
          "Beratung bedeutet für uns: zuhören, verstehen, erklären und langfristig Verantwortung übernehmen.",
        ],
      },
      {
        title: "Was Sie erwartet",
        items: [
          "Klare Strukturen",
          "Persönliche Entwicklung",
          "Praxisnahe Ausbildung",
          "Unterstützung durch erfahrene Berater",
          "Moderne Arbeitsweise",
          "Ein Unternehmen im Aufbau mit Mitgestaltungsmöglichkeiten",
        ],
      },
      {
        title: "Profile",
        items: [
          "Finanzberaterinnen und Finanzberater",
          "Versicherungsberaterinnen und Versicherungsberater",
          "Quereinsteiger mit Verkaufstalent",
          "Menschen mit hoher Eigenmotivation",
          "Persönlichkeiten, die langfristig wachsen möchten",
        ],
      },
    ],
  },
  contact: {
    seoTitle: "Kontakt | Veonis",
    metaDescription:
      "Kontaktieren Sie Veonis für ein kostenloses Erstgespräch zu Versicherungen, Vorsorge, Hypotheken, Steuern und Anlagen.",
    eyebrow: "Kontakt",
    title: "Kontakt aufnehmen",
    description: [
      "Sie möchten Ihre Finanzen prüfen lassen oder haben Fragen zu Versicherungen, Vorsorge, Hypotheken, Steuern, Anlagen oder Firmenkundenlösungen?",
      "Dann melden Sie sich bei uns.",
    ],
    cta: "Anfrage senden",
    sections: [
      {
        title: "Kostenloses Erstgespräch vereinbaren",
        paragraphs: [
          "In einem ersten Gespräch nehmen wir uns Zeit für Ihre Fragen, Ihre Situation und Ihre Ziele. Unverbindlich, persönlich und verständlich.",
        ],
      },
    ],
  },
  faq: {
    seoTitle: "Häufige Fragen | Veonis",
    metaDescription:
      "Antworten auf häufige Fragen zu Veonis, Finanzberatung, Versicherungen, Vorsorge, Hypotheken, Steuern und Anlagen.",
    eyebrow: "FAQ",
    title: "Häufige Fragen",
    description: ["Antworten auf häufige Fragen zu Veonis, Beratung, Analyse und Zusammenarbeit."],
    sections: [{ title: "Antworten", cards: faqItems }],
  },
  "legal/impressum": {
    seoTitle: "Impressum | Veonis",
    metaDescription: "Impressum und Anbieterkennzeichnung von Veonis.",
    eyebrow: "Legal",
    title: "Impressum",
    description: ["Anbieterkennzeichnung und rechtliche Angaben von Veonis."],
    sections: [
      {
        title: "Angaben zum Unternehmen",
        items: [
          "Firma: Veonis GmbH",
          "Firmensitz: Regensdorf",
          "UID: CHE-421.273.988",
          "E-Mail: info@veonissuisse.ch",
          "Telefon: +41 79 812 81 88",
        ],
      },
      {
        title: "Hinweis",
        paragraphs: [brand.disclaimer],
      },
    ],
  },
  "legal/datenschutz": {
    seoTitle: "Datenschutz | Veonis",
    metaDescription: "Datenschutzerklärung von Veonis.",
    eyebrow: "Legal",
    title: "Datenschutz",
    description: ["Datenschutzinformationen zur Bearbeitung personenbezogener Daten durch Veonis."],
    sections: [
      {
        title: "Datenschutzinformationen",
        items: [
          "Verantwortliche Stelle: [einfügen]",
          "Zwecke der Datenbearbeitung: Kontaktaufnahme, Beratungsvorbereitung, gesetzliche Pflichten",
          "Rechtsgrundlagen und Aufbewahrungsfristen: [einfügen]",
          "Empfänger und Dienstleister: [einfügen]",
          "Betroffenenrechte und Kontakt: [einfügen]",
        ],
      },
      {
        title: "Hinweis",
        paragraphs: [brand.disclaimer],
      },
    ],
  },
  "legal/informationen-gemaess-art-45-vag": {
    seoTitle: "Informationen gemäss Art. 45 VAG | Veonis",
    metaDescription: "Transparenzinformationen für Versicherungsvermittlung gemäss Art. 45 VAG.",
    eyebrow: "Legal",
    title: "Informationen gemäss Art. 45 VAG",
    description: ["Veonis legt relevante Informationen zu Vermittlerstatus, Registrierung, Partnern und Entschädigungsmodell transparent offen."],
    sections: [
      {
        title: "Offenlegungsinformationen",
        items: [
          "Name und Adresse des Brokers / Unternehmens: [einfügen]",
          "Registrierungsstatus: [einfügen]",
          "FINMA-Registrierungsnummer / Vermittlerregister: [einfügen]",
          "Gebunden oder ungebunden: [einfügen]",
          "Partner-Versicherungsgesellschaften: [einfügen]",
          "Entschädigungsmodell: [einfügen]",
          "Datenschutzinformationen: [einfügen]",
          "Beschwerde- / Ombudsstelle, sofern anwendbar: [einfügen]",
          "Verantwortliche Kontaktperson: [einfügen]",
        ],
      },
      {
        title: "Allgemeiner Hinweis",
        paragraphs: [brand.disclaimer],
      },
    ],
  },
  "legal/imprint": {} as PageContent,
  "legal/privacy": {} as PageContent,
  "legal/information-according-to-art-45-isa": {} as PageContent,
};

const englishBase: Record<PageKey, PageContent> = {
  ...dePages,
  home: {
    ...home,
    seoTitle: "Veonis - Financial advice, insurance and pension planning in Switzerland",
    metaDescription:
      "Veonis supports private and corporate clients in Switzerland with insurance, pension planning, mortgages, taxes, investments and financial planning.",
    eyebrow: "Veonis Switzerland",
    title: "One contact for insurance, pension planning and finances.",
    description: [
      "Insurance, pension planning, taxes, mortgages and investments are connected. One decision can affect your entire financial picture.",
      "Veonis helps you keep the overview with clear analysis, understandable recommendations and personal guidance.",
    ],
  },
  "home-v2": {
    ...homeV2,
    seoTitle: "Veonis | Insurance, pension planning and finances",
    metaDescription:
      "Veonis brings structure to insurance, pension planning, mortgages, taxes, investments and financial planning in Switzerland.",
    eyebrow: "Veonis Switzerland",
    title: "One contact for insurance, pension planning and finances.",
    description: [
      "Veonis brings structure to your financial situation. We review insurance, pension planning, mortgages, taxes and investments in context - so you clearly see what fits, where gaps exist and which next steps make sense.",
    ],
  },
  "home-v3": {
    ...homeV3,
    seoTitle: "Veonis Homepage Version 3 | Financial advice Switzerland",
    metaDescription:
      "Veonis brings structure to insurance, pension planning, mortgages, taxes, investments and financial planning in Switzerland.",
    eyebrow: "Veonis Switzerland",
    title: "One contact for insurance, pension planning and finances.",
    description: [
      "Veonis brings structure to your financial situation. We review insurance, pension planning, mortgages, taxes and investments in context - so you clearly see what fits, where gaps exist and which next steps make sense.",
    ],
  },
  blog: {
    seoTitle: "Blog | Veonis financial insights",
    metaDescription:
      "Thoughtful Swiss finance and advisory insights from Veonis about insurance, pension planning, mortgages, taxes and holistic financial decisions.",
    eyebrow: "Blog",
    title: "Financial insights for better decisions.",
    description: [
      "Short, understandable articles about Swiss financial questions: pension planning, insurance, mortgages, taxes, self-employment and life phases.",
      "The content does not replace individual advice, but helps you ask the right questions earlier.",
    ],
    sections: [],
  },
  "private-clients": {
    ...dePages["private-clients"],
    seoTitle: "Financial advice for private clients in Switzerland | Veonis",
    metaDescription:
      "Veonis supports private clients with protection, pension planning, home ownership, taxes, wealth building and retirement. Personal, understandable and focused on your life situation.",
    eyebrow: "Private clients",
    title: "Financial advice for the moments when good decisions matter.",
    description: [
      "Finances change with life. A new job, a family, home ownership, self-employment or preparing for retirement bring questions that should not be answered in isolation.",
      "Veonis helps you classify your situation clearly, recognize risks and make decisions deliberately. Personal, understandable and with a view to what fits you long term.",
    ],
    cta: "Book a free initial conversation",
    sections: [
      {
        eyebrow: "What you can expect",
        title: "Personal advice with a clear view of your life situation.",
        cards: [
          { title: "Personal advice", text: "Your questions, goals and life phase are at the center." },
          { title: "Independent perspective", text: "Existing solutions are reviewed calmly and understandably." },
          { title: "Clear priorities", text: "You see which topics matter first and why." },
          { title: "Long-term guidance", text: "Veonis remains your point of contact when your situation changes." },
        ],
      },
      {
        eyebrow: "When does a conversation help?",
        title: "When your life changes, your financial structure should move with it.",
        paragraphs: [
          "Many contracts and solutions arise step by step. What made sense a few years ago may no longer fit your current life situation.",
          "A financial check is especially useful when you are facing an important decision or feel that your documents, policies and pension topics are no longer truly clear.",
        ],
        items: [
          "You are starting your career and want to build pension planning correctly.",
          "Your income is growing and you want to use taxes and pension planning sensibly.",
          "You are starting a family and want to protect responsibility properly.",
          "You are planning home ownership or want to review your mortgage.",
          "You are self-employed or want to separate private and business topics more clearly.",
          "You are approaching retirement and want to plan in good time.",
          "You have many existing contracts and finally want an overview.",
        ],
      },
      {
        eyebrow: "Your questions",
        title: "We begin where uncertainty exists for you.",
        paragraphs: [
          "For private clients, the issue is rarely just one policy or one financial product. Usually there is a larger question behind it.",
          "Veonis puts these questions into context with you. Not complicated, not sales-driven, but understandable and structured.",
        ],
        items: [
          "Am I and is my family really properly protected?",
          "Am I paying for benefits I do not need?",
          "What happens financially in the event of illness, accident or disability?",
          "Am I using my pension opportunities sensibly?",
          "How does home ownership affect my long-term planning?",
          "Can I build wealth without endangering liquidity?",
          "What should I clarify today so gaps do not appear later?",
        ],
      },
      {
        eyebrow: "Life situations",
        title: "Advice that fits your current phase.",
        cards: [
          { title: "Career & income", text: "Income creates new opportunities and responsibilities. We review whether protection, pension planning, savings goals and tax questions fit your current situation." },
          { title: "Family & responsibility", text: "When partners, children or shared obligations are added, we show whether income, risks, pension planning and existing solutions are aligned." },
          { title: "Home ownership & mortgage", text: "We review affordability, amortization, taxes, liquidity and protection in relation to your overall life planning." },
          { title: "Self-employment", text: "We help separate private and business topics clearly and identify the most important risks early." },
          { title: "Wealth & future", text: "Wealth building starts with clear goals: what you save for, how much risk fits you and how flexible you want to remain." },
          { title: "Retirement", text: "Capital or pension, pension fund, taxes, mortgage, income and estate topics should become visible early enough." },
        ],
      },
      {
        eyebrow: "What we review",
        title: "A clear look at what is relevant for you.",
        intro: "Depending on the situation, we review topics such as:",
        items: [
          "Existing insurance policies and possible overlaps",
          "Protection in case of illness, accident, disability and death",
          "Pillar 3a, pension fund and pension potential",
          "Tax options connected to pension planning and home ownership",
          "Mortgage, affordability, amortization and financing room",
          "Investments, savings goals, risk and liquidity",
          "Private and business financial structure for self-employment",
          "Priorities for the coming months and years",
        ],
        paragraphs: [
          "You do not receive an unclear product list, but an understandable assessment with clear next steps.",
        ],
      },
      {
        eyebrow: "Outcome",
        title: "More overview. Better decisions. Less uncertainty.",
        paragraphs: [
          "After the analysis, you know where you stand and which topics truly matter.",
          "Our goal is that you understand your decisions and can make them with a good feeling.",
        ],
        items: [
          "An understandable overview of your current situation",
          "An assessment of gaps, risks and unnecessary overlaps",
          "Clear priorities instead of isolated product proposals",
          "Concrete recommendations for the next steps",
          "Guidance with comparisons, offers and adjustments",
          "One personal point of contact for your further questions",
        ],
      },
      {
        eyebrow: "Collaboration",
        title: "Simple, personal and transparent.",
        steps: [
          { title: "01 Initial conversation", text: "We get to know your situation and clarify which questions are currently most important. The conversation is non-binding and provides an initial classification." },
          { title: "02 Analysis", text: "We review the relevant documents and look at your situation structurally. Gaps, overlaps, risks and possible optimizations become visible." },
          { title: "03 Recommendation", text: "You receive a clear assessment with priorities and understandable recommendations. We explain why a step makes sense and which alternatives exist." },
          { title: "04 Implementation", text: "If you wish, we accompany you through comparisons, offers, adjustments and further decisions. We remain your point of contact afterwards too." },
        ],
      },
      {
        eyebrow: "Why Veonis",
        title: "Because good advice does not end with completion.",
        paragraphs: [
          "Financial decisions accompany you for many years. That is why you need more than a one-time recommendation: you need someone who understands your situation and thinks along with developments.",
          "Veonis stands for personal advice, clear structure and long-term guidance. We want you not just to accept a solution, but to understand why it fits you.",
        ],
      },
    ],
  },

  "corporate-clients": {
    ...dePages["corporate-clients"],
    seoTitle: "Financial and insurance advice for corporate clients | Veonis",
    metaDescription:
      "Veonis supports companies, self-employed people and employers with commercial insurance, occupational pensions and financial structuring.",
    eyebrow: "Corporate clients",
    title: "Financial advice for corporate clients",
    description: [
      "Entrepreneurs carry responsibility for their company, their employees and their own financial future.",
      "Veonis helps structure business and private financial topics clearly, compare solutions and build suitable protection.",
    ],
  },
  services: {
    ...dePages.services,
    seoTitle: "Services | Pension planning, insurance, investments, mortgages and taxes | Veonis",
    metaDescription:
      "Veonis supports private clients, self-employed people and companies in pension planning and insurance, finances and investments, mortgages and real estate, and taxes and legal coordination.",
    eyebrow: "Services",
    title: "Four areas. One clear view of your financial situation.",
    description: [
      "Financial decisions rarely happen in isolation. Pension planning affects taxes. Real estate changes liquidity. Investments need clear goals. Insurance should protect risks - not create unnecessary costs.",
      "Veonis puts these topics into understandable context and shows where action is needed.",
    ],
    cta: "Book a free initial conversation",
    sections: [
      {
        eyebrow: "What you can expect",
        title: "Clear analysis, independent perspective and personal guidance.",
        cards: [
          { title: "Clear analysis", text: "We review your starting point in a structured and understandable way." },
          { title: "Independent perspective", text: "Existing solutions and possible alternatives are assessed fairly." },
          { title: "Understandable recommendations", text: "You receive clear priorities instead of complicated technical language." },
          { title: "Personal guidance", text: "Veonis remains your point of contact for comparisons, offers and adjustments." },
        ],
      },
      {
        eyebrow: "Our services",
        title: "Briefly explained. Clearly classified.",
        cards: [
          {
            title: "Pension planning & insurance",
            text: "Protection should fit your life situation, not a standard form. We review existing insurance, identify gaps, overlaps and unnecessary costs. At the same time, we look at pillar 3a, pension fund, risk protection, family, income and retirement. Relevant for family, home ownership, self-employment, higher income, retirement planning or older contracts.",
          },
          {
            title: "Finances & investments",
            text: "Good financial planning does not start with a product, but with a goal. We clarify what you want to achieve, how much risk fits you and how flexible you want to remain. Based on that, we classify savings goals, liquidity, investment horizon and wealth building clearly. Relevant for free capital, long-term saving, wealth building, pension goals or financial reorganization.",
          },
          {
            title: "Mortgages & real estate",
            text: "With real estate, the interest rate is not the only factor. What matters is whether financing, affordability, amortization, taxes, pension planning and protection fit together. Veonis helps you assess real estate decisions in context and over the long term. Relevant for purchase, renewal, refinancing, equity planning, amortization or affordability checks.",
          },
          {
            title: "Taxes & legal coordination",
            text: "Many financial decisions have tax and legal effects. Pension planning, real estate, investments, self-employment and estate questions should be considered early. Veonis helps you identify relevant topics, classify questions correctly and involve the right specialists where needed. Relevant for pillar 3a, pension fund purchases, home ownership, self-employment, estate planning, contract questions or tax optimization.",
          },
        ],
      },
      {
        eyebrow: "The right entry point",
        title: "How can we support you?",
        cards: [
          {
            title: "Private clients",
            text: "For people who want to plan protection, pension planning, home ownership, wealth building or retirement more clearly.",
            ctaLabel: "Go to private clients",
            href: "/en/private-clients",
          },
          {
            title: "Corporate clients",
            text: "For self-employed people and SMEs that want to structure risks, employees, pension funds, daily sickness benefits, accident insurance and business insurance professionally.",
            ctaLabel: "Go to corporate clients",
            href: "/en/corporate-clients",
          },
          {
            title: "360° Check",
            text: "For everyone who first wants a complete overview before individual topics are decided.",
            ctaLabel: "View 360° Check",
            href: "/en/veonis-360-analysis",
          },
        ],
      },
      {
        eyebrow: "What you can expect from Veonis",
        title: "No product list. A clear basis for decision-making.",
        paragraphs: [
          "The result should not be more confusion, but clarity. You should know what matters, what can wait and which steps make sense.",
        ],
        items: [
          "A clear overview of your starting point",
          "An assessment of gaps, risks and overlaps",
          "Priorities instead of isolated individual proposals",
          "Understandable recommendations with next steps",
          "Guidance with comparisons, offers and adjustments",
        ],
      },
    ],
  },

  "veonis-360-analysis": {
    ...dePages["veonis-360-analysis"],
    seoTitle: "360° Check | Financial check, contract analysis and negotiation | Veonis",
    metaDescription:
      "The Veonis 360° Check reviews existing contracts, identifies gaps and overlaps, compares alternatives and supports negotiations with providers.",
    eyebrow: "360° Check",
    title: "See clearly. Decide better. Negotiate stronger.",
    description: [
      "The Veonis 360° Check shows where you stand financially, which contracts truly fit and where better solutions may be possible.",
      "We do not only review documents. We put them into context, compare alternatives and, if desired, hold conversations with providers for you.",
      "You keep the decision. We create the basis for it.",
    ],
    cta: "Book a free initial conversation",
    sections: [
      {
        eyebrow: "What you can expect",
        title: "Analysis, market comparison, negotiation and implementation from one source.",
        cards: [
          { title: "Analysis", text: "We review your situation, contracts, documents and open questions in a structured way." },
          { title: "Market comparison", text: "Where useful, we compare alternatives by price, benefits, conditions and long-term effect." },
          { title: "Negotiation", text: "If desired, we speak with insurers, banks, pension institutions or other partners for you." },
          { title: "Implementation", text: "You decide. We support adjustments, switches, cancellations and ongoing guidance." },
        ],
      },
      {
        eyebrow: "What it is about",
        title: "Not collecting more documents. Gaining clarity.",
        paragraphs: [
          "Many people and companies have signed, adjusted or expanded contracts over years. At some point, the overview is often missing.",
          "The 360° Check makes exactly these points visible. In short: you learn what can stay, what should be improved and which steps have priority.",
        ],
        items: [
          "What still makes sense?",
          "What is duplicated?",
          "What is too expensive?",
          "What is missing?",
          "Where is renegotiation worthwhile?",
        ],
      },
      {
        eyebrow: "What we take on",
        title: "We represent your interests with providers.",
        paragraphs: [
          "Veonis reviews existing solutions, obtains alternatives where needed and compares not only prices, but also benefits, conditions and long-term effects.",
          "If desired, we also take on negotiations with insurers, pension institutions, banks or other partners.",
          "This is not about presenting just any offer. It is about finding the better solution for your situation.",
        ],
        items: [
          "Benefits instead of only premiums",
          "Coverage instead of only discounts",
          "Flexibility instead of short-term advantage",
          "Understandability instead of technical language",
          "Long-term fit instead of a quick conclusion",
        ],
      },
      {
        eyebrow: "Process",
        title: "Five steps. One clear result.",
        steps: [
          { title: "01 Starting point", text: "We clarify your situation, your goals and the most important open questions. After that, we know which topics truly need to be reviewed." },
          { title: "02 Document check", text: "We review existing contracts, policies, pension statements, mortgages, investment or financial documents - depending on what is relevant for you." },
          { title: "03 Assessment", text: "We show where gaps, overlaps, unnecessary costs or unfavorable conditions exist." },
          { title: "04 Comparison & negotiation", text: "If there is optimization potential, we obtain alternatives, compare offers and, if desired, conduct the conversations with providers." },
          { title: "05 Recommendation & implementation", text: "You receive a clear recommendation with priorities. If you wish, we support cancellations, adjustments, switches and further guidance." },
        ],
      },
      {
        eyebrow: "Outcome",
        title: "No product folder. A basis for decision-making.",
        paragraphs: [
          "After the 360° Check, you know which topics are settled and where action is needed.",
        ],
        items: [
          "A clear overview of your existing solutions",
          "An assessment of gaps, risks and overlaps",
          "Notes on unnecessary costs or unfavorable conditions",
          "Comparable alternatives where useful",
          "A recommendation with priorities",
          "Support with negotiations and implementation",
          "One point of contact for ongoing guidance",
        ],
      },
      {
        eyebrow: "Who it is for",
        title: "For everyone who wants more than an offer: a clear assessment.",
        intro: "The 360° Check is especially useful if:",
        items: [
          "You have several contracts and have lost the overview.",
          "You want to know whether your current solutions still fit.",
          "You are facing a larger decision.",
          "You want to review better conditions or benefits.",
          "As an entrepreneur, you need to separate private and business topics.",
          "You do not want to negotiate with several providers yourself.",
        ],
      },
      {
        eyebrow: "Our standard",
        title: "We make recommendations understandable.",
        paragraphs: [
          "A good decision does not need a complicated explanation. It needs clean analysis, fair comparisons and transparent recommendations.",
          "That is why we show you not only what we recommend, but also why.",
          "In the end, you should not simply sign. You should understand.",
        ],
      },
    ],
  },

  "about-veonis": {
    ...dePages["about-veonis"],
    seoTitle: "About Veonis | Personal financial and insurance advice",
    metaDescription:
      "Veonis stands for personal, understandable and long-term financial advice. We create clarity, compare solutions and support private and corporate clients through important decisions.",
    eyebrow: "About Veonis",
    title: "Advice begins with trust.",
    description: [
      "Financial decisions are personal. They are about security, family, responsibility, the future and sometimes uncertainty too.",
      "Veonis exists to make financial advice more understandable, personal and reliable. We want clients not only to receive a solution, but to understand why it fits their situation.",
    ],
    cta: "Get to know Veonis",
    sections: [
      {
        eyebrow: "What defines Veonis",
        title: "Personal, understandable, reliable and long-term.",
        cards: [
          { title: "Personal", text: "You speak with people who understand your situation and remain reachable." },
          { title: "Understandable", text: "We explain finance and insurance topics clearly, without unnecessary technical language." },
          { title: "Reliable", text: "Recommendations are explained transparently and documented cleanly." },
          { title: "Long-term", text: "We think beyond the conclusion and support future changes." },
        ],
      },
      {
        eyebrow: "Why Veonis exists",
        title: "Because many people have solutions, but no overview.",
        paragraphs: [
          "Many insurance policies, pension solutions, financial decisions and contracts are created over years. Often with different providers, at different times and for different reasons.",
          "What is often missing is someone who views the situation as a whole, prioritizes honestly and explains clearly what really matters.",
          "That is why Veonis exists.",
          "We listen, create structure and support decisions with a clear view of our clients' interests.",
        ],
      },
      {
        eyebrow: "Our approach",
        title: "We do not advise for the quick conclusion, but for the better decision.",
        paragraphs: [
          "Good advice does not mean placing a product as quickly as possible. Good advice means understanding the starting point, comparing options carefully and making recommendations understandable.",
          "We want our clients to be able to say:",
        ],
        items: [
          "I know where I stand.",
          "I understand my options.",
          "I know the next sensible steps.",
          "I have a point of contact who knows my situation.",
        ],
      },
      {
        eyebrow: "How we work",
        title: "Clear, structured and in our clients' interests.",
        steps: [
          { title: "01 Listen", text: "Before recommending anything, we want to understand what truly matters: goals, obligations, existing solutions, open questions and personal priorities." },
          { title: "02 Classify", text: "We translate complex topics into an understandable overview. Not with unnecessary jargon, but in a way that makes decisions traceable." },
          { title: "03 Compare", text: "Where alternatives make sense, we do not only review price. We look at benefits, conditions, flexibility, risks and long-term impact." },
          { title: "04 Negotiate", text: "If desired, we hold conversations with insurers, banks, pension institutions or other partners. Our goal is to create better foundations for your decision." },
          { title: "05 Support", text: "Financial topics change with life. That is why our work does not end with a signature. We remain your point of contact when your situation changes." },
        ],
      },
      {
        eyebrow: "What matters to us",
        title: "Advice must remain understandable, transparent and human.",
        cards: [
          { title: "Clarity", text: "We reduce complexity without skipping important details." },
          { title: "Responsibility", text: "We recommend only what fits the situation, goal and need." },
          { title: "Transparency", text: "We explain how a recommendation is created and which alternatives exist." },
          { title: "Closeness", text: "Clients should know who supports them and whom they can contact." },
          { title: "Long-term thinking", text: "We think not only about the conclusion, but also about what comes afterwards." },
        ],
      },
      {
        eyebrow: "The people behind Veonis",
        title: "Personal advice needs personal points of contact.",
        paragraphs: [
          "Veonis is led by people who do not view finance and insurance topics abstractly, but know them from advisory practice.",
          "Our aim is to support clients at eye level: direct, reachable and understandable. We do not only want to arrange contracts, but to build relationships that last.",
        ],
      },
      {
        eyebrow: "Our standard",
        title: "You should not simply sign. You should understand.",
        paragraphs: [
          "Trust does not come from big words, but from careful work: listening, reviewing, explaining, comparing and supporting.",
          "When you work with Veonis, you should know which decision you are making, why it makes sense and what long-term effects it may have.",
        ],
      },
    ],
  },
  career: {
    ...dePages.career,
    seoTitle: "Careers at Veonis | Financial advice Switzerland",
    metaDescription: "Join Veonis and help build modern, personal and understandable financial advice in Switzerland.",
    eyebrow: "Career",
    title: "Careers at Veonis",
    description: [
      "Would you like to advise people, take responsibility and help make financial advice more personal and understandable?",
      "Then Veonis could be the right place for you.",
    ],
  },
  contact: {
    ...dePages.contact,
    seoTitle: "Contact | Veonis",
    metaDescription:
      "Contact Veonis for a free initial consultation about insurance, pension planning, mortgages, taxes and investments.",
    eyebrow: "Contact",
    title: "Get in touch",
    description: [
      "Would you like to review your finances or ask questions about insurance, pension planning, mortgages, taxes, investments or corporate solutions?",
      "Send us a message and we will get back to you.",
    ],
  },
  faq: {
    ...dePages.faq,
    seoTitle: "Frequently asked questions | Veonis",
    metaDescription:
      "Answers to common questions about Veonis, financial advice, insurance, pension planning, mortgages, taxes and investments.",
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    description: ["Answers to common questions about Veonis, advice, analysis and collaboration."],
  },
  "legal/imprint": {
    seoTitle: "Imprint | Veonis",
    metaDescription: "Imprint and provider information for Veonis.",
    eyebrow: "Legal",
    title: "Imprint",
    description: ["Provider information and legal details for Veonis."],
    sections: [
      {
        title: "Company information",
        items: [
          "Company: Veonis GmbH",
          "Registered office: Regensdorf",
          "UID: CHE-421.273.988",
          "Email: info@veonissuisse.ch",
          "Telephone: +41 79 812 81 88",
        ],
      },
      {
        title: "Notice",
        paragraphs: [legalDisclaimer.en],
      },
    ],
  },
  "legal/privacy": {
    seoTitle: "Privacy | Veonis",
    metaDescription: "Privacy information for Veonis.",
    eyebrow: "Legal",
    title: "Privacy",
    description: ["Privacy information for the processing of personal data by Veonis."],
    sections: [
      {
        title: "Privacy information",
        items: [
          "Controller: [to be inserted]",
          "Purposes of data processing: contact handling, preparation of advice, legal obligations",
          "Legal bases and retention periods: [to be inserted]",
          "Recipients and service providers: [to be inserted]",
          "Data subject rights and contact: [to be inserted]",
        ],
      },
      {
        title: "Notice",
        paragraphs: [legalDisclaimer.en],
      },
    ],
  },
  "legal/information-according-to-art-45-isa": {
    seoTitle: "Information according to Art. 45 ISA | Veonis",
    metaDescription: "Transparency information for insurance intermediation according to Art. 45 ISA.",
    eyebrow: "Legal",
    title: "Information according to Art. 45 ISA",
    description: ["Veonis transparently discloses relevant information about intermediary status, registration, partners and compensation model."],
    sections: [
      {
        title: "Disclosure information",
        items: [
          "Name and address of the broker / company: [to be inserted]",
          "Registration status: [to be inserted]",
          "FINMA registration number / intermediary register: [to be inserted]",
          "Tied or untied intermediary status: [to be inserted]",
          "Partner insurance companies: [to be inserted]",
          "Compensation model: [to be inserted]",
          "Privacy information: [to be inserted]",
          "Complaints / ombuds office, where applicable: [to be inserted]",
          "Responsible contact person: [to be inserted]",
        ],
      },
      {
        title: "General notice",
        paragraphs: [legalDisclaimer.en],
      },
    ],
  },
  "legal/impressum": dePages["legal/impressum"],
  "legal/datenschutz": dePages["legal/datenschutz"],
  "legal/informationen-gemaess-art-45-vag": dePages["legal/informationen-gemaess-art-45-vag"],
};

export const pages: Record<Locale, Record<PageKey, PageContent>> = {
  de: dePages,
  en: englishBase,
};

export function getPage(locale: Locale, key: PageKey) {
  return pages[locale][key];
}

export function getLocalizedPath(locale: Locale, key: PageKey) {
  if (key === "home") {
    return localizedHomeHref[locale];
  }

  if (locale === "de") {
    if (key === "private-clients") {
      return "/de/privatkunden";
    }

    if (key === "veonis-360-analysis") {
      return "/de/360-check";
    }

    if (key === "services") {
      return "/de/dienstleistungen";
    }

    if (key === "about-veonis") {
      return "/de/ueber-veonis";
    }

    return `/de/${key}`;
  }

  const englishLegalMap: Partial<Record<PageKey, string>> = {
    "legal/impressum": "legal/imprint",
    "legal/datenschutz": "legal/privacy",
    "legal/informationen-gemaess-art-45-vag": "legal/information-according-to-art-45-isa",
  };

  return `/en/${englishLegalMap[key] ?? key}`;
}
