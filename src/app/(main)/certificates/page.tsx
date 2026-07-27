"use client";

import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Heart, Plane, BookOpen, Check } from "lucide-react";
import { certificates } from "@/data/forms-resources";

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-6 h-6" />,
  Plane: <Plane className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
};

const certColors: Record<string, string> = {
  "medical-certificate": "from-ems-red to-rose-600",
  "medivac-certification": "from-cyan-500 to-blue-600",
  "fto-certification": "from-emerald-500 to-green-600",
};

export default function CertificatesPage() {
  return (
    <div>
      <Breadcrumbs />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Certificates</h1>
            <p className="text-sm text-gray-400">SAMS/LSEMS Professional Certifications</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certificates.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card overflow-hidden h-full">
                <div className={`h-2 bg-gradient-to-r ${certColors[cert.id] || "from-gray-400 to-gray-500"}`} />
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${certColors[cert.id] || "from-gray-400 to-gray-500"} flex items-center justify-center text-white`}>
                      {iconMap[cert.icon] || <Award className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="text-lg">{cert.title}</div>
                      <div className="text-xs text-gray-400 font-normal mt-0.5">SAMS Certification</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 mb-4">{cert.description}</p>
                  <h4 className="text-sm font-semibold mb-3 text-white">Requirements:</h4>
                  <div className="space-y-2">
                    {cert.requirements.map((req, ri) => (
                      <div key={ri} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-ems-teal mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{req}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
