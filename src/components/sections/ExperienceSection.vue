<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { experience } from '@/data/experience'
import { useReducedMotion } from '@/composables/useReducedMotion'
import { useStaggerReveal } from '@/composables/useStaggerReveal'

gsap.registerPlugin(ScrollTrigger)

const timelineRef = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const lineFillRef = ref<HTMLElement | null>(null)
const { prefersReduced } = useReducedMotion()

useStaggerReveal(listRef, ':scope > li', { y: 24, stagger: 0.12 })

let ctx: gsap.Context | null = null

onMounted(() => {
  if (!timelineRef.value || !lineFillRef.value) return

  if (prefersReduced.value) {
    lineFillRef.value.style.height = '100%'
    return
  }

  ctx = gsap.context(() => {
    gsap.fromTo(
      lineFillRef.value,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.value,
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.6,
        },
      },
    )
  })
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="experience"
    class="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20"
  >
    <SectionHeading eyebrow="Опыт работы" title="Где я работал и над чем" />

    <div ref="timelineRef" class="relative">
      <div class="absolute left-[5px] top-1 h-[calc(100%-0.5rem)] w-[2px] bg-white/10">
        <div ref="lineFillRef" class="w-full bg-gradient-to-b from-accent via-accent-2 to-accent-3" style="height: 0%" />
      </div>

      <ul ref="listRef" class="space-y-7 pl-8">
        <li v-for="job in experience" :key="job.company + job.period" class="relative">
          <span class="absolute -left-8 top-1.5 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_4px_var(--color-bg)]" />

          <div class="rounded-2xl border border-white/10 bg-surface/60 p-5">
            <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 class="font-display text-lg font-semibold text-ink">{{ job.role }} · {{ job.company }}</h3>
              <span class="font-mono-ui text-xs text-accent">{{ job.period }}</span>
            </div>
            <p v-if="job.location" class="mt-1 text-xs text-ink-muted">{{ job.location }}</p>
            <p class="mt-3 text-sm text-ink-muted">{{ job.description }}</p>

            <ul class="mt-3 space-y-1.5">
              <li v-for="(point, i) in job.highlights" :key="i" class="flex gap-2 text-sm text-ink-muted">
                <Icon icon="mdi:chevron-right" class="mt-0.5 h-4 w-4 shrink-0 text-accent-3" />
                <span>{{ point }}</span>
              </li>
            </ul>

            <div v-if="job.stack?.length" class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tech in job.stack"
                :key="tech"
                class="rounded-full border border-white/10 px-2.5 py-1 font-mono-ui text-xs text-ink-muted"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
