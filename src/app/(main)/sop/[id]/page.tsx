import { sopChapters } from "@/data/sop-chapters";
import { DocPage } from "@/components/doc-page";
import { FileText } from "lucide-react";

export function generateStaticParams() {
  return sopChapters.map((ch) => ({ id: ch.id }));
}

export default async function SOPChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chapter = sopChapters.find((ch) => ch.id === id);
  if (!chapter) return <div className="p-8 text-center text-muted-foreground">Chapter not found.</div>;

  const idx = sopChapters.indexOf(chapter);
  const prev = idx > 0 ? { title: sopChapters[idx - 1].title, href: `/sop/${sopChapters[idx - 1].id}` } : null;
  const next = idx < sopChapters.length - 1 ? { title: sopChapters[idx + 1].title, href: `/sop/${sopChapters[idx + 1].id}` } : null;

  return (
    <DocPage
      title={chapter.title}
      lastUpdated={chapter.lastUpdated}
      content={chapter.content}
      prevChapter={prev}
      nextChapter={next}
      icon={<FileText className="w-5 h-5" />}
    />
  );
}
