// ЗАЧЕМ: карточка поста в ленте (серверный компонент; интерактивные кусочки — клиентские)
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';
import { LikeButton } from './LikeButton';
import { DeleteButton } from './DeleteButton';

export type FeedPost = { id: number; authorName: string; content: string; createdAt: Date; likesCount: number; commentsCount: number };

export function PostCard({ post }: { post: FeedPost }) {
  return (
    <Card className="space-y-2">
      <div className="flex items-baseline justify-between">
        <b>{post.authorName}</b>
        <time className="text-xs text-slate-400">{formatDate(post.createdAt)}</time>
      </div>
      <p className="whitespace-pre-wrap text-slate-800">{post.content}</p>
      <div className="flex items-center gap-4">
        <LikeButton postId={post.id} initialCount={post.likesCount} />
        <Link href={`/social/posts/${post.id}`} className="text-sm text-indigo-700">💬 {post.commentsCount}</Link>
        <span className="ml-auto"><DeleteButton postId={post.id} /></span>
      </div>
    </Card>
  );
}
