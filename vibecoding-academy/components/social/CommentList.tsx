// ЗАЧЕМ: список комментариев
import type { Comment } from '@/lib/db/schema';
import { formatDate } from '@/lib/utils';

export function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) return <p className="text-sm text-slate-500">Комментариев пока нет.</p>;
  return (
    <ul className="space-y-2">
      {comments.map((c) => (
        <li key={c.id} className="rounded-lg bg-slate-50 p-3 text-sm">
          <b>{c.authorName}</b> <time className="text-xs text-slate-400">{formatDate(c.createdAt)}</time>
          <p className="whitespace-pre-wrap">{c.content}</p>
        </li>
      ))}
    </ul>
  );
}
