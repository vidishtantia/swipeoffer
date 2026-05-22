"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Card, Topic } from "@/lib/types";
import { TOPIC_LABELS, TOPIC_BG, ALL_TOPICS } from "@/lib/types";
import { getStarredIds, toggleStarred } from "@/lib/storage";

export default function StarredPage() {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Topic | "all">("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [starredIds, setStarredIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const ids = getStarredIds();
    setStarredIds(new Set(ids));
    if (ids.length === 0) { setLoading(false); return; }

    fetch("/api/cards/starred", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    })
      .then((r) => r.json())
      .then((d) => { setCards(d.cards ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleUnstar = (cardId: number) => {
    toggleStarred(cardId);
    setCards((cs) => cs.filter((c) => c.id !== cardId));
    setStarredIds((s) => { const n = new Set(s); n.delete(cardId); return n; });
  };

  const filtered = filter === "all" ? cards : cards.filter((c) => c.topic === filter);
  const topicsPresent = [...new Set(cards.map((c) => c.topic))];

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
          <h1 className="text-lg font-bold text-white">Starred Cards</h1>
          <p className="text-xs text-gray-500">{cards.length} bookmarked</p>
        </div>
      </div>

      {/* Topic filter */}
      {topicsPresent.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          <button
            onClick={() => setFilter("all")}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filter === "all"
                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                : "border-gray-700 text-gray-500"
            }`}
          >
            All
          </button>
          {topicsPresent.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filter === t
                  ? `border-transparent ${TOPIC_BG[t]} text-white`
                  : "border-gray-700 text-gray-500"
              }`}
            >
              {TOPIC_LABELS[t]}
            </button>
          ))}
        </div>
      )}

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">☆</p>
          <p className="text-gray-400">No starred cards yet</p>
          <p className="text-gray-600 text-sm mt-1">Tap the star on any flashcard to bookmark it</p>
        </div>
      ) : (
        <div className="space-y-3 pb-8">
          {filtered.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
            >
              {/* div instead of button to avoid nested-button hydration error */}
              <div
                onClick={() => setExpandedId(expandedId === card.id ? null : card.id)}
                className="w-full text-left p-4 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TOPIC_BG[card.topic]} text-white`}>
                        {TOPIC_LABELS[card.topic]}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">{card.difficulty}</span>
                    </div>
                    <p className="text-sm font-medium text-white">{card.question}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleUnstar(card.id); }}
                      className="text-yellow-400 text-lg"
                    >
                      ⭐
                    </button>
                    <span className="text-gray-600 text-xs">{expandedId === card.id ? "▲" : "▼"}</span>
                  </div>
                </div>
              </div>

              {expandedId === card.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 pb-4 border-t border-gray-800 pt-3"
                >
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1.5 font-semibold">Answer</p>
                  <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{card.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
