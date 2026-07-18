<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { contacts } from '@/data/contacts'
import { useStaggerReveal } from '@/composables/useStaggerReveal'

const gridRef = ref<HTMLElement | null>(null)
useStaggerReveal(gridRef)
</script>

<template>
  <section id="contacts" class="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
    <SectionHeading eyebrow="Контакты" title="Куда можно написать" />
    <div ref="gridRef" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <a
        v-for="contact in contacts"
        :key="contact.type"
        :href="contact.href"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-surface/60 p-6 transition-all hover:-translate-y-1 hover:border-accent/40"
      >
        <Icon :icon="contact.icon" class="h-7 w-7 text-accent-2" />
        <div>
          <p class="font-display text-sm font-semibold text-ink">{{ contact.label }}</p>
          <p class="text-xs text-ink-muted group-hover:text-ink">{{ contact.value }}</p>
        </div>
      </a>
    </div>
  </section>
</template>
