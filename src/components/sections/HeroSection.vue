<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { profile } from '@/data/profile'
import { useReducedMotion } from '@/composables/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const HeroScene = defineAsyncComponent(() => import('@/components/canvas/HeroScene.vue'))

const sectionRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const { prefersReduced } = useReducedMotion()

let ctx: gsap.Context | null = null

onMounted(() => {
  if (!sectionRef.value || !contentRef.value || prefersReduced.value) return

  ctx = gsap.context(() => {
    gsap.to(contentRef.value, {
      opacity: 0.15,
      y: -60,
      scale: 0.94,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section id="top" ref="sectionRef" class="relative flex min-h-screen items-center overflow-hidden pt-16">
    <div class="pointer-events-none absolute inset-y-0 right-0 w-full opacity-70 sm:w-2/3">
      <HeroScene />
    </div>

    <div ref="contentRef" class="relative mx-auto w-full max-w-6xl px-6">
      <div class="max-w-2xl animate-fade-up">
        <p class="mb-4 font-mono-ui text-sm text-accent">
          <span v-if="profile.availableForWork">Открыт к предложениям</span>
          <span v-else>{{ profile.location }}</span>
        </p>
        <h1 class="font-display text-4xl font-semibold leading-tight text-ink sm:text-6xl">
          {{ profile.name }}
        </h1>
        <p class="mt-4 font-mono-ui text-lg text-accent-2 sm:text-xl">{{ profile.role }}</p>
        <p class="mt-6 text-lg text-ink-muted">{{ profile.tagline }}</p>

        <div class="mt-8 space-y-3">
          <p v-for="(paragraph, index) in profile.bio" :key="index" class="text-sm leading-relaxed text-ink-muted">
            {{ paragraph }}
          </p>
        </div>

        <div class="mt-10 flex gap-4">
          <a
            href="#contacts"
            class="rounded-full bg-accent px-6 py-3 font-mono-ui text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            Связаться
          </a>
          <a
            href="#experience"
            class="rounded-full border border-white/15 px-6 py-3 font-mono-ui text-sm font-medium text-ink transition-colors hover:border-accent/50"
          >
            Мой путь
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
