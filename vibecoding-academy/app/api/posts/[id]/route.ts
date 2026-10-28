// ЗАЧЕМ: один пост по id. GET — прочитать, DELETE — удалить (комментарии и лайки уйдут каскадом).
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';

type Ctx = { params: Promise<{ id: string }> }; // в Next.js 16 params — это Promise

async function parseId(ctx: Ctx) {
  const { id } = await ctx.params;
  const n = Number(id);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function GET(_req: Request, ctx: Ctx) {
  const id = await parseId(ctx);
  if (!id) return Response.json({ error: 'Некорректный id' }, { status: 400 });
  const [post] = await db.select().from(posts).where(eq(posts.id, id));
  return post ? Response.json(post) : Response.json({ error: 'Пост не найден' }, { status: 404 });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const id = await parseId(ctx);
  if (!id) return Response.json({ error: 'Некорректный id' }, { status: 400 });
  const deleted = await db.delete(posts).where(eq(posts.id, id)).returning({ id: posts.id });
  if (deleted.length === 0) return Response.json({ error: 'Пост не найден' }, { status: 404 });
  revalidateTag('posts', { expire: 0 });
  return Response.json({ ok: true });
}
