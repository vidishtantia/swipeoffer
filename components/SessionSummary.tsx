"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Card } from "@/lib/types";
import { TOPIC_LABELS, TOPIC_BG } from "@/lib/types";

interface SessionResult {
  cardId: number;
  correct: boolean;
}

interface SessionSummaryProps {
  results: SessionResult[];
  allCards: Card[];
  onRetryWrong: (cards: Card[]) => void;
  onGoHome: () => void;
}

export default function SessionSummary({
  results,
  allCards,
  onRetryWrong,
  onGoHome,
}: SessionSummaryProps) {
  const cardMap = Object.fromEntries(allCards.map((c) => [c.id, c]));
  const correct = results.filter((r) => r.correct);
  const incorrect = results.filter((r) => !r.correct);
  const pct = results.length > 0 ? Math.round((correct.length / results.length) * 100) : 0;

  const wrongCards = incorrect
    .map((r) => cardMap[r.cardId])
    .filter(Boolean) as Card[];

  const [tab, setTab] = useState<"overview" | "correct" | "incorrect">("overview");

  const grade =
    pct >= 90 ? { label: "Outstanding", color: "text-emerald-400" } :
    pct >= 75 ? { label: "Strong", color: "text-blue-400" } :
    pct >= 60 ? { label: "Getting there", color: "text-yellow-400" } :
    { label: "Keep drilling", color: "text-red-400" };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-gray-800">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center mb-4"
        >
          <div className="text-5xl font-bold text-white mb-1">{pct}%</div>
          <div className={`text-lg font-semibold ${grade.color}`}>{grade.label}</div>
          <div className="text-sm text-gray-500 mt-1">
            {correct.length} correct · {incorrect.length} incorrect · {results.length} total
          </div>
        </motion.div>

        {/* Score bar */}
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </div>

      {/* Tab selector */}
      <div className="flex border-b border-gray-800">
        {(["overview", "correct", "incorrect"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-xs font-semibold capitalize transition-colors ${
              tab === t
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {t === "correct" ? `✓ ${correct.length}` :
             t === "incorrect" ? `✕ ${incorrect.length}` :
             "Overview"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {tab === "overview" && (
          <div className="space-y-3">
            {Object.entries(
              results.reduce((acc, r) => {
                const card = cardMap[r.cardId];
                if (!card) return acc;
                if (!acc[card.topic]) acc[card.topic] = { correct: 0, total: 0 };
                acc[card.topic].total++;
                if (r.correct) acc[card.topic].correct++;
                return acc;
              }, {} as Record<string, { correct: number; total: number }>)
            ).map(([topic, stats]) => {
              const pct = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={topic} className="bg-gray-900 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TOPIC_BG[topic as keyof typeof TOPIC_BG]} text-white`}>
                      {TOPIC_LABELS[topic as keyof typeof TOPIC_LABELS]}
                    </span>
                    <span className="text-sm font-bold text-white">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1.5">
                    {stats.correct}/{stats.total} correct
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {(tab === "correct" || tab === "incorrect") && (
          <div className="space-y-3">
            {(tab === "correct" ? correct : incorrect).map((r) => {
              const card = cardMap[r.cardId];
              if (!card) return null;
              return (
                <div
                  key={r.cardId}
                  className={`rounded-xl p-4 border ${
                    r.correct
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-red-500/5 border-red-500/20"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TOPIC_BG[card.topic]} text-white`}>
                      {TOPIC_LABELS[card.topic]}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">{card.difficulty}</span>
                  </div>
                  <p className="text-sm font-medium text-white">{card.question}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA buttons */}
      <div className="px-4 pb-6 pt-3 flex flex-col gap-3 border-t border-gray-800">
        {wrongCards.length > 0 && (
          <button
            onClick={() => onRetryWrong(wrongCards)}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm active:scale-95 transition-all"
          >
            Retry {wrongCards.length} missed card{wrongCards.length !== 1 ? "s" : ""}
          </button>
        )}
        <button
          onClick={onGoHome}
          className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm active:scale-95 transition-all"
        >
          Back to Topics
        </button>
      </div>
    </div>
  );
}
