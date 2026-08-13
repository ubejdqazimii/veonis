import { getManagedDigitalCard, getManagedSiteSettings, resolveManagedCardLocation } from "@/lib/cms";

function escapeVCard(value: string | null | undefined) {
  return (value ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [card, siteSettings] = await Promise.all([
    getManagedDigitalCard(slug),
    getManagedSiteSettings(),
  ]);

  if (!card) return new Response("Not found", { status: 404 });

  const { address } = resolveManagedCardLocation(card, siteSettings);
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCard(card.lastName)};${escapeVCard(card.firstName)};;;`,
    `FN:${escapeVCard(card.fullName)}`,
    `ORG:${escapeVCard(card.company)}`,
    card.position ? `TITLE:${escapeVCard(card.position)}` : null,
    card.phone ? `TEL;TYPE=CELL,VOICE:${escapeVCard(card.phone)}` : null,
    card.email ? `EMAIL;TYPE=INTERNET,WORK:${escapeVCard(card.email)}` : null,
    card.linkedinUrl ? `X-SOCIALPROFILE;TYPE=linkedin:${escapeVCard(card.linkedinUrl)}` : null,
    [address.street, address.zipCode, address.city, address.country].some(Boolean)
      ? `ADR;TYPE=WORK:;;${escapeVCard(address.street)};${escapeVCard(address.city)};;${escapeVCard(address.zipCode)};${escapeVCard(address.country)}`
      : null,
    `URL:https://www.veonissuisse.ch/team/${encodeURIComponent(card.slug)}`,
    "END:VCARD",
  ].filter(Boolean).join("\r\n");

  return new Response(`${vcard}\r\n`, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${card.slug}.vcf"`,
      "Cache-Control": "no-store",
    },
  });
}
