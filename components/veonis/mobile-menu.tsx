"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ManagedNavigationItem } from "@/lib/cms";
import type { Locale } from "@/lib/veonis-content";
import { getLocalizedPath, getNavItemLabel, localizedHomeHref, primaryNavItems } from "@/lib/veonis-content";

type MobileMenuProps = {
  locale: Locale;
  navigation?: ManagedNavigationItem[] | null;
};

export function MobileMenu({ locale, navigation }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Button
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="size-10 rounded-full border-[#e6e2dc] bg-white text-[#111827]"
        onClick={() => setOpen((value) => !value)}
        size="icon"
        type="button"
        variant="outline"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>
      {open ? (
        <div className="absolute inset-x-4 top-[calc(100%+0.75rem)] z-50 rounded-3xl border border-[#e6e2dc] bg-white p-4 shadow-[0_24px_70px_rgba(17,24,39,0.16)]">
          <nav className="grid gap-1">
            <Link
              className="rounded-2xl px-4 py-3 text-sm font-semibold text-[#111827] hover:bg-[#f7f7f6]"
              href={localizedHomeHref[locale]}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            {(navigation ?? primaryNavItems.map((item) => ({
              label: getNavItemLabel(item, locale),
              href: item[locale],
            }))).map((item) => (
              <Link
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-[#111827] hover:bg-[#f7f7f6]"
                href={item.href}
                key={`${item.label}-${item.href}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button asChild className="mt-4 h-11 w-full rounded-full bg-[#c63d4d] text-white hover:bg-[#b23443]">
            <Link href={getLocalizedPath(locale, "contact")} onClick={() => setOpen(false)}>
              Kostenloses Erstgespräch vereinbaren
            </Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
