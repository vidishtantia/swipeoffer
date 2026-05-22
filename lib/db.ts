import { DatabaseSync } from "node:sqlite";
import path from "path";
import type { Card, Topic, Difficulty, CardSource } from "./types";
import { seedData } from "./seed-data";

// Vercel's project root is read-only; use /tmp (writable) when deployed
const DB_PATH = process.env.VERCEL
  ? "/tmp/flashcards.db"
  : path.join(process.cwd(), "flashcards.db");

let _db: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (_db) return _db;
  _db = new DatabaseSync(DB_PATH);
  _db.exec("PRAGMA journal_mode=WAL");
  initSchema(_db);
  return _db;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS cards (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      topic       TEXT    NOT NULL,
      question    TEXT    NOT NULL,
      answer      TEXT    NOT NULL,
      difficulty  TEXT    NOT NULL DEFAULT 'intermediate',
      source      TEXT    NOT NULL DEFAULT 'seed',
      created_at  INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );
    CREATE INDEX IF NOT EXISTS idx_cards_topic ON cards(topic);
    CREATE INDEX IF NOT EXISTS idx_cards_difficulty ON cards(difficulty);
  `);

  const row = db.prepare("SELECT COUNT(*) as n FROM cards").get() as unknown as { n: number };
  if (row.n === 0) {
    seedDatabase(db);
  }
}

function seedDatabase(db: DatabaseSync) {
  const insert = db.prepare(
    "INSERT INTO cards (topic, question, answer, difficulty, source) VALUES (?, ?, ?, ?, ?)"
  );
  for (const row of seedData) {
    insert.run(row.topic, row.question, row.answer, row.difficulty, row.source);
  }
}

export function getCards(topics: Topic[], difficulty?: string): Card[] {
  const db = getDb();
  const placeholders = topics.map(() => "?").join(", ");
  let sql = `SELECT * FROM cards WHERE topic IN (${placeholders})`;
  const params: unknown[] = [...topics];

  if (difficulty && difficulty !== "all") {
    sql += " AND difficulty = ?";
    params.push(difficulty);
  }

  sql += " ORDER BY id";
  return db.prepare(sql).all(...params) as unknown as Card[];
}

export function getCardById(id: number): Card | null {
  const db = getDb();
  return (db.prepare("SELECT * FROM cards WHERE id = ?").get(id) as unknown as Card) ?? null;
}

export function insertCard(card: {
  topic: Topic;
  question: string;
  answer: string;
  difficulty: Difficulty;
  source: CardSource;
}): number {
  const db = getDb();
  const result = db
    .prepare(
      "INSERT INTO cards (topic, question, answer, difficulty, source) VALUES (?, ?, ?, ?, ?)"
    )
    .run(card.topic, card.question, card.answer, card.difficulty, card.source);
  return result.lastInsertRowid as number;
}

export function insertCards(
  cards: Array<{
    topic: Topic;
    question: string;
    answer: string;
    difficulty: Difficulty;
    source: CardSource;
  }>
) {
  const db = getDb();
  const insert = db.prepare(
    "INSERT INTO cards (topic, question, answer, difficulty, source) VALUES (?, ?, ?, ?, ?)"
  );
  for (const card of cards) {
    insert.run(card.topic, card.question, card.answer, card.difficulty, card.source);
  }
}

export function resetToDefaults() {
  const db = getDb();
  db.exec("DELETE FROM cards");
  seedDatabase(db);
}

export function getCardCountByTopic(): Record<string, number> {
  const db = getDb();
  const rows = db
    .prepare("SELECT topic, COUNT(*) as count FROM cards GROUP BY topic")
    .all() as unknown as Array<{ topic: string; count: number }>;
  return Object.fromEntries(rows.map((r) => [r.topic, r.count]));
}

export function getCardsByIds(ids: number[]): Card[] {
  if (ids.length === 0) return [];
  const db = getDb();
  const placeholders = ids.map(() => "?").join(", ");
  return db
    .prepare(`SELECT * FROM cards WHERE id IN (${placeholders})`)
    .all(...ids) as unknown as Card[];
}
