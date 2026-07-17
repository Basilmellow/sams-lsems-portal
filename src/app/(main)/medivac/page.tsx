"use client";

import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, ChevronRight, HeartPulse, Helicopter, Crosshair, AlertTriangle, Award } from "lucide-react";
import Link from "next/link";
import { medivacChapters } from "@/data/medivac";

const iconMap: Record<string, React.ReactNode> = {
  Plane: <Plane className="w-5 h-5" />,
  HeartPulse: <HeartPulse className="w-5 h-5" />,
  Helicopter: <Helicopter className="w-5 h-5" />,
  Crosshair: <Crosshair className="w-5 h-5" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
};

export default function MedivacIndex() {
  return (
    <div>
      <Breadcrumbs />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">MEDIVAC Division</h1>
            <p className="text-sm text-muted-foreground">Air Medical Transport Operations &amp; Procedures</p>
          </div>
        </div>

        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              The MEDIVAC division provides rapid air medical transport for critically injured or ill patients throughout San Andreas. All MEDIVAC operations follow strict safety protocols and require specialized certifications.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold text-cyan-500">2</div>
                <div className="text-xs text-muted-foreground">Aircraft</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold text-cyan-500">24/7</div>
                <div className="text-xs text-muted-foreground">Availability</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold text-emerald-500">Ready</div>
                <div className="text-xs text-muted-foreground">Status</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {medivacChapters.map((ch, i) => (
            <motion.div key={ch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Link href={`/medivac/${ch.id}`}>
                <Card className="glass-card hover:shadow-lg transition-all group cursor-pointer h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                        {iconMap[ch.icon] || <Plane className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium group-hover:text-cyan-500 transition-colors">{ch.title}</div>
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
