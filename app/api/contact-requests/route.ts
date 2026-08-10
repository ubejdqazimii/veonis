import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const baseUrl = (process.env.CMS_API_URL ?? process.env.NEXT_PUBLIC_CMS_URL)?.replace(/\/$/, "");

  if (!baseUrl) {
    return NextResponse.json(
      { message: "The contact service is not configured." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/contact-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: await request.text(),
      cache: "no-store",
    });
    const body = await response.text();

    return new NextResponse(body, {
      status: response.status,
      headers: { "Content-Type": response.headers.get("Content-Type") ?? "application/json" },
    });
  } catch {
    return NextResponse.json(
      { message: "The contact service is temporarily unavailable." },
      { status: 502 },
    );
  }
}
