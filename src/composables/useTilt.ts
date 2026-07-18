import { ref, type Ref } from 'vue'
import { useReducedMotion } from './useReducedMotion'

/**
 * 3D-tilt карточки по позиции курсора: вычисляет transform на основе
 * положения указателя относительно элемента. Отключается при
 * prefers-reduced-motion.
 */
export function useTilt(elRef: Ref<HTMLElement | null>, maxTilt = 10) {
  const { prefersReduced } = useReducedMotion()
  const style = ref({ transform: '', transition: '' })

  function onPointerMove(event: PointerEvent) {
    const el = elRef.value
    if (!el || prefersReduced.value) return

    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5

    const rotateX = (-py * maxTilt).toFixed(2)
    const rotateY = (px * maxTilt).toFixed(2)

    style.value = {
      transform: `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease-out',
    }
  }

  function onPointerLeave() {
    style.value = {
      transform: 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    }
  }

  return { style, onPointerMove, onPointerLeave }
}
