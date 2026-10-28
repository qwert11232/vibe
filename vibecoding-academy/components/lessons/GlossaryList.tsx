'use client';
// ЗАЧЕМ: глоссарий с поиском по термину и определению
import { useState } from 'react';

export function GlossaryList({ items }: { items: { term: string; def: string; lesson: string }[] }) {
  const [q, setQ] = useState('');
  const shown = items.filter((i) => `${i.term} ${i.def}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-3">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск по терминам…" className="w-full rounded-lg border border-slate-300 p-2" />
      <dl className="space-y-2">{shown.map((i) => <div key={i.term} className="rounded-lg bg-white p-3"><dt className="font-semibold">{i.term} <span className="text-xs font-normal text-slate-400">урок {i.lesson}</span></dt><dd className="text-sm text-slate-700">{i.def}</dd></div>)}</dl>
      {shown.length === 0 && <p className="text-slate-500">Ничего не найдено.</p>}
    </div>
  );
}
