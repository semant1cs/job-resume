<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Achievement } from '@/types/content'

defineProps<{ achievement: Achievement }>()
</script>

<template>
  <div
    class="flex select-none flex-col justify-between rounded-2xl border border-white/10 bg-surface/90 p-4 shadow-lg backdrop-blur-sm"
  >
    <div class="flex items-center justify-between">
      <Icon :icon="achievement.icon" class="h-6 w-6" :style="{ color: achievement.color }" />
      <span class="font-mono-ui text-lg font-semibold" :style="{ color: achievement.color }">
        {{ achievement.value }}
      </span>
    </div>
    <div>
      <p class="font-display text-sm font-semibold text-ink">{{ achievement.title }}</p>
      <p class="text-xs text-ink-muted">{{ achievement.description }}</p>
    </div>
  </div>
</template>
