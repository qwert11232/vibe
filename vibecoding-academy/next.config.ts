// ЗАЧЕМ: конфигурация Next.js 16. Читается один раз при старте dev-сервера и при сборке.
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Cache Components — новая модель кэширования Next.js 16.
  // Без этого флага директива "use cache" не работает.
  cacheComponents: true,
};

export default nextConfig;
