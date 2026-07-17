"use client";

import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, ChevronRight, BookOpen, TrendingUp, ClipboardCheck, Award, Clock, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { ftdChapters } from "@/data/ftd";

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  ClipboardCheck: <ClipboardCheck className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  BadgeCheck: <BadgeCheck className="w-5 h-5" />,
};

export default function FTDIndex() {
  return (
    <div>
      <Breadcrumbs />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Field Training Department</h1>
            <p className="text-sm text-muted-foreground">FTO Policies, Trainee Progression &amp; Certification</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ftdChapters.map((ch, i) => (
            <motion.div key={ch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Link href={`/ftd/${ch.id}`}>
                <Card className="glass-card hover:shadow-lg transition-all group cursor-pointer h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                        {iconMap[ch.icon] || <GraduationCap className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium group-hover:text-emerald-500 transition-colors">{ch.title}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform flex-shrink-0 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
