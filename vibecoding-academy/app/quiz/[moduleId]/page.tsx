// ЗАЧЕМ: страница квиза модуля
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findModule, modules } from '@/lib/lessons/content';
import { quizzes } from '@/lib/lessons/quizzes';
import { QuizRunner } from '@/components/lessons/QuizRunner';

export function generateStaticParams() { return modules.map((m) => ({ moduleId: m.id })); }

export default async function QuizPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  const mod = findModule(moduleId);
  if (!mod) notFound();
  const questions = quizzes[moduleId];
  return (
    <div className="space-y-4">
      <Link href="/" className="text-sm text-indigo-700">← Карта</Link>
      <h1 className="text-2xl font-bold">🧪 Блиц: модуль {mod.id}. {mod.title}</h1>
      {questions ? <QuizRunner moduleId={moduleId} questions={questions} /> : <p className="text-slate-600">Вопросы для этого модуля ещё не написаны. Добавь их в lib/lessons/quizzes.ts в формате модуля 0.</p>}
    </div>
  );
}
