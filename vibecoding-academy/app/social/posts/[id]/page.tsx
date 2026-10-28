// ЗАЧЕМ: страница одного поста с комментариями. Данные не кэшируем — они должны быть свежими.
import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { asc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { comments, posts } from '@/lib/db/schema';
import { Card } from '@/components/ui/Card';
import { CommentForm } from '@/components/social/CommentForm';
import { CommentList } from '@/components/social/CommentList';
import { DeleteButton } from '@/components/social/DeleteButton';
import { formatDate } from '@/lib/utils';

async function PostDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id: raw } = await params; // Next.js 16: params — Promise, всегда await
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const [post] = await db.select().from(posts).where(eq(posts.id, id));
  if (!post) notFound();
  const list = await db.select().from(comments).where(eq(comments.postId, id)).orderBy(asc(comments.createdAt));
  return (
    <div className="space-y-4">
      <Card className="space-y-2">
        <div className="flex justify-between"><b>{post.authorName}</b><time className="text-xs text-slate-400">{formatDate(post.createdAt)}</time></div>
        <p className="whitespace-pre-wrap">{post.content}</p>
        <DeleteButton postId={post.id} redirectTo="/social" />
      </Card>
      <h2 className="font-semibold">Комментарии ({list.length})</h2>
      <CommentList comments={list} />
      <CommentForm postId={post.id} />
    </div>
  );
}

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-3">
      <Link href="/social" className="text-sm text-indigo-700">← К ленте</Link>
      <Suspense fallback={<p className="text-slate-400">Загружаем пост…</p>}><PostDetails params={params} /></Suspense>
    </div>
  );
}
