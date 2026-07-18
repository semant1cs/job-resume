import type { Expectation } from '@/types/content'

export const expectations: Expectation[] = [
  {
    title: 'Сильная инженерная культура',
    description: 'Код-ревью, тестирование, договорённости по архитектуре, отсутствие "костылей на потом".',
    icon: 'mdi:source-branch',
  },
  {
    title: 'Продуктовое мышление',
    description: 'Понимание, зачем строится фича, как она влияет на пользователей.',
    icon: 'mdi:lightbulb-on-outline',
  },
  {
    title: 'Пространство для роста',
    description: 'Возможность брать сложные задачи и прокачивать свой скиллы',
    icon: 'mdi:trending-up',
  },
  {
    title: 'Честная обратная связь',
    description: 'Прозрачные ожидания, регулярный фидбек.',
    icon: 'mdi:message-reply-text-outline',
  },
]
