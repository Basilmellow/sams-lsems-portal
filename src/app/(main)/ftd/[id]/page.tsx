import { ftdChapters } from "@/data/ftd";
import { DocPage } from "@/components/doc-page";
import { GraduationCap } from "lucide-react";

export function generateStaticParams() {
  return ftdChapters.map((ch) => ({ id: ch.id }));
}

export default async function FTDChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chapter = ftdChapters.find((ch) => ch.id === id);
  if (!chapter) return <div className="p-8 text-center text-muted-foreground">Chapter not found.</div>;

  const idx = ftdChapters.indexOf(chapter);
  const prev = idx > 0 ? { title: ftdChapters[idx - 1].title, href: `/ftd/${ftdChapters[idx - 1].id}` } : null;
  const next = idx < ftdChapters.length - 1 ? { title: ftdChapters[idx + 1].title, href: `/ftd/${ftdChapters[idx + 1].id}` } : null;

  return (
    <DocPage
      title={chapter.title}
      lastUpdated="2026-07-14"
      content={chapter.content}
      prevChapter={prev}
      nextChapter={next}
      icon={<GraduationCap className="w-5 h-5" />}
    />
  );
}
