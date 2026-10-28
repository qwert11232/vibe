// ЗАЧЕМ: корневой layout — оборачивает ВСЕ страницы (шапка, язык, стили)
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = { title: 'VibeCoding Academy', description: 'Тренажёр: пойми, что за что отвечает в твоём проекте' };

const nav = [['/', 'Карта'], ['/social', 'Соцсеть'], ['/glossary', 'Глоссарий'], ['/prompts', 'Промты и антипаттерны']] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-4xl flex-wrap items-center gap-4 p-3 text-sm">
            <Link href="/" className="font-bold text-indigo-700">🎓 VibeCoding Academy</Link>
            {nav.map(([href, label]) => <Link key={href} href={href} className="text-slate-600 hover:text-slate-900">{label}</Link>)}
          </nav>
        </header>
        <main className="mx-auto max-w-4xl p-4">{children}</main>
      </body>
    </html>
  );
}
