'use client';
// ЗАЧЕМ: кнопка лайка. Оптимистичное обновление: меняем число сразу, потом сверяемся с сервером.
import { useEffect, useState } from 'react';
import { getVisitorId } from '@/lib/progress';

const LIKED_KEY = 'vca-liked-posts';
const readLiked = (): number[] => { try { return JSON.parse(localStorage.getItem(LIKED_KEY) ?? '[]'); } catch { return []; } };

export function LikeButton({ postId, initialCount }: { postId: number; initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  // Эффект: localStorage есть только в браузере, поэтому читаем его после первого рендера
  useEffect(() => { setLiked(readLiked().includes(postId)); }, [postId]);

  async function toggle() {
    if (busy) return;
    setBusy(true);
    const prev = { liked, count };
    setLiked(!liked); setCount(count + (liked ? -1 : 1)); // оптимистично
    try {
      const res = await fetch('/api/likes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ postId, visitorId: getVisitorId() }) });
      if (!res.ok) throw new Error();
      const { liked: serverLiked } = await res.json();
      setLiked(serverLiked);
      const set = new Set(readLiked());
      if (serverLiked) set.add(postId); else set.delete(postId);
      localStorage.setItem(LIKED_KEY, JSON.stringify([...set]));
    } catch { setLiked(prev.liked); setCount(prev.count); } // откат при ошибке
    finally { setBusy(false); }
  }

  return <button onClick={toggle} className={`text-sm ${liked ? 'text-rose-600' : 'text-slate-500'}`} aria-pressed={liked}>{liked ? '♥' : '♡'} {count}</button>;
}
