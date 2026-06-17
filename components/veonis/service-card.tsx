import { ArrowRight, CheckCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type ServiceCardProps = {
  title: string;
  text: string;
  items?: string[];
  cta?: string;
  className?: string;
};

export function ServiceCard({ title, text, items, cta, className }: ServiceCardProps) {
  return (
    <article className={cn("premium-card group flex h-full flex-col p-6", className)}>
      <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-[#c63d4d]/10 text-[#c63d4d]">
        <CheckCircle className="size-5" />
      </div>
      <h3 className="text-xl font-semibold text-[#111827]">{title}</h3>
      <p className="mt-3 leading-7 text-[#5f6368]">{text}</p>
      {items?.length ? (
        <ul className="mt-5 space-y-2 text-sm text-[#5f6368]">
          {items.slice(0, 5).map((item) => (
            <li className="flex gap-2" key={item}>
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#c63d4d]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {cta ? (
        <p className="mt-6 flex items-center text-sm font-semibold text-[#c63d4d]">
          {cta}
          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
        </p>
      ) : null}
    </article>
  );
}
