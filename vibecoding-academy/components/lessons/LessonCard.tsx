'use client';
// ЗАЧЕМ: карточка урока на карте прогресса (статус берётся из localStorage)
import Link from 'next/link';
import type { LessonMeta } from '@/lib/lessons/types';
import { useProgress } from '@/lib/progress';

export function LessonCard({ lesson }: { lesson: LessonMeta }) {
  const p = useProgress();
  const done = p.completed[lesson.id];
  const check = p.checks[lesson.id];
  return (
    <Link href={`/lessons/${lesson.moduleId}/${lesson.id}`} className={`block rounded-lg border p-3 text-sm transition hover:shadow ${done ? 'border-green-400 bg-green-50' : 'border-slate-200 bg-white'}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium">{lesson.number} {lesson.title}</span>
        <span>{done ? '✅' : lesson.ready ? '📖' : '🚧'}{check === 'pass' && ' 🧪'}</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">{lesson.summary}</p>
    </Link>
  );
}
