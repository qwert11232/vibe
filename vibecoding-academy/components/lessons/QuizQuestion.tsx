'use client';
// ЗАЧЕМ: один вопрос квиза: 4 варианта, после ответа — объяснение ПОЧЕМУ
import type { QuizQ } from '@/lib/lessons/quizzes';

export function QuizQuestion({ item, index, picked, onPick }: { item: QuizQ; index: number; picked: number | null; onPick: (i: number) => void }) {
  const answered = picked !== null;
  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
      <p className="font-medium">{index + 1}. {item.q}</p>
      <div className="space-y-2">
        {item.options.map((o, i) => {
          const state = !answered ? 'border-slate-200 hover:bg-slate-50' : i === item.correct ? 'border-green-500 bg-green-50' : i === picked ? 'border-red-400 bg-red-50' : 'border-slate-200 opacity-60';
          return <button key={i} disabled={answered} onClick={() => onPick(i)} className={`block w-full rounded-lg border px-3 py-2 text-left text-sm ${state}`}>{o}</button>;
        })}
      </div>
      {answered && <p className="text-sm text-slate-700">{picked === item.correct ? '✅ Верно. ' : '❌ Неверно. '}{item.why}</p>}
    </div>
  );
}
