"use client";

import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Copy, Check, ArrowLeft, ArrowRight, Clock, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface DocPageProps {
  title: string;
  lastUpdated: string;
  content: string;
  prevChapter?: { title: string; href: string } | null;
  nextChapter?: { title: string; href: string } | null;
  icon?: React.ReactNode;
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  const processInline = (text: string) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted text-xs font-mono">$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-ems-blue hover:underline">$1</a>');
  };

  const flushTable = () => {
    if (tableHeaders.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border dark:border-border-dark">
                {tableHeaders.map((h, i) => (
                  <th key={i} className="text-left px-4 py-2 font-semibold text-muted-foreground">{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, ri) => (
                <tr key={ri} className="border-b border-border/50 dark:border-border-dark/50 hover:bg-muted/30 transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2" dangerouslySetInnerHTML={{ __html: processInline(cell.trim()) }} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableHeaders = [];
    tableRows = [];
    inTable = false;
  };

  const flushCode = () => {
    if (codeLines.length > 0) {
      elements.push(
        <pre key={`code-${elements.length}`} className="bg-teal-900/5 dark:bg-teal-900/30 rounded-lg p-4 overflow-x-auto my-4 text-sm font-mono">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      codeLines = [];
    }
    inCodeBlock = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushCode();
      } else {
        if (inTable) flushTable();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (line.startsWith("|")) {
      if (!inTable) inTable = true;
      if (line.match(/^\|[\s-|]+\|$/)) continue;
      const cells = line.split("|").filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (tableHeaders.length === 0) {
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="text-3xl font-bold mt-8 mb-4 tracking-tight" dangerouslySetInnerHTML={{ __html: processInline(line.slice(2)) }} />);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-2xl font-semibold mt-6 mb-3 border-b border-border dark:border-border-dark pb-2" dangerouslySetInnerHTML={{ __html: processInline(line.slice(3)) }} />);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-xl font-semibold mt-5 mb-2" dangerouslySetInnerHTML={{ __html: processInline(line.slice(4)) }} />);
    } else if (line.match(/^[-*] \[[ x]\]/)) {
      const checked = line.includes("[x]");
      const text = line.replace(/^[-*] \[[ x]\]\s*/, "");
      elements.push(
        <div key={i} className="flex items-center gap-2 py-1 text-sm">
          <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? "bg-emerald-500 border-emerald-500" : "border-border dark:border-border-dark"}`}>
            {checked && <Check className="w-3 h-3 text-white" />}
          </div>
          <span dangerouslySetInnerHTML={{ __html: processInline(text) }} />
        </div>
      );
    } else if (line.match(/^[-*] /)) {
      elements.push(
        <div key={i} className="flex items-start gap-2 py-0.5 ml-2 text-sm">
          <span className="text-ems-red mt-1.5">•</span>
          <span dangerouslySetInnerHTML={{ __html: processInline(line.slice(2)) }} />
        </div>
      );
    } else if (line.match(/^\d+\. /)) {
      elements.push(
        <div key={i} className="flex items-start gap-2 py-0.5 ml-2 text-sm">
          <span className="text-ems-red font-semibold min-w-[20px]">{line.match(/^(\d+)\./)?.[1]}.</span>
          <span dangerouslySetInnerHTML={{ __html: processInline(line.replace(/^\d+\.\s*/, "")) }} />
        </div>
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-4 border-ems-red pl-4 py-2 my-3 bg-ems-red/5 rounded-r-lg text-sm italic text-muted-foreground">
          {line.slice(2)}
        </blockquote>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="text-sm leading-relaxed my-1" dangerouslySetInnerHTML={{ __html: processInline(line) }} />);
    }
  }

  if (inTable) flushTable();
  if (inCodeBlock) flushCode();

  return <div className="prose-custom">{elements}</div>;
}

export function DocPage({ title, lastUpdated, content, prevChapter, nextChapter, icon }: DocPageProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Breadcrumbs />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {icon && <div className="w-10 h-10 rounded-xl bg-ems-red/10 flex items-center justify-center text-ems-red">{icon}</div>}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Updated {lastUpdated}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 no-print">
            <button onClick={copyToClipboard} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border dark:border-border-dark text-xs hover:bg-muted/50 transition-colors">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Confidentiality Notice */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500/5 border border-amber-500/10 mb-6 text-xs text-muted-foreground">
          <Lock className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
          <span>Internal &amp; confidential — for authorized SAMS/LSEMS personnel only. Roster information should not be distributed. Screenshots and printing are discouraged.</span>
        </div>

        {/* Document Content */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
          <MarkdownContent content={content} />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 no-print">
          {prevChapter ? (
            <Link href={prevChapter.href} className="flex-1 flex items-center gap-3 p-4 rounded-xl border border-border dark:border-border-dark hover:bg-muted/30 transition-colors group">
              <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Previous</div>
                <div className="text-sm font-medium">{prevChapter.title}</div>
              </div>
            </Link>
          ) : <div className="flex-1" />}
          {nextChapter ? (
            <Link href={nextChapter.href} className="flex-1 flex items-center justify-end gap-3 p-4 rounded-xl border border-border dark:border-border-dark hover:bg-muted/30 transition-colors group text-right">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Next</div>
                <div className="text-sm font-medium">{nextChapter.title}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </motion.div>
    </div>
  );
}
