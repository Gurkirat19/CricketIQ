import { useEffect, useRef, useState, useMemo } from 'react'

interface Pin {
  name: string
  lat: number
  lon: number
  city: string
  country: string
  records: string
}

const VENUE_PINS: Pin[] = [
  { name: 'Wankhede Stadium', lat: 18.9389, lon: 72.8258, city: 'Mumbai', country: 'India', records: 'High Batting Avg, Spinner Friendly' },
  { name: 'MCG', lat: -37.8199, lon: 144.9834, city: 'Melbourne', country: 'Australia', records: 'Balanced Bounce, Large Boundaries' },
  { name: 'Lords', lat: 51.5299, lon: -0.1722, city: 'London', country: 'England', records: 'Swing-friendly, High Seam Movement' },
  { name: 'Gaddafi Stadium', lat: 31.5126, lon: 74.3317, city: 'Lahore', country: 'Pakistan', records: 'Flat Pitch, High Scoring' },
  { name: 'Newlands', lat: -33.9730, lon: 18.4363, city: 'Cape Town', country: 'South Africa', records: 'Pace Friendly, Early Swing' },
]

// Continent coordinates for realistic map mapping
const CONTINENTS = [
  // North America
  [
    { lat: 70, lon: -160 }, { lat: 72, lon: -110 }, { lat: 55, lon: -60 }, { lat: 45, lon: -50 },
    { lat: 25, lon: -80 }, { lat: 10, lon: -85 }, { lat: 15, lon: -95 }, { lat: 30, lon: -115 },
    { lat: 45, lon: -125 }, { lat: 60, lon: -140 }, { lat: 70, lon: -160 }
  ],
  // South America
  [
    { lat: 10, lon: -75 }, { lat: 5, lon: -50 }, { lat: -5, lon: -35 }, { lat: -25, lon: -45 },
    { lat: -50, lon: -65 }, { lat: -55, lon: -70 }, { lat: -40, lon: -75 }, { lat: -20, lon: -80 },
    { lat: -5, lon: -80 }, { lat: 10, lon: -75 }
  ],
  // Eurasia (Europe + Asia)
  [
    { lat: 70, lon: 15 }, { lat: 75, lon: 60 }, { lat: 70, lon: 120 }, { lat: 65, lon: 170 },
    { lat: 35, lon: 140 }, { lat: 20, lon: 110 }, { lat: 10, lon: 105 }, { lat: 15, lon: 90 },
    { lat: 10, lon: 75 }, { lat: 25, lon: 60 }, { lat: 15, lon: 40 }, { lat: 30, lon: 35 },
    { lat: 35, lon: 15 }, { lat: 45, lon: -10 }, { lat: 60, lon: 5 }, { lat: 70, lon: 15 }
  ],
  // Africa
  [
    { lat: 35, lon: 15 }, { lat: 30, lon: 32 }, { lat: 10, lon: 42 }, { lat: -20, lon: 35 },
    { lat: -34, lon: 20 }, { lat: -10, lon: 12 }, { lat: 5, lon: 10 }, { lat: 15, lon: -15 },
    { lat: 30, lon: -10 }, { lat: 35, lon: 15 }
  ],
  // Australia
  [
    { lat: -12, lon: 130 }, { lat: -15, lon: 145 }, { lat: -33, lon: 150 }, { lat: -38, lon: 145 },
    { lat: -35, lon: 115 }, { lat: -22, lon: 113 }, { lat: -12, lon: 130 }
  ],
  // Greenland
  [
    { lat: 80, lon: -60 }, { lat: 82, lon: -30 }, { lat: 70, lon: -20 }, { lat: 60, lon: -45 },
    { lat: 70, lon: -55 }, { lat: 80, lon: -60 }
  ]
]

