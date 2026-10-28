'use client';
// ЗАЧЕМ: весь прогресс ученика живёт в localStorage браузера. Здесь — чтение, запись, экспорт, импорт.
import { useMemo, useSyncExternalStore } from 'react';

const KEY = 'vca-progress-v1';
const EVENT = 'vca-progress-changed';

export type Progress = {
  completed: Record<string, true>;                                // id уроков, отмеченных пройденными
  checks: Record<string, 'pass' | 'fail'>;                        // результат последней автопроверки
  quizzes: Record<string, { score: number; total: number; at: string }>;
  reviews: Record<string, true>;
};
export const emptyProgress = (): Progress => ({ completed: {}, checks: {}, quizzes: {}, reviews: {} });

function parse(raw: string): Progress {
  if (!raw) return emptyProgress();
  try { return { ...emptyProgress(), ...JSON.parse(raw) }; } catch { return emptyProgress(); }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener('storage', cb); // изменения из другой вкладки
  return () => { window.removeEventListener(EVENT, cb); window.removeEventListener('storage', cb); };
}

// useSyncExternalStore — штатный способ читать внешнее хранилище (localStorage) в React.
// Сервер и первая отрисовка получают пустую строку → нет рассинхрона (hydration mismatch).
export function useProgress(): Progress {
  const raw = useSyncExternalStore(subscribe, () => localStorage.getItem(KEY) ?? '', () => '');
  return useMemo(() => parse(raw), [raw]);
}

export function updateProgress(fn: (p: Progress) => Progress) {
  const next = fn(parse(localStorage.getItem(KEY) ?? ''));
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(EVENT));
}

export function exportProgress() {
  const blob = new Blob([localStorage.getItem(KEY) ?? JSON.stringify(emptyProgress())], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'vibecoding-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

export async function importProgress(file: File): Promise<boolean> {
  try {
    const data = JSON.parse(await file.text());
    if (typeof data !== 'object' || data === null || typeof data.completed !== 'object') return false;
    localStorage.setItem(KEY, JSON.stringify({ ...emptyProgress(), ...data }));
    window.dispatchEvent(new Event(EVENT));
    return true;
  } catch { return false; }
}

// Постоянный анонимный идентификатор визитора для лайков (UUID живёт в localStorage)
export function getVisitorId(): string {
  let id = localStorage.getItem('vca-visitor-id');
  if (!id) { id = crypto.randomUUID(); localStorage.setItem('vca-visitor-id', id); }
  return id;
}
