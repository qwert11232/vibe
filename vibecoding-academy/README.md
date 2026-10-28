# VibeCoding Academy

<!-- ЗАЧЕМ: инструкция для новичка. Следуй шагам по порядку. -->
Тренажёр для тех, кто делает проекты с ИИ, но хочет понимать, что за что отвечает. Внутри — учебная мини-соцсеть (посты, комментарии, лайки) и карта уроков.

Стек: Next.js 16.4 (App Router, Turbopack, `proxy.ts`, `"use cache"`), TypeScript, Drizzle ORM, Neon Postgres, Tailwind CSS v4, Vercel Hobby.

## Запуск с нуля

1. **GitHub.** Создай пустой репозиторий (репозиторий — папка проекта с историей изменений) на github.com → New.
2. **Клонирование.** `git clone <адрес-репо>` скачивает репозиторий на твой компьютер. Скопируй в него файлы проекта.
3. **Зависимости.** `npm install` читает `package.json` и скачивает пакеты в `node_modules/`.
4. **База на Neon.** neon.tech → New Project → Connect → скопируй **pooled** строку подключения (в хосте есть `-pooler`).
5. **Переменные окружения.** `cp .env.local.example .env.local` и вставь строку в `DATABASE_URL`. Файл `.env.local` игнорируется Git — секреты не попадут в репозиторий.
6. **Миграции.**
   - `npm run db:generate` — drizzle-kit сравнивает `lib/db/schema.ts` с прошлым состоянием и создаёт SQL-файл в `lib/db/migrations/`.
   - `npm run db:migrate` — применяет SQL к Neon. Закоммить папку migrations в Git.
7. **Локальный запуск.** `npm run dev` → Turbopack собирает проект → http://localhost:3000.
8. **Vercel.** vercel.com → Add New → Project → Import репозиторий → Environment Variables: `DATABASE_URL` (для Production, Preview и Development) → Deploy. Vercel определит Next.js, выполнит `next build` и раздаст сайт.
9. **Проверка.** Открой URL: создай пост на /social, поставь лайк, оставь комментарий, пройди автопроверку урока 0.3.

> Сборка (`next build`) подключается к БД, чтобы заполнить кэш ленты. Поэтому `DATABASE_URL` должен быть задан и на Vercel, и локально, и миграции должны быть уже применены.

## Что важно знать про Next.js 16 в этом проекте

- `proxy.ts` заменяет `middleware.ts`. Codemod для старых проектов: `npx @next/codemod@canary middleware-to-proxy .`
- `cacheComponents: true` включает модель, где ничего не кэшируется по умолчанию. Кэш включается директивой `"use cache"`.
- **`updateTag` работает только в Server Action** (проверено по исходникам Next 16.4.3: ошибка «updateTag can only be called from within a Server Action»). Поэтому форма поста использует Server Action (`app/social/actions.ts`), а API-роуты сбрасывают кэш через `revalidateTag('posts', { expire: 0 })` (профиль `'max'` отдаёт устаревшие данные, пока идёт фоновое обновление — в тесте лента оставалась старой больше 20 секунд).
- Tailwind v4 конфигурируется через CSS, поэтому файла `tailwind.config.ts` нет.
- Фича «Песочница» и тексты уроков модулей 1–7 в этой версии — заготовки (см. ниже).

## Чек-лист безопасности

- [ ] `.env.local` в `.gitignore`, в Git нет ни одного секрета (`git log -p | grep -i postgres`)
- [ ] Строка БД — только в серверной переменной, без префикса `NEXT_PUBLIC_`
- [ ] Если секрет утёк в Git — перевыпусти пароль в Neon, удаления файла недостаточно
- [ ] Все входные данные API проверяются (`cleanText`, `isUuid`), битый JSON даёт 400
- [ ] SQL только через Drizzle (параметризованные запросы), без склейки строк
- [ ] `proxy.ts` не содержит секретов, matcher не пропускает лишнего
- [ ] Для публичного запуска добавь rate limiting (Vercel Firewall на Hobby или счётчик в БД) — API открыт без авторизации
- [ ] Включён HTTPS (на Vercel автоматически), в Neon `sslmode=require`

## Структура

См. комментарии `// ЗАЧЕМ:` в начале каждого файла.
