# Резюме-сайт

Vue 3 + TypeScript + Tailwind CSS. Одностраничный сайт-резюме с несколькими
технически сложными web-кейсами: WebGL-сцена (three.js) в hero, генеративный
canvas-фон из частиц, скролл-driven анимации (GSAP ScrollTrigger) и
physics-плейграунд (matter.js) для карточек вне-IT достижений.

## Разработка

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # typecheck + сборка в dist/
npm run preview    # локальный просмотр собранной статики
```

## Контент

Весь текстовый контент — в `src/data/*.ts` (плейсхолдеры, помечены `TODO`).
Замени на реальные данные: имя, стек, навыки, ожидания, контакты, факты,
достижения — компоненты трогать не нужно.

## Деплой

См. [DEPLOYMENT.md](./DEPLOYMENT.md) — Vercel и Netlify.
# job-resume
