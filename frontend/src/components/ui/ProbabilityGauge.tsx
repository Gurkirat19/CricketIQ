import React from 'react'

type Props = { value: number }

export default function ProbabilityGauge({ value }: Props) {
  const pct = Math.max(0, Math.min(100, value))
  const stroke = '#00D4FF'
  const bg = 'rgba(255,255,255,0.08)'
  const r = 70
  const c = 2 * Math.PI * r
  const offset = c - (pct / 100) * c
  return (
    <div className="glass p-6 rounded-2xl inline-block">
      <svg width="180" height="120" viewBox="0 0 180 120">
        <g transform="translate(90,100)">
          <path d="M -80 0 A 80 80 0 0 1 80 0" fill="none" stroke={bg} strokeWidth={14} strokeLinecap="round" />
          <circle r={r} cx={0} cy={0} fill="transparent" stroke={stroke} strokeWidth={14} strokeDasharray={`${c} ${c}`} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-180) translate(0,0)" />
        </g>
      </svg>
      <div className="text-center -mt-6">
        <div className="text-3xl font-extrabold text-primary">{pct.toFixed(0)}%</div>
        <div className="text-white/60 text-sm">Win Probability</div>
      </div>
    </div>
  )
}
