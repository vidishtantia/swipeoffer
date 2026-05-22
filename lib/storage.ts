"use client";

import type { UserProgress, CardResult } from "./types";

const STORAGE_KEY = "ib_flashcard_progress";

function getProgress(): UserProgress {
  if (typeof window === "undefined") return { results: [], starred: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { results: [], starred: [] };
    return JSON.parse(raw) as UserProgress;
  } catch {
    return { results: [], starred: [] };
  }
}

function saveProgress(progress: UserProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function recordResult(cardId: number, correct: boolean) {
  const progress = getProgress();
  progress.results.push({ cardId, correct, timestamp: Date.now() });
  saveProgress(progress);
}

export function undoLastResult(): CardResult | null {
  const progress = getProgress();
  if (progress.results.length === 0) return null;
  const last = progress.results.pop()!;
  saveProgress(progress);
  return last;
}

export function toggleStarred(cardId: number): boolean {
  const progress = getProgress();
  const idx = progress.starred.indexOf(cardId);
  if (idx === -1) {
    progress.starred.push(cardId);
    saveProgress(progress);
    return true;
  } else {
    progress.starred.splice(idx, 1);
    saveProgress(progress);
    return false;
  }
}

export function isStarred(cardId: number): boolean {
  return getProgress().starred.includes(cardId);
}

export function getStarredIds(): number[] {
  return getProgress().starred;
}

export function getAllResults(): CardResult[] {
  return getProgress().results;
}

export function getResultsForCards(cardIds: number[]): CardResult[] {
  const idSet = new Set(cardIds);
  return getProgress().results.filter((r) => idSet.has(r.cardId));
}

export function clearProgress() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
