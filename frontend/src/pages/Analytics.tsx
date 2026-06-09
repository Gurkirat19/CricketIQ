import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from 'recharts'
import { TrendingUp, Award, MapPin, Activity } from 'lucide-react'

const WIN_RATE_DATA = [
  { name: 'India', value: 72, color: '#00D4FF' },
  { name: 'Australia', value: 68, color: '#7C3AED' },
  { name: 'England', value: 58, color: '#22C55E' },
  { name: 'Pakistan', value: 52, color: '#EAB308' },
  { name: 'South Africa', value: 55, color: '#EC4899' },
]

const HEAD_TO_HEAD_DATA = [
  { matchup: 'IND vs AUS', IND: 58, AUS: 42 },
  { matchup: 'IND vs ENG', IND: 64, ENG: 36 },
  { matchup: 'AUS vs ENG', AUS: 52, ENG: 48 },
  { matchup: 'PAK vs IND', IND: 70, PAK: 30 },
  { matchup: 'RSA vs AUS', RSA: 46, AUS: 54 },
]

const PERFORMANCE_TRENDS = [
  { year: '2021', India: 68, Australia: 65, England: 60 },
  { year: '2022', India: 74, Australia: 70, England: 58 },
  { year: '2023', India: 78, Australia: 78, England: 62 },
  { year: '2024', India: 82, Australia: 72, England: 64 },
  { year: '2025', India: 85, Australia: 75, England: 59 },
]

const VENUE_SUCCESS = [
  { venue: 'Wankhede', BatFirst: 62, ChaseFirst: 38 },
  { venue: 'MCG', BatFirst: 48, ChaseFirst: 52 },
  { venue: 'Lords', BatFirst: 56, ChaseFirst: 44 },
  { venue: 'Gaddafi', BatFirst: 68, ChaseFirst: 32 },
  { venue: 'Newlands', BatFirst: 42, ChaseFirst: 58 },
]

export default function Analytics() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-6 py-10 text-white"
    >
      {/* Header telemetry style */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase">
            CricketIQ <span className="text-primary font-light">Analytics Terminal</span>
          </h1>
          <p className="text-white/50 text-sm mt-1">Multi-dimensional historical dataset performance metrics & trend visualizations</p>
        </div>
        <div className="flex gap-2">
          <div className="glass px-3 py-1.5 rounded-lg border border-primary/20 text-xs font-mono text-primary flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            ENGINE_STATE: SYNCED
          </div>
          <div className="glass px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white/60">
            METRICS_REFRESH: LATEST
          </div>
        </div>
      </div>

      {/* Overview stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: 'Total Matches Analyzed', val: '8,412', change: '+12%', icon: Activity, color: 'text-primary' },
          { label: 'Supported Teams', val: '10', change: 'MAX', icon: Award, color: 'text-secondary' },
          { label: 'Tracked Venues', val: '124', change: '+5', icon: MapPin, color: 'text-success' },
          { label: 'AI Simulations Generated', val: '1.2M', change: '+44%', icon: TrendingUp, color: 'text-primary' },
        ].map((item, i) => (
          <div key={i} className="glass p-5 rounded-xl border border-white/5 bg-[#0B1020]/40 flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block">{item.label}</span>
              <span className="text-3xl font-black font-mono block mt-1">{item.val}</span>
            </div>
            <div className="text-right">
              <item.icon className={`w-5 h-5 ${item.color} opacity-70 mb-2 ml-auto`} />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-success">{item.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid of highly visual Charts */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        
        {/* Win Rate Analysis */}
        <div className="glass p-6 rounded-2xl border border-white/5 bg-[#0B1020]/30">
          <h3 className="text-lg font-black tracking-wider uppercase mb-4 text-primary">Win Rate Analysis</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={WIN_RATE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {WIN_RATE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11,16,32,0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Head-to-Head Comparisons */}
        <div className="glass p-6 rounded-2xl border border-white/5 bg-[#0B1020]/30">
          <h3 className="text-lg font-black tracking-wider uppercase mb-4 text-secondary">Head-to-Head Analysis</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HEAD_TO_HEAD_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="matchup" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '10px' }} />
                <YAxis stroke="rgba(255,255,255,0.4)" style={{ fontSize: '10px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11,16,32,0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="IND" fill="#00D4FF" name="India Win %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="AUS" fill="#7C3AED" name="Australia Win %" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ENG" fill="#22C55E" name="England Win %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Performance Trends */}
        <div className="glass p-6 rounded-2xl border border-white/5 bg-[#0B1020]/30 md:col-span-2">
          <h3 className="text-lg font-black tracking-wider uppercase mb-4 text-success">Team Performance Trends (Win % Over Years)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_TRENDS}>
                <defs>
                  <linearGradient id="colorIndia" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
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
                <Area type="monotone" dataKey="India" stroke="#00D4FF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIndia)" name="India Win Rate %" />
                <Area type="monotone" dataKey="Australia" stroke="#7C3AED" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAus)" name="Australia Win Rate %" />
                <Line type="monotone" dataKey="England" stroke="#22C55E" strokeWidth={2} dot={{ r: 4 }} name="England Win Rate %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Venue Advantage Dynamics */}
        <div className="glass p-6 rounded-2xl border border-white/5 bg-[#0B1020]/30 md:col-span-2">
          <h3 className="text-lg font-black tracking-wider uppercase mb-4 text-primary">Venue Advantage Dynamics (Toss & Pitch Impact)</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VENUE_SUCCESS} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '10px' }} />
                <YAxis dataKey="venue" type="category" stroke="rgba(255,255,255,0.4)" style={{ fontSize: '10px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11,16,32,0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="BatFirst" stackId="a" fill="#00D4FF" name="Batting First Win %" radius={[0, 4, 4, 0]} />
                <Bar dataKey="ChaseFirst" stackId="a" fill="rgba(124,58,237,0.3)" name="Chasing First Win %" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
export { PERFORMANCE_TRENDS, HEAD_TO_HEAD_DATA }
