"use client";

import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Locale } from "@/lib/veonis-content";
import { homepageVersions } from "@/lib/veonis-content";

type HomepageVersionSelectorProps = {
  locale: Locale;
  current: "v1" | "v2";
};

export function HomepageVersionSelector({ locale, current }: HomepageVersionSelectorProps) {
  const router = useRouter();
  const versions = homepageVersions[locale];
  const active = versions.find((version) => version.value === current) ?? versions[0];
  const label = locale === "de" ? "Homepage Auswahl" : "Homepage Selector";

  return (
    <div className="rounded-lg border border-[#e6e2dc] bg-white p-3 shadow-[0_18px_50px_rgba(17,24,39,0.07)] sm:flex sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase text-[#c63d4d]">{label}</p>
        <p className="mt-1 text-sm leading-6 text-[#5f6368]">{active.note}</p>
      </div>
      <Select
        value={current}
        onValueChange={(value) => {
          const next = versions.find((version) => version.value === value);
          if (next) {
            router.push(next.href);
          }
        }}
      >
        <SelectTrigger className="mt-3 h-11 w-full rounded-full border-[#e6e2dc] bg-[#f7f7f6] px-4 text-[#111827] sm:mt-0 sm:w-[15rem]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-[#e6e2dc] bg-white">
          {versions.map((version) => (
            <SelectItem className="rounded-lg py-2" key={version.value} value={version.value}>
              {version.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
