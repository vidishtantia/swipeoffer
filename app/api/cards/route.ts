import { NextRequest, NextResponse } from "next/server";
import { getCards } from "@/lib/db";
import type { Topic } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const topicsParam = searchParams.get("topics");
  const difficulty = searchParams.get("difficulty") ?? "all";
  const shuffle = searchParams.get("shuffle") === "true";

  if (!topicsParam) {
    return NextResponse.json({ error: "topics required" }, { status: 400 });
  }

  const topics = topicsParam.split(",") as Topic[];
  let cards = getCards(topics, difficulty === "all" ? undefined : difficulty);

  if (shuffle) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }

  return NextResponse.json({ cards });
}
