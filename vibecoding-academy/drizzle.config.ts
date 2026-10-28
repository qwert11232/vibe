// ЗАЧЕМ: конфиг drizzle-kit (CLI для миграций): где схема, куда писать SQL, к какой БД подключаться
import { defineConfig } from 'drizzle-kit';
import { loadEnvConfig } from '@next/env'; // читает .env.local так же, как Next.js

loadEnvConfig(process.cwd());

export default defineConfig({
  dialect: 'postgresql',
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dbCredentials: { url: process.env.DATABASE_URL! },
});
