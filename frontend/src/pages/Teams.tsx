import { useState } from 'react'
import { motion } from 'framer-motion'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Shield, Sparkles, TrendingUp, Users } from 'lucide-react'

const TEAM_STATS_DATA: Record<string, any> = {
  'India': {
    radar: [
      { subject: 'Batting', A: 95, fullMark: 100 },
      { subject: 'Bowling', A: 90, fullMark: 100 },
      { subject: 'Fielding', A: 88, fullMark: 100 },
      { subject: 'Recent Form', A: 92, fullMark: 100 },
      { subject: 'Spin Play', A: 96, fullMark: 100 },
      { subject: 'Pace Play', A: 89, fullMark: 100 },
    ],
    trends: [
      { match: 'M1', score: 320, wickets: 4 },
      { match: 'M2', score: 285, wickets: 8 },
      { match: 'M3', score: 352, wickets: 3 },
      { match: 'M4', score: 260, wickets: 10 },
      { match: 'M5', score: 310, wickets: 5 },
    ],
    win_pct: '74%',
    avg_score: '305',
    top_venues: ['Wankhede Stadium', 'Eden Gardens', 'Chinnaswamy'],
    best_opp: 'Sri Lanka, Bangladesh',
    worst_opp: 'Australia, New Zealand',
  },
  'Australia': {
    radar: [
      { subject: 'Batting', A: 90, fullMark: 100 },
      { subject: 'Bowling', A: 94, fullMark: 100 },
      { subject: 'Fielding', A: 92, fullMark: 100 },
      { subject: 'Recent Form', A: 88, fullMark: 100 },
      { subject: 'Spin Play', A: 82, fullMark: 100 },
      { subject: 'Pace Play', A: 96, fullMark: 100 },
    ],
    trends: [
      { match: 'M1', score: 280, wickets: 6 },
      { match: 'M2', score: 315, wickets: 4 },
      { match: 'M3', score: 260, wickets: 9 },
      { match: 'M4', score: 335, wickets: 5 },
      { match: 'M5', score: 290, wickets: 7 },
    ],
    win_pct: '71%',
    avg_score: '296',
    top_venues: ['MCG', 'SCG', 'Adelaide Oval'],
    best_opp: 'West Indies, England',
    worst_opp: 'India, South Africa',
  },
  'England': {
    radar: [
      { subject: 'Batting', A: 92, fullMark: 100 },
      { subject: 'Bowling', A: 84, fullMark: 100 },
      { subject: 'Fielding', A: 87, fullMark: 100 },
      { subject: 'Recent Form', A: 82, fullMark: 100 },
      { subject: 'Spin Play', A: 85, fullMark: 100 },
      { subject: 'Pace Play', A: 90, fullMark: 100 },
    ],
    trends: [
      { match: 'M1', score: 340, wickets: 8 },
      { match: 'M2', score: 290, wickets: 9 },
      { match: 'M3', score: 380, wickets: 5 },
      { match: 'M4', score: 220, wickets: 10 },
      { match: 'M5', score: 315, wickets: 6 },
    ],
    win_pct: '64%',
    avg_score: '310',
    top_venues: ['Lords', 'The Oval', 'Edgbaston'],
    best_opp: 'Pakistan, Sri Lanka',
    worst_opp: 'Australia, India',
  }
}

const TEAMS_LIST = ['India', 'Australia', 'England']

export default function Teams() {
  const [selectedTeam, setSelectedTeam] = useState<string>('India')
  const data = TEAM_STATS_DATA[selectedTeam] || TEAM_STATS_DATA['India']

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-6 py-10 text-white"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight">Team Intelligence</h1>
          <p className="text-white/50 text-sm mt-1">Select any team to unlock micro-tactical capabilities & squad form trends.</p>
        </div>
        
        {/* Dropdown for selecting team */}
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-mono text-white/50 tracking-wider">SELECT INTEL TARGET:</span>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="bg-[#0B1020]/90 border border-primary/30 rounded-lg px-4 py-2 font-mono text-primary font-bold focus:outline-none focus:ring-1 focus:ring-primary shadow-glass text-sm"
          >
            {TEAMS_LIST.map((t) => (
              <option key={t} value={t} className="bg-[#060816] text-white">
                {t.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Holographic Stats overview */}
        <div className="glass p-6 rounded-2xl border border-white/5 bg-[#0B1020]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-xs uppercase font-mono tracking-widest text-primary font-bold">HISTORICAL RECORDS</span>
            </div>
            
            <h2 className="text-3xl font-black tracking-tight">{selectedTeam}</h2>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-white/50">Overall Win Rate</span>
                <span className="text-lg font-bold font-mono text-primary">{data.win_pct}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-white/50">Average Score (Last 50 ODI)</span>
                <span className="text-lg font-bold font-mono text-secondary">{data.avg_score} runs</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-white/50">Best Opponent Target</span>
                <span className="text-sm font-bold text-success">{data.best_opp}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-white/50">Hardest Matchup</span>
                <span className="text-sm font-bold text-red-400">{data.worst_opp}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/30 block mb-2">TOP SUITABLE VENUES</span>
            <div className="flex flex-wrap gap-2">
              {data.top_venues.map((v: string) => (
                <span key={v} className="text-xs font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-white/80">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tactical Skills Radar (Radar Chart) */}
        <div className="glass p-6 rounded-2xl border border-white/5 bg-[#0B1020]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-secondary" />
              <span className="text-xs uppercase font-mono tracking-widest text-secondary font-bold">TACTICAL SQUAD MATRICES</span>
            </div>
            <div className="h-[260px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.radar}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis dataKey="subject" stroke="rgba(255,255,255,0.6)" style={{ fontSize: '10px' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255,255,255,0.2)" style={{ fontSize: '9px' }} />
                  <Radar name={selectedTeam} dataKey="A" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-white/40 font-mono mt-4 text-center">COMPREHENSIVE ROSTER PROFILE DERIVED BY MACHINE LEARNING FEEDS</p>
        </div>

        {/* Score and Wickets trends (Line Chart) */}
        <div className="glass p-6 rounded-2xl border border-white/5 bg-[#0B1020]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-success" />
              <span className="text-xs uppercase font-mono tracking-widest text-success font-bold">RECENT SCORE PERFORMANCE</span>
            </div>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="match" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '10px' }} />
                  <YAxis stroke="rgba(255,255,255,0.4)" style={{ fontSize: '10px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(11,16,32,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#22C55E" strokeWidth={2.5} dot={{ r: 5 }} name="First Innings Score" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-white/40 font-mono mt-4 text-center">HISTORICAL SCORING FLUCTUATIONS FOR THE PREVIOUS 5 MATCHES</p>
        </div>

      </div>

      {/* Heatmap/Grid Style section for Matchup breakdown */}
      <div className="glass p-6 rounded-2xl border border-white/5 bg-[#0B1020]/30 mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs uppercase font-mono tracking-widest text-primary font-bold">TACTICAL HEATMAP ANALYST SUMMARY</span>
        </div>
        <p className="text-sm text-white/70 leading-relaxed">
          {selectedTeam} currently exhibits outstanding capability on flat wickets with higher batting averages when batting first. 
          However, their win percentages drop significantly in overcast weather conditions when chasing a target greater than 280 runs. 
          Model indicators suggest prioritizing bowling strategies during the initial 10-over Powerplay to yield optimal game outcomes.
        </p>
      </div>
    </motion.div>
  )
}
