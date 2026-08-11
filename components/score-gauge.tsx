"use client"

import { useEffect, useState } from "react"

interface ScoreGaugeProps {
  score: number
  statusLabel: string
}

function toneForScore(score: number) {
  if (score >= 85) return { color: "var(--success)", label: "text-success" }
  if (score >= 60) return { color: "var(--warning)", label: "text-warning-foreground" }
  return { color: "var(--danger)", label: "text-danger" }
}

export function ScoreGauge({ score, statusLabel }: ScoreGaugeProps) {
  const [progress, setProgress] = useState(0)
  const tone = toneForScore(score)

  const radius = 84
  const circumference = 2 * Math.PI * radius
  const dash = (progress / 100) * circumference

  useEffect(() => {
    const id = requestAnimationFrame(() => setProgress(score))
    return () => cancelAnimationFrame(id)
  }, [score])

  return (
    <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-8">
      <div className="relative flex h-52 w-52 shrink-0 items-center justify-center">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="var(--muted)" strokeWidth="14" />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={tone.color}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            className="transition-[stroke-dasharray] duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-5xl font-semibold tracking-tight text-foreground tabular-nums">
            {Math.round(progress)}
          </span>
          <span className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {"/ 100"}
          </span>
        </div>
      </div>

      <div className="text-center md:text-left">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Overall readiness</p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{statusLabel}</p>
        <p className="mt-3 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
          How well this page can be interpreted, executed, and trusted by autonomous shopping agents.
        </p>
      </div>
    </div>
  )
}
