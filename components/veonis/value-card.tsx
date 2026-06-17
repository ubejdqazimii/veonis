import { CircleCheck } from "lucide-react";

import type { CardContent } from "@/lib/veonis-content";

export function ValueCard({ title, text }: CardContent) {
  return (
    <article className="rounded-3xl border border-[#e6e2dc] bg-white p-6">
      <CircleCheck className="size-5 text-[#c63d4d]" />
      <h3 className="mt-5 text-lg font-semibold text-[#111827]">{title}</h3>
      <p className="mt-3 leading-7 text-[#5f6368]">{text}</p>
    </article>
  );
}
