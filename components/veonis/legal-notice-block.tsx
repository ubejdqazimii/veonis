import { FileText } from "lucide-react";

import { brand } from "@/lib/veonis-content";

export function LegalNoticeBlock() {
  return (
    <aside className="rounded-3xl border border-[#e6e2dc] bg-[#f7f7f6] p-6">
      <FileText className="size-5 text-[#c63d4d]" />
      <h2 className="mt-4 text-lg font-semibold text-[#111827]">Rechtlicher Hinweis</h2>
      <p className="mt-3 text-sm leading-7 text-[#5f6368]">{brand.disclaimer}</p>
    </aside>
  );
}
