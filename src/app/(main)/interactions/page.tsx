"use client";

import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Siren, ChevronRight, Shield, Heart, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { interactionScenarios, interactionCategories } from "@/data/interactions";

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-5 h-5" />,
  Siren: <Siren className="w-5 h-5" />,
  Car: <Shield className="w-5 h-5" />,
  UserX: <Shield className="w-5 h-5" />,
  AlertTriangle: <ShieldAlert className="w-5 h-5" />,
  FileText: <Heart className="w-5 h-5" />,
};

const catColors: Record<string, string> = {
  "Police Department": "from-blue-500 to-blue-600",
  "Department of Justice": "from-violet-500 to-purple-600",
};

export default function InteractionsIndex() {
  return (
    <div>
      <Breadcrumbs />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Siren className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">EMS Interactions</h1>
            <p className="text-sm text-gray-400">Cross-agency protocols and coordination procedures</p>
          </div>
        </div>

        {interactionCategories.map((cat) => {
          const scenarios = interactionScenarios.filter((s) => s.category === cat);
          return (
            <div key={cat} className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${catColors[cat] || "from-gray-400 to-gray-500"}`} />
                {cat}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {scenarios.map((sc, i) => (
                  <motion.div key={sc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <Link href={`/interactions/${sc.id}`}>
                      <Card className="glass-card hover:shadow-lg transition-all group cursor-pointer h-full">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                              {iconMap[sc.icon] || <Siren className="w-5 h-5" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium group-hover:text-amber-500 transition-colors">{sc.title}</div>
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
