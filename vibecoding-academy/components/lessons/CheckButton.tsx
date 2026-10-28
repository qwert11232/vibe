'use client';
// ЗАЧЕМ: кнопка «Проверить задание» → вызывает /api/check/[lessonId] и показывает PASS ✅ / FAIL ❌
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { updateProgress } from '@/lib/progress';

type Result = { name: string; pass: boolean; hint: string };

export function CheckButton({ lessonId }: { lessonId: string }) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/check/${lessonId}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Ошибка ${res.status}`);
      setResults(data.results);
      updateProgress((p) => ({ ...p, checks: { ...p.checks, [lessonId]: data.pass ? 'pass' : 'fail' } }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось выполнить проверку');
    } finally { setLoading(false); }
  }

  return (
    <div className="space-y-3">
      <Button onClick={run} disabled={loading}>{loading ? 'Проверяем…' : 'Проверить задание'}</Button>
      {error && <p className="text-sm text-red-600">❌ {error}</p>}
      {results && (
        <ul className="space-y-1 text-sm">
          {results.map((r) => (
            <li key={r.name} className={r.pass ? 'text-green-700' : 'text-red-700'}>
              {r.pass ? '✅ PASS' : '❌ FAIL'} — {r.name}{!r.pass && <span className="block pl-6 text-slate-600">Подсказка: {r.hint}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
