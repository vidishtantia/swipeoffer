"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CardDeck from "@/components/CardDeck";
import SessionSummary from "@/components/SessionSummary";
import type { Card } from "@/lib/types";

function StudyContent() {
  const router = useRouter();
  const params = useSearchParams();

  const topics = params.get("topics") ?? "accounting";
  const difficulty = params.get("difficulty") ?? "all";
  const shuffle = params.get("shuffle") === "true";

  const [cards, setCards] = useState<Card[]>([]);
  const [sessionCards, setSessionCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionResults, setSessionResults] = useState<
    { cardId: number; correct: boolean }[] | null
  >(null);

  useEffect(() => {
    const url = `/api/cards?topics=${topics}&difficulty=${difficulty}&shuffle=${shuffle}`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setCards(d.cards);
        setSessionCards(d.cards);
        setLoading(false);
      })
      .catch((e) => { setError(e.message); setLoading(false); });
  }, [topics, difficulty, shuffle]);

  const handleSessionEnd = useCallback(
    (results: { cardId: number; correct: boolean }[]) => {
      setSessionResults(results);
    },
    []
  );

  const handleRetryWrong = useCallback((wrongCards: Card[]) => {
    // Shuffle wrong cards for retry
    const shuffled = [...wrongCards].sort(() => Math.random() - 0.5);
    setSessionCards(shuffled);
    setSessionResults(null);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2.5 rounded-xl bg-gray-800 text-gray-300 text-sm"
        >
          Go back
        </button>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-gray-400 mb-1 text-lg">No cards found</p>
        <p className="text-gray-600 text-sm mb-5">Try changing the difficulty filter</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2.5 rounded-xl bg-gray-800 text-gray-300 text-sm"
        >
          Back to topics
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col max-w-lg mx-auto">
      {/* Nav */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={() => router.push("/")}
          className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
        >
          ← Topics
        </button>
        <span className="text-xs text-gray-600">
          {topics.split(",").length > 1 ? "Mixed" : topics.split(",")[0]}
          {difficulty !== "all" ? ` · ${difficulty}` : ""}
        </span>
        <div className="w-16" />
      </div>

      <AnimatePresence mode="wait">
        {sessionResults ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 overflow-hidden"
          >
            <SessionSummary
              results={sessionResults}
              allCards={cards}
              onRetryWrong={handleRetryWrong}
              onGoHome={() => router.push("/")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="deck"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-hidden"
          >
            <CardDeck
              key={sessionCards[0]?.id}
              cards={sessionCards}
              onSessionEnd={handleSessionEnd}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StudyPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <StudyContent />
    </Suspense>
  );
}
