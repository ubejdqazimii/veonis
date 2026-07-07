import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CircleCheck,
  CircleUserRound,
  Handshake,
  ScanSearch,
  Sparkles,
  Users,
} from "lucide-react";

import type { CardContent } from "@/lib/veonis-content";

export function ValueCard({ title, text, ctaLabel, href }: CardContent) {
  const Icon = getValueIcon(title);

  return (
    <article className="rounded-3xl border border-[#e6e2dc] bg-white p-6 shadow-[0_16px_42px_rgba(17,24,39,0.045)]">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-[#f7f7f6] text-[#c63d4d]">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[#111827]">{title}</h3>
      <p className="mt-3 leading-7 text-[#5f6368]">{text}</p>
      {ctaLabel && href ? (
        <Link
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#ead3d7] bg-[#fff7f8] px-4 py-2 text-sm font-semibold text-[#a92f3e] transition hover:border-[#c63d4d] hover:bg-[#c63d4d] hover:text-white"
          href={href}
        >
          {ctaLabel}
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </article>
  );
}

function getValueIcon(title: string) {
  if (title.includes("Ganzheit")) return ScanSearch;
  if (title.includes("Persön")) return Users;
  if (title.includes("Verständ")) return Sparkles;
  if (title.includes("Unabh")) return Handshake;
  if (title.includes("Struktur")) return BadgeCheck;
  if (title.includes("Privat") || title.includes("Private")) return CircleUserRound;
  if (title.includes("Firmen") || title.includes("Corporate")) return Building2;
  if (title.includes("360")) return ScanSearch;
  if (title.includes("Dienst") || title.includes("Services")) return BriefcaseBusiness;
  return CircleCheck;
}
