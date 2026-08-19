"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  Calendar,
  Code2,
  Lightbulb,
  Palette,
  XCircle,
} from "lucide-react"
import type { Finding, FindingCategory } from "@/lib/audit-data"

interface FindingsFeedProps {
  findings: Finding[]
  auditedAt?: string
}

type Filter = "All" | FindingCategory

const FILTERS: Filter[] = ["All", "UI/UX", "Code"]

export function FindingsFeed({ findings, auditedAt }: FindingsFeedProps) {
  const [filter, setFilter] = useState<Filter>("All")

  const errorCount = findings.filter((f) => f.type === "error").length
  const warningCount = findings.filter((f) => f.type === "warning").length

  const counts = useMemo(
    () => ({
      All: findings.length,
      "UI/UX": findings.filter((f) => f.category === "UI/UX").length,
      Code: findings.filter((f) => f.category === "Code").length,
    }),
    [findings],
  )

  const visible = filter === "All" ? findings : findings.filter((f) => f.category === filter)

  return (
    <section aria-labelledby="findings-heading" className="flex flex-col">
      {/* FILA 1: Título + Badges (Errors & Warnings) */}
      <div className="flex items-center gap-4 mb-3">
        <h2 id="findings-heading" className="text-xl font-bold tracking-tight text-foreground">
          Findings
        </h2>
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-muted px-2.5 py-1 text-danger">
            <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {errorCount} {errorCount === 1 ? "error" : "errors"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-warning-muted px-2.5 py-1 text-warning-foreground">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            {warningCount} {warningCount === 1 ? "warning" : "warnings"}
          </span>
        </div>
      </div>

      {/* FILA 2: Fecha a la izquierda | Filtros a la derecha (acercados a los hallazgos) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        {/* Badge de Fecha sin ícono de refresh */}
        <div className="inline-flex items-center gap-2 rounded-xl bg-card px-3.5 py-2 text-sm font-medium text-foreground">
          <Calendar className="h-4 w-4 text-muted-foreground stroke-[1.75]" />
          <span>Last Update, {auditedAt || "2026-08-11"}</span>
        </div>

        {/* Filtros */}
        <div
          role="tablist"
          aria-label="Filter findings by category"
          className="inline-flex items-center gap-1 rounded-full bg-card p-1"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
              <span
              className={`rounded-full px-2 py-0.5 text-[13px] font-semibold leading-none tabular-nums ${
              filter === f
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-muted text-muted-foreground"
              }`}
               >
              {counts[f]}
             </span>
            </button>
          ))}
        </div>
      </div>

      {/* LISTA DE TARJETAS */}
      {visible.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {visible.map((finding) => (
            <FindingCard key={finding.description} finding={finding} index={findings.indexOf(finding)} />
          ))}
        </ul>
      ) : (
        <p className="rounded-3xl border border-dashed border-border bg-card/50 px-4 py-8 text-center text-sm text-muted-foreground">
          No {filter} findings for this page.
        </p>
      )}
    </section>
  )
}

function CategoryBadge({ category }: { category: FindingCategory }) {
  const isUx = category === "UI/UX"
  const Icon = isUx ? Palette : Code2
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
        isUx ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
      }`}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {category}
    </span>
  )
}

function FindingCard({ finding, index }: { finding: Finding; index: number }) {
  const isError = finding.type === "error"

  return (
    <li
      className={`overflow-hidden rounded-3xl bg-card ${
        isError ? "border-l-4 border-l-danger" : "border-l-4 border-l-warning"
      }`}
    >
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-3xl ${
              isError ? "bg-danger-muted text-danger" : "bg-warning-muted text-warning-foreground"
            }`}
          >
            {isError ? (
              <XCircle className="h-4 w-4" aria-hidden="true" />
            ) : (
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            )}
          </div>
          <div className="flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                  isError ? "bg-danger-muted text-danger" : "bg-warning-muted text-warning-foreground"
                }`}
              >
                {finding.type}
              </span>
              <CategoryBadge category={finding.category} />
              <span className="font-mono text-xs text-muted-foreground">
                #{String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="text-pretty text-sm font-medium leading-relaxed text-foreground tracking-normal">
             {finding.description}
            </p>
          </div>
        </div>

        {finding.suggestion && (
          <div className="ml-11 flex gap-2.5 rounded-2xl bg-muted/60 p-3.5">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Suggested fix
              </p>
              <p className="mt-1 text-pretty text-sm leading-relaxed text-foreground/80">{finding.suggestion}</p>
            </div>
          </div>
        )}
      </div>
    </li>
  )
}