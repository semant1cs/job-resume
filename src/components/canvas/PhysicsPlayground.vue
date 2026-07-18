<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { usePhysicsWorld } from '@/composables/usePhysicsWorld'
import { useReducedMotion } from '@/composables/useReducedMotion'
import type { Achievement } from '@/types/content'
import AchievementCard from '@/components/ui/AchievementCard.vue'

const props = defineProps<{ achievements: Achievement[] }>()

const CARD_WIDTH = 208
const CARD_HEIGHT = 132

const containerRef = ref<HTMLElement | null>(null)
const { prefersReduced } = useReducedMotion()

const specs = props.achievements.map(() => ({ width: CARD_WIDTH, height: CARD_HEIGHT }))
const { transforms, start, stop, wake } = usePhysicsWorld(containerRef, specs)

useIntersectionObserver(containerRef, ([entry]) => {
  if (prefersReduced.value) return
  if (entry?.isIntersecting) start()
  else stop()
})

const cardStyle = computed(() => (index: number) => {
  const t = transforms.value[index]
  if (!t) return {}
  return {
    width: `${CARD_WIDTH}px`,
    height: `${CARD_HEIGHT}px`,
    transform: `translate3d(${t.x - CARD_WIDTH / 2}px, ${t.y - CARD_HEIGHT / 2}px, 0) rotate(${t.angle}rad)`,
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative h-[56vh] min-h-[360px] max-h-[520px] w-full touch-none overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]"
  >
    <p
      class="pointer-events-none absolute inset-x-0 top-4 text-center font-mono-ui text-xs uppercase tracking-widest text-ink-muted"
    >
      Наведи или перетащи карточки
    </p>

    <template v-if="prefersReduced">
      <div class="grid h-full grid-cols-2 gap-4 overflow-y-auto p-6 sm:grid-cols-3">
        <AchievementCard
          v-for="(achievement, index) in achievements"
          :key="index"
          :achievement="achievement"
          class="static"
        />
      </div>
    </template>
    <template v-else>
      <AchievementCard
        v-for="(achievement, index) in achievements"
        :key="index"
        :achievement="achievement"
        class="absolute left-0 top-0 cursor-grab will-change-transform active:cursor-grabbing"
        :style="cardStyle(index)"
        @pointerenter="wake(index)"
        @pointerdown="wake(index)"
      />
    </template>
  </div>
</template>
