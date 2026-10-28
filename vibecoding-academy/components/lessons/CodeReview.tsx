'use client';
// ЗАЧЕМ: блок кода с ошибками. Ученик пишет свои находки, потом открывает разбор.
import { useState } from 'react';
import type { Review } from '@/lib/lessons/reviews';
import { Button } from '@/components/ui/Button';
import { updateProgress } from '@/lib/progress';

export function CodeReview({ review }: { review: Review }) {
  const [notes, setNotes] = useState(['', '', '']);
  const [shown, setShown] = useState(false);
  return (
    <div className="space-y-4">
      <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">{review.code}</pre>
      {notes.map((n, i) => (
        <textarea key={i} value={n} placeholder={`Ошибка ${i + 1}: что не так и почему?`} rows={2}
          onChange={(e) => setNotes(notes.map((x, j) => (j === i ? e.target.value : x)))}
          className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
      ))}
      <Button onClick={() => { setShown(true); updateProgress((p) => ({ ...p, reviews: { ...p.reviews, [review.id]: true } })); }}>Показать ответы</Button>
      {shown && (
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {review.issues.map((it) => <li key={it.title}><b>{it.title}.</b> {it.explain}</li>)}
        </ol>
      )}
    </div>
  );
}
