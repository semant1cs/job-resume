<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { expectations } from '@/data/expectations'
import { useStaggerReveal } from '@/composables/useStaggerReveal'

const gridRef = ref<HTMLElement | null>(null)
useStaggerReveal(gridRef)
</script>

<template>
  <section id="expectations" class="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
    <SectionHeading eyebrow="Что я ожидаю от компании" title="Условия, в которых я работаю лучше всего" />
    <div ref="gridRef" class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="item in expectations"
        :key="item.title"
        class="flex gap-4 rounded-2xl border border-white/10 bg-surface/60 p-6"
      >
        <Icon :icon="item.icon" class="h-7 w-7 shrink-0 text-accent" />
        <div>
          <h3 class="mb-1 font-display text-base font-semibold text-ink">{{ item.title }}</h3>
          <p class="text-sm text-ink-muted">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
