import { usePreferredReducedMotion } from '@vueuse/core'
import { computed } from 'vue'

/**
 * Единая точка правды по prefers-reduced-motion: тяжёлые сцены (three.js,
 * частицы, physics) должны проверять этот флаг перед запуском rAF-циклов.
 */
export function useReducedMotion() {
  const preference = usePreferredReducedMotion()
  const prefersReduced = computed(() => preference.value === 'reduce')
  return { prefersReduced }
}
