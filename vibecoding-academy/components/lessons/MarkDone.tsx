'use client';
// ЗАЧЕМ: отметка «урок пройден» (хранится в localStorage)
import { Button } from '@/components/ui/Button';
import { updateProgress, useProgress } from '@/lib/progress';

export function MarkDone({ lessonId }: { lessonId: string }) {
  const done = useProgress().completed[lessonId];
  return (
    <Button variant={done ? 'ghost' : 'primary'} onClick={() => updateProgress((p) => {
      const completed = { ...p.completed };
      if (done) delete completed[lessonId]; else completed[lessonId] = true;
      return { ...p, completed };
    })}>{done ? '✓ Пройден (снять отметку)' : 'Отметить пройденным'}</Button>
  );
}
