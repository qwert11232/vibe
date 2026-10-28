// ЗАЧЕМ: конфигурация Next.js 16. Читается один раз при старте dev-сервера и при сборке.
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Cache Components — новая модель кэширования Next.js 16.
  // Без этого флага директива "use cache" не работает.
  cacheComponents: true,
  // PGlite — локальная БД (WASM). Её нельзя бандлить в серверный бандл: внутри лежат .wasm-файлы,
  // поэтому оставляем пакет внешним и грузим через require из node_modules.
  serverExternalPackages: ['@electric-sql/pglite'],
};

export default nextConfig;
