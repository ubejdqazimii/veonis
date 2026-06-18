export type Locale = "de" | "en";

export type PageKey =
  | "home"
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

export const navItems = [
  { label: "Home", de: "/de", en: "/en" },
  { label: "Private Clients", de: "/de/private-clients", en: "/en/private-clients" },
  { label: "Corporate Clients", de: "/de/corporate-clients", en: "/en/corporate-clients" },
  { label: "Services", de: "/de/services", en: "/en/services" },
  {
    label: "Veonis 360° Analysis",
    de: "/de/veonis-360-analysis",
    en: "/en/veonis-360-analysis",
  },
  { label: "About Veonis", de: "/de/about-veonis", en: "/en/about-veonis" },
  { label: "Career", de: "/de/career", en: "/en/career" },
  { label: "Contact", de: "/de/contact", en: "/en/contact" },
];

export const primaryNavItems = navItems.filter(
  (item) => !["Home", "Career", "Contact"].includes(item.label),
);

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

const dePages: Record<PageKey, PageContent> = {
  home,
  "private-clients": {
    seoTitle: "Finanzberatung für Privatkunden in der Schweiz | Veonis",
    metaDescription:
      "Veonis unterstützt Privatkunden bei Versicherungen, Vorsorge, Steuern, Hypotheken, Anlagen und finanzieller Planung.",
    eyebrow: "Privatkunden",
    title: "Finanzberatung für Privatkunden",
    description: [
      "Ihre finanzielle Situation verändert sich mit Ihrem Leben. Ausbildung, Berufseinstieg, Familie, Eigenheim, Selbstständigkeit oder Pensionierung bringen neue Fragen mit sich.",
      "Veonis hilft Ihnen, Ihre Finanzen verständlich zu ordnen und Entscheidungen zu treffen, die zu Ihrer aktuellen Lebensphase und zu Ihren langfristigen Zielen passen.",
    ],
    cta: "Privatberatung anfragen",
    sections: [
      {
        title: "Ihre Situation steht im Mittelpunkt",
        paragraphs: [
          "Wir starten nicht mit einem Produkt, sondern mit Ihrer persönlichen Situation.",
          "Erst wenn das Gesamtbild klar ist, sprechen wir über passende Lösungen.",
        ],
        items: [
          "Welche Versicherungen haben Sie bereits?",
          "Wie sieht Ihre Vorsorge aus?",
          "Welche Ziele verfolgen Sie?",
          "Welche Risiken sollten abgesichert sein?",
          "Welche steuerlichen Möglichkeiten bestehen?",
          "Wie passt alles zusammen?",
        ],
      },
      {
        title: "Typische Fragen",
        items: [
          "Bin ich richtig versichert?",
          "Zahle ich für Versicherungen, die ich nicht brauche?",
          "Ist meine Familie ausreichend abgesichert?",
          "Welche Vorsorgelösung passt zu mir?",
          "Kann ich mir Wohneigentum leisten?",
          "Wie kann ich langfristig Vermögen aufbauen?",
        ],
      },
      {
        title: "Beratungsthemen",
        cards: [
          { title: "Versicherungsanalyse", text: "Wir prüfen, ob Ihre aktuelle Absicherung noch zu Ihrer Lebenssituation passt." },
          { title: "Vorsorgeplanung", text: "Wir unterstützen Sie bei Säule 3a, Risikoabsicherung, Pensionierung und langfristiger Finanzplanung." },
          { title: "Hypothekenberatung", text: "Wir begleiten Sie bei der Finanzierung Ihres Eigenheims und erklären Modelle verständlich." },
          { title: "Steuerliche Planung", text: "Wir zeigen, welche Aspekte bei Vorsorge, Wohneigentum, Anlagen oder Selbstständigkeit relevant sein können." },
          { title: "Anlagen & Vermögensaufbau", text: "Wir helfen, Ziele, Anlagehorizont und Risikobereitschaft einzuordnen." },
        ],
      },
      {
        title: "Ihr Vorteil",
        paragraphs: [
          "Sie erhalten eine Beratung, die Ihre Finanzthemen miteinander verbindet. Nicht jede Versicherung, jede Vorsorgelösung und jede Hypothek wird einzeln betrachtet, sondern als Teil Ihrer gesamten finanziellen Situation.",
          "So entsteht Klarheit. Und Klarheit führt zu besseren Entscheidungen.",
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
  "private-clients": {
    ...dePages["private-clients"],
    seoTitle: "Financial advice for private clients in Switzerland | Veonis",
    metaDescription:
      "Veonis supports private clients with insurance, pension planning, taxes, mortgages, investments and financial planning.",
    eyebrow: "Private clients",
    title: "Financial advice for private clients",
    description: [
      "Your financial situation changes with your life. Career, family, home ownership, self-employment or retirement all raise new questions.",
      "Veonis helps you structure your finances and make decisions that fit your current phase of life and long-term goals.",
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
    return `/de/${key}`;
  }

  const englishLegalMap: Partial<Record<PageKey, string>> = {
    "legal/impressum": "legal/imprint",
    "legal/datenschutz": "legal/privacy",
    "legal/informationen-gemaess-art-45-vag": "legal/information-according-to-art-45-isa",
  };

  return `/en/${englishLegalMap[key] ?? key}`;
}
