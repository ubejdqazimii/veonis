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
  email: "info@veonis.ch",
  phone: "+41 XX XXX XX XX",
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
  { label: "Services", de: "/de/services", en: "/en/services" },
  {
    label: "Veonis 360° Analysis",
    labelDe: "Veonis 360° Analyse",
    labelEn: "Veonis 360° Analysis",
    de: "/de/veonis-360-analysis",
    en: "/en/veonis-360-analysis",
  },
  { label: "About Veonis", labelDe: "Über Veonis", labelEn: "About Veonis", de: "/de/about-veonis", en: "/en/about-veonis" },
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
    title: "Was ist die Veonis 360° Analyse?",
    text: "Die Veonis 360° Analyse ist ein ganzheitlicher Finanzcheck. Wir prüfen Versicherungen, Vorsorge, Hypotheken, Steuern, Anlagen und weitere relevante Themen im Zusammenhang.",
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
    category: { de: "360° Analyse", en: "360° analysis" },
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
  secondaryCta: "360° Analyse anfragen",
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
      title: "Die Veonis 360° Analyse",
      intro:
        "Die Veonis 360° Analyse ist der Ausgangspunkt unserer Beratung. Sie zeigt, wo Sie heute stehen, welche Themen bereits gut geregelt sind und wo Optimierungspotenzial besteht.",
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
      cta: "360° Analyse anfragen",
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
        title: "Für wen",
        items: [
          "KMU",
          "Start-ups",
          "Selbstständige",
          "Handwerksbetriebe",
          "Dienstleistungsunternehmen",
          "Beratungsunternehmen",
          "Unternehmen mit Mitarbeitenden",
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
    seoTitle: "Services | Finanzberatung, Versicherungen & Vorsorge | Veonis",
    metaDescription:
      "Die Services von Veonis umfassen Versicherungen, Vorsorge, Hypotheken, Immobilien, Steuern, Finanzplanung, Anlagen und Firmenberatung.",
    eyebrow: "Services",
    title: "Unsere Services",
    description: [
      "Finanzielle Entscheidungen sollten nicht isoliert getroffen werden. Versicherungen, Vorsorge, Steuern, Hypotheken und Anlagen beeinflussen sich gegenseitig.",
      "Deshalb betrachtet Veonis Ihre Situation ganzheitlich. Wir zeigen Ihnen, wie die einzelnen Themen zusammenhängen und welche Lösungen sinnvoll sein können.",
    ],
    cta: "Beratung starten",
    sections: [
      {
        title: "Services im Überblick",
        intro: "Versicherungen, Vorsorge und Finanzen aus einer Hand.",
        cards: services.map(({ title, text }) => ({ title, text })),
      },
    ],
  },
  "veonis-360-analysis": {
    seoTitle: "Veonis 360° Analyse | Finanzcheck Schweiz",
    metaDescription:
      "Mit der Veonis 360° Analyse erhalten Sie einen klaren Überblick über Versicherungen, Vorsorge, Hypotheken, Steuern, Anlagen und Ihre finanzielle Gesamtsituation.",
    eyebrow: "Veonis 360° Analyse",
    title: "Die Veonis 360° Analyse",
    subtitle: "Ein Finanzcheck, der alles miteinander verbindet.",
    description: [
      "Viele finanzielle Entscheidungen entstehen einzeln. Doch im Alltag greifen sie ineinander.",
      "Eine Vorsorgelösung kann Ihre Steuern beeinflussen. Eine Hypothek kann Ihre monatliche Belastung verändern. Eine Versicherung kann vor Risiken schützen, aber auch unnötige Kosten verursachen.",
      "Die Veonis 360° Analyse bringt diese Themen zusammen.",
    ],
    cta: "360° Analyse anfragen",
    sections: [
      {
        title: "Was wir analysieren",
        items: [
          "Versicherungen",
          "Vorsorge und Säule 3a",
          "Hypotheken und Immobilien",
          "Steuern und Sparmöglichkeiten",
          "Anlagen und Vermögensaufbau",
          "Absicherung bei Krankheit, Unfall und Erwerbsunfähigkeit",
          "Liquidität und monatliche Belastung",
          "Private und geschäftliche Finanzstruktur",
          "Persönliche Ziele und Prioritäten",
        ],
      },
      {
        title: "Was Sie erhalten",
        items: [
          "Eine verständliche Übersicht Ihrer aktuellen Situation",
          "Eine Einschätzung zu bestehenden Lösungen",
          "Hinweise auf mögliche Lücken oder Doppelspurigkeiten",
          "Konkrete Empfehlungen für nächste Schritte",
          "Vergleich möglicher Lösungen",
          "Persönliche Begleitung bei der Umsetzung",
        ],
      },
      {
        title: "Für wen",
        paragraphs: [
          "Für Privatpersonen, Familien, Selbstständige und Unternehmer, die ihre Finanzen nicht nur punktuell, sondern als Ganzes verstehen möchten.",
          "Die Analyse eignet sich besonders, wenn Sie mehrere Verträge haben, eine Immobilie planen, Ihre Vorsorge prüfen möchten, selbstständig sind oder einfach mehr Klarheit wünschen.",
        ],
      },
    ],
  },
  "about-veonis": {
    seoTitle: "Über Veonis | Finanzberatung mit persönlicher Betreuung",
    metaDescription:
      "Veonis steht für persönliche, verständliche und ganzheitliche Finanzberatung in der Schweiz.",
    eyebrow: "Über Veonis",
    title: "Über Veonis",
    description: [
      "Veonis steht für klare Finanzberatung, persönliche Betreuung und Lösungen, die zum Leben unserer Kunden passen.",
      "Wir begleiten Privatpersonen, Familien, Selbstständige und Unternehmen bei wichtigen Finanzentscheidungen.",
    ],
    cta: "Veonis kennenlernen",
    sections: [
      {
        title: "Unsere Idee",
        paragraphs: [
          "Finanzberatung sollte verständlich, ehrlich und ganzheitlich sein.",
          "Viele Menschen haben für jedes Thema einen anderen Ansprechpartner. Dadurch fehlt oft der Blick auf das Ganze.",
          "Veonis wurde gegründet, um genau das zu ändern: ein zentraler Ansprechpartner, der Zusammenhänge erkennt und langfristig begleitet.",
        ],
      },
      {
        title: "Unsere Werte",
        cards: [
          { title: "Klarheit", text: "Wir erklären komplexe Finanzthemen einfach und nachvollziehbar." },
          { title: "Ganzheitliche Sicht", text: "Wir denken vernetzt. Versicherungen, Vorsorge, Steuern, Immobilien und Anlagen gehören zusammen." },
          { title: "Verantwortung", text: "Wir prüfen sorgfältig, denken langfristig und empfehlen nur Lösungen, die zur Situation passen." },
          { title: "Transparenz", text: "Wir zeigen offen, welche Möglichkeiten bestehen und wie eine Empfehlung zustande kommt." },
          { title: "Persönlichkeit", text: "Wir beraten persönlich und bleiben auch nach der Umsetzung erreichbar." },
        ],
      },
      {
        title: "Unsere Mission",
        paragraphs: [
          "Wir möchten Menschen und Unternehmen helfen, ihre Finanzen besser zu verstehen, sinnvoll zu strukturieren und langfristig sicherer zu entscheiden.",
          "Eine gute Beratung endet nicht mit einer Unterschrift. Sie beginnt mit Vertrauen und wächst durch langfristige Begleitung.",
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
        items: ["Firma: [einfügen]", "Firmensitz: [einfügen]", "UID: [einfügen]", "E-Mail: [einfügen]", "Telefon: [einfügen]"],
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
    seoTitle: "Services | Financial advice, insurance and pension planning | Veonis",
    metaDescription:
      "Veonis services include insurance, pension planning, mortgages, real estate, taxes, financial planning, investments and corporate advice.",
    eyebrow: "Services",
    title: "Our services",
    description: [
      "Financial decisions should not be made in isolation. Insurance, pensions, taxes, mortgages and investments influence each other.",
      "Veonis looks at your situation holistically and shows how the individual topics fit together.",
    ],
  },
  "veonis-360-analysis": {
    ...dePages["veonis-360-analysis"],
    seoTitle: "Veonis 360° Analysis | Swiss financial check",
    metaDescription:
      "The Veonis 360° Analysis gives you a clear view of insurance, pension planning, mortgages, taxes, investments and your overall financial situation.",
    eyebrow: "Veonis 360° Analysis",
    title: "The Veonis 360° Analysis",
    subtitle: "A financial check that connects everything.",
    description: [
      "Many financial decisions are made separately. In everyday life, they are connected.",
      "The Veonis 360° Analysis brings insurance, pensions, mortgages, taxes, investments and liquidity into one understandable overview.",
    ],
  },
  "about-veonis": {
    ...dePages["about-veonis"],
    seoTitle: "About Veonis | Financial advice with personal support",
    metaDescription: "Veonis stands for personal, understandable and holistic financial advice in Switzerland.",
    eyebrow: "About Veonis",
    title: "About Veonis",
    description: [
      "Veonis stands for clear financial advice, personal support and solutions that fit customers' lives.",
      "We support private individuals, families, self-employed people and companies through important financial decisions.",
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
          "Company: [to be inserted]",
          "Registered office: [to be inserted]",
          "UID: [to be inserted]",
          "Email: [to be inserted]",
          "Telephone: [to be inserted]",
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

    return `/de/${key}`;
  }

  const englishLegalMap: Partial<Record<PageKey, string>> = {
    "legal/impressum": "legal/imprint",
    "legal/datenschutz": "legal/privacy",
    "legal/informationen-gemaess-art-45-vag": "legal/information-according-to-art-45-isa",
  };

  return `/en/${englishLegalMap[key] ?? key}`;
}
