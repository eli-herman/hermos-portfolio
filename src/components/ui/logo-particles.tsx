"use client"

import { useRef, useEffect, useState } from "react"

interface LogoParticlesProps {
  text?: string
  className?: string
  particleCount?: number
  fontSize?: number
  mobileFontSize?: number
}

export default function LogoParticles({
  text = "EH",
  className = "",
  particleCount = 3000,
  fontSize = 200,
  mobileFontSize = 120,
}: LogoParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      setIsMobile(window.innerWidth < 768)
    }

    updateCanvasSize()

    const displayWidth = canvas.offsetWidth
    const displayHeight = canvas.offsetHeight

    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      color: string
      scatteredColor: string
      life: number
    }[] = []

    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvas) return

      ctx.save()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const size = isMobile ? mobileFontSize : fontSize

      ctx.font = `bold ${size}px "Geist Sans", system-ui, sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Draw text for sampling
      ctx.fillStyle = "#C9A84C" // accent color
      ctx.fillText(text, displayWidth / 2, displayHeight / 2)

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.restore()
    }

    function createParticle() {
      if (!ctx || !canvas || !textImageData) return null

      const data = textImageData.data
      const ratio = window.devicePixelRatio

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * displayWidth)
        const y = Math.floor(Math.random() * displayHeight)

        const pixelX = Math.floor(x * ratio)
        const pixelY = Math.floor(y * ratio)
        const idx = (pixelY * canvas.width + pixelX) * 4

        if (data[idx + 3] > 128) {
          return {
            x,
            y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1.8 + 0.4,
            color: `rgba(201, 168, 76, ${Math.random() * 0.6 + 0.4})`, // accent with varying opacity
            scatteredColor: `rgba(250, 250, 250, ${Math.random() * 0.6 + 0.4})`, // foreground when scattered
            life: Math.random() * 150 + 50,
          }
        }
      }

      return null
    }

    function createInitialParticles() {
      const scaledCount = Math.floor(
        particleCount * Math.sqrt((displayWidth * displayHeight) / (1920 * 1080))
      )
      for (let i = 0; i < scaledCount; i++) {
        const particle = createParticle()
        if (particle) particles.push(particle)
      }
    }

    let animationFrameId: number

    function animate() {
      if (!ctx || !canvas) return

      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.restore()

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = 50

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * 30
          const moveY = Math.sin(angle) * force * 30
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY
          ctx.fillStyle = p.scatteredColor
        } else {
          p.x += (p.baseX - p.x) * 0.06
          p.y += (p.baseY - p.y) * 0.06
          ctx.fillStyle = p.color
        }

        ctx.fillRect(p.x, p.y, p.size, p.size)

        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle()
          if (newParticle) {
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      const scaledCount = Math.floor(
        particleCount * Math.sqrt((displayWidth * displayHeight) / (1920 * 1080))
      )
      while (particles.length < scaledCount) {
        const newParticle = createParticle()
        if (newParticle) particles.push(newParticle)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    createTextImage()
    createInitialParticles()
    animate()

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      updateCanvasSize()
      createTextImage()
      particles = []
      createInitialParticles()
    }

    const handleMove = (x: number, y: number) => {
      const rect = canvas.getBoundingClientRect()
      mousePositionRef.current = { x: x - rect.left, y: y - rect.top }
    }

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const handleTouchStart = () => { isTouchingRef.current = true }
    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: 0, y: 0 }
    }
    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 }
      }
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile, text, fontSize, mobileFontSize, particleCount])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full touch-none ${className}`}
      aria-label={`Interactive particle effect forming "${text}"`}
    />
  )
}
