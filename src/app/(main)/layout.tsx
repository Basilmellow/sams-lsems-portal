"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
        <footer className="border-t border-navy-border/30 bg-navy-card/50 backdrop-blur-sm py-4 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <div className="text-xs font-medium text-gray-300">San Andreas Medical Services</div>
                <div className="text-[10px] text-gray-500">Emergency Operations Portal</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-gray-500">Version 3.1</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-gray-400">System Online</span>
                </div>
                <span className="text-[10px] text-gray-500">
                  Developed by <span className="font-medium text-gray-400">basilmellow</span>
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
