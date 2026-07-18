<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { skills } from '@/data/skills'
import { useStaggerReveal } from '@/composables/useStaggerReveal'

const gridRef = ref<HTMLElement | null>(null)
useStaggerReveal(gridRef)
</script>

<template>
  <section id="capabilities" class="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
    <SectionHeading eyebrow="Что я умею" title="Компетенции, на которые можно опираться" />
    <div ref="gridRef" class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="skill in skills"
        :key="skill.name"
        class="rounded-2xl border border-white/10 bg-surface/60 p-6 transition-colors hover:border-accent/30"
      >
        <Icon icon="mdi:check-decagram-outline" class="mb-3 h-6 w-6 text-accent-3" />
        <h3 class="mb-1 font-display text-base font-semibold text-ink">{{ skill.name }}</h3>
        <p class="text-sm text-ink-muted">{{ skill.description }}</p>
      </div>
    </div>
  </section>
</template>
