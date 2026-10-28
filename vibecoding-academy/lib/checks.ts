// ЗАЧЕМ: автоматическая проверка практических заданий (PASS/FAIL). Каждая проверка — маленькая функция.
import { sql } from 'drizzle-orm';
import { db } from '@/lib/db';

export type CheckResult = { name: string; pass: boolean; hint: string };
type Check = (origin: string) => Promise<CheckResult>;

const safe = (name: string, hint: string, fn: (origin: string) => Promise<boolean>): Check => async (origin) => {
  try { return { name, pass: await fn(origin), hint }; }
  catch (e) { return { name, pass: false, hint: `${hint} (ошибка: ${e instanceof Error ? e.message : 'неизвестно'})` }; }
};

const getPosts = (origin: string) => fetch(`${origin}/api/posts`, { cache: 'no-store' });

const postsTableExists = safe('Таблица posts существует', 'Запусти npm run db:generate и npm run db:migrate', async () => {
  const r = await db.execute(sql`select to_regclass('public.posts') as t`);
  return Boolean(r.rows[0]?.t);
});

export const CHECKS: Record<string, Check[]> = {
  '0-1': [
    postsTableExists,
    safe('GET /api/posts отвечает статусом 200', 'Открой DevTools → Network и посмотри статус ответа', async (o) => (await getPosts(o)).status === 200),
    safe('Заголовок Content-Type содержит application/json', 'Используй Response.json(...) в route.ts', async (o) => (await getPosts(o)).headers.get('content-type')?.includes('application/json') ?? false),
  ],
  '0-2': [
    safe('Строка подключения не светится в публичных переменных', 'Не называй секреты NEXT_PUBLIC_*', async () => !process.env.NEXT_PUBLIC_DATABASE_URL),
    safe('DATABASE_URL задан на сервере', 'Добавь DATABASE_URL в .env.local / Vercel', async () => Boolean(process.env.DATABASE_URL)),
    safe('Ответ API не содержит секретов', 'Никогда не возвращай process.env в ответе', async (o) => !(await (await getPosts(o)).text()).includes('postgres')),
  ],
  '0-3': [
    safe('GET /api/posts возвращает массив', 'Верни Response.json(rows), где rows — массив', async (o) => Array.isArray(await (await getPosts(o)).json())),
    safe('У постов есть поля id, authorName, content, createdAt', 'Проверь, что select() выбирает все колонки', async (o) => {
      const rows = await (await getPosts(o)).json();
      return rows.every((p: Record<string, unknown>) => ['id', 'authorName', 'content', 'createdAt'].every((k) => k in p));
    }),
    safe('Посты отсортированы от новых к старым', 'Добавь .orderBy(desc(posts.createdAt))', async (o) => {
      const rows: { createdAt: string }[] = await (await getPosts(o)).json();
      return rows.every((p, i) => i === 0 || new Date(rows[i - 1].createdAt) >= new Date(p.createdAt));
    }),
  ],
  '0-4': [
    safe('POST /api/posts с корректным JSON отвечает 201 и возвращает id', 'Верни Response.json(created, { status: 201 })', async (o) => {
      const r = await fetch(`${o}/api/posts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ authorName: 'check-bot', content: 'тест проверки' }) });
      const body = await r.json();
      if (body?.id) await fetch(`${o}/api/posts/${body.id}`, { method: 'DELETE' }); // убираем за собой
      return r.status === 201 && typeof body?.id === 'number';
    }),
    safe('POST с битым JSON отвечает 400, а не 500', 'Оборачивай request.json() в .catch(() => null)', async (o) =>
      (await fetch(`${o}/api/posts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{oops' })).status === 400),
    safe('POST без content отвечает 400', 'Валидируй входные данные', async (o) =>
      (await fetch(`${o}/api/posts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ authorName: 'x' }) })).status === 400),
  ],
  '0-5': [
    safe('Соединение с Neon требует SSL (sslmode=require)', 'Скопируй строку подключения из Neon целиком', async () => (process.env.DATABASE_URL ?? '').includes('sslmode=require')),
    safe('Приложение открыто по HTTPS или на localhost', 'На Vercel HTTPS включён автоматически', async (o) => o.startsWith('https://') || o.includes('localhost') || o.includes('127.0.0.1')),
  ],
};
