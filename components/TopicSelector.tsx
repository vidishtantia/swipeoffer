"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Topic, Difficulty } from "@/lib/types";
import {
  TOPIC_LABELS,
  TOPIC_ICONS,
  TOPIC_GRADIENTS,
  ALL_TOPICS,
} from "@/lib/types";

interface TopicSelectorProps {
  cardCounts: Record<string, number>;
  onStart: (config: {
    topics: Topic[];
    difficulty: Difficulty | "all";
    shuffle: boolean;
  }) => void;
}

export default function TopicSelector({ cardCounts, onStart }: TopicSelectorProps) {
  const [selected, setSelected] = useState<Topic[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [shuffle, setShuffle] = useState(true);

  const toggleTopic = (topic: Topic) => {
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const selectAll = () => setSelected([...ALL_TOPICS]);
  const clearAll = () => setSelected([]);

  const totalCards = selected.reduce((sum, t) => sum + (cardCounts[t] ?? 0), 0);
  const canStart = selected.length > 0;

  const difficulties: Array<{ value: Difficulty | "all"; label: string }> = [
    { value: "all", label: "All" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">SwipeOffer</h1>
        <p className="text-gray-400 text-sm mt-1">Select topics to study</p>
      </div>

      {/* Mixed Mode button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          if (selected.length === ALL_TOPICS.length) {
            clearAll();
          } else {
            selectAll();
          }
        }}
        className={`w-full py-4 rounded-2xl border-2 font-bold text-base mb-4 transition-all ${
          selected.length === ALL_TOPICS.length
            ? "border-blue-500 bg-blue-500/10 text-blue-400"
            : "border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500"
        }`}
      >
        {selected.length === ALL_TOPICS.length ? "✓ " : ""}Mixed Mode (All Topics)
      </motion.button>

      {/* Topic grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {ALL_TOPICS.map((topic, i) => {
          const isSelected = selected.includes(topic);
          const count = cardCounts[topic] ?? 0;
          return (
            <motion.button
              key={topic}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleTopic(topic)}
              className={`relative rounded-xl p-4 border-2 text-left transition-all ${
                isSelected
                  ? "border-transparent"
                  : "border-gray-700 bg-gray-900 hover:border-gray-500"
              }`}
              style={
                isSelected
                  ? { background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }
                  : {}
              }
            >
              {isSelected && (
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${TOPIC_GRADIENTS[topic]} opacity-90`}
                />
              )}
              <div className="relative z-10">
                <div className="text-2xl mb-1.5">{TOPIC_ICONS[topic]}</div>
                <div className={`text-sm font-semibold ${isSelected ? "text-white" : "text-gray-300"}`}>
                  {TOPIC_LABELS[topic]}
                </div>
                <div className={`text-xs mt-0.5 ${isSelected ? "text-white/70" : "text-gray-500"}`}>
                  {count} cards
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 text-white/80 text-sm font-bold">✓</div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Difficulty filter */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">Difficulty</p>
        <div className="flex gap-2">
          {difficulties.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setDifficulty(value)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all ${
                difficulty === value
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-gray-700 bg-gray-900 text-gray-500 hover:border-gray-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Shuffle toggle */}
      <div className="flex items-center justify-between mb-6 py-3 px-4 bg-gray-900 rounded-xl border border-gray-800">
        <span className="text-sm text-gray-300 font-medium">Shuffle cards</span>
        <button
          onClick={() => setShuffle((s) => !s)}
          className={`w-11 h-6 rounded-full transition-colors relative ${
            shuffle ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          <div
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              shuffle ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {/* Start button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={!canStart}
        onClick={() => onStart({ topics: selected, difficulty, shuffle })}
        className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
          canStart
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/40"
            : "bg-gray-800 text-gray-600 cursor-not-allowed"
        }`}
      >
        {canStart
          ? `Start Session · ${totalCards} cards`
          : "Select at least one topic"}
      </motion.button>

      {/* Footer links */}
      <div className="flex justify-center gap-6 mt-5">
        <a href="/starred" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ⭐ Starred
        </a>
        <a href="/stats" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          📊 Stats
        </a>
        <a href="/admin" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          ⬆ Upload PDF
        </a>
      </div>
    </div>
  );
}
