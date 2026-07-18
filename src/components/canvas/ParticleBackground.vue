<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { prefersReduced } = useReducedMotion()

let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let rafId = 0
let running = false
let width = 0
let height = 0
const mouse = { x: -9999, y: -9999 }

const LINK_DISTANCE = 130
const MOUSE_RADIUS = 160

function particleCountFor(w: number, h: number) {
  const area = w * h
  return Math.min(140, Math.max(40, Math.round(area / 18000)))
}

function seedParticles() {
  const count = particleCountFor(width, height)
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
  }))
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio, 2)
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  seedParticles()
}

function step() {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)

  for (const p of particles) {
    const dx = p.x - mouse.x
    const dy = p.y - mouse.y
    const dist = Math.hypot(dx, dy)
    if (dist < MOUSE_RADIUS) {
      const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
      p.vx += (dx / (dist || 1)) * force * 0.6
      p.vy += (dy / (dist || 1)) * force * 0.6
    }

    p.x += p.vx
    p.y += p.vy
    p.vx *= 0.98
    p.vy *= 0.98

    if (p.x < 0 || p.x > width) p.vx *= -1
    if (p.y < 0 || p.y > height) p.vy *= -1
    p.x = Math.max(0, Math.min(width, p.x))
    p.y = Math.max(0, Math.min(height, p.y))
  }

  ctx.fillStyle = 'rgba(125, 211, 252, 0.55)'
  for (const p of particles) {
    ctx.beginPath()
    ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.strokeStyle = 'rgba(125, 211, 252, 0.12)'
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i]
      const b = particles[j]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      if (dist < LINK_DISTANCE) {
        ctx.globalAlpha = 1 - dist / LINK_DISTANCE
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }
  ctx.globalAlpha = 1
}

function loop() {
  if (!running) return
  step()
  rafId = requestAnimationFrame(loop)
}

function start() {
  if (running) return
  running = true
  rafId = requestAnimationFrame(loop)
}

function stop() {
  running = false
  cancelAnimationFrame(rafId)
}

function renderStaticFrame() {
  step()
}

function onPointerMove(event: PointerEvent) {
  mouse.x = event.clientX
  mouse.y = event.clientY
}

function onPointerLeave() {
  mouse.x = -9999
  mouse.y = -9999
}

function onVisibilityChange() {
  if (document.hidden) stop()
  else if (!prefersReduced.value) start()
}

onMounted(() => {
  ctx = canvasRef.value?.getContext('2d') ?? null
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerleave', onPointerLeave)
  document.addEventListener('visibilitychange', onVisibilityChange)

  if (prefersReduced.value) {
    renderStaticFrame()
  } else {
    start()
  }
})

onBeforeUnmount(() => {
  stop()
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerleave', onPointerLeave)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<template>
  <canvas ref="canvasRef" class="pointer-events-none fixed inset-0 -z-10 opacity-70" aria-hidden="true" />
</template>
