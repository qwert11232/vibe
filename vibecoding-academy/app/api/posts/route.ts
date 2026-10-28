// ЗАЧЕМ: REST-эндпоинт списка постов. GET — прочитать, POST — создать.
import { desc } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';
import { cleanText } from '@/lib/utils';

export async function GET() {
  const rows = await db.select().from(posts).orderBy(desc(posts.createdAt)).limit(100);
  return Response.json(rows);
}

export async function POST(request: Request) {
  // request.json() бросит ошибку на невалидном JSON — превращаем её в 400, а не в 500
  const body = await request.json().catch(() => null);
  const authorName = cleanText(body?.authorName, 100);
  const content = cleanText(body?.content, 2000);
  if (!authorName || !content) {
    return Response.json({ error: 'Нужны authorName (≤100) и content (≤2000)' }, { status: 400 });
  }
  const [created] = await db.insert(posts).values({ authorName, content }).returning();
  // В route handler нельзя updateTag (только Server Actions). Вместо него: revalidateTag с { expire: 0 } — кэш протухает немедленно.
  // Профиль 'max' (stale-while-revalidate) отдавал бы устаревшую ленту, пока она обновляется в фоне.
  revalidateTag('posts', { expire: 0 });
  return Response.json(created, { status: 201 });
}
