// ЗАЧЕМ: полный контент модуля 0 «Фундамент: как работает веб» (уроки 0.1–0.5)
import type { Lesson } from './types';

export const module0Lessons: Lesson[] = [
  {
    id: '0-1', moduleId: '0', number: '0.1', title: 'Как работает интернет: HTTP, запрос → ответ',
    summary: 'Запрос, ответ, метод, статус-код, заголовки.',
    body: {
      goal: 'После этого урока ты сможешь прочитать любой HTTP-запрос и ответ в DevTools и объяснить, что означают метод и статус-код.',
      bigPicture: `[Браузер] ──── HTTP-запрос ────▶ [Сервер] ──▶ [БД]
   ▲                                  │
   └───────── HTTP-ответ ◀────────────┘
        ↑
   ТЫ ТУТ: сам «язык», на котором они общаются`,
      journey: [1, 2],
      theory: [
        { heading: 'ЧТО это', body: `HTTP — это протокол: набор правил, как клиент и сервер обмениваются сообщениями. Аналогия — почта. Ты пишешь письмо (запрос) с адресом и просьбой, почтальон носит его на сервер, оттуда приходит письмо-ответ. Каждое письмо — это ровно одна пара «запрос → ответ». Сервер сам тебе ничего не присылает, пока ты не спросил.` },
        { heading: 'ЗАЧЕМ нужно', body: `Браузер и сервер написаны разными людьми на разных языках. Единый протокол позволяет им понимать друг друга. Весь вайбкодинг веб-приложений упирается в HTTP: каждая кнопка «Отправить» — это запрос.` },
        { heading: 'КАК работает', body: `Запрос состоит из четырёх частей: метод (что сделать), путь (с чем), заголовки (метаданные) и тело (данные, если есть).

~~~
POST /api/posts HTTP/1.1          ← метод + путь
Host: my-app.vercel.app           ← заголовки
Content-Type: application/json

{"authorName":"Аня","content":"Привет!"}   ← тело
~~~

Ответ: статус-код, заголовки и тело.

~~~
HTTP/1.1 201 Created
Content-Type: application/json

{"id":7,"authorName":"Аня","content":"Привет!"}
~~~

Методы: GET — прочитать, POST — создать, PUT/PATCH — изменить, DELETE — удалить. Статус-коды по первой цифре: 2xx — успех, 3xx — перенаправление, 4xx — ошибка клиента (ты неправильно спросил), 5xx — ошибка сервера (сервер сломался).` },
        { heading: 'КАК ЛОМАЕТСЯ', body: `404 — такого пути нет. 400 — тело запроса некорректно. 500 — исключение внутри сервера (смотри логи). Типичная путаница: «сайт не работает» — а на самом деле запрос ушёл на неверный путь или метод. HTTP — без состояния: сервер не помнит прошлый запрос, если ты не передал cookie или токен.` },
        { heading: 'КАК ДЕБАЖИТЬ', body: `Открой DevTools (F12) → вкладка Network → выполни действие → кликни по запросу. Смотри: Method, Status, Request Payload, Response. Алгоритм: сначала статус-код → потом тело ответа → потом логи сервера.` },
      ],
      practice: `В проекте уже есть эндпоинт GET /api/posts. Запусти npm run dev, открой http://localhost:3000/api/posts в браузере, затем открой /social и в DevTools → Network найди запрос к /api/posts или к странице. Запиши: метод, статус-код и значение заголовка Content-Type. Если таблицы ещё нет — выполни миграции (см. README).`,
      checklist: ['Я могу назвать метод и статус-код запроса из Network', 'Я знаю, чем 4xx отличается от 5xx', 'GET /api/posts отвечает 200', 'Content-Type ответа — application/json'],
      mistakes: [
        { title: 'Путают 404 и 500', fix: '404 — пути нет (ошибка адреса). 500 — путь есть, но код внутри упал. Для 500 иди в логи сервера (терминал npm run dev).' },
        { title: 'Тестируют POST, вставив адрес в строку браузера', fix: 'Адресная строка всегда шлёт GET. Для POST используй форму, fetch или curl.' },
        { title: 'Не смотрят вкладку Network и гадают', fix: 'Открой Network, включи Preserve log и повтори действие — там вся правда о запросе.' },
      ],
      askAI: {
        bad: 'У меня не работает запрос, почини.',
        good: 'Контекст: Next.js 16, App Router. Я делаю POST /api/posts с JSON {authorName, content}. В DevTools → Network статус 400, в ответе {"error": "..."}. Вот код route.ts и код fetch: [код]. Объясни, почему 400 и как исправить. Не меняй схему БД.',
      },
      glossary: [
        { term: 'HTTP', def: 'Протокол обмена сообщениями между клиентом и сервером.' },
        { term: 'Метод запроса', def: 'Глагол запроса: GET, POST, PUT, PATCH, DELETE.' },
        { term: 'Статус-код', def: 'Трёхзначное число в ответе: 2xx успех, 4xx ошибка клиента, 5xx ошибка сервера.' },
        { term: 'Заголовок (header)', def: 'Метаданные запроса или ответа, например Content-Type.' },
        { term: 'Тело (body)', def: 'Данные, которые передаются вместе с запросом или ответом.' },
      ],
      links: [{ title: 'MDN: Обзор HTTP', url: 'https://developer.mozilla.org/ru/docs/Web/HTTP/Overview' }, { title: 'Next.js: Route Handlers', url: 'https://nextjs.org/docs/app/getting-started/route-handlers' }],
    },
  },
  {
    id: '0-2', moduleId: '0', number: '0.2', title: 'Клиент vs Сервер: что где выполняется',
    summary: 'Браузер и сервер — два разных компьютера с разными правами.',
    body: {
      goal: 'После этого урока ты сможешь определить, где выполняется любая строка кода, и не отправишь секреты в браузер.',
      bigPicture: `[Браузер: ТВОЙ код виден всем] ──▶ [Сервер: код скрыт] ──▶ [БД]
        ↑                                  ↑
     клиент                          ТЫ ТУТ: граница доверия`,
      journey: [1, 2, 3],
      theory: [
        { heading: 'ЧТО это', body: `Клиент — это браузер пользователя. Сервер — компьютер, на котором работает твой код (на Vercel это функции в облаке). Аналогия — ресторан: зал (клиент) и кухня (сервер). Гость видит зал и меню, но не заходит на кухню, где хранятся ключи от склада.` },
        { heading: 'ЗАЧЕМ нужно знать', body: `Всё, что приехало в браузер, пользователь может прочитать: код JS, переменные, ответы API. Поэтому секреты (пароль БД, токены) живут только на сервере. Если положить DATABASE_URL в код клиента — любой откроет DevTools и получит доступ к твоей базе.` },
        { heading: 'КАК работает в Next.js', body: `По умолчанию компоненты в App Router — серверные: они выполняются на сервере, а в браузер уходит готовый HTML. Директива "use client" в начале файла превращает компонент в клиентский: он нужен для useState, onClick, localStorage.

~~~
// Серверный код: можно ходить в БД, читать секреты
const rows = await db.select().from(posts);

// Клиентский код: только "use client"
'use client';
const [liked, setLiked] = useState(false);
~~~

Правило переменных: NEXT_PUBLIC_* попадает в браузер, остальные остаются на сервере.` },
        { heading: 'КАК ЛОМАЕТСЯ', body: `Ошибка «useState only works in Client Component» — забыл "use client". Ошибка «window is not defined» — код с window или localStorage выполнился на сервере. Худший сценарий — секрет с префиксом NEXT_PUBLIC_: сборка пройдёт без ошибок, но ключ окажется в публичном JS.` },
        { heading: 'КАК ДЕБАЖИТЬ', body: `Задай вопрос: «где это выполняется?». console.log на сервере виден в терминале, на клиенте — в консоли браузера. Проверка утечки: DevTools → Sources → поиск по ключевым словам вроде postgres.` },
      ],
      practice: `Открой app/social/page.tsx и lib/progress.ts. В каком из них стоит "use client" и почему? Выпиши в заметки три вещи, которые можно делать только на сервере, и три — только в браузере. Затем убедись, что в .env.local нет переменной NEXT_PUBLIC_DATABASE_URL.`,
      checklist: ['Я могу объяснить, зачем нужен "use client"', 'DATABASE_URL не начинается с NEXT_PUBLIC_', 'Я знаю, где виден console.log сервера и клиента'],
      mistakes: [
        { title: 'Ставят "use client" в каждый файл', fix: 'Делай клиентскими только интерактивные листья дерева. Страницы и загрузка данных остаются серверными.' },
        { title: 'Читают localStorage в серверном компоненте', fix: 'localStorage есть только в браузере. Читай его в клиентском компоненте.' },
        { title: 'Кладут секрет в NEXT_PUBLIC_', fix: 'Переименуй переменную без префикса и пересоздай ключ в Neon — старый считай скомпрометированным.' },
      ],
      askAI: {
        bad: 'Почему window is not defined?',
        good: 'Next.js 16, App Router, TypeScript. В файле components/X.tsx получаю ошибку «window is not defined» при build. Вот код: [код]. Объясни, где выполняется код, и как безопасно обратиться к localStorage. Не превращай всю страницу в клиентскую.',
      },
      glossary: [
        { term: 'Клиент', def: 'Браузер пользователя, где выполняется JS на его устройстве.' },
        { term: 'Сервер', def: 'Компьютер или облачная функция, где выполняется твой серверный код.' },
        { term: '"use client"', def: 'Директива, делающая компонент клиентским.' },
        { term: 'Переменная окружения', def: 'Настройка снаружи кода: секреты и адреса. NEXT_PUBLIC_ делает её публичной.' },
      ],
      links: [{ title: 'Next.js: Server and Client Components', url: 'https://nextjs.org/docs/app/getting-started/server-and-client-components' }],
    },
  },
  {
    id: '0-3', moduleId: '0', number: '0.3', title: 'Что такое API и зачем он нужен',
    summary: 'API — официальная «дверь» в твои данные.',
    body: {
      goal: 'После этого урока ты сможешь написать GET-эндпоинт, который возвращает список постов из БД.',
      bigPicture: `[Браузер] ──▶ [API Route ← ТЫ ТУТ] ──▶ [Drizzle] ──▶ [Neon]
   fetch('/api/posts')   app/api/posts/route.ts`,
      journey: [1, 5, 6, 7],
      theory: [
        { heading: 'ЧТО это', body: `API (Application Programming Interface) — договорённость, как одна программа может попросить другую что-то сделать. В вебе это адреса с понятными действиями: GET /api/posts — «дай посты». Аналогия — официант: ты не лезешь на кухню, а просишь у официанта по меню.` },
        { heading: 'ЗАЧЕМ нужно', body: `Браузеру нельзя подключаться к базе напрямую (там пароль). API-слой — единственная дверь: он решает, кого пускать, какие данные отдавать, и проверяет входные данные. Эту дверь могут использовать сайт, мобильное приложение, Telegram-бот.` },
        { heading: 'КАК работает', body: `В Next.js файл app/api/posts/route.ts экспортирует функции GET, POST и т.д. — по именам HTTP-методов.

~~~
import { desc } from 'drizzle-orm';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';

export async function GET() {
  // SELECT * FROM posts ORDER BY created_at DESC
  const rows = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return Response.json(rows); // статус 200 по умолчанию
}
~~~` },
        { heading: 'КАК ЛОМАЕТСЯ', body: `Возвращаешь не JSON, а обычный объект — клиент получает ошибку парсинга. Забыл await — возвращается Promise, а не данные. Нет orderBy — порядок постов случайный. Нет валидации — в БД попадает мусор.` },
        { heading: 'КАК ДЕБАЖИТЬ', body: `Открой /api/posts прямо в браузере — увидишь JSON. Если ошибка — смотри терминал npm run dev: там стек с файлом и строкой. Проверь DATABASE_URL.` },
      ],
      practice: `Эндпоинт GET /api/posts уже есть в проекте. Измени его: возвращай максимум 20 постов и добавь поле preview — первые 50 символов content. Подсказка: .limit(20) и .map(). Затем нажми «Проверить задание».`,
      checklist: ['GET возвращает JSON-массив', 'Статус 200', 'Посты отсортированы по убыванию createdAt', 'У каждого поста есть id, authorName, content, createdAt'],
      mistakes: [
        { title: 'Забыли await перед запросом к БД', fix: 'Все запросы Drizzle асинхронны: const rows = await db.select()...' },
        { title: 'Возвращают данные без Response.json', fix: 'Используй Response.json(data) — он ставит нужный Content-Type и статус.' },
        { title: 'Отдают клиенту всё подряд', fix: 'Выбирай только нужные колонки: db.select({ id: posts.id })...' },
      ],
      askAI: {
        bad: 'Сделай апи для постов.',
        good: 'Контекст: Next.js 16 App Router, TypeScript, Drizzle + Neon (neon-http), таблица posts в lib/db/schema.ts. Задача: GET /api/posts в app/api/posts/route.ts, максимум 20 постов от новых к старым. Результат: Response.json массив. Ограничения: без новых зависимостей, без any, params не нужны.',
      },
      glossary: [
        { term: 'API', def: 'Набор адресов и правил, через которые программы обращаются друг к другу.' },
        { term: 'Эндпоинт', def: 'Конкретный адрес API, например GET /api/posts.' },
        { term: 'Route Handler', def: 'Файл route.ts в Next.js, обрабатывающий HTTP-методы.' },
        { term: 'ORM', def: 'Библиотека для работы с БД через код вместо ручного SQL (у нас Drizzle).' },
      ],
      links: [{ title: 'Next.js: Route Handlers', url: 'https://nextjs.org/docs/app/getting-started/route-handlers' }, { title: 'Drizzle: Select', url: 'https://orm.drizzle.team/docs/select' }],
    },
  },
  {
    id: '0-4', moduleId: '0', number: '0.4', title: 'JSON — язык общения фронта и бэка',
    summary: 'Формат данных, который понимают все.',
    body: {
      goal: 'После этого урока ты сможешь отправить JSON на сервер, обработать его и корректно ответить на битые данные.',
      bigPicture: `[Форма] ─ JSON.stringify ─▶ [API Route: request.json() ← ТЫ ТУТ] ─▶ [БД]
[Список] ◀─ response.json() ─ [Response.json(rows)]`,
      journey: [1, 5, 8],
      theory: [
        { heading: 'ЧТО это', body: `JSON — текстовый формат для данных: объекты {}, массивы [], строки, числа, true/false, null. Аналогия — стандартный бланк: у всех одинаковые графы, поэтому любая сторона понимает заполненный бланк.` },
        { heading: 'ЗАЧЕМ нужно', body: `По сети нельзя передать «объект из памяти» — только текст. JSON превращает объект в текст (сериализация) и обратно (парсинг). Типы TypeScript в JSON не едут: проверка структуры — ответственность сервера.` },
        { heading: 'КАК работает', body: `~~~
// Клиент: объект → текст
await fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ authorName: 'Аня', content: 'Привет' }),
});

// Сервер: текст → объект
const body = await request.json().catch(() => null);
~~~

Важно: даты в JSON — это строки. new Date() превращается в "2026-10-28T10:00:00.000Z".` },
        { heading: 'КАК ЛОМАЕТСЯ', body: `Лишняя запятая или одинарные кавычки — невалидный JSON. Нет заголовка Content-Type — сервер может не понять тело. Клиент прислал число строкой ("5" вместо 5). Если на сервере нет .catch, битый JSON даёт 500 вместо 400.` },
        { heading: 'КАК ДЕБАЖИТЬ', body: `Network → запрос → Payload (что отправили) и Response (что получили). Скопируй тело в jsonlint.com. На сервере временно console.log(body).` },
      ],
      practice: `Отправь через DevTools Console запрос: fetch('/api/posts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({authorName:'Я',content:'Мой первый пост'})}).then(r=>r.json()).then(console.log). Затем отправь тот же запрос с body: '{oops' и убедись, что сервер отвечает 400, а не 500. Нажми «Проверить задание».`,
      checklist: ['POST с корректным JSON возвращает 201 и id', 'Битый JSON даёт 400', 'Пустой content даёт 400', 'Я понимаю, что такое JSON.stringify и request.json()'],
      mistakes: [
        { title: 'Нет заголовка Content-Type', fix: 'Добавь headers: { "Content-Type": "application/json" } в fetch.' },
        { title: 'Отправляют объект без JSON.stringify', fix: 'body принимает строку. Объект превратится в "[object Object]".' },
        { title: 'Доверяют типам TypeScript для входящих данных', fix: 'Типы исчезают при компиляции. Проверяй данные в рантайме: typeof, длина, формат.' },
      ],
      askAI: {
        bad: 'Почему не сохраняется пост?',
        good: 'Next.js 16, route handler app/api/posts/route.ts, fetch POST с JSON. В Network статус 400 и тело {"error":"Нужны authorName и content"}. Вот код fetch и route.ts: [код]. Найди, что не совпадает между клиентом и сервером. Не добавляй библиотеки валидации.',
      },
      glossary: [
        { term: 'JSON', def: 'Текстовый формат данных на базе объектов JavaScript.' },
        { term: 'Сериализация', def: 'Превращение объекта в строку для передачи или хранения.' },
        { term: 'Валидация', def: 'Проверка данных на корректность перед использованием.' },
        { term: 'Payload', def: 'Полезная нагрузка запроса: данные в теле.' },
      ],
      links: [{ title: 'MDN: Работа с JSON', url: 'https://developer.mozilla.org/ru/docs/Learn_web_development/Core/Scripting/JSON' }],
    },
  },
  {
    id: '0-5', moduleId: '0', number: '0.5', title: 'DNS, домены, порты, HTTPS',
    summary: 'Как браузер находит сервер и почему соединение защищено.',
    body: {
      goal: 'После этого урока ты сможешь объяснить, что происходит между вводом адреса и первым байтом ответа, и зачем нужен HTTPS.',
      bigPicture: `[Браузер] ─▶ [DNS: где живёт my-app.vercel.app?] ─▶ [IP] ─▶ [Vercel CDN ← ТЫ ТУТ]
                                      порт 443, TLS-шифрование`,
      journey: [0, 1, 2],
      theory: [
        { heading: 'ЧТО это', body: `Домен — понятное имя (my-app.vercel.app). IP-адрес — настоящий «номер дома» сервера. DNS — телефонная книга, которая превращает имя в IP. Порт — «номер подъезда»: HTTP использует 80, HTTPS — 443, dev-сервер Next.js — 3000.` },
        { heading: 'ЗАЧЕМ нужно', body: `Люди запоминают имена, а компьютеры работают с числами. HTTPS (HTTP + TLS) шифрует трафик: без него пароль в публичной Wi-Fi читается как открытка. Браузеры помечают HTTP-сайты как небезопасные.` },
        { heading: 'КАК работает', body: `~~~
1. Ввёл https://my-app.vercel.app
2. Браузер спрашивает DNS → получает IP
3. TLS-рукопожатие: сертификат, ключи шифрования
4. Шлёт зашифрованный HTTP-запрос на порт 443
5. Получает ответ (из CDN-кэша или от функции)
~~~

Neon тоже требует шифрованное соединение — поэтому в строке подключения стоит sslmode=require. Vercel выпускает сертификат автоматически.` },
        { heading: 'КАК ЛОМАЕТСЯ', body: `Домен недавно привязан — DNS ещё «разъезжается» (до нескольких часов). ERR_CONNECTION_REFUSED на localhost — dev-сервер не запущен или порт занят. «Mixed content» — страница по HTTPS грузит ресурс по HTTP.` },
        { heading: 'КАК ДЕБАЖИТЬ', body: `nslookup домен — проверить DNS. Закрытый замок в адресной строке → детали сертификата. Порт занят: next dev -p 3001. Смотри Network: вкладка Timing показывает время DNS и TLS.` },
      ],
      practice: `1) В терминале выполни nslookup <твой-домен>.vercel.app (после деплоя) или nslookup neon.tech. 2) Найди в .env.local строку DATABASE_URL и объясни своими словами, что означают хост, порт и sslmode=require. 3) Нажми «Проверить задание».`,
      checklist: ['Я могу объяснить, что делает DNS', 'Я знаю порты 80, 443, 3000', 'Строка подключения содержит sslmode=require', 'Я понимаю, что HTTPS шифрует трафик, но не проверяет код сайта'],
      mistakes: [
        { title: 'Путают порт и путь', fix: 'localhost:3000/api — порт 3000, путь /api.' },
        { title: 'Меняют DNS и ждут мгновенного результата', fix: 'Кэш DNS обновляется до нескольких часов — проверяй через nslookup.' },
        { title: 'Удаляют sslmode=require из строки Neon', fix: 'Neon не принимает соединение без SSL. Копируй строку целиком.' },
      ],
      askAI: {
        bad: 'Сайт не открывается.',
        good: 'Задеплоил Next.js 16 на Vercel, подключил домен example.ru через регистратора. Через 2 часа браузер пишет DNS_PROBE_FINISHED_NXDOMAIN. nslookup example.ru возвращает [вывод]. Опиши по шагам, какие DNS-записи должны быть и как проверить каждую.',
      },
      glossary: [
        { term: 'DNS', def: 'Система, превращающая доменные имена в IP-адреса.' },
        { term: 'Порт', def: 'Числовой номер «входа» на сервере: 80, 443, 3000.' },
        { term: 'HTTPS / TLS', def: 'HTTP поверх шифрования TLS.' },
        { term: 'CDN', def: 'Сеть серверов по миру, отдающих копии файлов рядом с пользователем.' },
      ],
      links: [{ title: 'MDN: Что такое DNS', url: 'https://developer.mozilla.org/ru/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name' }, { title: 'Neon: Connect', url: 'https://neon.tech/docs/connect/connect-from-any-app' }],
    },
  },
];
