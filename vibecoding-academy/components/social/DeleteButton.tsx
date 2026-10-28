'use client';
// ЗАЧЕМ: удаление поста через DELETE /api/posts/[id], затем обновление страницы
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteButton({ postId, redirectTo }: { postId: number; redirectTo?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button disabled={busy} className="text-sm text-slate-400 hover:text-red-600" onClick={async () => {
      if (!confirm('Удалить пост вместе с комментариями?')) return;
      setBusy(true);
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      if (res.ok) { if (redirectTo) router.push(redirectTo); router.refresh(); } else setBusy(false);
    }}>Удалить</button>
  );
}
