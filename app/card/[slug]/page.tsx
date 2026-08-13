import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getManagedDigitalCard } from "@/lib/cms";

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
  const card = await getManagedDigitalCard(slug);

  if (!card) notFound();

  const initials = `${card.firstName.charAt(0)}${card.lastName.charAt(0)}`.toUpperCase();
  const addressLines = [card.address.street, [card.address.zipCode, card.address.city].filter(Boolean).join(" "), card.address.country].filter(Boolean);
  const mapQuery = encodeURIComponent(addressLines.join(", "));
  const phoneHref = card.phone ? `tel:${card.phone.replace(/[^+\d]/g, "")}` : null;

  return (
    <main className="min-h-[100svh] bg-[#f1efec] sm:flex sm:items-center sm:justify-center sm:p-6">
      <article className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-white sm:min-h-0 sm:max-w-[430px] sm:rounded-[2rem] sm:shadow-[0_30px_90px_rgba(35,22,26,0.18)]">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_50%_-10%,#8d3a49_0%,#5d1d29_45%,#2d191e_100%)]" />
        <div className="relative flex flex-1 flex-col px-6 pb-8 pt-8 sm:px-8">
          <img className="mx-auto h-12 w-auto brightness-0 invert" src="/brand/veonis-header.svg" alt="Veonis" />

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

          <div className="mt-7 flex gap-3">
            {phoneHref ? (
              <a className="flex min-h-24 flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-[#5d1d29] px-2 text-sm font-semibold text-white shadow-sm transition active:scale-[0.97]" href={phoneHref}>
                <PhoneIcon />
                Anrufen
              </a>
            ) : null}
            {card.email ? (
              <a className="flex min-h-24 flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-[#f5f2f0] px-2 text-sm font-semibold text-[#5d1d29] transition active:scale-[0.97]" href={`mailto:${card.email}`}>
                <MailIcon />
                E-Mail
              </a>
            ) : null}
            <a className="flex min-h-24 flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-[#c63d4d] px-2 text-center text-sm font-semibold text-white shadow-sm transition active:scale-[0.97]" href={`/card/${card.slug}/contact`}>
              <ContactIcon />
              Speichern
            </a>
          </div>

          <div className="mt-7 space-y-3 rounded-3xl border border-[#e9e4e1] bg-[#fbfaf9] p-5">
            {card.phone && phoneHref ? (
              <a className="block text-[15px] font-medium text-[#2f292b]" href={phoneHref}>{card.phone}</a>
            ) : null}
            {card.email ? (
              <a className="block break-all text-[15px] font-medium text-[#2f292b]" href={`mailto:${card.email}`}>{card.email}</a>
            ) : null}
            {addressLines.length ? (
              <a className="flex items-start gap-3 border-t border-[#e9e4e1] pt-4 text-[15px] leading-6 text-[#5f5759]" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">
                <LocationIcon />
                <span>{addressLines.map((line) => <span className="block" key={line}>{line}</span>)}</span>
              </a>
            ) : null}
          </div>

          <p className="mt-auto pt-8 text-center text-xs text-[#9a9294]">Ein Ansprechpartner für Ihre Finanzen.</p>
        </div>
      </article>
    </main>
  );
}
