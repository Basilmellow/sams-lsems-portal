import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const ROSTER_FILE = join(DATA_DIR, "roster.json");

function readRoster() {
  if (!existsSync(ROSTER_FILE)) {
    writeRoster([]);
  }
  return JSON.parse(readFileSync(ROSTER_FILE, "utf-8"));
}

function writeRoster(data: any[]) {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  writeFileSync(ROSTER_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const roster = readRoster();
  return NextResponse.json(roster);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  // Bulk save: admin sends entire roster
  if (body._bulk && Array.isArray(body.data)) {
    writeRoster(body.data);
    return NextResponse.json({ success: true, count: body.data.length });
  }

  // Single add
  const roster = readRoster();
  const newEntry = { ...body, id: Date.now().toString() };
  roster.push(newEntry);
  writeRoster(roster);
  return NextResponse.json(newEntry, { status: 201 });
}

export async function PUT(req: NextRequest) {
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
