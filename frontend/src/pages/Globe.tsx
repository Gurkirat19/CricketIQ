import { motion } from 'framer-motion'
import Globe3D from '../components/Globe3D'

export default function Globe() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-6 py-10 text-white"
    >
      <div className="border-b border-white/10 pb-6 mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tight">Global Venue Explorer</h1>
        <p className="text-white/50 text-sm mt-1">
          Interactive 3D Earth console mapping international stadium nodes, weather zones, and travel arc telemetry.
        </p>
      </div>

      {/* Integrate R3F Globe component directly */}
      <Globe3D />
    </motion.div>
  )
}
