import { Suspense, useState } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Predictor from './pages/Predictor'
import Analytics from './pages/Analytics'
import Teams from './pages/Teams'
import Assistant from './pages/Assistant'
import Venues from './pages/Venues'
import Globe from './pages/Globe'

export default function App() {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('user_authenticated'))

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: '/predictor', label: 'Predictor' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/teams', label: 'Teams' },
    { path: '/assistant', label: 'AI Assistant' },
    { path: '/venues', label: 'Venues' },
    { path: '/globe', label: 'Globe' },
  ]

  const handleSignOut = () => {
    localStorage.removeItem('user_authenticated')
    setIsAuthenticated(false)
  }

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F5F5F0] font-sans antialiased selection:bg-[#F4F4F0] selection:text-black">
      <nav className="sticky top-0 z-50 bg-[#08080A] border-b border-[#F5F5F0]/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-serif font-light tracking-tight text-[#F5F5F0]">
            Cricket<span className="font-serif italic font-normal text-primary">IQ</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider">
            {isAuthenticated ? (
              <>
                {navLinks.map((link) => {
                  const active = isActive(link.path)
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-2 border transition-all duration-200 ${
                        active
                          ? 'bg-[#F4F4F0] text-black border-[#F4F4F0]'
                          : 'border-transparent text-[#F5F5F0]/60 hover:text-[#F5F5F0] hover:border-[#F5F5F0]/20'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 border border-transparent text-[#F5F5F0]/40 hover:text-red-400 hover:border-red-400/20 transition-all duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <span className="text-[#F5F5F0]/30 text-[10px] font-mono tracking-widest border border-dashed border-[#F5F5F0]/10 px-4 py-2">
                ● ACCESS_RESTRICTED // LOGIN REQUIRED
              </span>
            )}
          </div>
        </div>
      </nav>

      <Suspense fallback={
        <div className="p-16 text-center font-mono text-[10px] uppercase tracking-widest text-[#F5F5F0]/40 animate-pulse">
          INITIALIZING_INTELLIGENCE_STREAM...
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/predictor" element={isAuthenticated ? <Predictor /> : <Navigate to="/" replace />} />
          <Route path="/analytics" element={isAuthenticated ? <Analytics /> : <Navigate to="/" replace />} />
          <Route path="/teams" element={isAuthenticated ? <Teams /> : <Navigate to="/" replace />} />
          <Route path="/assistant" element={isAuthenticated ? <Assistant /> : <Navigate to="/" replace />} />
          <Route path="/venues" element={isAuthenticated ? <Venues /> : <Navigate to="/" replace />} />
          <Route path="/globe" element={isAuthenticated ? <Globe /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}
