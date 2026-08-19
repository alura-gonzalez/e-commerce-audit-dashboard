"use client"

import { useEffect, useState } from "react"

interface ScoreGaugeProps {
  score: number
  statusLabel: string
}

function toneForScore(score: number) {
  if (score >= 85) return { color: "var(--color-brand-mint)" }
  if (score >= 60) return { color: "var(--color-gauge-progress)" }
  return { color: "var(--color-brand-coral)" }
}

export function ScoreGauge({ score, statusLabel }: ScoreGaugeProps) {
  const [progress, setProgress] = useState(0)
  const tone = toneForScore(score)

  const radius = 84
  const strokeWidth = 11
  const circumference = 2 * Math.PI * radius
  const dash = (progress / 100) * circumference

  useEffect(() => {
    const id = requestAnimationFrame(() => setProgress(score))
    return () => cancelAnimationFrame(id)
  }, [score])

  return (
    <div className="flex h-full w-full flex-row items-center gap-6 md:gap-8">
      <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={tone.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            className="transition-[stroke-dasharray] duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-4xl font-extrabold tracking-tight text-brand-dark tabular-nums">
            {Math.round(progress)}
          </span>
          <span className="text-xs font-semibold text-brand-dark/70">/ 100</span>
        </div>
      </div>

      <div className="flex flex-col text-left">
  <div>
    <span className="text-xs font-bold uppercase tracking-wider text-readiness-label bg-black/5 px-3 py-1.5 rounded-full inline-block">
      Overall Readiness
    </span>
  </div>
  <p className="mt-3 font-sans text-2xl font-bold tracking-tight text-brand-dark">
    {statusLabel}
  </p>
        <p className="mt-1.5 w-full text-pretty text-sm font-normal leading-relaxed text-brand-dark/80">
          How well this page can be interpreted, executed, and trusted by autonomous shopping agents.
        </p>
      </div>
    </div>
  )
}
