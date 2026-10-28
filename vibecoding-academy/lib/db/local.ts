// ЗАЧЕМ: локальный Postgres без установки и без облака — PGlite (настоящий Postgres, собранный в WASM).
// Нужен только для запуска «здесь и сейчас»: в продакшене используется Neon из ./index.ts.
// Данные лежат в папке .pglite-data/ (игнорируется Git), поэтому посты переживают перезапуск dev-сервера.
import fs from 'node:fs';
import path from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import type * as schema from './schema';

const MIGRATIONS_DIR = path.join(process.cwd(), 'lib/db/migrations');

// Берём те же SQL-миграции, что применяются к Neon, и оборачиваем их в DO-блок:
// повторный запуск на уже созданной схеме ничего не делает (CREATE TABLE без IF NOT EXISTS упал бы).
function bootstrapScript(): string {
  const files = fs.readdirSync(MIGRATIONS_DIR).filter((f) => f.endsWith('.sql')).sort();
  const sql = files.map((f) => fs.readFileSync(path.join(MIGRATIONS_DIR, f), 'utf8')).join('\n');
  return `DO $vca$\nBEGIN\n  IF to_regclass('public.posts') IS NULL THEN\n${sql}\n  END IF;\nEND\n$vca$;`;
}

// В dev-режиме Next.js компилирует несколько бандлов (страницы и route handlers), поэтому
// модуль может выполниться дважды в одном процессе. PGlite нельзя открывать дважды на одной папке:
// второй экземпляр получил бы свою копию данных в памяти и «не видел» бы чужие записи.
// Поэтому клиент и флаг миграций храним в globalThis — это общий синглтон для всех бандлов.
const globalForDb = globalThis as unknown as { __vcaPglite?: PGlite; __vcaMigrated?: boolean };

export function createLocalDb(schemaModule: typeof schema) {
  const dataDir = process.env.PGLITE_DATA_DIR ?? path.join(process.cwd(), '.pglite-data');
  const client = globalForDb.__vcaPglite ?? (globalForDb.__vcaPglite = new PGlite(dataDir));

  // exec ставит запрос в очередь PGlite. Вызываем его синхронно при загрузке модуля,
  // чтобы миграции гарантированно оказались в очереди раньше первого запроса приложения.
  if (!globalForDb.__vcaMigrated) {
    globalForDb.__vcaMigrated = true;
    client.exec(bootstrapScript()).catch((error) => {
      globalForDb.__vcaMigrated = false;
      console.error('[db:local] не удалось применить миграции:', error);
    });
    console.log(`[db:local] PGlite, каталог данных: ${dataDir}`);
  }

  return drizzle(client, { schema: schemaModule });
}
