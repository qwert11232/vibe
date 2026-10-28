'use server';
// ЗАЧЕМ: Server Action — функция, которая выполняется на сервере, а вызывается прямо из формы.
// Только здесь (и в других Server Actions) разрешён updateTag: он мгновенно сбрасывает кэш ленты.
import { updateTag } from 'next/cache';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { cleanText } from '@/lib/utils';

export type FormState = { error?: string; ok?: boolean };

export async function createPostAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const authorName = cleanText(formData.get('authorName'), 100);
  const content = cleanText(formData.get('content'), 2000);
  if (!authorName || !content) return { error: 'Заполни имя (до 100 символов) и текст (до 2000).' };
  await db.insert(posts).values({ authorName, content });
  updateTag('posts'); // read-your-writes: автор сразу увидит свой пост в ленте
  return { ok: true };
}
