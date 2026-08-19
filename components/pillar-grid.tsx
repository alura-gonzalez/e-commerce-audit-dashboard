import { Check, X, type LucideIcon, Zap, ShieldCheck, HelpCircle, Code } from "lucide-react"

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
  bgClass: string
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
      icon: Code,
      bgClass: "bg-pillar-interpretability",
    },
    {
      name: "Executability",
      description: "Can an agent complete a purchase from the markup?",
      passed: executability,
      icon: Zap,
      bgClass: "bg-pillar-executability",
    },
    {
      name: "Reliability",
      description: "Is the exposed product state consistent and trustworthy?",
      passed: reliability,
      icon: ShieldCheck,
      bgClass: "bg-pillar-reliability",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pillars.map((pillar) => {
        const Icon = pillar.icon
        return (
          <div
            key={pillar.name}
            className={`flex flex-col gap-4 rounded-3xl p-5 text-white ${pillar.bgClass}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div
                className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                  pillar.passed
                    ? "bg-passed-bg text-passed-text"
                    : "bg-failed-bg text-failed-text"
                }`}
              >
                {pillar.passed ? (
                  <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                ) : (
                  <X className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                )}
                {pillar.passed ? "Passed" : "Failed"}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {pillar.name}
                </h3>

                <div className="group relative inline-flex cursor-pointer items-center">
                  <HelpCircle className="h-4 w-4 text-white/80 transition-colors group-hover:text-white" />

                  <div className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 hidden w-72 rounded-2xl border border-border bg-popover p-3.5 text-xs font-normal leading-relaxed text-popover-foreground shadow-[var(--shadow-flat-sm)] transition-all group-hover:pointer-events-auto group-hover:block">
                    <p className="text-muted-foreground">
                      {PILLAR_WHY[pillar.name] || "Critical dimension for evaluating agent compatibility."}
                    </p>
                    <div className="absolute top-full left-3 -mt-1 border-4 border-transparent border-t-popover" />
                  </div>
                </div>
              </div>

              <p className="mt-1 text-sm font-medium leading-relaxed text-white/100 text-pretty">
                {pillar.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
