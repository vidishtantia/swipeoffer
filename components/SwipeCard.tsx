"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { Card } from "@/lib/types";
import { TOPIC_LABELS, TOPIC_BG } from "@/lib/types";

interface SwipeCardProps {
  card: Card;
  isTop: boolean;
  isStarred: boolean;
  cardIndex: number;
  totalCards: number;
  onSwipe: (correct: boolean) => void;
  onStar: () => void;
}

const SWIPE_THRESHOLD = 100;

export default function SwipeCard({
  card,
  isTop,
  isStarred,
  cardIndex,
  totalCards,
  onSwipe,
  onStar,
}: SwipeCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [gone, setGone] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-18, 18]);
  const cardOpacity = useTransform(x, [-300, -200, 0, 200, 300], [0, 1, 1, 1, 0]);

  const correctOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const incorrectOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);
  const correctBorder = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const incorrectBorder = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  const isDragging = useRef(false);

  const flyOut = (direction: "left" | "right") => {
    const targetX = direction === "right" ? 600 : -600;
    setGone(true);
    animate(x, targetX, {
      type: "tween",
      duration: 0.35,
      onComplete: () => onSwipe(direction === "right"),
    });
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    isDragging.current = false;
    if (info.offset.x > SWIPE_THRESHOLD) {
      flyOut("right");
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      flyOut("left");
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  const stackOffset = isTop ? 0 : 6;
  const stackScale = isTop ? 1 : 0.96;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: isTop ? 10 : 5 }}
      animate={{ scale: stackScale, y: stackOffset }}
      transition={{ type: "spring", stiffness: 400, damping: 35 }}
    >
      <motion.div
        className="relative w-full h-full max-w-lg mx-4 rounded-2xl border border-gray-700 bg-[#111827] shadow-2xl no-select overflow-hidden"
        style={{ x, rotate: isTop ? rotate : 0, opacity: isTop ? cardOpacity : 1 }}
        drag={isTop && !gone ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.8}
        onDragStart={() => { isDragging.current = true; }}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        {/* Correct overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-green-500 bg-green-500/10 z-10 pointer-events-none"
          style={{ opacity: correctOpacity }}
        >
          <div className="absolute top-6 left-6">
            <span className="text-green-400 font-bold text-2xl tracking-widest rotate-[-12deg] inline-block border-2 border-green-400 px-3 py-1 rounded-lg">
              CORRECT
            </span>
          </div>
        </motion.div>

        {/* Incorrect overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-red-500 bg-red-500/10 z-10 pointer-events-none"
          style={{ opacity: incorrectOpacity }}
        >
          <div className="absolute top-6 right-6">
            <span className="text-red-400 font-bold text-2xl tracking-widest rotate-[12deg] inline-block border-2 border-red-400 px-3 py-1 rounded-lg">
              WRONG
            </span>
          </div>
        </motion.div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TOPIC_BG[card.topic]} text-white`}>
              {TOPIC_LABELS[card.topic]}
            </span>
            <span className="text-xs text-gray-500 capitalize">{card.difficulty}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-mono">
              {cardIndex + 1} / {totalCards}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); onStar(); }}
              className="text-xl leading-none transition-transform active:scale-75"
              aria-label="Star card"
            >
              {isStarred ? "⭐" : "☆"}
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="px-5 pb-5 h-[calc(100%-80px)] overflow-y-auto">
          {/* Question */}
          <div className="mb-4">
            <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2 font-semibold">Question</p>
            <p className="text-lg font-semibold text-white leading-relaxed">{card.question}</p>
          </div>

          {/* Reveal button / Answer */}
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="w-full mt-4 py-3 rounded-xl border border-gray-600 text-gray-400 text-sm font-medium hover:border-blue-500 hover:text-blue-400 transition-colors"
            >
              Tap to reveal answer ↓
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="border-t border-gray-700 my-4" />
              <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-2 font-semibold">Answer</p>
              <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">{card.answer}</p>
            </motion.div>
          )}
        </div>

        {/* Swipe hint (only when answer revealed) */}
        {revealed && (
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <div className="flex justify-between px-5 pb-4 text-xs text-gray-600">
              <span>← Wrong</span>
              <span>Correct →</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
