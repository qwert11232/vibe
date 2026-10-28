'use client';
// ЗАЧЕМ: проходит весь квиз, считает результат и сохраняет его в прогресс
import { useState } from 'react';
import type { QuizQ } from '@/lib/lessons/quizzes';
import { updateProgress, useProgress } from '@/lib/progress';
import { QuizQuestion } from './QuizQuestion';
import { Button } from '@/components/ui/Button';

export function QuizRunner({ moduleId, questions }: { moduleId: string; questions: QuizQ[] }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const best = useProgress().quizzes[moduleId];
  const finished = picked.every((p) => p !== null);
  const score = picked.filter((p, i) => p === questions[i].correct).length;

  function pick(i: number, v: number) {
    const next = picked.map((p, idx) => (idx === i ? v : p)); // иммутабельно: новый массив, не мутация
    setPicked(next);
    if (next.every((p) => p !== null)) {
      const s = next.filter((p, idx) => p === questions[idx].correct).length;
      updateProgress((p) => ({ ...p, quizzes: { ...p.quizzes, [moduleId]: { score: s, total: questions.length, at: new Date().toISOString() } } }));
    }
  }

  return (
    <div className="space-y-4">
      {best && <p className="text-sm text-slate-500">Лучший сохранённый результат: {best.score}/{best.total}</p>}
      {questions.map((q, i) => <QuizQuestion key={q.q} item={q} index={i} picked={picked[i]} onPick={(v) => pick(i, v)} />)}
      {finished && (
        <div className="rounded-xl bg-indigo-50 p-4">
          <p className="font-semibold">Результат: {score} из {questions.length}</p>
          <Button className="mt-2" variant="ghost" onClick={() => setPicked(questions.map(() => null))}>Пройти заново</Button>
        </div>
      )}
    </div>
  );
}
