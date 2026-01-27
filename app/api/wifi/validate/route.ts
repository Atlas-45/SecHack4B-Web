import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!password) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const expected = process.env.PRIVATE_WIFI_PASSWORD;
  const ok = Boolean(expected && password === expected);

  return NextResponse.json({ ok });
}
