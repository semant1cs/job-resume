<script setup lang="ts">
import { useScrollProgress } from '@/composables/useScrollProgress'
import { profile } from '@/data/profile'

const { progress } = useScrollProgress()

const navLinks = [
  { href: '#experience', label: 'Опыт' },
  { href: '#stack', label: 'Стек' },
  { href: '#skills', label: 'Навыки' },
  { href: '#expectations', label: 'Ожидания' },
  { href: '#facts', label: 'Обо мне' },
  { href: '#achievements', label: 'Достижения' },
  { href: '#contacts', label: 'Контакты' },
]
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-bg/70 backdrop-blur-md">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <a href="#top" class="font-mono-ui text-sm font-semibold tracking-tight text-ink">
        {{ profile.name }}
      </a>
      <nav class="hidden gap-5 lg:flex">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm text-ink-muted transition-colors hover:text-ink"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
    <div class="h-[2px] w-full bg-white/5">
      <div
        class="h-full bg-gradient-to-r from-accent via-accent-2 to-accent-3"
        :style="{ width: `${progress * 100}%` }"
      />
    </div>
  </header>
</template>
