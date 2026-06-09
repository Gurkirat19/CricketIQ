import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, BarChart2, BrainCircuit, Globe, Compass, ShieldCheck, Terminal, Shield, LogIn, UserPlus } from 'lucide-react'
import Stadium3D from '../components/Stadium3D'

interface HomeProps {
  isAuthenticated: boolean
  setIsAuthenticated: (val: boolean) => void
}

const TERMINAL_LOGS = [
  { p: 15, text: 'BOOT_SEQUENCE: INITIALIZING GRAPH PARSER...' },
  { p: 40, text: 'PARSING SQUAD GEOMETRIC EMBEDDINGS (840 SENSORS)...' },
  { p: 70, text: 'COMPILING XGBOOST ENSEMBLE DECISION FORESTS...' },
  { p: 90, text: 'ENVIRONMENT MATRIX SECURED. READY FOR INPUT.' },
]

export default function Home({ isAuthenticated, setIsAuthenticated }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [currentLogs, setCurrentLogs] = useState<string[]>([])

  const [showAuthGate, setShowAuthGate] = useState(false)
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  // Terminal loading animation trigger (Super snappy 600ms duration)
  useEffect(() => {
    if (!isLoading) return

    const startTime = Date.now()
    const duration = 650 // Total boot duration (extremely snappy!)

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100))
      setLoadingProgress(progress)

      // Inject logs based on milestones
      const logsToInject = TERMINAL_LOGS.filter(log => log.p <= progress && !currentLogs.includes(log.text))
      if (logsToInject.length > currentLogs.length) {
        setCurrentLogs(logsToInject.map(l => l.text))
      }

      if (progress >= 100) {
        clearInterval(interval)
        // Automatically transition straight to dashboard after loader hits 100%!
        setTimeout(() => {
          setIsLoading(false)
        }, 350)
      }
    }, 20)

    return () => clearInterval(interval)
  }, [isLoading, currentLogs])

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('user_authenticated', 'true')
    setIsAuthenticated(true)
    setShowAuthGate(false)
  }

  return (
    <div className="relative min-h-screen bg-[#08080A] overflow-x-hidden text-[#F5F5F0]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,212,255,0.06),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(124,58,237,0.05),transparent_45%)] pointer-events-none" />

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed inset-0 z-50 bg-[#08080A] flex flex-col items-center justify-center p-6 select-none font-mono"
          >
            <div className="max-w-md w-full border border-[#F5F5F0]/10 bg-[#0A0A0C] p-8 relative">
              <span className="absolute top-2 left-2 text-[#F5F5F0]/20 text-[8px]">[CR-IQ]</span>
              <span className="absolute top-2 right-2 text-[#F5F5F0]/20 text-[8px]">[v1.0]</span>

              <div className="text-center mb-6">
                <h1 className="text-2xl font-serif font-light text-white tracking-tight">
                  Cricket<span className="font-serif italic font-normal text-primary">IQ</span>
                </h1>
                <span className="text-[9px] text-[#F5F5F0]/40 uppercase tracking-widest block mt-1">DECISION CORE BOOT SEQUENCE</span>
              </div>

              <div className="h-32 bg-[#08080A] border border-[#F5F5F0]/5 p-4 rounded-none text-[10px] space-y-1.5 overflow-hidden font-mono text-[#F5F5F0]/50 mb-6">
                {currentLogs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-primary font-bold">»</span>
                    <span>{log}</span>
                  </div>
                ))}
                {loadingProgress < 100 && (
                  <div className="text-primary animate-pulse">● EXECUTING COMPILATION...</div>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] mb-2 font-bold tracking-widest text-[#F5F5F0]/60">
                <span>TERMINAL_COMPILATION</span>
                <span>{loadingProgress}%</span>
              </div>
              <div className="h-1 bg-[#F5F5F0]/10 w-full overflow-hidden mb-8">
                <motion.div
                  className="h-full bg-primary"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              {loadingProgress >= 100 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setIsLoading(false)}
                  className="w-full py-3 bg-[#F4F4F0] text-black uppercase font-mono text-xs tracking-wider font-black hover:bg-white transition-all flex items-center justify-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  ACCESS TERMINAL
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {!isLoading && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-16 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="glass px-4 py-1.5 rounded-full border border-primary/20 flex items-center gap-2 mb-6"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-bold">SYSTEM // MATCH INTELLIGENCE v1.0</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-5xl md:text-8xl font-serif font-light tracking-tight select-none leading-none text-white"
              >
                Cricket<span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">IQ</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-6 text-sm md:text-base font-mono text-primary tracking-widest uppercase"
              >
                Predict. Analyze. Dominate.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="mt-4 max-w-3xl text-sm md:text-base text-white/50 leading-relaxed font-sans"
              >
                An elite sports intelligence terminal combining machine learning prediction ensembles, 
                Monte Carlo simulations, explainable AI diagnostics, and semantic RAG intelligence for professional analysts.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 font-mono text-xs justify-center"
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/predictor"
                      className="px-8 py-3.5 rounded-none bg-primary text-black font-bold uppercase tracking-wider hover:bg-[#00b2d6] hover:shadow-[0_0_20px_rgba(0,212,255,0.25)] transition-all duration-300"
                    >
                      Predict Match
                    </Link>
                    <Link
                      to="/analytics"
                      className="px-8 py-3.5 rounded-none bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                    >
                      Explore Analytics
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => setShowAuthGate(true)}
                    className="px-10 py-4 rounded-none bg-[#F4F4F0] text-black font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    GET STARTED // ACCESS DECK
                  </button>
                )}
              </motion.div>
            </div>

            {showAuthGate && (
              <div className="fixed inset-0 z-50 bg-[#08080A]/90 flex items-center justify-center p-6 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md w-full border border-[#F5F5F0]/10 bg-[#0A0A0C] p-8 relative"
                >
                  <button
                    onClick={() => setShowAuthGate(false)}
                    className="absolute top-4 right-4 text-xs font-mono text-[#F5F5F0]/40 hover:text-[#F5F5F0]"
                  >
                    [ ESC ]
                  </button>

                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-primary uppercase">AUTHENTICATION MATRIX</span>
                  </div>

                  <div className="grid grid-cols-2 border border-[#F5F5F0]/10 p-1 mb-6 text-xs font-mono">
                    <button
                      onClick={() => setAuthMode('signin')}
                      className={`py-2 text-center transition-all ${
                        authMode === 'signin' ? 'bg-[#F4F4F0] text-black font-bold' : 'text-[#F5F5F0]/50'
                      }`}
                    >
                      SIGN IN
                    </button>
                    <button
                      onClick={() => setAuthMode('signup')}
                      className={`py-2 text-center transition-all ${
                        authMode === 'signup' ? 'bg-[#F4F4F0] text-black font-bold' : 'text-[#F5F5F0]/50'
                      }`}
                    >
                      CREATE ACCOUNT
                    </button>
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-4 font-mono text-xs">
                    {authMode === 'signup' && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[#F5F5F0]/40 uppercase tracking-wider text-[10px]">NAME</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="Your full name"
                          className="bg-[#08080A] border border-[#F5F5F0]/10 rounded-none px-3 py-2.5 text-xs outline-none focus:border-[#F5F5F0]/30"
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#F5F5F0]/40 uppercase tracking-wider text-[10px]">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="analyst@cricketiq.com"
                        className="bg-[#08080A] border border-[#F5F5F0]/10 rounded-none px-3 py-2.5 text-xs outline-none focus:border-[#F5F5F0]/30"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[#F5F5F0]/40 uppercase tracking-wider text-[10px]">PASSWORD</label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="bg-[#08080A] border border-[#F5F5F0]/10 rounded-none px-3 py-2.5 text-xs outline-none focus:border-[#F5F5F0]/30"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 mt-4 bg-[#F4F4F0] text-black uppercase font-bold tracking-wider hover:bg-white transition-all duration-300 rounded-none flex items-center justify-center gap-2 text-xs"
                    >
                      {authMode === 'signin' ? <LogIn className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                      {authMode === 'signin' ? 'AUTHENTICATE CREDENTIALS' : 'JOIN PLATFORM'}
                    </button>
                  </form>
                </motion.div>
              </div>
            )}

            <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-primary" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-bold">STADIUM CORE VECTOR MATRIX</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#F5F5F0]/30 uppercase">HUD ROTATION STABLE // SYSTEM ACTIVE</span>
                </div>
                <Stadium3D />
              </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-[#F5F5F0]/10 bg-[#0A0A0C]/50">
              <div className="max-w-2xl mb-16">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#F5F5F0]/40 font-black block">PLATFORM FRAMEWORKS</span>
                <h2 className="text-3xl md:text-5xl font-serif font-light mt-2 tracking-tight text-[#F5F5F0]">
                  Multi-Dimensional <span className="font-serif italic text-primary">Capabilities</span>
                </h2>
                <p className="text-xs text-[#F5F5F0]/40 mt-2 font-mono uppercase tracking-wider">Engineered for elite managers & sports analysts.</p>
              </div>

              <div className="grid md:grid-cols-3 border-t border-l border-[#F5F5F0]/10">
                {[
                  {
                    title: 'Explainable AI Predictions',
                    desc: 'Ensemble modeling utilizing XGBoost and LightGBM featuring per-match feature importance diagnostic breakdown reports.',
                    icon: BrainCircuit,
                  },
                  {
                    title: 'Historical Venue Analytics',
                    desc: 'Deep surface reports, grass moisture levels, geographic weather parameters, and historical innings performance logs.',
                    icon: BarChart2,
                  },
                  {
                    title: 'Interactive Global GIS Nodes',
                    desc: 'Explore international matches and stadium metrics on a beautiful rotating 3D Earth projection complete with flight arcs.',
                    icon: Globe,
                  },
                ].map((feat, i) => (
                  <div
                    key={i}
                    className="p-8 border-r border-b border-[#F5F5F0]/10 bg-[#0A0A0C]/30 flex flex-col justify-between h-[260px] hover:bg-[#F5F5F0]/5 transition-all duration-300 rounded-none"
                  >
                    <div className="flex justify-between items-start">
                      <feat.icon className="w-6 h-6 text-primary opacity-80" />
                      <span className="text-[10px] font-mono text-white/30">MODULE // {`0${i + 1}`}</span>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-lg font-serif font-light text-white mb-2">{feat.title}</h3>
                      <p className="text-xs text-white/40 leading-relaxed font-sans">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 border-t border-[#F5F5F0]/10 text-center relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span className="text-[10px] font-mono text-white/40 uppercase">SECURE_CREDENTIAL_PIPELINE: ACTIVE (TLS 1.3)</span>
              </div>
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                CRICKETIQ INC. © {new Date().getFullYear()} – ALL TELEMETRY CHANNELS CLASSIFIED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
