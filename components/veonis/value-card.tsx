import {
  BadgeCheck,
  CircleCheck,
  Handshake,
  ScanSearch,
  Sparkles,
  Users,
} from "lucide-react";

import type { CardContent } from "@/lib/veonis-content";

export function ValueCard({ title, text }: CardContent) {
  const Icon = getValueIcon(title);

  return (
    <article className="rounded-3xl border border-[#e6e2dc] bg-white p-6 shadow-[0_16px_42px_rgba(17,24,39,0.045)]">
      <div className="flex size-11 items-center justify-center rounded-2xl bg-[#f7f7f6] text-[#c63d4d]">
        <Icon className="size-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[#111827]">{title}</h3>
      <p className="mt-3 leading-7 text-[#5f6368]">{text}</p>
    </article>
  );
}

function getValueIcon(title: string) {
  if (title.includes("Ganzheit")) return ScanSearch;
  if (title.includes("Persön")) return Users;
  if (title.includes("Verständ")) return Sparkles;
  if (title.includes("Unabh")) return Handshake;
  if (title.includes("Struktur")) return BadgeCheck;
  return CircleCheck;
}
