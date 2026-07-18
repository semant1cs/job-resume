<script setup lang="ts">
import { profile } from '@/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-white/5 py-8 pb-16">
    <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 text-center sm:flex-row sm:text-left">
      <p class="text-xs text-ink-muted">© {{ year }} {{ profile.name }}</p>
      <p class="font-mono-ui text-xs text-ink-muted">Vue 3 · TypeScript · Tailwind CSS</p>
    </div>
  </footer>
</template>
