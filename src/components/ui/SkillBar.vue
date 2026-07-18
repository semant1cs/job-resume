<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Skill } from '@/types/content'
import { useReducedMotion } from '@/composables/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{ skill: Skill }>()

const rootRef = ref<HTMLElement | null>(null)
const fillRef = ref<HTMLElement | null>(null)
const counterRef = ref<HTMLElement | null>(null)
const { prefersReduced } = useReducedMotion()

let ctx: gsap.Context | null = null

onMounted(() => {
  if (!rootRef.value) return

  if (prefersReduced.value) {
    if (fillRef.value) fillRef.value.style.width = `${props.skill.level}%`
    if (counterRef.value) counterRef.value.textContent = `${props.skill.level}`
    return
  }

  ctx = gsap.context(() => {
    const counter = { value: 0 }
    gsap.timeline({
      scrollTrigger: {
        trigger: rootRef.value,
        start: 'top 85%',
        once: true,
      },
    })
      .fromTo(
        fillRef.value,
        { width: '0%' },
        { width: `${props.skill.level}%`, duration: 1.1, ease: 'power3.out' },
        0,
      )
      .to(
        counter,
        {
          value: props.skill.level,
          duration: 1.1,
          ease: 'power3.out',
          onUpdate() {
            if (counterRef.value) counterRef.value.textContent = `${Math.round(counter.value)}`
          },
        },
        0,
      )
  }, rootRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="rootRef" class="w-full">
    <div class="mb-2 flex items-baseline justify-between gap-4">
      <span class="font-display text-sm font-medium text-ink">{{ skill.name }}</span>
      <span class="font-mono-ui text-sm text-accent">
        <span ref="counterRef">0</span><span>%</span>
      </span>
    </div>
    <div class="h-2 w-full overflow-hidden rounded-full bg-white/5">
      <div
        ref="fillRef"
        class="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
        style="width: 0%"
      />
    </div>
    <p class="mt-2 text-xs text-ink-muted">{{ skill.description }}</p>
  </div>
</template>
