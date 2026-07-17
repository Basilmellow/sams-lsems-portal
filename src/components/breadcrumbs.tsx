"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const formatLabel = (s: string) => {
    return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-4 flex-wrap">
      <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
        <Home className="w-3 h-3" />
        <span>Home</span>
      </Link>
      {segments.map((seg, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3" />
            {isLast ? (
              <span className="text-foreground font-medium">{formatLabel(seg)}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {formatLabel(seg)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
