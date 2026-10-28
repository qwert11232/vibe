// ЗАЧЕМ: задания Code Review: код с тремя намеренными ошибками
export type Review = { id: string; title: string; moduleId: string; language: string; code: string; issues: { title: string; explain: string }[] };

export const reviews: Review[] = [
  {
    id: '1', moduleId: '2', title: 'Найди 3 ошибки в этом репозитории', language: 'text',
    code: `$ git ls-files
.env
.next/server/app/page.js
node_modules/react/index.js
app/page.tsx
package.json

$ cat .env
DATABASE_URL=postgresql://admin:S3cret@ep-cool.neon.tech/prod
TELEGRAM_BOT_TOKEN=7312:AAF-real-token

$ cat .gitignore
cat: .gitignore: No such file or directory

$ ls
app  package.json  .env  node_modules  .next`,
    issues: [
      { title: 'Секреты в репозитории (.env закоммичен)', explain: 'Пароль БД и токен бота теперь в истории Git. Удалить файл недостаточно: ключи надо перевыпустить (rotate), а .env добавить в .gitignore.' },
      { title: 'Нет .gitignore', explain: 'Поэтому в репозиторий попали .env, node_modules и .next. Папки сборки и зависимости восстанавливаются командами npm install и next build.' },
      { title: 'Нет README', explain: 'В списке нет README.md: новый человек не поймёт, как запустить проект. Опиши установку, переменные окружения и команды.' },
    ],
  },
];
