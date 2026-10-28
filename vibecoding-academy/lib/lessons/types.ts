// ЗАЧЕМ: типы контента. Тип Lesson — «контракт»: компилятор не даст забыть раздел урока.
export type Glossary = { term: string; def: string };
export type LessonBody = {
  goal: string;                          // 🎯 Цель
  bigPicture: string;                    // 🗺️ ASCII-схема
  theory: { heading: string; body: string }[]; // 📖 Теория (код — между строками ~~~)
  practice: string;                      // 🔬 Практика
  checklist: string[];                   // ✅ Самопроверка
  mistakes: { title: string; fix: string }[]; // 💥 Ошибки
  askAI: { bad: string; good: string };  // 🤖 Как спросить ИИ
  glossary: Glossary[];                  // 📚 Глоссарий
  links: { title: string; url: string }[]; // 🔗 Ссылки
  journey?: number[];                    // какие шаги RequestJourney подсветить
};
export type Lesson = { id: string; moduleId: string; number: string; title: string; summary: string; body?: LessonBody };
export type Module = { id: string; title: string; bigPicture: string; lessons: Lesson[]; quiz: boolean; review?: string };

// Лёгкие версии для клиентских компонентов: без тяжёлого текста уроков (иначе он уедет в браузер!)
export type LessonMeta = Omit<Lesson, 'body'> & { ready: boolean };
export type ModuleSummary = Omit<Module, 'lessons'> & { lessons: LessonMeta[] };
