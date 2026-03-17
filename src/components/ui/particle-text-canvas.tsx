"use client"

import { useRef, useEffect } from "react"

interface ParticleTextProps {
  text?: string
  fontSize?: number
  mobileFontSize?: number
  className?: string
  particleSize?: number
  particleGap?: number
  mouseRadius?: number
}

class Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  color: string
  density: number

  constructor(x: number, y: number, color: string, size: number) {
    this.x = x
    this.y = y
    this.baseX = x
    this.baseY = y
    this.size = size
    this.color = color
    this.density = Math.random() * 40 + 5
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  update(mouseX: number | undefined, mouseY: number | undefined, mouseRadius: number) {
    if (mouseX === undefined || mouseY === undefined) {
      // Return to base
      if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10
      if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10
      return
    }

    const dx = mouseX - this.x
    const dy = mouseY - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < mouseRadius) {
      const force = (mouseRadius - distance) / mouseRadius
      const dirX = (dx / distance) * force * this.density
      const dirY = (dy / distance) * force * this.density
      this.x -= dirX
      this.y -= dirY
    } else {
      if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 10
      if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 10
    }
  }
}

export default function ParticleText({
  text = "The future, on demand.",
  fontSize = 64,
  mobileFontSize = 32,
  className = "",
  particleSize = 1.5,
  particleGap = 3,
  mouseRadius = 120,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number | undefined; y: number | undefined }>({
    x: undefined,
    y: undefined,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrameId: number

    const isMobile = window.innerWidth < 768
    const activeFontSize = isMobile ? mobileFontSize : fontSize

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function init() {
      if (!ctx || !canvas) return
      particles = []

      const textX = canvas.width / 2
      const textY = canvas.height / 2

      ctx.font = `bold ${activeFontSize}px "Geist Sans", system-ui, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Use accent color gradient
      const gradient = ctx.createLinearGradient(0, textY - activeFontSize, canvas.width, textY + activeFontSize)
      gradient.addColorStop(0, "#E8971A") // accent
      gradient.addColorStop(0.5, "#F5C060") // lighter accent
      gradient.addColorStop(1, "#E8971A") // accent
      ctx.fillStyle = gradient
      ctx.fillText(text, textX, textY)

      const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let y = 0; y < textCoordinates.height; y += particleGap) {
        for (let x = 0; x < textCoordinates.width; x += particleGap) {
          const alphaIndex = (y * 4 * textCoordinates.width) + (x * 4) + 3
          if (textCoordinates.data[alphaIndex] > 128) {
            const r = textCoordinates.data[alphaIndex - 3]
            const g = textCoordinates.data[alphaIndex - 2]
            const b = textCoordinates.data[alphaIndex - 1]
            const color = `rgb(${r},${g},${b})`
            particles.push(new Particle(x, y, color, particleSize))
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.update(mouseRef.current.x, mouseRef.current.y, mouseRadius)
        p.draw(ctx)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: undefined, y: undefined }
    }

    const handleResize = () => {
      resize()
      init()
    }

    resize()
    init()
    animate()

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", handleResize)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [text, fontSize, mobileFontSize, particleSize, particleGap, mouseRadius])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full touch-none ${className}`}
      aria-hidden="true"
    />
  )
}
