import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/veonis/site-shell";
import { CampaignForm, type LeadCampaign } from "@/components/veonis/campaign-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Veonis | Kampagne", robots: { index: false, follow: false } };
export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) notFound();
  const base = (process.env.CMS_API_URL ?? process.env.NEXT_PUBLIC_CMS_URL)?.replace(/\/$/, "");
  let campaign: LeadCampaign | undefined;
  let missing = false;
  try {
    if (!base) throw new Error("Campaign service not configured");
    const response = await fetch(`${base}/api/v1/campaigns/${slug}`, { cache: "no-store", headers: { Accept: "application/json" }, signal: AbortSignal.timeout(10000) });
    if (response.status === 404) missing = true;
    else if (response.ok) campaign = await response.json();
  } catch { /* Show a recoverable service message without exposing configuration. */ }
  if (missing) notFound();
  return <SiteShell locale="de">{campaign ? <CampaignForm campaign={campaign}/> : <section className="mx-auto max-w-xl px-6 py-24"><h1 className="text-3xl">Die Kampagne ist gerade nicht erreichbar.</h1><p className="mt-5">Bitte versuchen Sie es in einigen Minuten erneut.</p><a className="mt-6 inline-block underline" href={`/${slug}`}>Erneut versuchen</a></section>}</SiteShell>;
}
