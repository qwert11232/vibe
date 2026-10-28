// ЗАЧЕМ: комментарии. GET ?postId=1 — список, POST — добавить.
import { asc, eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { db } from '@/lib/db';
import { comments, posts } from '@/lib/db/schema';
import { cleanText } from '@/lib/utils';

export async function GET(request: Request) {
  const postId = Number(new URL(request.url).searchParams.get('postId'));
  if (!Number.isInteger(postId) || postId <= 0) return Response.json({ error: 'Нужен postId' }, { status: 400 });
  return Response.json(await db.select().from(comments).where(eq(comments.postId, postId)).orderBy(asc(comments.createdAt)));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const postId = Number(body?.postId);
  const authorName = cleanText(body?.authorName, 100);
  const content = cleanText(body?.content, 1000);
  if (!Number.isInteger(postId) || !authorName || !content) {
    return Response.json({ error: 'Нужны postId, authorName (≤100), content (≤1000)' }, { status: 400 });
  }
  const [exists] = await db.select({ id: posts.id }).from(posts).where(eq(posts.id, postId));
  if (!exists) return Response.json({ error: 'Пост не найден' }, { status: 404 });
  const [created] = await db.insert(comments).values({ postId, authorName, content }).returning();
  revalidateTag('posts', { expire: 0 }); // счётчик комментариев в ленте изменился
  return Response.json(created, { status: 201 });
}
