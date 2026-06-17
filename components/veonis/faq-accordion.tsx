"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CardContent } from "@/lib/veonis-content";

type FAQAccordionProps = {
  items: CardContent[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion className="divide-y divide-[#e6e2dc] rounded-3xl border border-[#e6e2dc] bg-white" type="single" collapsible>
      {items.map((item, index) => (
        <AccordionItem className="border-0 px-5 sm:px-7" key={item.title} value={`item-${index}`}>
          <AccordionTrigger className="py-5 text-base font-semibold text-[#111827] hover:no-underline">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-base leading-7 text-[#5f6368]">
            {item.text}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
