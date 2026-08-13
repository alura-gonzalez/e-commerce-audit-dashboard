import { Check, X, type LucideIcon, Eye, MousePointerClick, ShieldCheck, HelpCircle } from "lucide-react"

const PILLAR_WHY: Record<string, string> = {
  Interpretability:
    "Based on Jakob Nielsen's intent-based interface model, AI agents parse HTML semantically rather than visually. Clear microdata and schema let agents synthesize product attributes accurately without guessing.",
  Executability:
    "AI shopping agents rely on deterministic action paths. Explicit form labels, clear DOM hierarchy, and accessible controls ensure non-human actors can execute tasks (like checkout) without getting blocked.",
  Reliability:
    "To prevent agent hallucinations and transaction failures, the rendered UI state must strictly match canonical backend data, avoiding dynamic state drift between agent expectations and system reality.",
}

interface Pillar {
  name: string
  description: string
  passed: boolean
  icon: LucideIcon
}

interface PillarGridProps {
  interpretability: boolean
  executability: boolean
  reliability: boolean
}

export function PillarGrid({ interpretability, executability, reliability }: PillarGridProps) {
  const pillars: Pillar[] = [
    {
      name: "Interpretability",
      description: "Can an agent read and understand the product data?",
      passed: interpretability,
      icon: Eye,
    },
    {
      name: "Executability",
      description: "Can an agent complete a purchase from the markup?",
      passed: executability,
      icon: MousePointerClick,
    },
    {
      name: "Reliability",
      description: "Is the exposed product state consistent and trustworthy?",
      passed: reliability,
      icon: ShieldCheck,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pillars.map((pillar) => {
        const Icon = pillar.icon
        return (
          <div
            key={pillar.name}
            className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            {/* Header: Ícono del Pilar + Badge (Passed/Failed) */}
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  pillar.passed
                    ? "bg-success-muted text-success"
                    : "bg-danger-muted text-danger"
                }`}
              >
                {pillar.passed ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {pillar.passed ? "Passed" : "Failed"}
              </div>
            </div>

            {/* Contenido: Título + Tooltip + Descripción */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-semibold tracking-normal text-foreground">
                  {pillar.name}
                </h3>

                {/* TOOLTIP (Solo ícono) */}
                <div className="group relative inline-flex items-center cursor-pointer">
                  <HelpCircle className="h-4 w-4 text-muted-foreground/60 transition-colors group-hover:text-foreground" />

                  {/* GLOBO FLOTANTE */}
                  <div className="pointer-events-none absolute bottom-full left-0 mb-2 hidden w-72 rounded-xl border border-border bg-popover p-3.5 text-xs font-normal leading-relaxed text-popover-foreground shadow-lg transition-all group-hover:pointer-events-auto group-hover:block z-50">
                    <p className="text-muted-foreground">
                      {PILLAR_WHY[pillar.name] || "Critical dimension for evaluating agent compatibility."}
                    </p>

                    {/* Flecha inferior */}
                    <div className="absolute top-full left-3 -mt-1 border-4 border-transparent border-t-popover" />
                  </div>
                </div>
              </div>

              <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                {pillar.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}