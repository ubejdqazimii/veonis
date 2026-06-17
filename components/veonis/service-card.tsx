import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Calculator,
  ChartSpline,
  House,
  Scale,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";

type ServiceCardProps = {
  title: string;
  text: string;
  items?: string[];
  cta?: string;
  className?: string;
};

export function ServiceCard({ title, text, items, cta, className }: ServiceCardProps) {
  const Icon = getServiceIcon(title);

  return (
    <article className={cn("premium-card group flex h-full flex-col p-6", className)}>
      <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#c63d4d]/10 text-[#c63d4d] ring-1 ring-[#c63d4d]/10">
        <Icon className="size-5" />
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

function getServiceIcon(title: string) {
  if (title.includes("Versicher")) return ShieldCheck;
  if (title.includes("Hypothek") || title.includes("Immobil")) return House;
  if (title.includes("Steuern")) return Calculator;
  if (title.includes("Anlagen") || title.includes("Vermög")) return ChartSpline;
  if (title.includes("Recht") || title.includes("Nachlass")) return Scale;
  if (title.includes("Firmen") || title.includes("Corporate")) return BriefcaseBusiness;
  return BadgeCheck;
}
