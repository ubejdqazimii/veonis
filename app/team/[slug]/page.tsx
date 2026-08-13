import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SocialIcon } from "@/components/veonis/social-icon";
import { getManagedDigitalCard, getManagedSiteSettings, resolveManagedCardLocation } from "@/lib/cms";

type DigitalCardPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97c.37-.278.534-.753.417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-8.659 5.409a2.25 2.25 0 0 1-2.182 0L2.25 6.75" />
    </svg>
  );
}

function ContactIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m1.5-1.5h-3M15 6.75A3.75 3.75 0 1 1 7.5 6.75a3.75 3.75 0 0 1 7.5 0ZM3 20.1a7.5 7.5 0 0 1 15 0A17.93 17.93 0 0 1 10.5 21.75 17.93 17.93 0 0 1 3 20.1Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7.5-6.1 7.5-13.125a7.5 7.5 0 1 0-15 0C4.5 14.9 12 21 12 21Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.625 7.875a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M6.53 8.56H3.11V19.5h3.42V8.56ZM4.82 3.1a1.99 1.99 0 1 0 0 3.98 1.99 1.99 0 0 0 0-3.98ZM19.5 13.23c0-3.3-1.76-4.84-4.12-4.84-1.9 0-2.75 1.05-3.23 1.78V8.56H8.73c.05 1.07 0 10.94 0 10.94h3.42v-6.11c0-.33.02-.65.12-.89.24-.65.79-1.33 1.71-1.33 1.21 0 1.69.92 1.69 2.27v6.06h3.42l.41-6.27Z" />
    </svg>
  );
}

function GoogleMapsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="#34a853" d="M12 1.75A7.25 7.25 0 0 0 4.75 9c0 5.44 7.25 13.25 7.25 13.25S19.25 14.44 19.25 9A7.25 7.25 0 0 0 12 1.75Z" />
      <path fill="#4285f4" d="M4.75 9c0-4 3.25-7.25 7.25-7.25v4.18A3.08 3.08 0 0 0 8.92 9c0 .84.34 1.6.88 2.16l-2.95 2.95C5.54 12.79 4.75 11 4.75 9Z" />
      <path fill="#fbbc04" d="m6.85 14.11 2.95-2.95c.56.57 1.34.92 2.2.92.85 0 1.63-.35 2.19-.91l2.95 2.95A34.78 34.78 0 0 1 12 22.25s-3.08-3.32-5.15-8.14Z" />
      <path fill="#ea4335" d="M12 1.75A7.25 7.25 0 0 1 19.25 9c0 1.78-.78 3.56-2.11 5.12l-2.95-2.95A3.08 3.08 0 0 0 12 5.93V1.75Z" />
      <circle cx="12" cy="9" r="2.05" fill="#fff" />
    </svg>
  );
}

