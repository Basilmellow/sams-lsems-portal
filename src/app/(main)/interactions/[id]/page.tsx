import { interactionScenarios } from "@/data/interactions";
import { DocPage } from "@/components/doc-page";
import { Siren } from "lucide-react";

export function generateStaticParams() {
  return interactionScenarios.map((sc) => ({ id: sc.id }));
}

export default async function InteractionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scenario = interactionScenarios.find((sc) => sc.id === id);
  if (!scenario) return <div className="p-8 text-center text-gray-400">Scenario not found.</div>;

  const idx = interactionScenarios.indexOf(scenario);
  const prev = idx > 0 ? { title: interactionScenarios[idx - 1].title, href: `/interactions/${interactionScenarios[idx - 1].id}` } : null;
  const next = idx < interactionScenarios.length - 1 ? { title: interactionScenarios[idx + 1].title, href: `/interactions/${interactionScenarios[idx + 1].id}` } : null;

  return (
    <DocPage
      title={scenario.title}
      lastUpdated="2026-07-14"
      content={scenario.content}
      prevChapter={prev}
      nextChapter={next}
      icon={<Siren className="w-5 h-5" />}
    />
  );
}
