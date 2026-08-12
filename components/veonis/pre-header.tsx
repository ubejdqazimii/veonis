import Link from "next/link";
import { ExternalLink, Mail, Phone } from "lucide-react";

import { Container } from "@/components/veonis/container";
import type { ManagedNavigationItem, ManagedSiteSettings } from "@/lib/cms";
import type { Locale } from "@/lib/veonis-content";
import { getLocalizedPath, localizedHomeHref } from "@/lib/veonis-content";

type PreHeaderProps = {
  locale: Locale;
  navigation?: ManagedNavigationItem[] | null;
  siteSettings: ManagedSiteSettings;
};

const contactIcons = {
  email: Mail,
  phone: Phone,
  link: ExternalLink,
};

export function PreHeader({ locale, navigation, siteSettings }: PreHeaderProps) {
  if (!siteSettings.preheaderEnabled) return null;

  const utilityLinks = navigation?.filter((item) => item.group === "utility") ?? [
    { label: "Home", href: localizedHomeHref[locale] },
    { label: "Blog", href: getLocalizedPath(locale, "blog") },
    { label: locale === "de" ? "Kontakt" : "Contact", href: getLocalizedPath(locale, "contact") },
    { label: locale === "de" ? "Karriere" : "Career", href: getLocalizedPath(locale, "career") },
  ];

  return (
    <div className="hidden border-b border-[#e6e2dc] bg-white text-sm text-[#5f6368] md:block">
      <Container className="flex min-h-10 items-center justify-between gap-6 py-1.5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {siteSettings.contactItems.map((item) => {
            const Icon = contactIcons[item.type] ?? ExternalLink;

            return (
              <a
                className="inline-flex items-center gap-2 hover:text-[#c63d4d]"
                href={item.href}
                key={`${item.type}-${item.href}`}
              >
                <Icon className="size-4" />
                {item.label}
              </a>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-4">
          {utilityLinks.map((item) => (
            <Link className="hover:text-[#c63d4d]" href={item.href} key={`${item.label}-${item.href}`}>
              {item.label}
            </Link>
          ))}
          {siteSettings.socialLinks.length ? (
            <div className="flex items-center gap-2" aria-label="Social media">
              {siteSettings.socialLinks.map((item) => (
                <a
                  aria-label={item.label}
                  className="social-link"
                  href={item.url}
                  key={`${item.label}-${item.url}`}
                  rel={item.open_new_tab ? "noreferrer noopener" : undefined}
                  target={item.open_new_tab ? "_blank" : undefined}
                  title={item.label}
                >
                  {item.short_label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
