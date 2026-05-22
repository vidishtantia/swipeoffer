"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SwipeCard from "./SwipeCard";
import type { Card } from "@/lib/types";
import { recordResult, undoLastResult, toggleStarred, isStarred } from "@/lib/storage";

interface CardDeckProps {
  cards: Card[];
  onSessionEnd: (results: { cardId: number; correct: boolean }[]) => void;
}

export default function CardDeck({ cards, onSessionEnd }: CardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<{ cardId: number; correct: boolean }[]>([]);
  const [starredMap, setStarredMap] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  // Init starred state
  useEffect(() => {
    const map: Record<number, boolean> = {};
    cards.forEach((c) => { map[c.id] = isStarred(c.id); });
    setStarredMap(map);
  }, [cards]);

  const currentCard = cards[currentIndex];
  const nextCard = cards[currentIndex + 1];

  const handleSwipe = useCallback((correct: boolean) => {
    if (!currentCard) return;
    recordResult(currentCard.id, correct);
    const newResult = { cardId: currentCard.id, correct };
    const newResults = [...results, newResult];
    setResults(newResults);

    if (currentIndex + 1 >= cards.length) {
      onSessionEnd(newResults);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentCard, currentIndex, cards.length, results, onSessionEnd]);

  const handleUndo = useCallback(() => {
    if (currentIndex === 0) return;
    undoLastResult();
    setResults((r) => r.slice(0, -1));
    setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  const handleStar = useCallback((cardId: number) => {
    const newVal = toggleStarred(cardId);
    setStarredMap((m) => ({ ...m, [cardId]: newVal }));
  }, []);

  const correctCount = results.filter((r) => r.correct).length;
  const incorrectCount = results.filter((r) => !r.correct).length;

  return (
    <div className="flex flex-col h-full">
      {/* Progress bar */}
      <div className="px-4 pt-2 pb-1">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span className="text-green-400 font-medium">{correctCount} correct</span>
          <span className="text-gray-400">{currentIndex} / {cards.length} done</span>
          <span className="text-red-400 font-medium">{incorrectCount} incorrect</span>
        </div>
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            animate={{ width: `${(currentIndex / cards.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      {/* Card stack */}
      <div className="flex-1 relative mx-auto w-full max-w-lg px-4 py-4">
        <AnimatePresence>
          {nextCard && (
            <SwipeCard
              key={`next-${nextCard.id}`}
              card={nextCard}
              isTop={false}
              isStarred={starredMap[nextCard.id] ?? false}
              cardIndex={currentIndex + 1}
              totalCards={cards.length}
              onSwipe={() => {}}
              onStar={() => handleStar(nextCard.id)}
            />
          )}
          {currentCard && (
            <SwipeCard
              key={`card-${currentCard.id}-${currentIndex}`}
              card={currentCard}
              isTop={true}
              isStarred={starredMap[currentCard.id] ?? false}
              cardIndex={currentIndex}
              totalCards={cards.length}
              onSwipe={handleSwipe}
              onStar={() => handleStar(currentCard.id)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="px-4 pb-6 flex items-center justify-between gap-3">
        <button
          onClick={() => handleSwipe(false)}
          className="flex-1 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-semibold text-sm active:scale-95 transition-transform"
          disabled={!currentCard}
        >
          ✕ Wrong
        </button>

        <button
          onClick={handleUndo}
          disabled={currentIndex === 0}
          className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 text-sm disabled:opacity-30 active:scale-95 transition-transform"
          aria-label="Undo last swipe"
        >
          ↺
        </button>

        <button
          onClick={() => handleSwipe(true)}
          className="flex-1 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-semibold text-sm active:scale-95 transition-transform"
          disabled={!currentCard}
        >
          ✓ Correct
        </button>
      </div>
    </div>
  );
}
