import { NextResponse } from "next/server";
import { getCardCountByTopic } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const counts = getCardCountByTopic();
  return NextResponse.json({ counts });
}
