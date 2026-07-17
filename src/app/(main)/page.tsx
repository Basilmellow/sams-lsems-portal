"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users, Radio, Phone, Clock, Ambulance, Plane, Megaphone,
  Shield, BookOpen, FileText, ChevronRight,
  GraduationCap, Star, Zap, Award
} from "lucide-react";
import Link from "next/link";
import { announcements, departmentStats, directorsMessage } from "@/data/announcements";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5" />,
  Radio: <Radio className="w-5 h-5" />,
  Phone: <Phone className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Ambulance: <Ambulance className="w-5 h-5" />,
  Plane: <Plane className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  general: "bg-ems-blue/10 text-ems-blue",
  training: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  operations: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  recruitment: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  urgent: "bg-ems-red/10 text-ems-red",
};

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-teal-50 p-8 md:p-10 text-foreground border border-cyan-100"
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-cyan-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="SAMS Logo" className="w-14 h-14 md:w-20 md:h-20 object-contain" />
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-xs uppercase tracking-[0.3em] text-teal-600 mb-2">San Andreas Medical Services</div>
          <h1 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight">LSEMS Documentation Portal</h1>
          <p className="text-muted text-sm md:text-base max-w-lg">
            Standard Operating Procedures, Roster &amp; Training — Your centralized resource for all departmental information.
          </p>
          <div className="flex items-center gap-2 mt-4 text-xs text-muted">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>System Operational · All Services Online</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {departmentStats.map((stat, i) => (
          <motion.div key={stat.label} variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: i * 0.05 }}>
            <Card className="glass-card hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className={`mb-2 ${stat.color}`}>{iconMap[stat.icon]}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Director's Message */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="w-5 h-5 text-ems-gold" />
                Director&apos;s Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-700 to-cyan-600 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-7 h-7 text-ems-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    &quot;{directorsMessage.message}&quot;
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-1 h-8 bg-ems-red rounded-full" />
                    <div>
                      <div className="text-sm font-semibold">{directorsMessage.name}</div>
                      <div className="text-xs text-muted-foreground">{directorsMessage.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="w-5 h-5 text-emerald-500" />
                Department
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Organization</span>
                <span className="font-medium">SAMS / LSEMS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Facility</span>
                <span className="font-medium">Pillbox Hill Medical Center</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Radio</span>
                <span className="font-medium">Channel 6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Min. Duty</span>
                <span className="font-medium">8 hrs/week</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Recruitment</span>
                <span className="font-medium text-emerald-500">Open</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Announcements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Megaphone className="w-5 h-5 text-ems-blue" />
              Latest Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 text-xs font-bold text-muted-foreground">
                    {new Date(ann.date).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium">{ann.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${categoryColors[ann.category]}`}>
                        {ann.category.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{ann.content}</p>
                    <div className="text-[10px] text-muted-foreground mt-1">By {ann.author}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Links Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
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
              <Card className="glass-card hover:shadow-lg transition-all cursor-pointer group h-full">
                <CardContent className="p-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                    {link.icon}
                  </div>
                  <div className="text-sm font-medium">{link.label}</div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground mt-1 group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
