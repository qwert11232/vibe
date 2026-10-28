// ЗАЧЕМ: страница задания Code Review
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { reviews } from '@/lib/lessons/reviews';
import { CodeReview } from '@/components/lessons/CodeReview';

export function generateStaticParams() { return reviews.map((r) => ({ reviewId: r.id })); }

export default async function ReviewPage({ params }: { params: Promise<{ reviewId: string }> }) {
  const { reviewId } = await params;
  const review = reviews.find((r) => r.id === reviewId);
  if (!review) notFound();
  return (
    <div className="space-y-4">
      <Link href="/" className="text-sm text-indigo-700">← Карта</Link>
      <h1 className="text-2xl font-bold">📝 Code Review #{review.id}: {review.title}</h1>
      <CodeReview review={review} />
    </div>
  );
}
