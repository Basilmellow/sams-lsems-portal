"use client";

import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ChevronRight, ArrowUp, Shield, Radio, Hash, Palette, Heart, ShieldAlert, Ambulance, Building2, Clock, CalendarOff, TrendingUp, Gavel, UserPlus, ClipboardCheck, Monitor, DollarSign, ShieldCheck, Scale, HelpCircle } from "lucide-react";
import Link from "next/link";
import { sopChapters, sopCategories } from "@/data/sop-chapters";

const iconMap: Record<string, React.ReactNode> = {
  ArrowUp: <ArrowUp className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Radio: <Radio className="w-5 h-5" />,
  Hash: <Hash className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  Ambulance: <Ambulance className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  CalendarOff: <CalendarOff className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Gavel: <Gavel className="w-5 h-5" />,
  UserPlus: <UserPlus className="w-5 h-5" />,
  ClipboardCheck: <ClipboardCheck className="w-5 h-5" />,
  Monitor: <Monitor className="w-5 h-5" />,
  DollarSign: <DollarSign className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
  HelpCircle: <HelpCircle className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  Administration: "from-blue-500 to-blue-600",
  Communications: "from-amber-500 to-orange-500",
  Medical: "from-ems-red to-rose-600",
  Operations: "from-emerald-500 to-green-600",
};

export default function SOPIndex() {
  return (
    <div>
      <Breadcrumbs />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-ems-blue/10 flex items-center justify-center text-ems-blue">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Standard Operating Procedures</h1>
            <p className="text-sm text-gray-400">SAMS/LSEMS Administrative Policies &amp; SOP · Current as of July 2026</p>
          </div>
        </div>

        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-3">EMS Oath</h2>
            <blockquote className="border-l-4 border-ems-red pl-4 py-2 bg-ems-red/5 rounded-r-lg text-sm italic text-gray-400">
              &quot;I, _______________, do solemnly swear (or affirm) that I will support and defend the Constitution of the State of San Andreas against all enemies, foreign and domestic; that I will bear true faith and allegiance to the Constitution of the State of San Andreas; that I take this obligation freely, without any mental reservation or purpose of evasion, and that I will well and faithfully discharge the duties of the office upon which I am about to enter.&quot;
            </blockquote>
          </CardContent>
        </Card>

        {sopCategories.map((cat) => {
          const chapters = sopChapters.filter((ch) => ch.category === cat);
          return (
            <div key={cat} className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${categoryColors[cat] || "from-gray-400 to-gray-500"}`} />
                {cat}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {chapters.map((ch, i) => (
                  <motion.div key={ch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <Link href={`/sop/${ch.id}`}>
                      <Card className="glass-card hover:shadow-lg transition-all group cursor-pointer h-full">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-ems-red/10 flex items-center justify-center text-ems-red flex-shrink-0 group-hover:scale-110 transition-transform">
                              {iconMap[ch.icon] || <FileText className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium group-hover:text-ems-red transition-colors">{ch.title}</div>
                              <div className="text-[10px] text-gray-400 mt-1">Updated {ch.lastUpdated}</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
