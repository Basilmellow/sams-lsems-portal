import { medivacChapters } from "@/data/medivac";
import { DocPage } from "@/components/doc-page";
import { Plane } from "lucide-react";

export function generateStaticParams() {
  return medivacChapters.map((ch) => ({ id: ch.id }));
}

export default async function MedivacChapterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chapter = medivacChapters.find((ch) => ch.id === id);
  if (!chapter) return <div className="p-8 text-center text-muted-foreground">Chapter not found.</div>;

  const idx = medivacChapters.indexOf(chapter);
  const prev = idx > 0 ? { title: medivacChapters[idx - 1].title, href: `/medivac/${medivacChapters[idx - 1].id}` } : null;
  const next = idx < medivacChapters.length - 1 ? { title: medivacChapters[idx + 1].title, href: `/medivac/${medivacChapters[idx + 1].id}` } : null;

  return (
    <DocPage
      title={chapter.title}
      lastUpdated="2026-07-14"
      content={chapter.content}
      prevChapter={prev}
      nextChapter={next}
      icon={<Plane className="w-5 h-5" />}
    />
  );
}
