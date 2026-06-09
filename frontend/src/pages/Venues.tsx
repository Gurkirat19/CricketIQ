import { useState } from 'react'
import { motion } from 'framer-motion'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area, Legend } from 'recharts'
import { MapPin, Trophy, CloudLightning, Wind } from 'lucide-react'

const VENUES_INTEL: Record<string, any> = {
  'Wankhede Stadium': {
    stats: { avg: 285, highest: '438/4', lowest: '115/10', toss_win_bat: '58%', bat_adv: '65%', bowl_adv: '35%' },
    win_by_team: [
      { team: 'India', win: 68 },
      { team: 'Australia', win: 55 },
      { team: 'England', win: 48 },
      { team: 'South Africa', win: 52 },
      { team: 'Pakistan', win: 40 },
    ],
    trend: [
      { year: '2021', first_inn: 275, sec_inn: 260 },
      { year: '2022', first_inn: 290, sec_inn: 285 },
      { year: '2023', first_inn: 310, sec_inn: 295 },
      { year: '2024', first_inn: 320, sec_inn: 312 },
      { year: '2025', first_inn: 315, sec_inn: 305 },
    ]
  },
  'MCG': {
    stats: { avg: 255, highest: '344/8', lowest: '105/10', toss_win_bat: '44%', bat_adv: '48%', bowl_adv: '52%' },
    win_by_team: [
      { team: 'Australia', win: 72 },
      { team: 'England', win: 52 },
      { team: 'India', win: 50 },
      { team: 'South Africa', win: 46 },
      { team: 'New Zealand', win: 42 },
    ],
    trend: [
      { year: '2021', first_inn: 245, sec_inn: 235 },
      { year: '2022', first_inn: 250, sec_inn: 248 },
      { year: '2023', first_inn: 265, sec_inn: 255 },
      { year: '2024', first_inn: 260, sec_inn: 258 },
      { year: '2025', first_inn: 270, sec_inn: 262 },
    ]
  },
  'Lords': {
    stats: { avg: 242, highest: '334/4', lowest: '88/10', toss_win_bat: '52%', bat_adv: '46%', bowl_adv: '54%' },
    win_by_team: [
      { team: 'England', win: 64 },
      { team: 'Australia', win: 58 },
      { team: 'India', win: 48 },
      { team: 'South Africa', win: 45 },
      { team: 'Pakistan', win: 42 },
    ],
    trend: [
      { year: '2021', first_inn: 230, sec_inn: 215 },
      { year: '2022', first_inn: 242, sec_inn: 238 },
      { year: '2023', first_inn: 250, sec_inn: 242 },
      { year: '2024', first_inn: 255, sec_inn: 240 },
      { year: '2025', first_inn: 262, sec_inn: 245 },
    ]
  }
}

const VENUES_LIST = ['Wankhede Stadium', 'MCG', 'Lords']

