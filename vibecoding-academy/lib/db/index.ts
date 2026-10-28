// ЗАЧЕМ: подключение к БД. В продакшене — Neon (HTTP-драйвер), локально без настройки — PGlite.
import { neon } from '@neondatabase/serverless';
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { createLocalDb } from './local';

const url = process.env.DATABASE_URL;

// Локальный режим включается сам, если DATABASE_URL не задан (или задан как pglite://...).
// Тогда поднимается PGlite — тот же Postgres, только внутри процесса, без облака и без пароля.
const isLocal = !url || url.startsWith('pglite:') || url.startsWith('file:');

export type AppDatabase = NeonHttpDatabase<typeof schema>;

export const db: AppDatabase = (
  isLocal ? createLocalDb(schema) : drizzle({ client: neon(url as string), schema })
) as unknown as AppDatabase;
