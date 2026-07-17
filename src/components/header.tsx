"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Moon, Sun, X, FileText, Users, Plane, GraduationCap, Heart, LogIn, Shield, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signIn, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { sopChapters } from "@/data/sop-chapters";
import { personnel } from "@/data/personnel";
import { medivacChapters } from "@/data/medivac";
import { ftdChapters } from "@/data/ftd";
import { interactionScenarios } from "@/data/interactions";
import Link from "next/link";

interface SearchResult {
  title: string;
  category: string;
  href: string;
  icon: React.ReactNode;
}

export function Header() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const search = useCallback((q: string) => {
    if (!q.trim()) { setResults([]); return; }
    const lower = q.toLowerCase();
    const found: SearchResult[] = [];

    sopChapters.forEach(ch => {
      if (ch.title.toLowerCase().includes(lower) || ch.content.toLowerCase().includes(lower)) {
        found.push({ title: ch.title, category: "SOP", href: `/sop/${ch.id}`, icon: <FileText className="w-4 h-4" /> });
      }
    });
    interactionScenarios.forEach(sc => {
      if (sc.title.toLowerCase().includes(lower) || sc.content.toLowerCase().includes(lower)) {
        found.push({ title: sc.title, category: "EMS Interactions", href: `/interactions/${sc.id}`, icon: <Heart className="w-4 h-4" /> });
      }
    });
    medivacChapters.forEach(ch => {
      if (ch.title.toLowerCase().includes(lower) || ch.content.toLowerCase().includes(lower)) {
        found.push({ title: ch.title, category: "MEDIVAC", href: `/medivac/${ch.id}`, icon: <Plane className="w-4 h-4" /> });
      }
    });
    ftdChapters.forEach(ch => {
      if (ch.title.toLowerCase().includes(lower) || ch.content.toLowerCase().includes(lower)) {
        found.push({ title: ch.title, category: "FTD", href: `/ftd/${ch.id}`, icon: <GraduationCap className="w-4 h-4" /> });
      }
    });
    personnel.forEach(p => {
      if (p.name.toLowerCase().includes(lower) || p.callsign.toLowerCase().includes(lower) || p.rank.toLowerCase().includes(lower)) {
        found.push({ title: `${p.name} (${p.callsign})`, category: "Roster", href: "/roster", icon: <Users className="w-4 h-4" /> });
      }
    });

    setResults(found.slice(0, 10));
  }, []);

  const isAdmin = (session?.user as any)?.isAdmin;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border dark:border-border-dark">
        <div className="flex items-center justify-between h-14 px-4 bg-card/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 md:ml-0 ml-12">
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                ● ONLINE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border dark:border-border-dark text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-muted rounded border border-border dark:border-border-dark">
                ⌘K
              </kbd>
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground"
                title="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {/* User / Admin Login */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-ems-red to-rose-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {(session.user?.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{session.user?.name?.split(" ")[0]}</span>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-card border border-border dark:border-border-dark rounded-xl shadow-xl overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-border dark:border-border-dark">
                          <div className="text-sm font-medium">{session.user?.name}</div>
                          <div className="text-xs text-muted-foreground">{session.user?.email}</div>
                          {isAdmin && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-ems-red/10 text-ems-red font-medium mt-1 inline-block">
                              ADMIN
                            </span>
                          )}
                        </div>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors"
                          >
                            <Shield className="w-4 h-4 text-ems-red" />
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={() => { signOut(); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors text-red-500"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/30 transition-colors"
                title="Admin sign-in"
              >
                <LogIn className="w-3 h-3" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Search dialog */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[100]"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-[101] bg-card border border-border dark:border-border-dark rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border dark:border-border-dark">
                <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); search(e.target.value); }}
                  placeholder="Search SOPs, roster, protocols..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  autoFocus
                />
                <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {results.length > 0 && (
                <div className="max-h-[300px] overflow-y-auto p-2">
                  {results.map((result, i) => (
                    <button
                      key={i}
                      onClick={() => { router.push(result.href); setSearchOpen(false); setQuery(""); setResults([]); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-muted-foreground">{result.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{result.title}</div>
                        <div className="text-xs text-muted-foreground">{result.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {query && results.length === 0 && (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  No results found for &quot;{query}&quot;
                </div>
              )}

              {!query && (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  Type to search across all documentation
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
