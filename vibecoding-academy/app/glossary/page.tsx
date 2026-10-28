// ЗАЧЕМ: глоссарий. Термины собираются автоматически из всех уроков.
import { allLessons } from '@/lib/lessons/content';
import { GlossaryList } from '@/components/lessons/GlossaryList';

export default function GlossaryPage() {
  const items = allLessons.flatMap((l) => (l.body?.glossary ?? []).map((g) => ({ ...g, lesson: l.number })));
  return <div className="space-y-4"><h1 className="text-2xl font-bold">📚 Глоссарий</h1><GlossaryList items={items} /></div>;
}
