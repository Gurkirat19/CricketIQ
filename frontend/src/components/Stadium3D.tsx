import { useEffect, useRef } from 'react'

export default function Stadium3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let angle = 0

    // Particle field
    const particles: Array<{ x: number; y: number; vy: number; size: number; alpha: number }> = []
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * 400 - 200,
        y: Math.random() * 120 - 60,
        vy: Math.random() * 0.5 + 0.2,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.3,
      })
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.parentElement?.clientWidth ? canvas.parentElement.clientWidth * dpr : 800 * dpr
      canvas.height = 450 * dpr
      canvas.style.width = '100%'
      canvas.style.height = '450px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      angle += 0.005
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = 450
      const cx = w / 2
      const cy = h / 2 + 30

      ctx.clearRect(0, 0, w, h)

      // Draw futuristic dark space
      ctx.fillStyle = '#060816'
      ctx.fillRect(0, 0, w, h)

      // Isometric projection helper
      const project = (x: number, y: number, z: number) => {
        // Rotate around Y axis
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const rx = x * cos - z * sin
        const rz = x * sin + z * cos

        // Isometric scale projection factors
        const isoX = cx + rx
        const isoY = cy + rz * 0.4 - y // Squashed Y for perspective and raised height
        return { x: isoX, y: isoY, depth: rz }
      };

      // Draw Grid Floor
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.06)'
      ctx.lineWidth = 1
      const gridSize = 160
      const gridStep = 20
      for (let g = -gridSize; g <= gridSize; g += gridStep) {
        // X Lines
        ctx.beginPath()
        let start = project(-gridSize, -30, g)
        ctx.moveTo(start.x, start.y)
        let end = project(gridSize, -30, g)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()

        // Z Lines
        ctx.beginPath()
        start = project(g, -30, -gridSize)
        ctx.moveTo(start.x, start.y)
        end = project(g, -30, gridSize)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()
      }

      // Draw concentric boundary rings
      const rings = [150, 120, 80]
      rings.forEach((r, idx) => {
        ctx.beginPath()
        ctx.strokeStyle = idx === 1 ? '#7C3AED' : '#00D4FF'
        ctx.lineWidth = idx === 0 ? 1 : 1.5
        ctx.globalAlpha = idx === 2 ? 0.35 : 0.15

        // Approximate ellipse by projecting 64 points
        for (let i = 0; i <= 64; i++) {
          const theta = (i / 64) * Math.PI * 2
          const pt = project(Math.cos(theta) * r, -10, Math.sin(theta) * r)
          if (i === 0) ctx.moveTo(pt.x, pt.y)
          else ctx.lineTo(pt.x, pt.y)
        }
        ctx.stroke()
        ctx.globalAlpha = 1.0
      })

      // Draw Outfield Pitch
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.6)'
      ctx.fillStyle = 'rgba(0, 212, 255, 0.04)'
      ctx.lineWidth = 2
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2
        const pt = project(Math.cos(theta) * 45, -10, Math.sin(theta) * 45)
        if (i === 0) ctx.moveTo(pt.x, pt.y)
        else ctx.lineTo(pt.x, pt.y)
      }
      ctx.fill()
      ctx.stroke()

      // Draw Pitch lines
      ctx.beginPath()
      ctx.strokeStyle = '#00D4FF'
      ctx.lineWidth = 1
      const p1 = project(-12, -10, -5)
      const p2 = project(12, -10, -5)
      const p3 = project(12, -10, 5)
      const p4 = project(-12, -10, 5)
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.lineTo(p3.x, p3.y)
      ctx.lineTo(p4.x, p4.y)
      ctx.closePath()
      ctx.fillStyle = 'rgba(0, 212, 255, 0.15)'
      ctx.fill()
      ctx.stroke()

      // Render Floating holographic stats particles
      particles.forEach((p) => {
        p.y += p.vy
        if (p.y > 100) {
          p.y = -40
          p.x = Math.random() * 300 - 150
        }
        const pt = project(p.x, p.y, Math.sin(p.x * 0.01) * 100)
        ctx.beginPath()
        ctx.fillStyle = '#00D4FF'
        ctx.globalAlpha = p.alpha * (1 - p.y / 100) // Fade out as they rise
        ctx.arc(pt.x, pt.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1.0
      })

      // Draw Light Beams (Floodlights)
      const pillars = [
        { x: -160, z: -100, color: '#00D4FF' },
        { x: 160, z: -100, color: '#7C3AED' },
        { x: -160, z: 100, color: '#7C3AED' },
        { x: 160, z: 100, color: '#00D4FF' },
      ]

      pillars.forEach((p) => {
        const base = project(p.x, -30, p.z)
        const top = project(p.x, 80, p.z)

        // Pillar post
        ctx.beginPath()
        ctx.strokeStyle = '#0B1020'
        ctx.lineWidth = 3
        ctx.moveTo(base.x, base.y)
        ctx.lineTo(top.x, top.y)
        ctx.stroke()

        // Glowing source head
        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 15
        ctx.arc(top.x, top.y, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0 // Reset shadow

        // Light cone beam pointing to pitch center
        ctx.beginPath()
        const coneGrad = ctx.createLinearGradient(top.x, top.y, cx, cy)
        coneGrad.addColorStop(0, p.color === '#00D4FF' ? 'rgba(0, 212, 255, 0.25)' : 'rgba(124, 58, 237, 0.25)')
        coneGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = coneGrad

        const pitchPoint = project(0, -10, 0)
        ctx.moveTo(top.x, top.y)
        ctx.lineTo(pitchPoint.x - 30, pitchPoint.y)
        ctx.lineTo(pitchPoint.x + 30, pitchPoint.y)
        ctx.closePath()
        ctx.fill()
      })

      // Scanning HUD ring sweep
      ctx.beginPath()
      ctx.strokeStyle = '#00D4FF'
      ctx.globalAlpha = 0.07 + Math.sin(angle * 5) * 0.03
      ctx.lineWidth = 10
      for (let i = 0; i <= 64; i++) {
        const theta = (i / 64) * Math.PI * 2
        const pt = project(Math.cos(theta) * 190, -30, Math.sin(theta) * 190)
        if (i === 0) ctx.moveTo(pt.x, pt.y)
        else ctx.lineTo(pt.x, pt.y)
      }
      ctx.stroke()
      ctx.globalAlpha = 1.0

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="w-full h-[450px] relative rounded-2xl overflow-hidden bg-[#060816] border border-white/5 shadow-glass">
      <canvas ref={canvasRef} className="block w-full h-[450px]" />

      {/* Holographic Stats HUD overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
        <div className="flex justify-between items-start">
          <div className="glass px-3 py-1.5 rounded-md border border-primary/20 backdrop-blur-md">
            <span className="text-[10px] uppercase font-mono tracking-widest text-primary animate-pulse">● STADIUM_CORE_ACTIVE</span>
          </div>
          <div className="glass px-3 py-1.5 rounded-md border border-secondary/20 backdrop-blur-md text-right">
            <span className="text-[10px] uppercase font-mono tracking-widest text-secondary">TELEMETRY: LIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Matches Analyzed', val: '5,248+', color: 'text-primary' },
            { label: 'Teams Supported', val: '10+', color: 'text-secondary' },
            { label: 'Prediction Accuracy', val: '84.2%', color: 'text-success' },
            { label: 'Venues Covered', val: '120+', color: 'text-primary' },
            { label: 'Predictions Generated', val: '24,195+', color: 'text-secondary' },
          ].map((stat, i) => (
            <div key={i} className="glass p-4 rounded-xl border border-white/10 backdrop-blur-md flex flex-col justify-center transform transition-all duration-300 hover:scale-105">
              <div className="text-[10px] uppercase font-mono tracking-wider text-white/50">{stat.label}</div>
              <div className={`text-2xl font-black mt-1 font-mono tracking-tight ${stat.color}`}>{stat.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
