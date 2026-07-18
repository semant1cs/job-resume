import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Прогресс скролла страницы от 0 до 1 — используется в AppHeader
 * для тонкой полосы прогресса в шапке.
 */
export function useScrollProgress() {
  const progress = ref(0)

  function update() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    progress.value = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0
  }

  onMounted(() => {
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  })

  return { progress }
}
