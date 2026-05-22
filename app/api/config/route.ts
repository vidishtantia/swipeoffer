import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ hasAiKey: !!process.env.ANTHROPIC_API_KEY });
}
