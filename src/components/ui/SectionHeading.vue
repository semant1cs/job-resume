<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

defineProps<{ eyebrow: string; title: string }>()

const rootRef = ref<HTMLElement | null>(null)
const { prefersReduced } = useReducedMotion()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!rootRef.value || prefersReduced.value) return

  ctx = gsap.context(() => {
    gsap.from(rootRef.value, {
      opacity: 0,
      y: 32,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: rootRef.value,
        start: 'top 85%',
        once: true,
      },
    })
  }, rootRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="rootRef" class="mb-10 max-w-2xl">
    <p class="mb-3 font-mono-ui text-xs uppercase tracking-[0.3em] text-accent">{{ eyebrow }}</p>
    <h2 class="font-display text-3xl font-semibold text-ink sm:text-4xl">{{ title }}</h2>
  </div>
</template>
