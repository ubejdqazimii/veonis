import Link from "next/link";
import { Mail } from "lucide-react";

import { Container } from "@/components/veonis/container";
import type { Locale } from "@/lib/veonis-content";
import { brand, getLocalizedPath, localizedHomeHref } from "@/lib/veonis-content";

type PreHeaderProps = {
  locale: Locale;
};

export function PreHeader({ locale }: PreHeaderProps) {
  return (
    <div className="hidden border-b border-[#e6e2dc] bg-white text-sm text-[#5f6368] md:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <a className="inline-flex items-center gap-2 hover:text-[#c63d4d]" href={`mailto:${brand.email}`}>
            <Mail className="size-4" />
            {brand.email}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link className="hover:text-[#c63d4d]" href={localizedHomeHref[locale]}>
            Home
          </Link>
          <Link className="hover:text-[#c63d4d]" href={getLocalizedPath(locale, "contact")}>
            Contact
          </Link>
          <Link className="hover:text-[#c63d4d]" href={getLocalizedPath(locale, "career")}>
            Career
          </Link>
          <div className="flex items-center gap-2" aria-label="Social media">
            <a className="social-link" href="#" aria-label="LinkedIn">in</a>
            <a className="social-link" href="#" aria-label="Instagram">ig</a>
            <a className="social-link" href="#" aria-label="Facebook">fb</a>
          </div>
        </div>
      </Container>
    </div>
  );
}
