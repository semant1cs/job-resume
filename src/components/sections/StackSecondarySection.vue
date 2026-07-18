<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TechBadge from '@/components/ui/TechBadge.vue'
import { secondaryStack } from '@/data/stack'
import { useStaggerReveal } from '@/composables/useStaggerReveal'

const gridRef = ref<HTMLElement | null>(null)
useStaggerReveal(gridRef)
</script>

<template>
  <section id="stack-secondary" class="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
    <SectionHeading eyebrow="Дополнительный стек" title="Могу применять при необходимости" />
    <div ref="gridRef" class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <TechBadge v-for="tech in secondaryStack" :key="tech.name" :tech="tech" />
    </div>
  </section>
</template>
