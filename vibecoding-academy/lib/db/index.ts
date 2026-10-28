// ЗАЧЕМ: подключение к Neon. neon-http отправляет каждый запрос обычным HTTPS-fetch —
// это идеально для serverless: нет постоянных соединений, которые надо держать и закрывать.
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const url = process.env.DATABASE_URL;
// Fail fast: лучше упасть сразу с понятным текстом, чем получить загадочную ошибку позже
if (!url) {
  throw new Error('DATABASE_URL не задан. Скопируй .env.local.example в .env.local и вставь строку из Neon.');
}

export const db = drizzle({ client: neon(url), schema });
