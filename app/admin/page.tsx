"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Topic, Difficulty } from "@/lib/types";
import { TOPIC_LABELS, TOPIC_ICONS, ALL_TOPICS } from "@/lib/types";

interface IngestResult {
  inserted: number;
}

export default function AdminPage() {
  const router = useRouter();
  const [topic, setTopic] = useState<Topic>("accounting");
  const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
  const [aiCount, setAiCount] = useState(10);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IngestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasAiKey, setHasAiKey] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((d) => setHasAiKey(d.hasAiKey))
      .catch(() => setHasAiKey(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("topic", topic);
    formData.append("difficulty", difficulty);
    formData.append("aiCount", String(aiCount));

    try {
      const res = await fetch("/api/ingest", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Ingestion failed");
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const difficulties: Difficulty[] = ["beginner", "intermediate", "advanced"];

  return (
    <div className="min-h-screen max-w-lg mx-auto px-4">
      <div className="flex items-center gap-3 pt-6 pb-5">
        <button onClick={() => router.push("/")} className="text-gray-500 hover:text-gray-300 text-sm">
          ←
        </button>
        <div>
          <h1 className="text-lg font-bold text-white">Upload Guide</h1>
          <p className="text-xs text-gray-500">Parse PDF and generate flashcards</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 pb-10">
        {/* Topic */}
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-2">
            Topic
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ALL_TOPICS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className={`py-2.5 px-3 rounded-xl border text-sm font-medium text-left flex items-center gap-2 transition-all ${
                  topic === t
                    ? "border-blue-500 bg-blue-500/10 text-blue-300"
                    : "border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500"
                }`}
              >
                <span>{TOPIC_ICONS[t]}</span>
                <span>{TOPIC_LABELS[t]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-2">
            Default Difficulty
          </label>
          <div className="flex gap-2">
            {difficulties.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold border capitalize transition-all ${
                  difficulty === d
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-gray-700 bg-gray-900 text-gray-500"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* AI count */}
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-2">
            AI-generated questions: <span className="text-white">{aiCount}</span>
          </label>
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
            <input
              type="range"
              min={0}
              max={30}
              step={5}
              value={aiCount}
              onChange={(e) => setAiCount(parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>0 (guide only)</span>
              <span>30</span>
            </div>
            {hasAiKey === false && aiCount > 0 && (
              <div className="mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                <p className="text-yellow-400 text-xs font-semibold mb-1">API key required</p>
                <p className="text-yellow-400/70 text-xs leading-relaxed">
                  1. Open <code className="bg-gray-800 px-1 rounded">.env.local</code> in the project root<br />
                  2. Replace <code className="bg-gray-800 px-1 rounded">sk-ant-PASTE_YOUR_KEY_HERE</code> with your Anthropic API key<br />
                  3. Restart the dev server
                </p>
              </div>
            )}
          </div>
        </div>

        {/* File upload */}
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest font-semibold block mb-2">
            PDF Guide
          </label>
          <label className="block w-full">
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                file
                  ? "border-blue-500 bg-blue-500/5"
                  : "border-gray-700 bg-gray-900 hover:border-gray-500"
              }`}
            >
              {file ? (
                <div>
                  <p className="text-blue-400 font-medium text-sm">{file.name}</p>
                  <p className="text-gray-500 text-xs mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-400 text-2xl mb-2">📄</p>
                  <p className="text-gray-400 text-sm">Drop PDF here or tap to browse</p>
                  <p className="text-gray-600 text-xs mt-1">Max 50MB</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        {/* Result / Error */}
        {result && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <p className="text-green-400 font-semibold text-sm">
              ✓ {result.inserted} AI-generated cards added to {TOPIC_LABELS[topic]}
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || loading}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all ${
            file && !loading
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-800 text-gray-600 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing PDF...
            </span>
          ) : (
            "Upload & Parse"
          )}
        </button>
      </form>

      {/* Reset */}
      <div className="border-t border-gray-800 mt-2 pt-6 pb-10">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">Danger Zone</p>
        <button
          onClick={async () => {
            if (!confirm("Reset all cards to the original defaults? This will delete any uploaded or AI-generated questions.")) return;
            const res = await fetch("/api/reset", { method: "POST" });
            if (res.ok) {
              alert("Reset complete — all cards restored to defaults.");
            }
          }}
          className="w-full py-3 rounded-xl border border-red-900/50 text-red-500 text-sm font-medium hover:bg-red-500/5 transition-colors"
        >
          Reset to default questions
        </button>
      </div>
    </div>
  );
}
