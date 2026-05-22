import { NextRequest, NextResponse } from "next/server";
import { getCardsByIds } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { ids } = (await req.json()) as { ids: number[] };
  if (!Array.isArray(ids)) {
    return NextResponse.json({ error: "ids array required" }, { status: 400 });
  }
  const cards = getCardsByIds(ids);
  return NextResponse.json({ cards });
}
