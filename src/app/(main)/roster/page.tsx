"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Search, Shield, Clock, Radio, ChevronDown } from "lucide-react";
import { PersonnelMember } from "@/data/types";
import { personnel as defaultPersonnel, rankHierarchy, postOptions } from "@/data/personnel";

const statusColors: Record<string, string> = {
  active: "bg-emerald-500",
  inactive: "bg-gray-400",
  loa: "bg-amber-500",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
  loa: "LOA",
};

const STORAGE_KEY = "lsems-roster-v3";

const ranks = ["All", ...rankHierarchy.map((r) => r.rank)];
const statuses = ["All", "Active", "Inactive", "LOA"];
const posts = ["All", ...postOptions];

export default function RosterPage() {
  const [search, setSearch] = useState("");
  const [rankFilter, setRankFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [postFilter, setPostFilter] = useState("All");
  const [roster, setRoster] = useState<PersonnelMember[]>(defaultPersonnel);

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) setRoster(parsed);
      } catch { /* ignore */ }
    }
  }, []);

  const filtered = roster.filter((p) => {
    const matchesSearch = search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.callsign.toLowerCase().includes(search.toLowerCase());
    const matchesRank = rankFilter === "All" || p.rank === rankFilter;
    const matchesStatus = statusFilter === "All" ||
      p.jobStatus === statusFilter.toLowerCase();
    const matchesPost = postFilter === "All" || p.post === postFilter;
    return matchesSearch && matchesRank && matchesStatus && matchesPost;
  });

  const stats = {
    total: roster.length,
    active: roster.filter((p) => p.jobStatus === "active").length,
    loa: roster.filter((p) => p.jobStatus === "loa").length,
    inactive: roster.filter((p) => p.jobStatus === "inactive").length,
  };

  const QualBadge = ({ label, value }: { label: string; value: boolean }) => (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium leading-none ${
      value ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-muted/30 text-muted-foreground/50"
    }`}>
      {value ? "✓" : "—"} {label}
    </span>
  );

  return (
    <div>
      <Breadcrumbs />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Roster</h1>
            <p className="text-sm text-muted-foreground">SAMS/LSEMS Personnel Directory</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Personnel", value: stats.total, icon: <Users className="w-4 h-4" /> },
            { label: "Active", value: stats.active, icon: <Shield className="w-4 h-4" />, color: "text-emerald-500" },
            { label: "On LOA", value: stats.loa, icon: <Clock className="w-4 h-4" />, color: "text-amber-500" },
            { label: "Inactive", value: stats.inactive, icon: <Radio className="w-4 h-4" />, color: "text-gray-400" },
          ].map((s) => (
            <Card key={s.label} className="glass-card">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={s.color || "text-foreground"}>{s.icon}</div>
                <div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rank Structure */}
        <Card className="glass-card mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">SAMS Rank Structure</h2>
            <div className="space-y-2">
              {rankHierarchy.map((rank) => (
                <div key={rank.rank} className="flex items-center gap-3">
                  <span className="text-lg">{rank.emoji}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: rank.color }}>
                    {rank.rank.split(" ").map(w => w[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium">{rank.rank}</span>
                    <span className="text-xs text-muted-foreground ml-2">({rank.category})</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or callsign..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border dark:border-border-dark bg-card text-sm outline-none focus:ring-2 focus:ring-ems-red/30"
            />
          </div>
          <select value={rankFilter} onChange={(e) => setRankFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border dark:border-border-dark bg-card text-sm outline-none">
            {ranks.map((r) => <option key={r} value={r}>{r === "All" ? "All Ranks" : r}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border dark:border-border-dark bg-card text-sm outline-none">
            {statuses.map((s) => <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>)}
          </select>
          <select value={postFilter} onChange={(e) => setPostFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border dark:border-border-dark bg-card text-sm outline-none">
            {posts.map((p) => <option key={p} value={p}>{p === "All" ? "All Posts" : p}</option>)}
          </select>
        </div>

        {/* Roster Table */}
        <Card className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border dark:border-border-dark">
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Callsign</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Rank</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Joined</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Last Promo/Demo</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden xl:table-cell">Promo/Demo</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden lg:table-cell">Post</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden xl:table-cell">Qualifications</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden xl:table-cell">Discord</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-border/30 dark:border-border-dark/30 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-md bg-muted/50 text-xs font-mono font-medium">{p.callsign}</span>
                    </td>
                    <td className="px-4 py-3 font-medium">{p.rank}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                          {p.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{p.joinDate}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs text-muted-foreground">{p.lastPromoDemoDate}</td>
                    <td className="px-4 py-3 hidden xl:table-cell text-xs text-muted-foreground">{p.promoDemo}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${statusColors[p.jobStatus]}`} />
                        <span className="text-xs font-medium">{statusLabels[p.jobStatus]}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-xs">{p.post}</td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        <QualBadge label="FTD" value={p.ftd} />
                        <QualBadge label="Bike" value={p.bikeUnit} />
                        <QualBadge label="Medi" value={p.medivac} />
                        <QualBadge label="FTO" value={p.fto} />
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell text-xs text-muted-foreground">{p.discordTag}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">No personnel found matching your filters.</div>
          )}
        </Card>

        {/* Confidentiality Notice */}
        <div className="mt-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs text-muted-foreground">
          <Shield className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
          <span>This roster contains internal SAMS/LSEMS information. Do not distribute or screenshot roster data. Use is restricted to authorized personnel only.</span>
        </div>
      </motion.div>
    </div>
  );
}
