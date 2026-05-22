import type { Topic, Difficulty } from "./types";

export interface GeneratedCard {
  question: string;
  answer: string;
  difficulty: Difficulty;
  source: "ai_generated";
}

export async function generateQuestionsFromText(
  text: string,
  topic: Topic,
  count: number = 10
): Promise<GeneratedCard[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("AI API key not set in .env.local");
  }

  const prompt = `You are an expert investment banking interview coach. Based on the following guide content, generate exactly ${count} high-quality flashcard questions and answers for the topic: ${topic}.

Rules:
- Generate EXACTLY ${count} questions, no more, no less
- Mix difficulty levels: use "beginner", "intermediate", or "advanced"
- Answers should be detailed and thorough (3-8 sentences minimum)
- Questions should test real understanding, not just definitions

Return ONLY a valid JSON array with no other text before or after it:
[
  {
    "question": "...",
    "answer": "...",
    "difficulty": "beginner"
  }
]

Guide content:
${text.slice(0, 20000)}`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "IB Flashcards",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }

  const data = await res.json() as {
    choices?: Array<{ message?: { content?: string } }>;
    error?: { message: string };
  };

  if (data.error) throw new Error(data.error.message);

  const raw = data.choices?.[0]?.message?.content ?? "";
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("Model returned no JSON array");

  const parsed = JSON.parse(jsonMatch[0]) as Array<{
    question: string;
    answer: string;
    difficulty: string;
  }>;

  return parsed
    .filter(
      (item) =>
        item.question &&
        item.answer &&
        ["beginner", "intermediate", "advanced"].includes(item.difficulty)
    )
    .map((item) => ({
      question: item.question,
      answer: item.answer,
      difficulty: item.difficulty as Difficulty,
      source: "ai_generated" as const,
    }));
}
