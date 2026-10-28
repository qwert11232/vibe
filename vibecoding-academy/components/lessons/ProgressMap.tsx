'use client';
// ЗАЧЕМ: карта всех модулей и уроков + экспорт/импорт прогресса
import Link from 'next/link';
import { useRef, useState } from 'react';
import type { ModuleSummary } from '@/lib/lessons/types';
import { exportProgress, importProgress, useProgress } from '@/lib/progress';
import { Button } from '@/components/ui/Button';
import { LessonCard } from './LessonCard';

export function ProgressMap({ modules }: { modules: ModuleSummary[] }) {
  const p = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');
  const total = modules.reduce((n, m) => n + m.lessons.length, 0);
  const done = Object.keys(p.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-48 flex-1">
          <div className="text-sm text-slate-600">Пройдено уроков: {done} из {total}</div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full bg-indigo-600" style={{ width: `${(done / total) * 100}%` }} /></div>
        </div>
        <Button variant="ghost" onClick={exportProgress}>Экспорт JSON</Button>
        <Button variant="ghost" onClick={() => fileRef.current?.click()}>Импорт JSON</Button>
        <input ref={fileRef} type="file" accept="application/json" hidden onChange={async (e) => {
          const f = e.target.files?.[0];
          if (f) setMsg((await importProgress(f)) ? 'Прогресс импортирован ✅' : 'Файл не похож на экспорт прогресса ❌');
          e.target.value = '';
        }} />
        {msg && <span className="text-sm">{msg}</span>}
      </div>
      {modules.map((m) => (
        <section key={m.id} className="space-y-2">
          <h2 className="text-xl font-bold">Модуль {m.id}. {m.title}</h2>
          <p className="font-mono text-xs text-slate-500">🗺️ {m.bigPicture}</p>
          <div className="grid gap-2 sm:grid-cols-2">{m.lessons.map((l) => <LessonCard key={l.id} lesson={l} />)}</div>
          <div className="flex gap-3 text-sm">
            {m.quiz && <Link className="text-indigo-700 underline" href={`/quiz/${m.id}`}>🧪 Квиз{p.quizzes[m.id] ? ` (${p.quizzes[m.id].score}/${p.quizzes[m.id].total})` : ''}</Link>}
            {m.review && <Link className="text-indigo-700 underline" href={`/review/${m.review}`}>📝 Code Review #{m.review}{p.reviews[m.review] ? ' ✓' : ''}</Link>}
          </div>
        </section>
      ))}
    </div>
  );
}
