"use client"
import Image from "next/image"
import { useState } from "react"
import {
  AlertCircle,
  Building2,
  Globe,
  Link2,
  Loader2,
  Lock,
  Play,
  ScanSearch,
  Sparkles,
  Tag,
  TrendingUp,
} from "lucide-react"
import { demoAudit, type AuditResult } from "@/lib/audit-data"
import { ScoreGauge } from "@/components/score-gauge"
import { PillarGrid } from "@/components/pillar-grid"
import { FindingsFeed } from "@/components/findings-feed"

type Mode = "demo" | "live"

const WEBHOOK_URL = "/api/audit"

export function AuditDashboard() {
  const [mode, setMode] = useState<Mode>("demo")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [liveResult, setLiveResult] = useState<AuditResult | null>(null)
  
  // 1. ESTADO AGREGADO AQUÍ
  const [hasSubmittedLive, setHasSubmittedLive] = useState(false)

  const result = mode === "demo" ? demoAudit : liveResult

  async function runAudit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim() || loading) return
    setLoading(true)
    setError(null)
    setHasSubmittedLive(false)

    // 2. SIMULACIÓN DE CARGA Y ACTIVACIÓN DEL ESTADO
    setTimeout(() => {
      setLoading(false)
      setHasSubmittedLive(true)
    }, 1000)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Header mode={mode} onModeChange={setMode} />

      {mode === "live" && (
        <form
          onSubmit={runAudit}
          className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-flat-sm)] sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <Globe
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="audit-url" className="sr-only">
              Product page URL
            </label>
            <input
              id="audit-url"
              type="url"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://store.example.com/product/..."
              className="h-11 w-full rounded-full border border-input bg-background pl-10 pr-4 text-sm font-medium text-foreground outline-none transition focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/30"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-dark px-7 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Auditing…
              </>
            ) : (
              <>
                <Play className="h-4 w-4" aria-hidden="true" />
                Run Audit
              </>
            )}
          </button>
        </form>
      )}

      {error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-danger/30 bg-danger-muted px-4 py-3 text-sm font-medium text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </div>
      )}

      {result ? (
        <div className="flex flex-col gap-8">
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch">
            <div className="flex h-full items-center justify-center rounded-3xl bg-readiness-bg p-6">
              <ScoreGauge score={result.score} statusLabel={result.status_label} />
            </div>
            <CompanyPanel
              name={result.company_name}
              url={result.audited_url}
              sector={result.sector}
              avgMonthlyVisits={result.avg_monthly_visits}
            />
          </section>

          <PillarGrid
            interpretability={result.interpretability_pass}
            executability={result.executability_pass}
            reliability={result.reliability_pass}
          />

          <FindingsFeed findings={result.findings} auditedAt={result.audited_at} />
        </div>
      ) : (
        /* 3. PROP PASADA CORRECTAMENTE AQUÍ */
        <EmptyState loading={loading} hasSubmittedLive={hasSubmittedLive} />
      )}
    </div>
  )
}

function CompanyPanel({
  name,
  url,
  sector,
  avgMonthlyVisits,
}: {
  name: string
  url: string
  sector: string
  avgMonthlyVisits: number | string
}) {
  let host = url
  try {
    host = new URL(url).hostname.replace(/^www\./, "")
  } catch {
    // keep raw url if it is not parseable
  }

  const visits =
    typeof avgMonthlyVisits === "number"
      ? avgMonthlyVisits >= 1_000_000
        ? `${(avgMonthlyVisits / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
        : avgMonthlyVisits >= 1_000
          ? `${(avgMonthlyVisits / 1_000).toFixed(1).replace(/\.0$/, "")}K`
          : String(avgMonthlyVisits)
      : avgMonthlyVisits

  return (
    <dl className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2">
      <InfoCell icon={Building2} label="Company">
        <span className="text-base font-bold text-foreground">{name}</span>
      </InfoCell>
      <InfoCell icon={Tag} label="Sector">
        <span className="text-base font-bold text-foreground">{sector}</span>
      </InfoCell>
      <InfoCell icon={Link2} label="Audited URL">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-sm font-medium text-brand-purple underline-offset-2 hover:underline"
          title={url}
        >
          {host}
        </a>
      </InfoCell>
      <InfoCell icon={TrendingUp} label="Avg. monthly visits">
        <span className="font-mono text-base font-bold tabular-nums text-foreground">{visits}</span>
      </InfoCell>
    </dl>
  )
}

function InfoCell({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Building2
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col justify-center gap-1.5 rounded-3xl bg-card px-4 py-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <dt className="text-xs font-bold uppercase tracking-wider">{label}</dt>
      </div>
      <dd className="min-w-0 truncate">{children}</dd>
    </div>
  )
}

function Header({ mode, onModeChange }: { mode: Mode; onModeChange: (m: Mode) => void }) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="font-heading text-xl font-extrabold tracking-tight text-muted-foreground sm:text-2xl">
            Agent-Readiness Dashboard
          </h1>
          <p className="text-sm font-medium text-muted-foreground">Audited via Agent-Ready Framework</p>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Audit mode"
        className="inline-flex shrink-0 items-center gap-1 self-start rounded-full bg-card p-1.5"
      >
        <ModeButton active={mode === "demo"} onClick={() => onModeChange("demo")} icon={Sparkles}>
          Demo
        </ModeButton>
        <ModeButton active={mode === "live"} onClick={() => onModeChange("live")} icon={Globe}>
          Live Audit
        </ModeButton>
      </div>
    </header>
  )
}

function ModeButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: typeof Sparkles
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
        active ? "bg-brand-dark text-white" : "text-muted-foreground hover:text-brand-purple"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {children}
    </button>
  )
}

function EmptyState({
  loading,
  hasSubmittedLive,
}: {
  loading: boolean
  hasSubmittedLive?: boolean
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-purple" aria-hidden="true" />
        <p className="font-heading text-base font-extrabold text-foreground">Running audit…</p>
        <p className="max-w-sm text-pretty text-sm text-muted-foreground">
          Fetching agent-readiness signals from the target page.
        </p>
      </div>
    )
  }

  if (hasSubmittedLive) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-yellow/20 text-brand-dark">
          <Lock className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="font-heading text-base font-extrabold text-foreground">
          Protected section with usage limits
        </p>
        <p className="max-w-md text-pretty text-sm text-muted-foreground">
          We are working on a spam-free version protected against token depletion. In the meantime, feel free to explore the Demo mode to check out the report structure.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <ScanSearch className="h-7 w-7" aria-hidden="true" />
      </div>
      <p className="font-heading text-base font-extrabold text-foreground">No audit results yet</p>
      <p className="max-w-sm text-pretty text-sm text-muted-foreground">
        Enter a product page URL above and run a live audit to see the results here.
      </p>
    </div>
  )
}