export async function generateMetadata({ params }: DigitalCardPageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = await getManagedDigitalCard(slug);

  return {
    title: card ? `${card.fullName} | Veonis` : "Digital business card | Veonis",
    description: card ? `${card.fullName}, ${card.position ?? card.company}` : undefined,
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function DigitalCardPage({ params }: DigitalCardPageProps) {
  const { slug } = await params;
  const [card, siteSettings] = await Promise.all([
    getManagedDigitalCard(slug),
    getManagedSiteSettings(),
  ]);

  if (!card) notFound();

  const initials = `${card.firstName.charAt(0)}${card.lastName.charAt(0)}`.toUpperCase();
  const { addressLines, mapsUrl } = resolveManagedCardLocation(card, siteSettings);
  const phoneHref = card.phone ? `tel:${card.phone.replace(/[^+\d]/g, "")}` : null;

  return (
    <main className="min-h-[100svh] bg-[#f1efec] sm:flex sm:items-center sm:justify-center sm:p-6">
      <article className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-white sm:min-h-0 sm:max-w-[430px] sm:rounded-[2rem] sm:shadow-[0_30px_90px_rgba(35,22,26,0.18)]">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_50%_-10%,#8d3a49_0%,#5d1d29_45%,#2d191e_100%)]" />
        <div className="relative flex flex-1 flex-col px-6 pb-8 pt-8 sm:px-8">
          <img className="mx-auto h-12 w-auto" src="/brand/veonis-footer.svg" alt="Veonis" />

          <div className="mt-7 flex justify-center">
            <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-[#efe9e7] text-4xl font-semibold text-[#5d1d29] shadow-[0_14px_40px_rgba(26,15,18,0.25)]">
              {card.photo ? <img className="h-full w-full object-cover" src={card.photo} alt={card.fullName} /> : initials}
            </div>
          </div>

          <header className="mt-6 text-center">
            <h1 className="text-[2.15rem] leading-tight text-[#23191c]">{card.fullName}</h1>
            {card.position ? <p className="mt-2 font-medium text-[#c63d4d]">{card.position}</p> : null}
            <p className="mt-1 text-sm text-[#6b6466]">{card.company}</p>
          </header>

          <div className="mt-5 flex justify-center gap-2" aria-label="Persönliche Kontaktaktionen">
            {phoneHref ? (
              <a
                aria-label="Anrufen"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e1d9d6] bg-white text-[#5d1d29] shadow-sm transition hover:border-[#c63d4d] hover:text-[#c63d4d] active:scale-[0.96]"
                href={phoneHref}
                title="Anrufen"
              >
                <span className="[&>svg]:h-5 [&>svg]:w-5"><PhoneIcon /></span>
              </a>
            ) : null}
            {card.email ? (
              <a
                aria-label="E-Mail senden"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e1d9d6] bg-white text-[#5d1d29] shadow-sm transition hover:border-[#c63d4d] hover:text-[#c63d4d] active:scale-[0.96]"
                href={`mailto:${card.email}`}
                title="E-Mail senden"
              >
                <span className="[&>svg]:h-5 [&>svg]:w-5"><MailIcon /></span>
              </a>
            ) : null}
            <a
              aria-label="Kontakt speichern"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e1d9d6] bg-white text-[#5d1d29] shadow-sm transition hover:border-[#c63d4d] hover:text-[#c63d4d] active:scale-[0.96]"
              href={`/team/${card.slug}/contact`}
              title="Kontakt speichern"
            >
              <span className="[&>svg]:h-5 [&>svg]:w-5"><ContactIcon /></span>
            </a>
            {card.linkedinUrl ? (
              <a
                aria-label="LinkedIn-Profil besuchen"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e1d9d6] bg-white text-[#5d1d29] shadow-sm transition hover:border-[#c63d4d] hover:text-[#c63d4d] active:scale-[0.96]"
                href={card.linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                title="LinkedIn-Profil besuchen"
              >
                <LinkedInIcon />
              </a>
            ) : null}
          </div>

          <div className="mt-2 flex flex-wrap justify-center gap-2" aria-label="Veonis Website und soziale Medien">
            <a
              aria-label="Zurück zur Veonis Website"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e1d9d6] bg-white p-2.5 shadow-sm transition active:scale-[0.96]"
              href="/de"
              title="Zurück zur Veonis Website"
            >
              <img className="h-full w-full" src="/icon.svg" alt="" />
            </a>
            {siteSettings.socialLinks.map((social) => (
              <a
                aria-label={`Veonis auf ${social.label}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e1d9d6] bg-white text-[#5d1d29] shadow-sm transition hover:border-[#c63d4d] hover:text-[#c63d4d] active:scale-[0.96]"
                href={social.url}
                key={`${social.label}-${social.url}`}
                rel={social.open_new_tab ? "noreferrer noopener" : undefined}
                target={social.open_new_tab ? "_blank" : undefined}
                title={social.label}
              >
                <SocialIcon className="h-5 w-5" {...social} />
              </a>
            ))}
            {mapsUrl ? (
              <a
                aria-label="Veonis auf Google Maps"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e1d9d6] bg-white shadow-sm transition hover:border-[#c63d4d] active:scale-[0.96]"
                href={mapsUrl}
                target="_blank"
                rel="noreferrer noopener"
                title="Google Maps"
              >
                <GoogleMapsIcon />
              </a>
            ) : null}
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-[#e9e4e1] bg-[#fbfaf9]">
            {card.phone && phoneHref ? (
              <a className="flex items-center gap-4 px-5 py-4 text-[#2f292b]" href={phoneHref}>
                <span className="text-[#c63d4d] [&>svg]:h-5 [&>svg]:w-5"><PhoneIcon /></span>
                <span className="text-[15px] font-semibold">{card.phone}</span>
              </a>
            ) : null}
            {card.email ? (
              <a className="flex items-center gap-4 border-t border-[#e9e4e1] px-5 py-4 text-[#2f292b]" href={`mailto:${card.email}`}>
                <span className="text-[#c63d4d] [&>svg]:h-5 [&>svg]:w-5"><MailIcon /></span>
                <span className="min-w-0 break-all text-[15px] font-semibold">{card.email}</span>
              </a>
            ) : null}
            {addressLines.length ? (
              <a className="flex items-start gap-4 border-t border-[#e9e4e1] px-5 py-4 text-[15px] leading-6 text-[#5f5759]" href={mapsUrl ?? undefined} target="_blank" rel="noreferrer">
                <span className="mt-0.5 text-[#c63d4d]"><LocationIcon /></span>
                <span>
                  {addressLines.map((line) => <span className="block" key={line}>{line}</span>)}
                </span>
              </a>
            ) : null}
          </div>

          <p className="mt-auto pt-8 text-center text-xs text-[#9a9294]">Ein Ansprechpartner für Ihre Finanzen.</p>
        </div>
      </article>
    </main>
  );
}
