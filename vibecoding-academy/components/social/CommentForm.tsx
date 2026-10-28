'use client';
// ЗАЧЕМ: форма комментария → POST /api/comments → router.refresh() перерисует серверные данные
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function CommentForm({ postId }: { postId: number }) {
  const router = useRouter();
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); // иначе браузер перезагрузит страницу
    setBusy(true); setError('');
    const res = await fetch('/api/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ postId, authorName, content }) });
    if (res.ok) { setContent(''); router.refresh(); } else setError((await res.json().catch(() => null))?.error ?? 'Не удалось отправить');
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Имя" maxLength={100} required className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Комментарий" maxLength={1000} rows={2} required className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
      <div className="flex items-center gap-3"><Button type="submit" disabled={busy}>Отправить</Button>{error && <span className="text-sm text-red-600">{error}</span>}</div>
    </form>
  );
}
