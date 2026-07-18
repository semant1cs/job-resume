<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import SkillBar from '@/components/ui/SkillBar.vue'
import { skills } from '@/data/skills'
</script>

<template>
  <section id="skills" class="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
    <SectionHeading eyebrow="Уровень владения" title="Насколько уверенно я себя чувствую в каждой области" />
    <div class="grid gap-x-12 gap-y-8 sm:grid-cols-2">
      <SkillBar v-for="skill in skills" :key="skill.name" :skill="skill" />
    </div>
  </section>
</template>
