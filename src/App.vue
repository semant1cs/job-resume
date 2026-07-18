<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import SlideNav from '@/components/layout/SlideNav.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import StackPrimarySection from '@/components/sections/StackPrimarySection.vue'
import StackSecondarySection from '@/components/sections/StackSecondarySection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import SkillProgressSection from '@/components/sections/SkillProgressSection.vue'
import ExpectationsSection from '@/components/sections/ExpectationsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import FunFactsSection from '@/components/sections/FunFactsSection.vue'
import AchievementsSection from '@/components/sections/AchievementsSection.vue'

const ParticleBackground = defineAsyncComponent(() => import('@/components/canvas/ParticleBackground.vue'))
</script>

<template>
  <ParticleBackground />
  <AppHeader />
  <main>
    <HeroSection />
    <ExperienceSection />
    <StackPrimarySection />
    <StackSecondarySection />
    <SkillsSection />
    <SkillProgressSection />
    <ExpectationsSection />
    <FunFactsSection />
    <AchievementsSection />
    <ContactSection />
  </main>
  <AppFooter />
  <SlideNav />
</template>
