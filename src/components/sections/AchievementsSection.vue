<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { achievements } from '@/data/achievements'

const PhysicsPlayground = defineAsyncComponent(() => import('@/components/canvas/PhysicsPlayground.vue'))

const anchorRef = ref<HTMLElement | null>(null)
const shouldMount = ref(false)

const { stop } = useIntersectionObserver(anchorRef, ([entry]) => {
  if (entry?.isIntersecting) {
    shouldMount.value = true
    stop()
  }
})
</script>

<template>
  <section
    id="achievements"
    class="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20"
  >
    <SectionHeading eyebrow="Вне IT" title="Достижения, которыми я горжусь" />
    <div ref="anchorRef" class="min-h-[360px]">
      <PhysicsPlayground v-if="shouldMount" :achievements="achievements" />
    </div>
  </section>
</template>
