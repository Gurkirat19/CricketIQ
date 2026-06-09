import { useMemo, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import ProbabilityGauge from '../components/ui/ProbabilityGauge'
import { predict, simulate, getTeams, getVenues } from '../lib/api'
import { Sparkles, Play, Flame, BarChart2 } from 'lucide-react'

const FALLBACK_TEAMS = [
  'India','Australia','England','Pakistan','South Africa','New Zealand','Sri Lanka','Bangladesh','Afghanistan','West Indies'
]
const WEATHER_OPTIONS = ['Sunny','Cloudy','Overcast','Humid','Dry']
const PITCH_OPTIONS = ['Flat','Batting','Bowling','Green','Turning']
const FORMAT_OPTIONS = ['ODI','T20','Test']

export default function Predictor() {
  const [inputs, setInputs] = useState({
    team_a: 'India',
    team_b: 'Australia',
    venue: '',
    format: 'ODI',
    toss_winner: '',
    weather: 'Sunny',
    pitch: 'Flat',
  })

  const predictMut = useMutation({ mutationFn: predict })
  const simulateMut = useMutation({ mutationFn: simulate })
  const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: getTeams })
  const teamsData = (teamsQuery.data as any[] | undefined)?.map(t => t.name).filter(Boolean)
  const teamOptions = teamsData && teamsData.length > 0 ? teamsData : FALLBACK_TEAMS

  const venuesQuery = useQuery({ queryKey: ['venues'], queryFn: getVenues })
  const venuesData = (venuesQuery.data as any[] | undefined)?.map(v => v.name).filter(Boolean)
  const venueOptions = venuesData && venuesData.length > 0 ? venuesData : ['Wankhede Stadium','MCG','Lords','Gaddafi Stadium','Newlands']
  const tossOptions = useMemo(() => [inputs.team_a, inputs.team_b, 'None'], [inputs.team_a, inputs.team_b])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="border-b border-[#F5F5F0]/10 pb-6 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#F5F5F0]/40 block uppercase">SUITE // INTELLECTUAL MATCH ENGINE</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-[#F5F5F0] mt-1">Match Predictor</h2>
        </div>
        <p className="text-sm font-sans text-[#F5F5F0]/40 max-w-sm">
          Execute high-precision multi-parameter forecasts mapping team form, pitch states, and atmospheric variables.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 border border-[#F5F5F0]/10 bg-[#0A0A0C] p-6 rounded-none relative">
          <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#08080A] px-2 text-[9px] font-mono tracking-widest text-primary uppercase">
            [ PARAMETER_MATRIX ]
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-2">
            {(['team_a','team_b','venue','format','toss_winner','weather','pitch'] as const).map(k => (
              <div key={k} className="flex flex-col gap-2">
                <label className="text-[#F5F5F0]/40 text-[10px] font-mono tracking-wider uppercase">
                  {k.replace('_',' ')}
                </label>
                {k === 'team_a' || k === 'team_b' ? (
                  <select 
                    className="bg-[#08080A] border border-[#F5F5F0]/10 text-xs font-mono rounded-none px-3 py-2.5 focus:border-[#F5F5F0]/30 outline-none appearance-none" 
                    value={(inputs as any)[k]} 
                    onChange={e => setInputs(p => ({...p, [k]: e.target.value}))}
                  >
                    {teamOptions.map(t => <option key={t} value={t} className="bg-[#08080A]">{t}</option>)}
                  </select>
                ) : k === 'venue' ? (
                  <select 
                    className="bg-[#08080A] border border-[#F5F5F0]/10 text-xs font-mono rounded-none px-3 py-2.5 focus:border-[#F5F5F0]/30 outline-none appearance-none" 
                    value={inputs.venue} 
                    onChange={e => setInputs(p => ({...p, venue: e.target.value}))}
                  >
                    {venueOptions.map(v => <option key={v} value={v} className="bg-[#08080A]">{v}</option>)}
                  </select>
                ) : k === 'format' ? (
                  <select 
                    className="bg-[#08080A] border border-[#F5F5F0]/10 text-xs font-mono rounded-none px-3 py-2.5 focus:border-[#F5F5F0]/30 outline-none appearance-none" 
                    value={inputs.format} 
                    onChange={e => setInputs(p => ({...p, format: e.target.value}))}
                  >
                    {FORMAT_OPTIONS.map(f => <option key={f} value={f} className="bg-[#08080A]">{f}</option>)}
                  </select>
                ) : k === 'toss_winner' ? (
                  <select 
                    className="bg-[#08080A] border border-[#F5F5F0]/10 text-xs font-mono rounded-none px-3 py-2.5 focus:border-[#F5F5F0]/30 outline-none appearance-none" 
                    value={inputs.toss_winner} 
                    onChange={e => setInputs(p => ({...p, toss_winner: e.target.value}))}
                  >
                    {tossOptions.map(t => <option key={t} value={t === 'None' ? '' : t} className="bg-[#08080A]">{t}</option>)}
                  </select>
                ) : k === 'weather' ? (
                  <select 
                    className="bg-[#08080A] border border-[#F5F5F0]/10 text-xs font-mono rounded-none px-3 py-2.5 focus:border-[#F5F5F0]/30 outline-none appearance-none" 
                    value={inputs.weather} 
                    onChange={e => setInputs(p => ({...p, weather: e.target.value}))}
                  >
                    {WEATHER_OPTIONS.map(w => <option key={w} value={w} className="bg-[#08080A]">{w}</option>)}
                  </select>
                ) : k === 'pitch' ? (
                  <select 
                    className="bg-[#08080A] border border-[#F5F5F0]/10 text-xs font-mono rounded-none px-3 py-2.5 focus:border-[#F5F5F0]/30 outline-none appearance-none" 
                    value={inputs.pitch} 
                    onChange={e => setInputs(p => ({...p, pitch: e.target.value}))}
                  >
                    {PITCH_OPTIONS.map(p => <option key={p} value={p} className="bg-[#08080A]">{p}</option>)}
                  </select>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#F5F5F0]/10 flex flex-col sm:flex-row gap-4">
            <button 
              className="px-6 py-3 bg-[#F4F4F0] text-black font-mono text-xs uppercase tracking-wider font-bold rounded-none hover:bg-white transition-all flex items-center justify-center gap-2" 
              onClick={() => predictMut.mutate(inputs)}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Compute Prediction
            </button>
            <button 
              className="px-6 py-3 bg-transparent border border-[#F5F5F0]/20 text-[#F5F5F0] font-mono text-xs uppercase tracking-wider rounded-none hover:bg-[#F5F5F0]/5 hover:border-[#F5F5F0]/40 transition-all flex items-center justify-center gap-2" 
              onClick={() => simulateMut.mutate({...inputs, n_sims: 1000})}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Run Monte Carlo (1K)
            </button>
          </div>
        </div>

        <div className="border border-[#F5F5F0]/10 bg-[#0A0A0C]/40 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-mono tracking-widest text-primary block uppercase">● CORE_SYSTEM_STATUS</span>
            <div className="border-t border-[#F5F5F0]/10 pt-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#F5F5F0]/40">Intelligence Node</div>
              <div className="text-sm font-light mt-0.5">XGBoost Ensemble Neural Net</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#F5F5F0]/40">Active Match Dataset</div>
              <div className="text-sm font-light mt-0.5">5,200+ Professional ODI/T20 Matches</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#F5F5F0]/40">Atmospheric Spline</div>
              <div className="text-sm font-light mt-0.5">Barometric pressure & humidity matrix loaded</div>
            </div>
          </div>

          <div className="text-[9px] font-mono text-[#F5F5F0]/30 border-t border-[#F5F5F0]/10 pt-4 uppercase">
            ENVIRONMENTAL_B_DEVICES: STABLE_CONNECTION
          </div>
        </div>
      </div>

      {predictMut.data && (
        <div className="mt-8 border border-[#F5F5F0]/10 bg-[#0A0A0C] p-8 rounded-none relative">
          <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#08080A] px-2 text-[9px] font-mono tracking-widest text-secondary uppercase">
            [ OUTCOME_LEDGER ]
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center border-r border-[#F5F5F0]/10 pr-6">
              <ProbabilityGauge value={predictMut.data.win_probability} />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-widest text-secondary block uppercase">● STATISTICAL FORECAST SUCCESS</span>
              <h3 className="text-3xl font-serif font-light text-white mt-2 mb-1">
                {predictMut.data.winning_team} <span className="font-serif italic text-primary">predicted to Win</span>
              </h3>
              <div className="text-xs font-mono text-[#F5F5F0]/50 mb-6">Confidence index calibrated at: {predictMut.data.confidence}%</div>

              <div className="border-t border-[#F5F5F0]/10 pt-4">
                <span className="text-[10px] font-mono tracking-widest text-[#F5F5F0]/40 block mb-3 uppercase">CALIBRATION VARIABLES</span>
                <ul className="space-y-2 font-mono text-xs text-[#F5F5F0]/70">
                  {predictMut.data.explanation?.map((r: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold">»</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {simulateMut.data && (
        <div className="mt-8 border border-[#F5F5F0]/10 bg-[#0A0A0C] p-8 rounded-none relative">
          <div className="absolute top-0 left-6 -translate-y-1/2 bg-[#08080A] px-2 text-[9px] font-mono tracking-widest text-primary uppercase">
            [ MONTE_CARLO_SIMULATION_RAW ]
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-4 h-4 text-primary animate-pulse" />
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#F5F5F0]/60">1000 Iteration Convergence Log</h3>
          </div>

          <pre className="text-[#F5F5F0]/70 text-xs font-mono overflow-auto bg-[#08080A] border border-[#F5F5F0]/10 p-4 leading-relaxed">
            {JSON.stringify(simulateMut.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
