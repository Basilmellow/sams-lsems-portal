"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, FileText, Shield, Plane, GraduationCap, Users,
  Award, ChevronDown, ChevronRight,
  Menu, X, Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
  {
    label: "SOP", href: "/sop", icon: <FileText className="w-4 h-4" />,
    children: [
      { label: "Chain of Command", href: "/sop/chain-of-command" },
      { label: "Rank Structure", href: "/sop/rank-structure" },
      { label: "Callsigns", href: "/sop/callsigns" },
      { label: "Radio Procedures", href: "/sop/radio-procedures" },
      { label: "10-Codes", href: "/sop/ten-codes" },
      { label: "Hospital Color Codes", href: "/sop/hospital-color-codes" },
      { label: "Medical Protocols", href: "/sop/medical-protocols" },
      { label: "Scene Safety", href: "/sop/scene-safety" },
      { label: "Patient Transport", href: "/sop/patient-transport" },
      { label: "Hospital Procedures", href: "/sop/hospital-procedures" },
      { label: "Duty Procedures", href: "/sop/duty-procedures" },
      { label: "Leave Policy", href: "/sop/leave-policy" },
      { label: "Promotion Policy", href: "/sop/promotion-policy" },
      { label: "Discipline", href: "/sop/discipline" },
      { label: "Recruitment", href: "/sop/recruitment-sop" },
      { label: "Interview SOP", href: "/sop/interview-sop" },
      { label: "MDT / Dispatch", href: "/sop/mdt-guide" },
      { label: "Billing", href: "/sop/billing" },
      { label: "Insurance", href: "/sop/insurance" },
      { label: "General Conduct", href: "/sop/general-conduct" },
      { label: "FAQ", href: "/sop/faq" },
    ],
  },
  {
    label: "EMS Interactions", href: "/interactions", icon: <Shield className="w-4 h-4" />,
    children: [
      { label: "Crime Scene Response", href: "/interactions/pd-crime-scene" },
      { label: "Active Shootout", href: "/interactions/pd-active-shootout" },
      { label: "Traffic Accident", href: "/interactions/pd-traffic-accident" },
      { label: "Hostage Incident", href: "/interactions/pd-hostage" },
      { label: "Disaster Response", href: "/interactions/pd-disaster-response" },
      { label: "DOJ / Court", href: "/interactions/doj-medical-reports" },
    ],
  },
  {
    label: "MEDIVAC Division", href: "/medivac", icon: <Plane className="w-4 h-4" />,
    children: [
      { label: "Overview", href: "/medivac/medivac-intro" },
      { label: "Pilot SOP", href: "/medivac/medivac-pilot-sop" },
      { label: "Flight Medic SOP", href: "/medivac/medivac-medic-sop" },
      { label: "Aircraft Procedures", href: "/medivac/medivac-aircraft" },
      { label: "Landing Zones", href: "/medivac/medivac-landing-zones" },
      { label: "Emergency Procedures", href: "/medivac/medivac-emergency-procedures" },
      { label: "Certifications", href: "/medivac/medivac-certifications" },
    ],
  },
  {
    label: "Field Training Dept", href: "/ftd", icon: <GraduationCap className="w-4 h-4" />,
    children: [
      { label: "Overview", href: "/ftd/ftd-overview" },
      { label: "FTO Policies", href: "/ftd/ftd-fto-policies" },
      { label: "Trainee Progression", href: "/ftd/ftd-trainee-progression" },
      { label: "Evaluations", href: "/ftd/ftd-evaluations" },
      { label: "Probation", href: "/ftd/ftd-probation" },
      { label: "FTO Certification", href: "/ftd/ftd-certification" },
    ],
  },
  { label: "Roster", href: "/roster", icon: <Users className="w-4 h-4" /> },
  { label: "Certificates", href: "/certificates", icon: <Award className="w-4 h-4" /> },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.isAdmin;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const activeItem = navItems.find(item =>
      item.children?.some(child => pathname.startsWith(child.href))
    );
    if (activeItem) {
      setExpandedItems(prev =>
        prev.includes(activeItem.href) ? prev : [...prev, activeItem.href]
      );
    }
  }, [pathname]);

  const toggleExpand = (href: string) => {
    setExpandedItems(prev =>
      prev.includes(href) ? prev.filter(h => h !== href) : [...prev, href]
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-border dark:border-border-dark">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ems-red to-ems-red-dark flex items-center justify-center shadow-lg shadow-ems-red/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="SAMS Logo" className="w-7 h-7 object-contain" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="overflow-hidden"
            >
              <div className="text-sm font-bold tracking-tight text-foreground">SAMS</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">LSEMS Portal</div>
            </motion.div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.children && pathname.startsWith(item.href));
          const isExpanded = expandedItems.includes(item.href);
          const hasActiveChild = item.children?.some(child => pathname === child.href || pathname.startsWith(child.href + "/"));

          return (
            <div key={item.href} className="mb-1">
              <div
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer group",
                  isActive && !hasActiveChild
                    ? "bg-ems-red/10 text-ems-red font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  hasActiveChild && "text-foreground font-medium"
                )}
                onClick={() => {
                  if (item.children) {
                    toggleExpand(item.href);
                  } else {
                    setMobileOpen(false);
                  }
                }}
              >
                <span className={cn(
                  "flex-shrink-0 transition-colors",
                  isActive ? "text-ems-red" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.children && (
                      <ChevronDown className={cn(
                        "w-3.5 h-3.5 transition-transform flex-shrink-0",
                        isExpanded && "rotate-180"
                      )} />
                    )}
                  </>
                )}
              </div>

              {item.children && !collapsed && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 pl-3 border-l border-border dark:border-border-dark py-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "block px-3 py-1.5 rounded-md text-xs transition-all",
                              pathname === child.href
                                ? "bg-ems-red/10 text-ems-red font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </nav>

      {/* Admin Link */}
      {!collapsed && (
        <div className="px-2 mb-2">
          <Link
            href={isAdmin ? "/admin" : "/login"}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all group",
              pathname === "/admin"
                ? "bg-amber-500/10 text-amber-500 font-medium"
                : "text-muted-foreground hover:bg-muted/50"
            )}
          >
            <Settings className="w-4 h-4" />
            <span className="flex-1 truncate">Admin Panel</span>
            {!isAdmin && <span className="text-[10px] text-muted-foreground/50">🔒</span>}
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="p-3 border-t border-border dark:border-border-dark space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Online</span>
        </div>
        <div className="text-[10px] text-muted-foreground">
          Created by <span className="font-medium">basilmellow</span> · v3.0.0
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-3 left-3 z-50 md:hidden p-2 rounded-lg glass-card"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-[280px] z-50 bg-card border-r border-border dark:border-border-dark md:hidden"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border dark:border-border-dark bg-card transition-all duration-300 flex-shrink-0",
          collapsed ? "w-16" : "w-[260px]"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex fixed z-30 items-center justify-center w-6 h-6 rounded-full border border-border dark:border-border-dark bg-card shadow-sm hover:bg-muted transition-colors"
        style={{ left: collapsed ? 52 : 252, top: 16 }}
      >
        <ChevronRight className={cn("w-3 h-3 transition-transform", collapsed ? "" : "rotate-180")} />
      </button>
    </>
  );
}
