import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { verify } from "jsonwebtoken";

const DATA_DIR = join(process.cwd(), "data");
const ROSTER_FILE = join(DATA_DIR, "roster.json");

function getSecret() {
  return process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "fallback-secret";
}

function requireAdmin(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return { ok: false as const, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  try {
    const token = auth.slice(7);
    const decoded = verify(token, getSecret()) as { isAdmin: boolean };
    if (!decoded.isAdmin) {
      return { ok: false as const, error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
    }
    return { ok: true as const, error: null };
  } catch {
    return { ok: false as const, error: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };
  }
}

function readRoster() {
  if (!existsSync(ROSTER_FILE)) {
    writeFileSync(ROSTER_FILE, "[]", "utf-8");
  }
  return JSON.parse(readFileSync(ROSTER_FILE, "utf-8"));
}

function writeRoster(data: any[]) {
  if (!existsSync(DATA_DIR)) {
    const { mkdirSync } = require("fs");
    mkdirSync(DATA_DIR, { recursive: true });
  }
  writeFileSync(ROSTER_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const roster = readRoster();
  return NextResponse.json(roster);
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.error;

  const body = await req.json();
  const roster = readRoster();
  const newEntry = { ...body, id: Date.now().toString() };
  roster.push(newEntry);
  writeRoster(roster);
  return NextResponse.json(newEntry, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.error;

  const body = await req.json();
  const roster = readRoster();
  const index = roster.findIndex((e: any) => e.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  roster[index] = body;
  writeRoster(roster);
  return NextResponse.json(body);
}

export async function DELETE(req: NextRequest) {
  const auth = requireAdmin(req);
  if (!auth.ok) return auth.error;

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const roster = readRoster();
  const filtered = roster.filter((e: any) => e.id !== id);
  if (filtered.length === roster.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  writeRoster(filtered);
  return NextResponse.json({ success: true });
}
