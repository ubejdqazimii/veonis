import { FileText } from "lucide-react";

import { legalDisclaimer, type Locale } from "@/lib/veonis-content";

type LegalNoticeBlockProps = {
  locale: Locale;
};

const noticeLabels: Record<Locale, string> = {
  de: "Rechtlicher Hinweis",
  en: "Legal Notice",
};

export function LegalNoticeBlock({ locale }: LegalNoticeBlockProps) {
  return (
    <aside className="rounded-3xl border border-[#e6e2dc] bg-[#f7f7f6] p-6">
      <FileText className="size-5 text-[#c63d4d]" />
      <h2 className="mt-4 text-lg font-semibold text-[#111827]">{noticeLabels[locale]}</h2>
      <p className="mt-3 text-sm leading-7 text-[#5f6368]">{legalDisclaimer[locale]}</p>
    </aside>
  );
}
