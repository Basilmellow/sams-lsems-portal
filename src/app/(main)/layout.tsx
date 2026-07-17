"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Lock } from "lucide-react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
        <footer className="border-t border-border dark:border-border-dark py-4 px-6 text-center text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Lock className="w-3 h-3" />
            <span>Confidential — For authorized SAMS/LSEMS personnel only. Do not distribute.</span>
          </div>
          <p>Los Santos Emergency Medical Services · San Andreas Medical Services</p>
          <p className="mt-1">
            Created by <span className="font-medium">basilmellow</span> · Current as of: July 2026 · v3.0.0
          </p>
        </footer>
      </div>
    </>
  );
}
