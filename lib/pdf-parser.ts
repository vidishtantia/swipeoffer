import type { Topic, Difficulty } from "./types";

export interface ParsedCard {
  question: string;
  answer: string;
  difficulty: Difficulty;
  source: "guide_extracted";
}

export async function parsePdfBuffer(
  buffer: Buffer,
  topic: Topic,
  defaultDifficulty: Difficulty = "intermediate"
): Promise<ParsedCard[]> {
  // Dynamic import to avoid edge runtime issues
  const pdfParse = (await import("pdf-parse")).default;
  const data = await pdfParse(buffer);
  const text = data.text;

  return extractQAPairs(text, defaultDifficulty);
}

function extractQAPairs(text: string, difficulty: Difficulty): ParsedCard[] {
  const cards: ParsedCard[] = [];

  // Pattern 1: "Q: ... A: ..."
  const qaPattern = /Q[:\s]*(.+?)\s*A[:\s]*(.+?)(?=Q[:\s]|$)/gis;
  let match;
  while ((match = qaPattern.exec(text)) !== null) {
    const question = cleanText(match[1]);
    const answer = cleanText(match[2]);
    if (question.length > 10 && answer.length > 10) {
      cards.push({ question, answer, difficulty, source: "guide_extracted" });
    }
  }

  if (cards.length > 0) return cards;

  // Pattern 2: Numbered questions followed by answers
  const numberedPattern =
    /(\d+[\.\)]\s*.+?\?)\s*([^\d]+?)(?=\d+[\.\)]|$)/gis;
  while ((match = numberedPattern.exec(text)) !== null) {
    const question = cleanText(match[1]);
    const answer = cleanText(match[2]);
    if (question.length > 10 && answer.length > 10) {
      cards.push({ question, answer, difficulty, source: "guide_extracted" });
    }
  }

  return cards;
}

function cleanText(s: string): string {
  return s
    .replace(/\s+/g, " ")
    .replace(/[^\x20-\x7E\n]/g, "")
    .trim();
}
