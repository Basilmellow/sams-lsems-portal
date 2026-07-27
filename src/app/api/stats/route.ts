import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const STATS_FILE = join(DATA_DIR, "stats.json");

const defaultStats = [
  { label: "Active Personnel", value: 9, icon: "Users", color: "text-[#14B8A6]" },
  { label: "On Duty Now", value: 3, icon: "Radio", color: "text-emerald-500" },
  { label: "Calls Today", value: 34, icon: "Phone", color: "text-[#EF4444]" },
  { label: "Avg Response Time", value: "3.1m", icon: "Clock", color: "text-amber-500" },
  { label: "Active Units", value: 3, icon: "Ambulance", color: "text-violet-500" },
  { label: "MEDIVAC Status", value: "Ready", icon: "Plane", color: "text-[#38BDF8]" },
];

function readStats() {
  if (!existsSync(STATS_FILE)) {
    writeStats(defaultStats);
  }
  return JSON.parse(readFileSync(STATS_FILE, "utf-8"));
}

function writeStats(data: any[]) {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  writeFileSync(STATS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  return NextResponse.json(readStats());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const stats = body.data || body;
  writeStats(stats);
  return NextResponse.json({ success: true, stats });
}
