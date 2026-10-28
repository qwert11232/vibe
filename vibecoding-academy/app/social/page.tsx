// ЗАЧЕМ: лента постов. Здесь живёт ключевой пример "use cache" из Next.js 16.
import { Suspense } from 'react';
import { desc, eq, sql } from 'drizzle-orm';
import { cacheLife, cacheTag } from 'next/cache';
import { db } from '@/lib/db';
import { comments, likes, posts } from '@/lib/db/schema';
import { PostCard } from '@/components/social/PostCard';
import { PostForm } from '@/components/social/PostForm';

// Кэшируем результат функции на минуты и помечаем тегом 'posts'.
// Сбросить кэш можно по тегу: updateTag('posts') в Server Action или revalidateTag('posts', { expire: 0 }) в route handler.
async function getFeedPosts() {
  'use cache';
  cacheLife('minutes');
  cacheTag('posts');
  // LEFT JOIN + GROUP BY: считаем лайки и комментарии одним запросом.
  // count(distinct ...) нужен, потому что два JOIN перемножают строки (лайки × комментарии).
  // Подзапрос внутри select() здесь не подходит: Drizzle убирает имя таблицы у колонок и условие сломается.
  return db
    .select({
      id: posts.id, authorName: posts.authorName, content: posts.content, createdAt: posts.createdAt,
      likesCount: sql<number>`count(distinct ${likes.id})::int`,
      commentsCount: sql<number>`count(distinct ${comments.id})::int`,
    })
    .from(posts)
    .leftJoin(likes, eq(likes.postId, posts.id))
    .leftJoin(comments, eq(comments.postId, posts.id))
    .groupBy(posts.id)
    .orderBy(desc(posts.createdAt))
    .limit(50);
}

async function Feed() {
  const feed = await getFeedPosts();
  if (feed.length === 0) return <p className="text-slate-500">Постов пока нет — напиши первый!</p>;
  return <div className="space-y-3">{feed.map((p) => <PostCard key={p.id} post={p} />)}</div>;
}

export default function SocialPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Мини-соцсеть</h1>
      <PostForm />
      <Suspense fallback={<p className="text-slate-400">Загружаем ленту…</p>}><Feed /></Suspense>
    </div>
  );
}
