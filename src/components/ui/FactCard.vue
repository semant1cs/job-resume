<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import type { FunFact } from '@/types/content'
import { useTilt } from '@/composables/useTilt'

defineProps<{ fact: FunFact }>()

const cardRef = ref<HTMLElement | null>(null)
const { style, onPointerMove, onPointerLeave } = useTilt(cardRef)
</script>

<template>
  <div
    ref="cardRef"
    class="rounded-2xl border border-white/10 bg-surface/70 p-6"
    :style="style"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <Icon :icon="fact.icon" class="mb-4 h-8 w-8 text-accent-2" />
    <h3 class="mb-2 font-display text-base font-semibold text-ink">{{ fact.title }}</h3>
    <p class="text-sm text-ink-muted">{{ fact.description }}</p>
  </div>
</template>
