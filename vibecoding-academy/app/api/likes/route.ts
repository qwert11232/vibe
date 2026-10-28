// ЗАЧЕМ: toggle лайка. Есть лайк — снимаем, нет — ставим. Возвращаем новое состояние.
import { and, eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { db } from '@/lib/db';
import { likes } from '@/lib/db/schema';
import { isUuid } from '@/lib/utils';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const postId = Number(body?.postId);
  if (!Number.isInteger(postId) || postId <= 0 || !isUuid(body?.visitorId)) {
    return Response.json({ error: 'Нужны postId и visitorId (UUID)' }, { status: 400 });
  }
  const visitorId: string = body.visitorId;
  // UNIQUE(postId, visitorId) гарантирует: дубль вставить нельзя, даже при гонке запросов
  const inserted = await db
    .insert(likes)
    .values({ postId, visitorId })
    .onConflictDoNothing()
    .returning({ id: likes.id });
  let liked = true;
  if (inserted.length === 0) {
    await db.delete(likes).where(and(eq(likes.postId, postId), eq(likes.visitorId, visitorId)));
    liked = false;
  }
  revalidateTag('posts', { expire: 0 });
  return Response.json({ liked });
}
