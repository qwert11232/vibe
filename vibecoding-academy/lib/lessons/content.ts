// ЗАЧЕМ: каталог всех модулей и уроков. Модуль 0 — полный контент. Остальные уроки — заготовки (тема из программы).
import type { Lesson, Module, ModuleSummary } from './types';
import { module0Lessons } from './module0';

// Заготовка урока: страница покажет тему и готовый промт, чтобы сгенерировать полный урок
const stub = (moduleId: string, n: number, title: string, summary: string): Lesson => ({ id: `${moduleId}-${n}`, moduleId, number: `${moduleId}.${n}`, title, summary });

export const modules: Module[] = [
  { id: '0', title: 'Фундамент: как работает веб', quiz: true, lessons: module0Lessons,
    bigPicture: '[Браузер] ⇄ HTTP ⇄ [Сервер] ⇄ [БД] — модуль 0 объясняет «стрелки»' },
  { id: '1', title: 'Инструменты разработчика', quiz: true, bigPicture: 'Всё, чем ты пользуешься ежедневно: npm, TypeScript, DevTools',
    lessons: [
      stub('1', 1, 'npm, package.json, node_modules, lock-файл', 'Зависимости, semver, почему node_modules не пушат'),
      stub('1', 2, 'TypeScript для вайбкодера', 'Типы, интерфейсы, как читать ошибки компилятора'),
      stub('1', 3, 'DevTools: Console, Network, Elements', 'Как смотреть запросы, ответы и ошибки'),
      stub('1', 4, 'Как читать ошибки', 'Stack trace, build и runtime ошибки'),
      stub('1', 5, 'Как читать документацию и changelog', 'Breaking changes, RFC'),
    ] },
  { id: '2', title: 'Git и GitHub', quiz: true, review: '1', bigPicture: '[Твой код] → git → [GitHub] → [Vercel]',
    lessons: [
      stub('2', 1, 'Что такое Git: снимки, не файлы', 'Дерево коммитов, HEAD, ветки'),
      stub('2', 2, 'commit / push / pull / branch', 'Пошаговый сценарий'),
      stub('2', 3, 'Конфликты и merge', 'Почему возникают, merge vs rebase'),
      stub('2', 4, 'GitHub: remote, origin, PR, fork, Issues', 'Как работает pull request'),
      stub('2', 5, '.gitignore, секреты, что нельзя пушить', 'env, токены, node_modules, .next/'),
    ] },
  { id: '3', title: 'React основы', quiz: true, bigPicture: '[Данные] → [Компонент] → [HTML на экране]',
    lessons: [
      stub('3', 1, 'Компоненты, JSX, props', 'Данные текут сверху вниз'),
      stub('3', 2, 'State и useState', 'Ре-рендер, иммутабельность'),
      stub('3', 3, 'useEffect и побочные эффекты', 'Зависимости, cleanup'),
      stub('3', 4, 'События, формы, controlled inputs', 'onChange, onSubmit, preventDefault'),
      stub('3', 5, 'Условный рендеринг, списки, key', 'Почему key важен'),
    ] },
  { id: '4', title: 'Next.js 16: анатомия проекта', quiz: true, bigPicture: '[app/] → [layout] → [page] → [api] → [proxy.ts]',
    lessons: [
      stub('4', 1, 'Структура папок', 'app/, public/, lib/, components/'),
      stub('4', 2, 'page, layout, loading, error, not-found', 'Файловый роутинг'),
      stub('4', 3, 'Server vs Client Components', 'Где выполняется код'),
      stub('4', 4, 'API Routes (route.ts)', 'Свой бэкенд'),
      stub('4', 5, 'Server Actions', 'Чем отличаются от API route'),
      stub('4', 6, 'proxy.ts — сетевая граница', 'Бывший middleware.ts'),
      stub('4', 7, 'next.config.ts, env-переменные', 'NEXT_PUBLIC_ vs серверные'),
      stub('4', 8, '"use cache", cacheLife, cacheTag, updateTag', 'Новая модель кэширования (ключевой урок)'),
      stub('4', 9, 'Turbopack', 'Дефолтный бандлер Next.js 16'),
      stub('4', 10, 'Error Handling', 'try/catch, error.tsx, логи'),
    ] },
  { id: '5', title: 'База данных: PostgreSQL + Drizzle + Neon', quiz: true, bigPicture: '[Drizzle] → [Neon PostgreSQL]',
    lessons: [
      stub('5', 1, 'Что такое БД, таблицы, строки, колонки', 'Excel со связями и правилами'),
      stub('5', 2, 'SQL-основы', 'SELECT, INSERT, UPDATE, DELETE'),
      stub('5', 3, 'Связи', '1-к-1, 1-ко-многим, многие-ко-многим'),
      stub('5', 4, 'Что такое ORM и зачем Drizzle', 'SQL-first подход'),
      stub('5', 5, 'Схема Drizzle', 'pgTable, relations, infer types'),
      stub('5', 6, 'Миграции', 'drizzle-kit generate + migrate'),
      stub('5', 7, 'Индексы и производительность', 'EXPLAIN ANALYZE'),
      stub('5', 8, 'Neon: serverless Postgres', 'Pooling, холодный старт, лимиты'),
    ] },
  { id: '6', title: 'Деплой, CI/CD и инфраструктура', quiz: true, bigPicture: '[git push] → [GitHub Actions] → [Vercel] → [Пользователь]',
    lessons: [
      stub('6', 1, 'Что делает Vercel: build → deploy', 'Путь кода'),
      stub('6', 2, 'Build: что происходит при сборке', 'next build'),
      stub('6', 3, 'Environment Variables', 'dev / preview / production'),
      stub('6', 4, 'CI/CD: GitHub Actions', 'pipeline, workflow, job, step'),
      stub('6', 5, 'Preview Deployments, rollback', 'Деплой на каждый PR'),
      stub('6', 6, 'Cron: Vercel и GitHub Actions', 'Запуск по расписанию'),
      stub('6', 7, 'Мониторинг, логи, дебаг на проде', 'Сайт упал — что делать за 5 минут'),
      stub('6', 8, 'Безопасность', 'CORS, CSRF, rate limiting, секреты'),
    ] },
  { id: '7', title: 'Вайбкодинг как профессиональный навык', quiz: true, bigPicture: '[Ты] → [Промт] → [ИИ] → [Ревью] → [Прод]',
    lessons: [
      stub('7', 1, 'Как формулировать промты с контекстом', 'Контекст + стек + задача + результат + ограничения'),
      stub('7', 2, 'Как ревьюить код от ИИ', 'Чек-лист из 10 пунктов'),
      stub('7', 3, 'Антипаттерны: что ИИ делает плохо', 'Устаревшие API, over-engineering'),
      stub('7', 4, 'Code Review упражнения', '5 примеров кода от «ИИ»'),
      stub('7', 5, 'Архитектура: как разбивать проект', 'Разделение ответственности'),
      stub('7', 6, 'Когда НЕ использовать ИИ', 'Безопасность, критичная логика'),
      stub('7', 7, 'Как учиться дальше', 'Ресурсы и сообщества'),
    ] },
];

export const allLessons = modules.flatMap((m) => m.lessons);
export const findLesson = (moduleId: string, lessonId: string) => allLessons.find((l) => l.moduleId === moduleId && l.id === lessonId);
export const findModule = (id: string) => modules.find((m) => m.id === id);

// Версия каталога без текста уроков — её безопасно отдавать в клиентские компоненты
export const moduleSummaries: ModuleSummary[] = modules.map((m) => ({
  ...m,
  lessons: m.lessons.map(({ body, ...meta }) => ({ ...meta, ready: Boolean(body) })),
}));

// Уроки, для которых есть автопроверка в lib/checks.ts
export const checkedLessons = new Set(['0-1', '0-2', '0-3', '0-4', '0-5']);
