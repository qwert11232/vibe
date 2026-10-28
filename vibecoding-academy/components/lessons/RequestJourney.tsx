// ЗАЧЕМ: визуализация пути запроса через все слои. highlight — индексы шагов, которые подсвечены в текущем уроке.
const STEPS = [
  { text: 'Пользователь кликает', depth: 0 },
  { text: "Браузер: onClick → fetch('/api/posts')", depth: 1 },
  { text: 'DNS: куда слать?', depth: 2 },
  { text: 'Vercel CDN: есть в кэше?', depth: 3 },
  { text: 'proxy.ts: перехват запроса', depth: 4 },
  { text: 'API Route: app/api/posts/route.ts', depth: 5 },
  { text: 'Drizzle: db.select().from(posts)', depth: 6 },
  { text: 'Neon PostgreSQL: SELECT * FROM posts', depth: 7 },
  { text: 'Ответ: 200 OK + JSON', depth: 5, up: true },
  { text: 'Браузер получает данные', depth: 1, up: true },
  { text: 'React: setState → ре-рендер', depth: 0, up: true },
];

export function RequestJourney({ highlight = [] }: { highlight?: number[] }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-xs text-slate-300" aria-label="Маршрут запроса">
      {STEPS.map((s, i) => {
        const on = highlight.includes(i);
        return (
          <div key={i} style={{ paddingLeft: s.depth * 14 }} className={`whitespace-nowrap py-0.5 ${on ? 'font-bold text-amber-300' : ''}`}>
            {s.up ? '← ' : '→ '}[{s.text}]{on && '  ◀ ТЫ ТУТ'}
          </div>
        );
      })}
    </div>
  );
}
