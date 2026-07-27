"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield, Edit3, Trash2, Save, X, Search,
  AlertTriangle, Check, ArrowLeft, UserPlus, Users,
  BarChart3, SaveAll
} from "lucide-react";
import Link from "next/link";
import { PersonnelMember } from "@/data/types";
import { rankHierarchy, postOptions } from "@/data/personnel";

const emptyEntry: PersonnelMember = {
  id: "",
  name: "",
  rank: "",
  rankShort: "",
  callsign: "",
  joinDate: new Date().toISOString().split("T")[0],
  lastPromoDemoDate: new Date().toISOString().split("T")[0],
  promoDemo: "",
  jobStatus: "active",
  post: "Medic",
  ftd: false,
  bikeUnit: false,
  medivac: false,
  fto: false,
  discordTag: "",
};

const ranks = rankHierarchy.map((r) => ({ rank: r.rank, short: r.rank }));
const jobStatuses: Array<{ value: PersonnelMember["jobStatus"]; label: string }> = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "loa", label: "LOA" },
];

interface DashboardStat {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

export default function AdminPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();

  const [roster, setRoster] = useState<PersonnelMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PersonnelMember | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"roster" | "stats">("roster");

  // Stats editing
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [editingStats, setEditingStats] = useState(false);
  const [statsDraft, setStatsDraft] = useState<DashboardStat[]>([]);

  const showToast = useCallback((type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }, []);

  useEffect(() => {
    if (authStatus === "unauthenticated") router.push("/login");
  }, [authStatus, router]);

