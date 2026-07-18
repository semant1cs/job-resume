import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { useReducedMotion } from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface StaggerRevealOptions {
  y?: number
  stagger?: number
  duration?: number
  start?: string
}

/**
 * Каскадное появление прямых детей контейнера при скролле во вьюпорт.
 * clearProps обязателен: без него GSAP оставляет инлайновый transform,
 * который перебивает hover-эффекты Tailwind (`hover:-translate-y-1` и т.п.)
 * на этих же элементах после завершения анимации.
 */
export function useStaggerReveal(
  containerRef: Ref<HTMLElement | null>,
  selector = ':scope > *',
  options: StaggerRevealOptions = {},
) {
  const { prefersReduced } = useReducedMotion()
  let ctx: gsap.Context | null = null

  onMounted(() => {
    const container = containerRef.value
    if (!container || prefersReduced.value) return

    const items = container.querySelectorAll(selector)
    if (!items.length) return

    ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: options.y ?? 28,
        duration: options.duration ?? 0.7,
        ease: 'power3.out',
        stagger: options.stagger ?? 0.08,
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: container,
          start: options.start ?? 'top 82%',
          once: true,
        },
      })
    }, container)
  })

  onBeforeUnmount(() => {
    ctx?.revert()
  })
}
