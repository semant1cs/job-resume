import type { Skill } from '@/types/content'

export const skills: Skill[] = [
  { name: 'Vue 3 / Composition API', level: 90, description: 'Продвинутый Vue, хорошие познания в продвинутой реактивности, Pinia/Vuex, Pinia Colada, Quasar' },
  { name: 'TypeScript', level: 85, description: 'Типизация сложных доменных моделей, generics, strict mode, создание собственной либы для типизации' },
  { name: 'CSS / Tailwind / анимации', level: 88, description: 'Адаптивная вёрстка, кастомные анимации, дизайн-системы' },
  { name: 'Производительность и оптимизация', level: 75, description: 'Ленивая загрузка, code-splitting' },
  { name: 'Backend / API интеграция', level: 60, description: 'REST/GraphQL, работа с бэкенд-командой над контрактами' },
]
