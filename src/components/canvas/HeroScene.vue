<script setup lang="ts">
import * as THREE from 'three'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useThreeScene } from '@/composables/useThreeScene'
import { useReducedMotion } from '@/composables/useReducedMotion'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { prefersReduced } = useReducedMotion()

const pointer = { x: 0, y: 0 }
const targetRotation = { x: 0, y: 0 }
let group: THREE.Group | null = null

function onPointerMove(event: PointerEvent) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = (event.clientY / window.innerHeight) * 2 - 1
  targetRotation.y = pointer.x * 0.5
  targetRotation.x = pointer.y * 0.3
}

const { start, renderOnce } = useThreeScene(canvasRef, {
  onInit({ scene }) {
    group = new THREE.Group()

    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1)
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    group.add(core)

    const pointsGeometry = new THREE.IcosahedronGeometry(2.35, 2)
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xa78bfa,
      size: 0.035,
      transparent: true,
      opacity: 0.8,
    })
    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    group.add(points)

    scene.add(group)

    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)
  },
  onFrame(elapsed) {
    if (!group) return

    if (!prefersReduced.value) {
      group.rotation.y = elapsed * 0.08 + targetRotation.y
      group.rotation.x = targetRotation.x
    }
  },
})

onMounted(() => {
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  if (prefersReduced.value) {
    renderOnce()
  } else {
    start()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
})
</script>

<template>
  <canvas ref="canvasRef" class="h-full w-full" aria-hidden="true" />
</template>
