"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users, Radio, Phone, Clock, Ambulance, Plane, Megaphone,
  Shield, BookOpen, FileText, ChevronRight,
  GraduationCap, Star, Zap, Award
} from "lucide-react";
import Link from "next/link";
import { announcements, directorsMessage } from "@/data/announcements";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

interface DashboardStat {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  subtitle?: string;
  badge?: string;
}

const defaultStats: DashboardStat[] = [
  { label: "PERSONNEL", value: 9, icon: "Users", color: "#14B8A6", subtitle: "Currently Active" },
  { label: "ON DUTY", value: 3, icon: "Radio", color: "#22C55E", subtitle: "Right Now", badge: "Online" },
  { label: "CALLS TODAY", value: 34, icon: "Phone", color: "#EF4444", subtitle: "+8 from yesterday" },
  { label: "AVG RESPONSE", value: "3.1m", icon: "Clock", color: "#F59E0B", subtitle: "Target <4 min" },
  { label: "ACTIVE UNITS", value: 3, icon: "Ambulance", color: "#8B5CF6", subtitle: "Available" },
  { label: "MEDIVAC STATUS", value: "Ready", icon: "Plane", color: "#38BDF8", subtitle: "All Systems Go" },
];

const statIconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5" />,
  Radio: <Radio className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Ambulance: <Ambulance className="w-5 h-5" />,
  Plane: <Plane className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  general: "bg-ems-teal/10 text-ems-teal",
  training: "bg-emerald-500/10 text-emerald-500",
  operations: "bg-amber-500/10 text-amber-500",
  recruitment: "bg-violet-500/10 text-violet-400",
  urgent: "bg-ems-red/10 text-ems-red",
};

export default function HomePage() {
  const [stats, setStats] = useState<DashboardStat[]>(defaultStats);

  useEffect(() => {
    fetch("/api/stats")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge API data with subtitles
          const merged = data.map((s: any, i: number) => ({
            ...s,
            subtitle: defaultStats[i]?.subtitle || s.subtitle,
          }));
          setStats(merged);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-8 md:p-10 border border-navy-border/50"
        style={{ background: "linear-gradient(135deg, #08141F 0%, #0E2436 50%, #132634 100%)" }}
      >
        {/* ECG line background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 animate-ecg opacity-20" />
        </div>

        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-navy-card/80 backdrop-blur-sm flex items-center justify-center border border-navy-border/50 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="SAMS Logo" className="w-14 h-14 md:w-18 md:h-18 object-contain" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-ems-teal mb-2 font-medium">
            San Andreas Medical Services
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight text-white">
            Emergency Operations Portal
          </h1>
          <p className="text-sm text-gray-400 max-w-lg">
            Standard Operating Procedures, Roster &amp; Training — Your centralized command center for all departmental operations.
          </p>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Services Online</span>
            </div>
            <span className="text-gray-600">·</span>
            <span>System Operational</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions - ABOVE Department Status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <h2 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: "SOPs", href: "/sop", icon: <FileText className="w-5 h-5" />, color: "from-blue-500 to-blue-600" },
            { label: "EMS Interactions", href: "/interactions", icon: <Zap className="w-5 h-5" />, color: "from-amber-500 to-orange-600" },
            { label: "MEDIVAC Division", href: "/medivac", icon: <Plane className="w-5 h-5" />, color: "from-cyan-500 to-blue-600" },
            { label: "Field Training Dept", href: "/ftd", icon: <GraduationCap className="w-5 h-5" />, color: "from-emerald-500 to-green-600" },
            { label: "Roster", href: "/roster", icon: <Users className="w-5 h-5" />, color: "from-violet-500 to-purple-600" },
            { label: "Certificates", href: "/certificates", icon: <Award className="w-5 h-5" />, color: "from-amber-500 to-yellow-600" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="glass-card monitor-card hover:shadow-lg hover:border-ems-teal/30 transition-all cursor-pointer group h-full">
                <CardContent className="p-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                    {link.icon}
                  </div>
                  <div className="text-sm font-medium text-white">{link.label}</div>
                  <ChevronRight className="w-4 h-4 text-gray-500 mt-1 group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Department Status - Hospital Monitoring Equipment Style */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Department Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.25 + i * 0.05 }}>
              <Card className="glass-card monitor-card hover:shadow-lg transition-all group hover:border-ems-teal/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + "15" }}>
                      <span style={{ color: stat.color }}>{statIconMap[stat.icon]}</span>
                    </div>
                    {stat.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        {stat.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-white" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-medium text-gray-300 mt-0.5">{stat.label}</div>
                  {stat.subtitle && (
                    <div className="text-[10px] text-gray-500 mt-1">{stat.subtitle}</div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Director's Message */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white">
                <Star className="w-5 h-5 text-amber-500" />
                Director&apos;s Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-300 italic leading-relaxed">
                    &quot;{directorsMessage.message}&quot;
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-1 h-8 bg-ems-red rounded-full" />
                    <div>
                      <div className="text-sm font-semibold text-white">{directorsMessage.name}</div>
                      <div className="text-xs text-gray-400">{directorsMessage.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Department Info Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-white">
                <GraduationCap className="w-5 h-5 text-ems-teal" />
                Department
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { label: "Organization", value: "SAMS / LSEMS" },
                { label: "Facility", value: "Pillbox Hill Medical Center" },
                { label: "Radio", value: "Channel 6" },
                { label: "Min. Duty", value: "8 hrs/week" },
                { label: "Recruitment", value: "Open", highlight: true },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-gray-400">{item.label}</span>
                  <span className={`font-medium ${item.highlight ? "text-emerald-400" : "text-white"}`}>{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Announcements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} id="announcements">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <Megaphone className="w-5 h-5 text-ems-teal" />
              Latest Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-navy/80 border border-navy-border/50 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-gray-400">
                    {new Date(ann.date).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-white">{ann.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[ann.category]}`}>
                        {ann.category.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{ann.content}</p>
                    <div className="text-[10px] text-gray-500 mt-1">By {ann.author}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
