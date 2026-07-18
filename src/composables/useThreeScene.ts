import * as THREE from 'three'
import { onBeforeUnmount, onMounted, type Ref } from 'vue'

interface UseThreeSceneOptions {
  /** Вызывается один раз после создания scene/camera — здесь добавляют объекты. */
  onInit: (ctx: { scene: THREE.Scene; camera: THREE.PerspectiveCamera }) => void
  /** Вызывается каждый кадр (пропускается, если анимация остановлена). */
  onFrame?: (elapsed: number) => void
}

/**
 * Общий boilerplate three.js: создание scene/camera/renderer, resize через
 * ResizeObserver, requestAnimationFrame-луп и корректный dispose всех
 * GPU-ресурсов при размонтировании компонента (частый источник утечек
 * WebGL-контекста в SPA).
 */
export function useThreeScene(canvasRef: Ref<HTMLCanvasElement | null>, options: UseThreeSceneOptions) {
  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let resizeObserver: ResizeObserver | null = null
  let rafId = 0
  let running = false
  const clock = new THREE.Clock()

  function resize() {
    const canvas = canvasRef.value
    if (!canvas || !renderer || !camera) return
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    renderer.setSize(width, height, false)
    camera.aspect = width / (height || 1)
    camera.updateProjectionMatrix()
  }

  function tick() {
    if (!running || !renderer || !scene || !camera) return
    options.onFrame?.(clock.getElapsedTime())
    renderer.render(scene, camera)
    rafId = requestAnimationFrame(tick)
  }

  function start() {
    if (running) return
    running = true
    clock.start()
    rafId = requestAnimationFrame(tick)
  }

  function stop() {
    running = false
    cancelAnimationFrame(rafId)
  }

  function renderOnce() {
    if (!renderer || !scene || !camera) return
    renderer.render(scene, camera)
  }

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 6

    options.onInit({ scene, camera })
    resize()

    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
  })

  onBeforeUnmount(() => {
    stop()
    resizeObserver?.disconnect()

    scene?.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
        object.geometry?.dispose()
        const material = object.material
        if (Array.isArray(material)) {
          material.forEach((m) => m.dispose())
        } else {
          material?.dispose()
        }
      }
    })

    renderer?.dispose()
    renderer = null
    scene = null
    camera = null
  })

  return { start, stop, renderOnce }
}
