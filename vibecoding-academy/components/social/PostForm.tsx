'use client';
// ЗАЧЕМ: форма создания поста. Вызывает Server Action напрямую, без ручного fetch.
import { useActionState } from 'react';
import { createPostAction, type FormState } from '@/app/social/actions';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function PostForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(createPostAction, {});
  return (
    <Card>
      <form action={action} className="space-y-2">
        <input name="authorName" placeholder="Твоё имя" maxLength={100} required className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
        <textarea name="content" placeholder="Что нового?" maxLength={2000} rows={3} required className="w-full rounded-lg border border-slate-300 p-2 text-sm" />
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={pending}>{pending ? 'Публикуем…' : 'Опубликовать'}</Button>
          {state.error && <span className="text-sm text-red-600">{state.error}</span>}
        </div>
      </form>
    </Card>
  );
}
