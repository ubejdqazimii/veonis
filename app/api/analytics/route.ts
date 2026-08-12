import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const baseUrl = (process.env.CMS_API_URL ?? process.env.NEXT_PUBLIC_CMS_URL)?.replace(/\/$/, "");

  if (!baseUrl) return new NextResponse(null, { status: 204 });

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

    return new NextResponse(null, { status: response.ok ? 204 : response.status });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
