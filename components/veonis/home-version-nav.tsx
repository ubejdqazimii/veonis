import Link from "next/link";
import { ChevronDown } from "lucide-react";

import type { Locale } from "@/lib/veonis-content";
import { homepageVersions } from "@/lib/veonis-content";

type HomeVersionNavProps = {
  locale: Locale;
};

export function HomeVersionNav({ locale }: HomeVersionNavProps) {
  const label = locale === "de" ? "Home" : "Home";

  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-[#4b5563] transition hover:bg-[#f7f7f6] hover:text-[#111827] [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown className="size-3.5 transition group-open:rotate-180" />
      </summary>
      <div className="absolute left-0 top-[calc(100%+0.65rem)] z-50 w-72 rounded-2xl border border-[#e6e2dc] bg-white p-2 shadow-[0_24px_70px_rgba(17,24,39,0.16)]">
        {homepageVersions[locale].map((version) => (
          <Link
            className="block rounded-xl px-4 py-3 text-sm transition hover:bg-[#f7f7f6]"
            href={version.href}
            key={version.value}
          >
            <span className="font-semibold text-[#111827]">{version.label}</span>
            <span className="mt-1 block text-xs leading-5 text-[#5f6368]">{version.note}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}
