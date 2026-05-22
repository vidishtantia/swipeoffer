"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Topic, Card } from "@/lib/types";
import { TOPIC_LABELS, TOPIC_ICONS, TOPIC_BG, ALL_TOPICS } from "@/lib/types";
import { getAllResults, clearProgress } from "@/lib/storage";
import type { CardResult } from "@/lib/types";

interface TopicStats {
  topic: Topic;
  totalCards: number;
  correct: number;
  attempted: number;
  pct: number;
}

export default function StatsPage() {
  const router = useRouter();
  const [topicStats, setTopicStats] = useState<TopicStats[]>([]);
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [results, setResults] = useState<CardResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTopic, setExpandedTopic] = useState<Topic | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/cards?topics=${ALL_TOPICS.join(",")}&shuffle=false`)
      .then((r) => r.json())
      .then((d: { cards: Card[] }) => {
        const cardTopicMap: Record<number, Topic> = {};
        for (const c of d.cards) cardTopicMap[c.id] = c.topic;

        const allResults = getAllResults();

        const tally: Record<Topic, { correct: number; attempted: number; total: number }> =
          {} as never;
        for (const t of ALL_TOPICS) tally[t] = { correct: 0, attempted: 0, total: 0 };
        for (const c of d.cards) tally[c.topic].total++;
        for (const r of allResults) {
          const topic = cardTopicMap[r.cardId];
          if (!topic) continue;
          tally[topic].attempted++;
          if (r.correct) tally[topic].correct++;
        }

        setAllCards(d.cards);
        setResults(allResults);
        setTopicStats(
          ALL_TOPICS.map((t) => ({
            topic: t,
            totalCards: tally[t].total,
            correct: tally[t].correct,
            attempted: tally[t].attempted,
            pct: tally[t].attempted > 0
              ? Math.round((tally[t].correct / tally[t].attempted) * 100)
              : 0,
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalCorrect = results.filter((r) => r.correct).length;
  const totalAttempted = results.length;
  const overallPct = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  // For a given topic, get each card's latest result
  function getTopicDrilldown(topic: Topic) {
    const topicCards = allCards.filter((c) => c.topic === topic);

    // Build map: cardId → latest result
    const latestResult: Record<number, boolean> = {};
    for (const r of results) {
      latestResult[r.cardId] = r.correct; // later entries overwrite earlier
    }

    const correct = topicCards.filter((c) => c.id in latestResult && latestResult[c.id]);
    const incorrect = topicCards.filter((c) => c.id in latestResult && !latestResult[c.id]);
    const unreviewed = topicCards.filter((c) => !(c.id in latestResult));
    return { correct, incorrect, unreviewed };
  }

  const handleClear = () => {
    if (confirm("Clear all progress? This cannot be undone.")) {
      clearProgress();
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-lg mx-auto px-4">
      {/* Header */}
      <div className="flex items-center gap-3 pt-6 pb-4">
        <button onClick={() => router.push("/")} className="text-gray-500 hover:text-gray-300 text-sm">
          ←
        </button>
        <div>
          <h1 className="text-lg font-bold text-white">Statistics</h1>
          <p className="text-xs text-gray-500">Tap a topic to see your answers</p>
        </div>
      </div>

      {/* Overall */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-2xl p-5 border border-gray-800 mb-5"
      >
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
              All-time accuracy
            </p>
            <p className="text-4xl font-bold text-white">{overallPct}%</p>
          </div>
          <div className="text-right text-sm text-gray-400">
            <p>{totalCorrect} correct</p>
            <p>{totalAttempted - totalCorrect} incorrect</p>
            <p className="text-gray-600 text-xs mt-1">{totalAttempted} total reviews</p>
          </div>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${overallPct}%` }}
            transition={{ duration: 0.7 }}
          />
        </div>
      </motion.div>

      {/* Per-topic */}
      <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">By Topic</p>
      <div className="space-y-2 mb-8">
        {topicStats.map((s, i) => {
          const isExpanded = expandedTopic === s.topic;
          const drill = isExpanded ? getTopicDrilldown(s.topic) : null;

          return (
            <motion.div
              key={s.topic}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
            >
              {/* Topic row — clickable */}
              <button
                onClick={() => {
                  setExpandedTopic(isExpanded ? null : s.topic);
                  setExpandedCardId(null);
                }}
                className="w-full text-left p-4 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{TOPIC_ICONS[s.topic]}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-semibold text-white">{TOPIC_LABELS[s.topic]}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{s.totalCards} cards</span>
                        <span className="text-gray-600 text-xs">{isExpanded ? "▲" : "▼"}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${TOPIC_BG[s.topic]} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: s.attempted > 0 ? `${s.pct}%` : "0%" }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {s.attempted > 0
                        ? `${s.pct}% · ${s.correct}/${s.attempted} reviewed`
                        : "No reviews yet — tap to see questions"}
                    </p>
                  </div>
                </div>
              </button>

              {/* Drill-down panel */}
              <AnimatePresence>
                {isExpanded && drill && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="border-t border-gray-800"
                  >
                    <div className="px-4 py-3 space-y-1">
                      {/* Incorrect */}
                      {drill.incorrect.length > 0 && (
                        <>
                          <p className="text-xs text-red-400 font-semibold uppercase tracking-widest mb-2 mt-1">
                            ✕ Incorrect ({drill.incorrect.length})
                          </p>
                          {drill.incorrect.map((card) => (
                            <CardRow
                              key={card.id}
                              card={card}
                              status="incorrect"
                              isOpen={expandedCardId === card.id}
                              onToggle={() =>
                                setExpandedCardId(expandedCardId === card.id ? null : card.id)
                              }
                            />
                          ))}
                        </>
                      )}

                      {/* Correct */}
                      {drill.correct.length > 0 && (
                        <>
                          <p className="text-xs text-green-400 font-semibold uppercase tracking-widest mb-2 mt-3">
                            ✓ Correct ({drill.correct.length})
                          </p>
                          {drill.correct.map((card) => (
                            <CardRow
                              key={card.id}
                              card={card}
                              status="correct"
                              isOpen={expandedCardId === card.id}
                              onToggle={() =>
                                setExpandedCardId(expandedCardId === card.id ? null : card.id)
                              }
                            />
                          ))}
                        </>
                      )}

                      {/* Unreviewed */}
                      {drill.unreviewed.length > 0 && (
                        <>
                          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-2 mt-3">
                            — Not reviewed ({drill.unreviewed.length})
                          </p>
                          {drill.unreviewed.map((card) => (
                            <CardRow
                              key={card.id}
                              card={card}
                              status="unreviewed"
                              isOpen={expandedCardId === card.id}
                              onToggle={() =>
                                setExpandedCardId(expandedCardId === card.id ? null : card.id)
                              }
                            />
                          ))}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {totalAttempted > 0 && (
        <button
          onClick={handleClear}
          className="w-full py-3 rounded-xl border border-red-900/50 text-red-500 text-sm font-medium hover:bg-red-500/5 transition-colors mb-8"
        >
          Clear all progress
        </button>
      )}
    </div>
  );
}

function CardRow({
  card,
  status,
  isOpen,
  onToggle,
}: {
  card: Card;
  status: "correct" | "incorrect" | "unreviewed";
  isOpen: boolean;
  onToggle: () => void;
}) {
  const borderColor =
    status === "correct" ? "border-green-500/20 bg-green-500/5" :
    status === "incorrect" ? "border-red-500/20 bg-red-500/5" :
    "border-gray-700/50 bg-gray-800/30";

  const icon =
    status === "correct" ? <span className="text-green-400 text-xs font-bold shrink-0">✓</span> :
    status === "incorrect" ? <span className="text-red-400 text-xs font-bold shrink-0">✕</span> :
    <span className="text-gray-600 text-xs shrink-0">—</span>;

  return (
    <div className={`rounded-lg border ${borderColor} overflow-hidden`}>
      <button
        onClick={onToggle}
        className="w-full text-left px-3 py-2.5 flex items-start gap-2.5"
      >
        <div className="mt-0.5">{icon}</div>
        <p className="text-xs text-gray-300 flex-1 leading-relaxed">{card.question}</p>
        <span className="text-gray-600 text-xs shrink-0 mt-0.5">{isOpen ? "▲" : "▼"}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="border-t border-gray-700/50 px-3 py-2.5"
          >
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1.5">Answer</p>
            <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-wrap">{card.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
