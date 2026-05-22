import { NextResponse } from "next/server";
import { resetToDefaults } from "@/lib/db";

export const dynamic = "force-dynamic";

export function POST() {
  resetToDefaults();
  return NextResponse.json({ ok: true });
}