export default function Venues() {
  const [selectedVenue, setSelectedVenue] = useState<string>('Wankhede Stadium')
  const data = VENUES_INTEL[selectedVenue] || VENUES_INTEL['Wankhede Stadium']

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-6 py-10 text-white"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight">Venue Intelligence</h1>
          <p className="text-white/50 text-sm mt-1">Acquire geographic pitch-condition metrics, grass density indices, and toss advantages.</p>
        </div>
        
        {/* Dropdown for selecting venue */}
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-mono text-white/50 tracking-wider">SELECT RADAR TARGET:</span>
          <select
            value={selectedVenue}
            onChange={(e) => setSelectedVenue(e.target.value)}
            className="bg-[#0B1020]/90 border border-primary/30 rounded-lg px-4 py-2 font-mono text-primary font-bold focus:outline-none focus:ring-1 focus:ring-primary shadow-glass text-sm"
          >
            {VENUES_LIST.map((v) => (
              <option key={v} value={v} className="bg-[#060816] text-white">
                {v.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Geographic parameters */}
        <div className="glass p-6 rounded-2xl border border-white/5 bg-[#0B1020]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-xs uppercase font-mono tracking-widest text-primary font-bold">ATMOSPHERIC METADATA</span>
            </div>
            
            <h2 className="text-3xl font-black tracking-tight">{selectedVenue}</h2>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-white/50">Average 1st Inn Score</span>
                <span className="text-lg font-bold font-mono text-primary">{data.stats.avg} runs</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-white/50">Highest Team Record</span>
                <span className="text-sm font-mono font-bold text-success">{data.stats.highest}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-white/50">Lowest Defended Score</span>
                <span className="text-sm font-mono font-bold text-red-400">{data.stats.lowest}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-white/50">Toss Winner Wins Match %</span>
                <span className="text-lg font-bold font-mono text-secondary">{data.stats.toss_win_bat}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 border-t border-white/5 pt-4">
            <div className="glass p-3 rounded-lg border border-primary/20 text-center">
              <span className="text-[9px] uppercase font-mono text-white/50 block">Batting Advantage</span>
              <span className="text-lg font-black text-primary font-mono">{data.stats.bat_adv}</span>
            </div>
            <div className="glass p-3 rounded-lg border border-secondary/20 text-center">
              <span className="text-[9px] uppercase font-mono text-white/50 block">Bowling Advantage</span>
              <span className="text-lg font-black text-secondary font-mono">{data.stats.bowl_adv}</span>
            </div>
          </div>
        </div>

        {/* Win percentage by team (Bar Chart) */}
        <div className="glass p-6 rounded-2xl border border-white/5 bg-[#0B1020]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-secondary" />
              <span className="text-xs uppercase font-mono tracking-widest text-secondary font-bold">TEAM CAPABILITY SUCCESS RATE</span>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.win_by_team}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="team" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '10px' }} />
                  <YAxis stroke="rgba(255,255,255,0.4)" style={{ fontSize: '10px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(11,16,32,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="win" fill="#7C3AED" name="Win % at Venue" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-white/40 font-mono mt-4 text-center">WIN RATIOS IN SPECIFIC CLIMATIC AND SURFACE PHASES</p>
        </div>

        {/* Historical score trends (Area Chart) */}
        <div className="glass p-6 rounded-2xl border border-white/5 bg-[#0B1020]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CloudLightning className="w-5 h-5 text-success" />
              <span className="text-xs uppercase font-mono tracking-widest text-success font-bold">1st vs 2nd Innings Score Trends</span>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.trend}>
                  <defs>
                    <linearGradient id="color1st" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '10px' }} />
                  <YAxis stroke="rgba(255,255,255,0.4)" style={{ fontSize: '10px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(11,16,32,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Area type="monotone" dataKey="first_inn" stroke="#00D4FF" strokeWidth={2} fillOpacity={1} fill="url(#color1st)" name="1st Inn Average" />
                  <Area type="monotone" dataKey="sec_inn" stroke="#7C3AED" strokeWidth={2} name="2nd Inn Average" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-white/40 font-mono mt-4 text-center">HISTORICAL DISCREPANCY BETWEEN DEFENDING VS CHASING FORCES</p>
        </div>

      </div>

      {/* Surface soil report card */}
      <div className="glass p-6 rounded-2xl border border-white/5 bg-[#0B1020]/30 mt-8 flex flex-col md:flex-row gap-6 items-center">
        <Wind className="w-12 h-12 text-primary shrink-0 opacity-70" />
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-primary font-bold">SOIL ANALYSIS & RADAR RADIAL READINGS</span>
          <p className="text-sm text-white/70 leading-relaxed mt-1">
            Surface checks suggest clay-silt composite soil structure yielding low initial abrasive wear. High moisture evaporation speeds up seam-plane movement early during afternoon sessions. Spin coefficient is expected to step up progressively after Over 30 of ODI formats.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
export { VENUES_INTEL }
