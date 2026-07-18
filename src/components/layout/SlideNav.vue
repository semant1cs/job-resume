<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

const slides = [
  { id: 'top', label: 'Начало' },
  { id: 'experience', label: 'Опыт' },
  { id: 'stack', label: 'Основной стек' },
  { id: 'stack-secondary', label: 'Доп. стек' },
  { id: 'capabilities', label: 'Что умею' },
  { id: 'skills', label: 'Навыки' },
  { id: 'expectations', label: 'Ожидания' },
  { id: 'facts', label: 'Факты' },
  { id: 'achievements', label: 'Достижения' },
  { id: 'contacts', label: 'Контакты' },
]

const { prefersReduced } = useReducedMotion()
const activeId = ref(slides[0].id)

let observer: IntersectionObserver | null = null
const ratios = new Map<string, number>()

function updateActive() {
  let bestId = activeId.value
  let bestRatio = 0
  for (const [id, ratio] of ratios) {
    if (ratio > bestRatio) {
      bestRatio = ratio
      bestId = id
    }
  }
  if (bestRatio > 0) activeId.value = bestId
}

function goTo(id: string) {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: prefersReduced.value ? 'auto' : 'smooth', block: 'start' })
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
      }
      updateActive()
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  )

  for (const slide of slides) {
    const el = document.getElementById(slide.id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-5 z-40 flex justify-center gap-2.5"
    aria-label="Навигация по секциям"
  >
    <button
      v-for="slide in slides"
      :key="slide.id"
      type="button"
      class="group relative flex h-6 items-center"
      :aria-current="slide.id === activeId ? 'true' : undefined"
      :aria-label="slide.label"
      @click="goTo(slide.id)"
    >
      <span
        class="rounded-full transition-all duration-300"
        :class="
          slide.id === activeId
            ? 'h-2 w-6 bg-gradient-to-r from-accent to-accent-2'
            : 'h-2 w-2 bg-white/25 group-hover:bg-white/50'
        "
      />
      <span
        class="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-surface px-2 py-1 font-mono-ui text-xs text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        {{ slide.label }}
      </span>
    </button>
  </nav>
</template>
