"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TopicSelector from "@/components/TopicSelector";
import type { Topic, Difficulty } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [cardCounts, setCardCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => { setCardCounts(d.counts ?? {}); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleStart = ({
    topics,
    difficulty,
    shuffle,
  }: {
    topics: Topic[];
    difficulty: Difficulty | "all";
    shuffle: boolean;
  }) => {
    const params = new URLSearchParams({
      topics: topics.join(","),
      difficulty,
      shuffle: String(shuffle),
    });
    router.push(`/study?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="h-screen max-w-lg mx-auto">
      <TopicSelector cardCounts={cardCounts} onStart={handleStart} />
    </main>
  );
}
