import { NextResponse } from "next/server";
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return NextResponse.json({message:"Ungültige Kampagne."},{status:404});
  const base = (process.env.CMS_API_URL ?? process.env.NEXT_PUBLIC_CMS_URL)?.replace(/\/$/, "");
  if (!base) return NextResponse.json({message:"Die Anmeldung ist vorübergehend nicht verfügbar."},{status:503});
  try {
    const body = await request.text();
    if (body.length > 12000) return NextResponse.json({message:"Die Anfrage ist zu gross."},{status:413});
    const response = await fetch(`${base}/api/v1/campaigns/${slug}/leads`, {method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body,cache:"no-store",signal:AbortSignal.timeout(15000)});
    const payload = await response.json();
    return NextResponse.json(response.ok ? {message:payload.message} : {message:response.status === 422 ? "Bitte prüfen Sie Ihre Angaben und bestätigen Sie die Einwilligung." : response.status === 409 ? payload.message : response.status === 429 ? "Zu viele Versuche. Bitte warten Sie einen Moment." : "Die Teilnahme konnte nicht gespeichert werden. Bitte versuchen Sie es erneut.",errors:response.status === 422 ? payload.errors : undefined},{status:response.status});
  } catch { return NextResponse.json({message:"Die Verbindung wurde unterbrochen. Bitte versuchen Sie es erneut."},{status:502}); }
}
