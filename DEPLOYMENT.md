# Деплой

Проект — чистый статический SPA без бэкенда и без клиентского роутера (одна
страница с якорной навигацией), поэтому деплой максимально простой: любой
статический хостинг, который умеет собрать Vite-проект.

## Сборка

```bash
npm install
npm run build   # vue-tsc -b && vite build -> dist/
npm run preview # локально проверить собранную статику перед деплоем
```

Результат — папка `dist/`, её нужно отдать статикой. SSR не используется.

## Vercel

1. Импортировать репозиторий в Vercel — framework preset определится
   автоматически как **Vite**.
2. Build command: `npm run build`. Output directory: `dist`.
3. Rewrites/redirects не нужны — роутера нет, есть только один `index.html`.
4. Свой домен: Vercel Dashboard → Project → Settings → Domains → добавить
   домен и прописать у регистратора CNAME (или A-запись) согласно инструкции
   в дашборде.

## Netlify

Добавлен `netlify.toml` в корне:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

1. Импортировать репозиторий в Netlify — настройки подхватятся из
   `netlify.toml`.
2. `_redirects`/SPA-фолбэк не нужен — снова из-за отсутствия роутера.
3. Свой домен — Netlify Dashboard → Domain settings.

## GitHub Pages (альтернатива)

Не выбран как основной вариант, но если понадобится: нужно будет добавить
`base: '/<repo-name>/'` в `vite.config.ts` и джоб в GitHub Actions, который
пушит `dist/` в ветку `gh-pages`. Не настроено by default в этом проекте.

## Переменные окружения

Не требуются — сайт полностью статический, контакты — обычные ссылки
(`mailto:`, Telegram, GitHub, LinkedIn), без форм и внешних API. Если позже
добавится форма обратной связи (например, через EmailJS/Formspree), её ключ
нужно будет положить в переменную с префиксом `VITE_` (например,
`VITE_EMAILJS_PUBLIC_KEY`) через дашборд Vercel/Netlify — префикс `VITE_`
обязателен, иначе Vite не встроит переменную в клиентский бандл.

## Чек-лист перед деплоем

- [ ] `npm run build` проходит без ошибок TypeScript (`vue-tsc -b`)
- [ ] `npm run preview` — глазами пройтись по всем секциям
- [ ] Бандлы `three`/`matter-js`/`gsap` реально лежат в отдельных чанках
      (см. `vite.config.ts` → `build.rollupOptions.output.manualChunks`),
      проверить размеры в выводе `vite build`
- [ ] Эмуляция `prefers-reduced-motion: reduce` в DevTools — анимации должны
      корректно деградировать, вёрстка не должна ломаться
- [ ] Проверка на мобильном/слабом устройстве — WebGL-сцена и
      physics-плейграунд не должны давать просадку FPS на всей странице
- [ ] Заменить плейсхолдеры в `src/data/*.ts` на реальный контент
- [ ] Добавить `public/og-image.png` (1200×630) — сейчас в `index.html`
      указан путь `/og-image.png`, файла ещё нет
- [ ] Заменить `public/favicon.svg` на свой, если нужно

## Опционально: CI

Сам деплой Vercel/Netlify уже запускается автоматически на пуш — отдельный CI
не обязателен. Если хочется gate на качество кода, можно добавить простой
GitHub Actions workflow, который на каждый PR гоняет `npm run build`
(включает typecheck через `vue-tsc -b`).
