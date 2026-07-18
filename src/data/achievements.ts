import type { Achievement } from '@/types/content'

export const achievements: Achievement[] = [
  {
    title: 'Судоку',
    value: '4000+',
    description: 'решённых судоку разной сложности',
    icon: 'mdi:grid',
    color: '#7dd3fc',
  },
  {
    title: 'Сапёр',
    value: '2000+',
    description: 'пройденных карт разной сложности',
    icon: 'mdi:bomb',
    color: '#a78bfa',
  },
  {
    title: 'CS2 · FACEIT',
    value: '2000 ELO',
    description: 'стабильный соревновательный рейтинг',
    icon: 'mdi:target',
    color: '#34d399',
  },
  {
    title: 'Dota 2',
    value: 'Титан',
    description: 'ранг в соревновательном режиме',
    icon: 'mdi:sword-cross',
    color: '#f472b6',
  },
  {
    title: 'Баскетбол',
    value: '3 разряд',
    description: 'взрослый спортивный разряд',
    icon: 'mdi:basketball',
    color: '#fb923c',
  },
  {
    title: 'Пауэрлифтинг',
    value: '3 разряд',
    description: 'взрослый спортивный разряд',
    icon: 'mdi:weight-lifter',
    color: '#facc15',
  },
]
