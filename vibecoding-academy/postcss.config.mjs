// ЗАЧЕМ: подключает Tailwind CSS v4 к сборке (в v4 отдельный tailwind.config.ts не нужен)
const config = { plugins: { '@tailwindcss/postcss': {} } };
export default config;
