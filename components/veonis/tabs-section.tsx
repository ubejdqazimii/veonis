"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { services } from "@/lib/veonis-content";
import { cn } from "@/lib/utils";

export function TabsSection() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-3xl border border-[#e6e2dc] bg-white p-3">
        {services.map((service, index) => (
          <button
            className={cn(
              "flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left text-sm font-semibold transition",
              index === active
                ? "bg-[#c63d4d] text-white"
                : "text-[#111827] hover:bg-[#f7f7f6]"
            )}
            key={service.title}
            onClick={() => setActive(index)}
            type="button"
          >
            <span>{service.title}</span>
            <ArrowRight className="size-4" />
          </button>
        ))}
      </div>
      <article className="premium-card p-7 sm:p-9">
        <p className="eyebrow">{current.subtitle}</p>
        <h3 className="mt-3 text-3xl font-semibold text-[#111827]">{current.title}</h3>
        <p className="mt-5 text-lg leading-8 text-[#5f6368]">{current.text}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {current.items.map((item) => (
            <div className="rounded-2xl bg-[#f7f7f6] px-4 py-3 text-sm text-[#4b5563]" key={item}>
              {item}
            </div>
          ))}
        </div>
        <Button className="mt-8 h-11 rounded-full bg-[#111827] px-5 text-white hover:bg-[#2b3443]">
          {current.cta}
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </article>
    </div>
  );
}
