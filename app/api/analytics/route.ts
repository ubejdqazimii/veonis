import { NextResponse } from "next/server";

export function GET(request: Request) {
  const headers = request.headers;

  return NextResponse.json({
    country: headers.get("x-vercel-ip-country") || null,
    region: headers.get("x-vercel-ip-country-region") || null,
    city: decodeURIComponent(headers.get("x-vercel-ip-city") ?? "") || null,
  });
}

export async function POST(request: Request) {
  const baseUrl = (
    process.env.CMS_API_URL ??
    process.env.NEXT_PUBLIC_CMS_URL ??
    "https://adcms.veonissuisse.ch"
  ).replace(/\/$/, "");

  const headers = request.headers;

  try {
    const response = await fetch(`${baseUrl}/api/v1/analytics`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": headers.get("user-agent") ?? "",
        "X-Forwarded-For": headers.get("x-forwarded-for") ?? "",
        "X-Visitor-Country": headers.get("x-vercel-ip-country") ?? "",
        "X-Visitor-Region": headers.get("x-vercel-ip-country-region") ?? "",
        "X-Visitor-City": decodeURIComponent(headers.get("x-vercel-ip-city") ?? ""),
      },
      body: await request.text(),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "The analytics service rejected the event." },
        { status: response.status },
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { message: "The analytics service is temporarily unavailable." },
      { status: 502 },
    );
  }
}
