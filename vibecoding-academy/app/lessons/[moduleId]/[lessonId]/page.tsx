// ЗАЧЕМ: страница урока: цель → картина → теория → практика → самопроверка → ошибки → промт → глоссарий → ссылки
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allLessons, checkedLessons, findLesson, findModule } from '@/lib/lessons/content';
import { Card } from '@/components/ui/Card';
import { TheoryBlock } from '@/components/lessons/TheoryBlock';
import { RequestJourney } from '@/components/lessons/RequestJourney';
import { CheckButton } from '@/components/lessons/CheckButton';
import { MarkDone } from '@/components/lessons/MarkDone';

// Все страницы уроков известны заранее — Next.js соберёт их на этапе build
export function generateStaticParams() {
  return allLessons.map((l) => ({ moduleId: l.moduleId, lessonId: l.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ moduleId: string; lessonId: string }> }) {
  const { moduleId, lessonId } = await params;
  const lesson = findLesson(moduleId, lessonId);
  const mod = findModule(moduleId);
  if (!lesson || !mod) notFound();
  const idx = allLessons.indexOf(lesson);
  const prev = allLessons[idx - 1];
  const next = allLessons[idx + 1];
  const b = lesson.body;

  return (
    <article className="space-y-6">
      <div>
        <Link href="/" className="text-sm text-indigo-700">← Карта</Link>
        <h1 className="mt-1 text-2xl font-bold">{lesson.number} {lesson.title}</h1>
        <p className="font-mono text-xs text-slate-500">Модуль {mod.id}: {mod.bigPicture}</p>
      </div>

      {!b ? (
        <Card className="space-y-3">
          <p>🚧 Этот урок ещё не написан. Тема: <b>{lesson.summary}</b>.</p>
          <p className="text-sm text-slate-600">Сгенерируй его в том же формате (9 разделов) промтом ниже и добавь в <code>lib/lessons/content.ts</code>:</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-slate-900 p-3 text-xs text-slate-100">{`Контекст: тренажёр VibeCoding Academy, Next.js 16, Drizzle, Neon. Формат урока описан типом LessonBody в lib/lessons/types.ts, образец — lib/lessons/module0.ts.
Задача: напиши урок «${lesson.number} ${lesson.title}» (${lesson.summary}) для новичка на русском, с аналогией, ASCII-схемой и практикой в коде соцсети.
Результат: один объект Lesson на TypeScript. Ограничения: только Next.js 16 API (proxy.ts, "use cache"), без новых зависимостей.`}</pre>
        </Card>
      ) : (
        <>
          <Card><p>🎯 <b>Цель.</b> {b.goal}</p></Card>
          <section className="space-y-2"><h2 className="text-xl font-semibold">🗺️ Большая картина</h2><pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100">{b.bigPicture}</pre></section>
          {b.journey && <section className="space-y-2"><h2 className="text-xl font-semibold">Маршрут запроса</h2><RequestJourney highlight={b.journey} /></section>}
          <section className="space-y-4"><h2 className="text-xl font-semibold">📖 Теория</h2>{b.theory.map((t) => <TheoryBlock key={t.heading} {...t} />)}</section>
          <Card className="space-y-3"><h2 className="text-xl font-semibold">🔬 Практика</h2><p>{b.practice}</p>{checkedLessons.has(lesson.id) && <CheckButton lessonId={lesson.id} />}</Card>
          <section><h2 className="text-xl font-semibold">✅ Чек-лист самопроверки</h2><ul className="mt-2 space-y-1">{b.checklist.map((c) => <li key={c}>☐ {c}</li>)}</ul></section>
          <section className="space-y-2"><h2 className="text-xl font-semibold">💥 Типичные ошибки</h2>{b.mistakes.map((m) => <p key={m.title}><b>{m.title}.</b> {m.fix}</p>)}</section>
          <section className="space-y-2"><h2 className="text-xl font-semibold">🤖 Как спросить ИИ</h2><p className="rounded-lg bg-red-50 p-3 text-sm">❌ <b>Плохой промт:</b> {b.askAI.bad}</p><p className="rounded-lg bg-green-50 p-3 text-sm">✅ <b>Хороший промт:</b> {b.askAI.good}</p></section>
          <section><h2 className="text-xl font-semibold">📚 Глоссарий урока</h2><dl className="mt-2 space-y-1 text-sm">{b.glossary.map((g) => <div key={g.term}><dt className="inline font-semibold">{g.term}</dt> — <dd className="inline">{g.def}</dd></div>)}</dl></section>
          <section><h2 className="text-xl font-semibold">🔗 Ссылки</h2><ul className="mt-2 list-disc pl-5 text-sm">{b.links.map((l) => <li key={l.url}><a className="text-indigo-700 underline" href={l.url} target="_blank" rel="noreferrer">{l.title}</a></li>)}</ul></section>
        </>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
        {prev ? <Link className="text-sm text-indigo-700" href={`/lessons/${prev.moduleId}/${prev.id}`}>← {prev.number}</Link> : <span />}
        <MarkDone lessonId={lesson.id} />
        {next ? <Link className="text-sm text-indigo-700" href={`/lessons/${next.moduleId}/${next.id}`}>{next.number} →</Link> : <span />}
      </div>
    </article>
  );
}
