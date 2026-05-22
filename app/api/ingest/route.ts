import { NextRequest, NextResponse } from "next/server";
import { insertCards } from "@/lib/db";
import { generateQuestionsFromText } from "@/lib/ai-generator";
import type { Topic, Difficulty } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const topic = formData.get("topic") as Topic | null;
    const difficulty = (formData.get("difficulty") as Difficulty) ?? "intermediate";
    const aiCount = parseInt((formData.get("aiCount") as string) ?? "0", 10);

    if (!file || !topic) {
      return NextResponse.json({ error: "file and topic are required" }, { status: 400 });
    }

    if (aiCount === 0) {
      return NextResponse.json(
        { error: "Set AI-generated questions to at least 5 using the slider." },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not set. Add it to .env.local and restart the dev server." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfParse = (await import("pdf-parse")).default;
    const { text } = await pdfParse(buffer);

    const aiCards = await generateQuestionsFromText(text, topic, aiCount);

    if (aiCards.length === 0) {
      return NextResponse.json(
        { error: "AI generation returned no questions. Check your API key and try again." },
        { status: 422 }
      );
    }

    insertCards(aiCards.map((c) => ({ ...c, topic, difficulty })));

    return NextResponse.json({ inserted: aiCards.length });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Internal server error during ingestion";
    console.error("Ingest error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