  useEffect(() => {
    if (authStatus !== "authenticated") return;
    (async () => {
      try {
        const res = await fetch("/api/roster");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setRoster(data);
            setLoading(false);
            return;
          }
        }
      } catch { /* fall through */ }
      const { personnel } = await import("@/data/personnel");
      setRoster(personnel);
      setLoading(false);
    })();
  }, [authStatus]);

  // Fetch stats
  useEffect(() => {
    fetch("/api/stats")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setStats(data);
          setStatsDraft(data);
        }
      })
      .catch(() => {});
  }, []);

  const persist = useCallback((next: PersonnelMember[]) => {
    setRoster(next);
    fetch("/api/roster", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _bulk: true, data: next }),
    }).catch(() => {});
  }, []);

  const saveStats = async () => {
    try {
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: statsDraft }),
      });
      if (res.ok) {
        setStats(statsDraft);
        setEditingStats(false);
        showToast("success", "Dashboard stats updated.");
      } else {
        showToast("error", "Failed to save stats.");
      }
    } catch {
      showToast("error", "Failed to save stats.");
    }
  };

  const addMember = (entry: PersonnelMember) => {
    if (!entry.name.trim() || !entry.rank || !entry.callsign.trim()) {
      showToast("error", "Name, rank, and callsign are required.");
      return;
    }
    if (roster.some((m) => m.callsign === entry.callsign)) {
      showToast("error", `Callsign "${entry.callsign}" is already assigned.`);
      return;
    }
    const newEntry = { ...entry, id: "m_" + Date.now() };
    persist([...roster, newEntry]);
    setIsAdding(false);
    setEditing(null);
    showToast("success", `"${newEntry.name}" added to roster.`);
  };

  const updateMember = (entry: PersonnelMember) => {
    if (!entry.name.trim() || !entry.rank || !entry.callsign.trim()) {
      showToast("error", "Name, rank, and callsign are required.");
      return;
    }
    const dup = roster.find((m) => m.callsign === entry.callsign && m.id !== entry.id);
    if (dup) {
      showToast("error", `Callsign "${entry.callsign}" is already assigned to ${dup.name}.`);
      return;
    }
    persist(roster.map((r) => (r.id === entry.id ? entry : r)));
    setEditing(null);
    showToast("success", `"${entry.name}" updated.`);
  };

  const deleteMember = (id: string) => { setDeleting(id); };

  const confirmDelete = () => {
    if (!deleting) return;
    const member = roster.find((m) => m.id === deleting);
    persist(roster.filter((r) => r.id !== deleting));
    showToast("success", `"${member?.name ?? "Member"}" removed.`);
    setDeleting(null);
  };

  const handleSave = () => {
    if (!editing) return;
    isAdding ? addMember(editing) : updateMember(editing);
  };

  const filtered = roster.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.callsign.toLowerCase().includes(q) || p.rank.toLowerCase().includes(q) || p.post.toLowerCase().includes(q);
  });

  const statsOverview = {
    total: roster.length,
    active: roster.filter((r) => r.jobStatus === "active").length,
    loa: roster.filter((r) => r.jobStatus === "loa").length,
    inactive: roster.filter((r) => r.jobStatus === "inactive").length,
  };

  const isAdmin = (session?.user as any)?.isAdmin;

  if (authStatus === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-ems-teal/30 border-t-ems-teal rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading admin panel…</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy">
        <Card className="glass-card max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-white">Access Denied</h2>
            <p className="text-sm text-gray-400 mb-4">Only authorized department administrators can access roster management.</p>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-ems-teal hover:underline">
              <ArrowLeft className="w-4 h-4" /> Return to Portal
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy">
      {/* Header */}
      <div className="border-b border-navy-border/50 bg-navy-card/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ems-teal to-emerald-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Admin Panel</h1>
                <p className="text-xs text-gray-400">Roster & Dashboard Management</p>
              </div>
            </div>
          </div>
          <span className="text-xs text-gray-500 hidden sm:inline">Signed in as {session.user?.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <AnimatePresence>
          {toast && (
            <motion.div key="toast" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className={`mb-4 p-3 rounded-xl text-sm flex items-center gap-2 ${toast.type === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
              {toast.type === "success" ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab navigation */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "roster" as const, label: "Roster Management", icon: <Users className="w-4 h-4" /> },
            { id: "stats" as const, label: "Dashboard Stats", icon: <BarChart3 className="w-4 h-4" /> },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-ems-teal/10 text-ems-teal border border-ems-teal/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ROSTER TAB */}
        {activeTab === "roster" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total Members", value: statsOverview.total },
                { label: "Active", value: statsOverview.active, color: "text-emerald-400" },
                { label: "On LOA", value: statsOverview.loa, color: "text-amber-400" },
                { label: "Inactive", value: statsOverview.inactive, color: "text-gray-400" },
              ].map((s) => (
                <Card key={s.label} className="glass-card">
                  <CardContent className="p-4">
                    <div className={`text-2xl font-bold text-white ${s.color ?? ""}`}>{s.value}</div>
                    <div className="text-xs text-gray-400">{s.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, callsign, rank, or post…"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-card border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30 placeholder:text-gray-500" />
              </div>
              <button onClick={() => { setIsAdding(true); setEditing({ ...emptyEntry }); }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ems-teal/10 text-ems-teal text-sm font-medium hover:bg-ems-teal/20 transition-colors border border-ems-teal/20">
                <UserPlus className="w-4 h-4" /> Add Member
              </button>
            </div>

            <Card className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-navy-border/50">
                      <th className="text-left px-4 py-3 font-semibold text-gray-400">Member</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-400">Rank</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-400">Callsign</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-400 hidden md:table-cell">Post</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-400">Status</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-400 hidden lg:table-cell">Discord</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 && (
                      <tr><td colSpan={7} className="px-4 py-10 text-center">
                        <Users className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">No members found.</p>
                      </td></tr>
                    )}
                    {filtered.map((p) => (
                      <tr key={p.id} className="border-b border-navy-border/20 hover:bg-white/[0.02] transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ems-teal to-cyan-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-lg shadow-ems-teal/10">
                              {p.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-white truncate">{p.name}</div>
                              <div className="text-xs text-gray-500">Joined {p.joinDate}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">{p.rank}</td>
                        <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-lg bg-navy/80 text-xs font-mono text-gray-300 border border-navy-border/50">{p.callsign}</span></td>
                        <td className="px-4 py-3 text-gray-300 hidden md:table-cell">{p.post}</td>
                        <td className="px-4 py-3">
                          <span className={`flex items-center gap-1.5 text-xs font-medium ${p.jobStatus === "active" ? "text-emerald-400" : p.jobStatus === "loa" ? "text-amber-400" : "text-gray-400"}`}>
                            <span className={`w-2 h-2 rounded-full ${p.jobStatus === "active" ? "bg-emerald-400" : p.jobStatus === "loa" ? "bg-amber-400" : "bg-gray-400"}`} />
                            {p.jobStatus.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{p.discordTag}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <button onClick={() => { setEditing({ ...p }); setIsAdding(false); }}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors" title="Edit">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteMember(p.id)}
                              className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors" title="Remove">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {/* STATS TAB */}
        {activeTab === "stats" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-400">Edit the dashboard statistics shown on the main page. All visitors will see your updates.</p>
              {editingStats ? (
                <div className="flex gap-2">
                  <button onClick={() => { setEditingStats(false); setStatsDraft(stats); }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 border border-navy-border/50 transition-all">
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button onClick={saveStats}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-ems-teal text-white text-sm font-medium hover:bg-ems-teal-dark transition-colors">
                    <SaveAll className="w-4 h-4" /> Save Stats
                  </button>
                </div>
              ) : (
                <button onClick={() => { setEditingStats(true); setStatsDraft([...stats]); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-ems-teal/10 text-ems-teal text-sm font-medium hover:bg-ems-teal/20 border border-ems-teal/20 transition-all">
                  <Edit3 className="w-4 h-4" /> Edit Stats
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(editingStats ? statsDraft : stats).map((stat, i) => (
                <Card key={i} className="glass-card">
                  <CardContent className="p-5">
                    {editingStats ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">Label</label>
                          <input type="text" value={stat.label}
                            onChange={(e) => {
                              const updated = [...statsDraft];
                              updated[i] = { ...updated[i], label: e.target.value };
                              setStatsDraft(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-navy-card border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">Value</label>
                          <input type="text" value={stat.value}
                            onChange={(e) => {
                              const updated = [...statsDraft];
                              const val = isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value);
                              updated[i] = { ...updated[i], value: val };
                              setStatsDraft(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-navy-card border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">Color (hex or tailwind class)</label>
                          <input type="text" value={stat.color}
                            onChange={(e) => {
                              const updated = [...statsDraft];
                              updated[i] = { ...updated[i], color: e.target.value };
                              setStatsDraft(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-navy-card border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div>
                          <div className="text-sm font-medium text-white">{stat.label}</div>
                          <div className="text-xs text-gray-400">Icon: {stat.icon}</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Confirm Delete Dialog */}
      <AnimatePresence>
        {deleting && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[55]" onClick={() => setDeleting(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm z-[56] bg-navy-card border border-navy-border/50 rounded-2xl shadow-2xl p-6 text-center">
              <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Remove Member?</h3>
              <p className="text-sm text-gray-400 mb-6">This will permanently remove <strong className="text-white">{roster.find((m) => m.id === deleting)?.name}</strong> from the roster.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setDeleting(null)} className="px-4 py-2 rounded-xl text-sm text-gray-400 hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={confirmDelete} className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors">Remove</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit / Add Modal */}
      <AnimatePresence>
        {editing && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50" onClick={() => { setEditing(null); setIsAdding(false); }} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg z-[60] bg-navy-card border border-navy-border/50 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-navy-border/50">
                <h3 className="text-lg font-semibold text-white">{isAdding ? "Add New Member" : "Edit Member"}</h3>
                <button onClick={() => { setEditing(null); setIsAdding(false); }} className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Full Name *</label>
                  <input type="text" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-navy border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30" placeholder="e.g. John Smith" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Rank *</label>
                    <select value={editing.rank} onChange={(e) => {
                      const r = ranks.find((r) => r.rank === e.target.value);
                      setEditing({ ...editing, rank: e.target.value, rankShort: r?.short ?? "" });
                    }} className="w-full px-3 py-2.5 rounded-xl bg-navy border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30">
                      <option value="">Select rank…</option>
                      {ranks.map((r) => <option key={r.short} value={r.rank}>{r.rank}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Callsign *</label>
                    <input type="text" value={editing.callsign} onChange={(e) => setEditing({ ...editing, callsign: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-navy border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30" placeholder="e.g. P-550" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Job Status</label>
                    <select value={editing.jobStatus} onChange={(e) => setEditing({ ...editing, jobStatus: e.target.value as PersonnelMember["jobStatus"] })}
                      className="w-full px-3 py-2.5 rounded-xl bg-navy border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30">
                      {jobStatuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Post</label>
                    <select value={editing.post} onChange={(e) => setEditing({ ...editing, post: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-navy border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30">
                      {postOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Join Date</label>
                    <input type="date" value={editing.joinDate} onChange={(e) => setEditing({ ...editing, joinDate: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-navy border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Last Promo/Demo Date</label>
                    <input type="date" value={editing.lastPromoDemoDate} onChange={(e) => setEditing({ ...editing, lastPromoDemoDate: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-navy border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Promo/Demo Description</label>
                  <input type="text" value={editing.promoDemo} onChange={(e) => setEditing({ ...editing, promoDemo: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-navy border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30" placeholder="e.g. Promoted to Paramedic" />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Discord Tag</label>
                  <input type="text" value={editing.discordTag} onChange={(e) => setEditing({ ...editing, discordTag: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-navy border border-navy-border/50 text-white text-sm outline-none focus:ring-2 focus:ring-ems-teal/30" placeholder="e.g. john#1234" />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { key: "ftd", label: "FTD" },
                    { key: "bikeUnit", label: "Bike Unit" },
                    { key: "medivac", label: "Medivac" },
                    { key: "fto", label: "FTO" },
                  ].map((c) => (
                    <label key={c.key} className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-navy border border-navy-border/50 hover:bg-navy-mid transition-colors">
                      <input type="checkbox" checked={(editing as any)[c.key]} onChange={(e) => setEditing({ ...editing, [c.key]: e.target.checked })}
                        className="w-4 h-4 rounded bg-navy-card border-navy-border/50 text-ems-teal focus:ring-ems-teal/30" />
                      <span className="text-xs text-gray-300">{c.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-navy-border/50">
                <button onClick={() => { setEditing(null); setIsAdding(false); }}
                  className="px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={!editing?.name.trim() || !editing?.rank || !editing?.callsign.trim()}
                  className="px-5 py-2 rounded-xl bg-ems-teal text-white text-sm font-medium hover:bg-ems-teal-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                  <Save className="w-4 h-4" /> {isAdding ? "Add Member" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
