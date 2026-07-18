<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { TechItem } from '@/types/content'

defineProps<{ tech: TechItem }>()
</script>

<template>
  <div
    class="group flex items-center gap-3 rounded-xl border border-white/10 bg-surface/70 px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface"
  >
    <Icon :icon="tech.icon" class="h-7 w-7 shrink-0" />
    <div>
      <p class="font-display text-sm font-medium text-ink">{{ tech.name }}</p>
      <p v-if="tech.years" class="text-xs text-ink-muted">{{ tech.years }}+ лет опыта</p>
    </div>
  </div>
</template>