export default function Globe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedVenue, setSelectedVenue] = useState<Pin>(VENUE_PINS[0])
  const [hoveredPin, setHoveredPin] = useState<Pin | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let angle = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.parentElement?.clientWidth ? canvas.parentElement.clientWidth : 600
      canvas.width = w * dpr
      canvas.height = 500 * dpr
      canvas.style.width = '100%'
      canvas.style.height = '500px'
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    // Interactive mouse tracking
    let mouseX = 0
    let mouseY = 0
    let clicked = false
    let isDragging = false
    let lastX = 0
    let lastY = 0
    let angleY = 0.2 // Tilt angle

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top

      if (isDragging) {
        const dx = e.clientX - lastX
        const dy = e.clientY - lastY
        angle += dx * 0.007
        angleY = Math.max(-1.2, Math.min(1.2, angleY + dy * 0.007))
        lastX = e.clientX
        lastY = e.clientY
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      
      // If clicked near center or on the canvas, enable dragging
      isDragging = true
      lastX = e.clientX
      lastY = e.clientY
      clicked = true
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const render = () => {
      if (!isDragging) {
        angle += 0.003 // Slow auto-spin when idle
      }

      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = 500
      const cx = w / 2
      const cy = h / 2
      const radius = 160 // Globe Radius

      ctx.clearRect(0, 0, w, h)

      // Background Space
      ctx.fillStyle = '#060816'
      ctx.fillRect(0, 0, w, h)

      // Draw global space particles
      ctx.fillStyle = 'rgba(255,255,255,0.15)'
      for (let s = 0; s < 50; s++) {
        const sx = (Math.sin(s * 99) * 0.5 + 0.5) * w
        const sy = (Math.cos(s * 43) * 0.5 + 0.5) * h
        ctx.beginPath()
        ctx.arc(sx, sy, Math.sin(s + angle) * 0.6 + 0.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw Earth outer circular glowing ring
      ctx.strokeStyle = '#00D4FF'
      ctx.lineWidth = 1
      ctx.globalAlpha = 0.08 + Math.sin(angle * 3) * 0.02
      ctx.beginPath()
      ctx.arc(cx, cy, radius + 15, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = 0.15
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = 1.0

      // Orthographic Globe projection math helper (supporting both Y-spin and X-tilt)
      const projectOnSphere = (lat: number, lon: number) => {
        const radLat = lat * (Math.PI / 180)
        const radLon = lon * (Math.PI / 180) + angle

        // 3D Sphere coordinates relative to center
        const x3d = radius * Math.cos(radLat) * Math.sin(radLon)
        const y3d = -radius * Math.sin(radLat)
        const z3d = radius * Math.cos(radLat) * Math.cos(radLon)

        // Apply pitch/tilt rotation around X-axis
        const cosY = Math.cos(angleY)
        const sinY = Math.sin(angleY)
        const ry = y3d * cosY - z3d * sinY
        const rz = y3d * sinY + z3d * cosY

        return { x: cx + x3d, y: cy + ry, z: rz, visible: rz > 0 }
      }

      // Draw projected realistic continents (detailed map layer)
      ctx.fillStyle = 'rgba(0, 212, 255, 0.05)' // Glowing landmass fill
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)' // Landmass borders
      ctx.lineWidth = 1.0

      CONTINENTS.forEach((polygon) => {
        ctx.beginPath()
        let started = false

        polygon.forEach((ptCoords) => {
          const pt = projectOnSphere(ptCoords.lat, ptCoords.lon)
          if (pt.visible) {
            if (!started) {
              ctx.moveTo(pt.x, pt.y)
              started = true
            } else {
              ctx.lineTo(pt.x, pt.y)
            }
          } else {
            started = false
          }
        })
        ctx.fill()
        ctx.stroke()
      })

      // Draw glowing Latitude/Longitude Grid lines
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.08)'
      ctx.lineWidth = 1

      // Longitudes
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath()
        for (let lat = -90; lat <= 90; lat += 5) {
          const pt = projectOnSphere(lat, lon)
          if (pt.visible) {
            if (lat === -90) ctx.moveTo(pt.x, pt.y)
            else ctx.lineTo(pt.x, pt.y)
          }
        }
        ctx.stroke()
      }

      // Latitudes
      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.beginPath()
        for (let lon = -180; lon <= 180; lon += 5) {
          const pt = projectOnSphere(lat, lon)
          if (pt.visible) {
            if (lon === -180) ctx.moveTo(pt.x, pt.y)
            else ctx.lineTo(pt.x, pt.y)
          }
        }
        ctx.stroke()
      }

      // Draw Flight Arcs (connecting consecutive pins)
      ctx.strokeStyle = '#7C3AED'
      ctx.lineWidth = 1.5
      for (let i = 0; i < VENUE_PINS.length; i++) {
        const fromPin = VENUE_PINS[i]
        const toPin = VENUE_PINS[(i + 1) % VENUE_PINS.length]

        const p1 = projectOnSphere(fromPin.lat, fromPin.lon)
        const p2 = projectOnSphere(toPin.lat, toPin.lon)

        if (p1.visible && p2.visible) {
          // Curved flying bezier travel arc
          const midX = (p1.x + p2.x) / 2
          const midY = (p1.y + p2.y) / 2 - 40 // Curve upwards for flight simulation
          ctx.beginPath()
          ctx.strokeStyle = 'rgba(124, 58, 237, 0.3)'
          ctx.moveTo(p1.x, p1.y)
          ctx.quadraticCurveTo(midX, midY, p2.x, p2.y)
          ctx.stroke()

          // Draw an animated flight pulse particle along the curve
          const t = (angle * 0.5 + i / VENUE_PINS.length) % 1.0
          const pulseX = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * midX + t * t * p2.x
          const pulseY = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * midY + t * t * p2.y
          ctx.beginPath()
          ctx.fillStyle = '#00D4FF'
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Check pin hovers and draw Pins
      let currentlyHovered: Pin | null = null

      VENUE_PINS.forEach((pin) => {
        const pt = projectOnSphere(pin.lat, pin.lon)
        if (pt.visible) {
          const dist = Math.hypot(mouseX - pt.x, mouseY - pt.y)
          const isHovered = dist < 12
          if (isHovered) {
            currentlyHovered = pin
          }

          // Pulsing core aura
          if (selectedVenue.name === pin.name) {
            ctx.beginPath()
            ctx.fillStyle = 'rgba(0, 212, 255, 0.15)'
            ctx.arc(pt.x, pt.y, 10 + Math.sin(angle * 10) * 4, 0, Math.PI * 2)
            ctx.fill()
          }

          // Pin marker dot
          ctx.beginPath()
          ctx.fillStyle = selectedVenue.name === pin.name ? '#00D4FF' : '#7C3AED'
          ctx.strokeStyle = '#060816'
          ctx.lineWidth = 1.5
          ctx.arc(pt.x, pt.y, isHovered || selectedVenue.name === pin.name ? 5.5 : 4, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()

          // Pin HUD labels (only show if selected or hovered)
          if (selectedVenue.name === pin.name || isHovered) {
            ctx.font = '10px monospace'
            ctx.fillStyle = '#00D4FF'
            ctx.textAlign = 'center'
            ctx.fillText(pin.name.toUpperCase(), pt.x, pt.y - 12)
          }

          // Trigger click selection
          if (isHovered && clicked) {
            setSelectedVenue(pin)
          }
        }
      })

      setHoveredPin(currentlyHovered)
      clicked = false // Reset click trigger

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [selectedVenue])

  return (
    <div className="w-full grid md:grid-cols-3 gap-6">
      {/* 3D Globe Viewport */}
      <div className="md:col-span-2 h-[500px] relative rounded-2xl overflow-hidden bg-[#060816] border border-white/5 shadow-glass">
        <canvas ref={canvasRef} className="block w-full h-[500px]" />

        <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-md border border-primary/20 backdrop-blur-md">
          <span className="text-[10px] uppercase font-mono tracking-widest text-primary animate-pulse">● GLOBE_EXPLORER_ACTIVE</span>
        </div>
      </div>

      {/* Venue Information Display Card */}
      <div className="glass p-6 rounded-2xl border border-white/10 flex flex-col justify-between h-full bg-[#0B1020]/70 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
            <span className="text-xs uppercase font-mono tracking-widest text-primary">VENUE METRICS</span>
          </div>

          {selectedVenue ? (
            <div>
              <h3 className="text-2xl font-black tracking-tight text-white mb-1">{selectedVenue.name}</h3>
              <p className="text-sm font-mono text-white/50 mb-6">{selectedVenue.city}, {selectedVenue.country}</p>

              <div className="space-y-4 border-t border-white/10 pt-4">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-white/40">Pitch Characteristics</div>
                  <div className="text-sm font-bold text-success mt-1">{selectedVenue.records}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-white/40">Average ODI Score</div>
                  <div className="text-lg font-black font-mono mt-1 text-primary">285 / 7</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-white/40">Toss Spin Advantage</div>
                  <div className="text-sm text-white/70 mt-1">Teams winning toss prefer to <span className="text-primary font-bold">Bat First</span> (58% Win Rate).</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-white/40 py-12">
              Select a glowing venue pin on the globe to reveal high-fidelity analytical records.
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-white/10 pt-4">
          <span className="text-[10px] uppercase font-mono tracking-widest text-white/30 block">CLICK A GLOBE NODE TO ROTATE AND SELECT STADIUM</span>
        </div>
      </div>
    </div>
  )
}
export { VENUE_PINS }
