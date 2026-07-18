<script setup lang="ts">
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import FactCard from '@/components/ui/FactCard.vue'
import { funFacts } from '@/data/facts'
import { useStaggerReveal } from '@/composables/useStaggerReveal'

const gridRef = ref<HTMLElement | null>(null)
useStaggerReveal(gridRef, ':scope > .reveal-item')
</script>

<template>
  <section id="facts" class="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
    <SectionHeading eyebrow="Интересные факты" title="Немного обо мне вне рабочих задач" />
    <div ref="gridRef" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="fact in funFacts" :key="fact.title" class="reveal-item">
        <FactCard :fact="fact" />
      </div>
    </div>
  </section>
</template>
