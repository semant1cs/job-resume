import Matter from 'matter-js'
import { onBeforeUnmount, onMounted, shallowRef, type Ref } from 'vue'

export interface PhysicsBodySpec {
  width: number
  height: number
}

export interface BodyTransform {
  x: number
  y: number
  angle: number
}

const GRID_GAP = 24

/**
 * Boilerplate matter.js: engine + собственный rAF-луп (вместо Matter.Runner,
 * чтобы иметь ручной pause/resume для off-screen секций), статичные стены по
 * размеру контейнера, mouse constraint для драга. Позиции тел отдаются наружу
 * как обычные числа — их синхронизируют с DOM-карточками через CSS transform,
 * без Matter.Render.
 *
 * Тела стартуют статичными (isStatic) в аккуратной сетке и "просыпаются"
 * (переходят в динамический режим под гравитацией/драгом) только через явный
 * вызов `wake(index)` — вызывается снаружи по hover/pointerdown на карточке.
 */
export function usePhysicsWorld(containerRef: Ref<HTMLElement | null>, specs: PhysicsBodySpec[]) {
  const transforms = shallowRef<BodyTransform[]>(specs.map(() => ({ x: 0, y: 0, angle: 0 })))

  let engine: Matter.Engine | null = null
  let bodies: Matter.Body[] = []
  let walls: Matter.Body[] = []
  let mouse: Matter.Mouse | null = null
  let mouseConstraint: Matter.MouseConstraint | null = null
  let resizeObserver: ResizeObserver | null = null
  let rafId = 0
  let running = false
  let lastTime = 0

  function buildWalls(width: number, height: number) {
    const thickness = 80

    return [
      Matter.Bodies.rectangle(width / 2, height + thickness / 2, width * 2, thickness, { isStatic: true }),
      Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, { isStatic: true }),
      Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, { isStatic: true }),
    ]
  }

  function restingPosition(index: number, width: number, height: number) {
    const spec = specs[index]
    const columns = Math.max(1, Math.floor((width + GRID_GAP) / (spec.width + GRID_GAP)))
    const rows = Math.ceil(specs.length / columns)
    const col = index % columns
    const row = Math.floor(index / columns)

    const gridWidth = columns * spec.width + (columns - 1) * GRID_GAP
    const gridHeight = rows * spec.height + (rows - 1) * GRID_GAP

    const startX = (width - gridWidth) / 2 + spec.width / 2
    const startY = (height - gridHeight) / 2 + spec.height / 2

    return {
      x: startX + col * (spec.width + GRID_GAP),
      y: startY + row * (spec.height + GRID_GAP),
    }
  }

  function layout() {
    const el = containerRef.value
    if (!el || !engine) return
    const width = el.clientWidth
    const height = el.clientHeight

    if (walls.length) Matter.World.remove(engine.world, walls)
    walls = buildWalls(width, height)
    Matter.World.add(engine.world, walls)

    bodies.forEach((body, index) => {
      if (body.isStatic) {
        const { x, y } = restingPosition(index, width, height)
        Matter.Body.setPosition(body, { x, y })
      }
    })
  }

  function wake(index: number) {
    const body = bodies[index]
    if (!body || !body.isStatic) return
    Matter.Body.setStatic(body, false)
  }

  function tick(time: number) {
    if (!running || !engine) return
    const delta = lastTime ? Math.min(time - lastTime, 32) : 16.6
    lastTime = time
    Matter.Engine.update(engine, delta)

    transforms.value = bodies.map((body) => ({
      x: body.position.x,
      y: body.position.y,
      angle: body.angle,
    }))

    rafId = requestAnimationFrame(tick)
  }

  function start() {
    if (running) return
    running = true
    lastTime = 0
    rafId = requestAnimationFrame(tick)
  }

  function stop() {
    running = false
    cancelAnimationFrame(rafId)
  }

  onMounted(() => {
    const el = containerRef.value
    if (!el) return

    engine = Matter.Engine.create({ gravity: { x: 0, y: 1 } })

    bodies = specs.map((spec, index) => {
      const { x, y } = restingPosition(index, el.clientWidth, el.clientHeight)
      const body = Matter.Bodies.rectangle(x, y, spec.width, spec.height, {
        chamfer: { radius: 16 },
        restitution: 0.45,
        friction: 0.15,
        frictionAir: 0.015,
        density: 0.002,
      })

      Matter.Body.setStatic(body, true)
      return body
    })

    layout()
    Matter.World.add(engine.world, bodies)

    mouse = Matter.Mouse.create(el)
    mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    })
    Matter.World.add(engine.world, mouseConstraint)

    resizeObserver = new ResizeObserver(layout)
    resizeObserver.observe(el)

    start()
  })

  onBeforeUnmount(() => {
    stop()
    resizeObserver?.disconnect()
    if (mouse) Matter.Mouse.clearSourceEvents(mouse)
    if (engine) {
      Matter.World.clear(engine.world, false)
      Matter.Engine.clear(engine)
    }
    engine = null
    bodies = []
    walls = []
    mouseConstraint = null
    mouse = null
  })

  return { transforms, start, stop, wake }
}
