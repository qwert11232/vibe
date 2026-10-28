// ЗАЧЕМ: главная — карта прогресса. Данные каталога передаём в клиентский компонент без тяжёлого текста уроков.
import { moduleSummaries } from '@/lib/lessons/content';
import { ProgressMap } from '@/components/lessons/ProgressMap';

export default function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Карта обучения</h1>
      <p className="text-slate-600">Теория → практика в коде мини-соцсети → самопроверка. Прогресс хранится в твоём браузере.</p>
      <ProgressMap modules={moduleSummaries} />
    </div>
  );
}
