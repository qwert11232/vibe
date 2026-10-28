// ЗАЧЕМ: proxy.ts — сетевая граница приложения. В Next.js 16 это бывший middleware.ts.
// Код выполняется ПЕРЕД обработкой каждого запроса, который подходит под matcher.
import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Для обучения: пишем в консоль каждый запрос (смотри терминал, где запущен npm run dev)
  console.log(`[proxy] ${request.method} ${request.nextUrl.pathname}`);
  return NextResponse.next();
}

export const config = {
  // Пропускаем статику и служебные файлы Next.js, чтобы не логировать их
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
