export type FindingType = "error" | "warning"
export type FindingCategory = "UI/UX" | "Code"

export interface Finding {
  type: FindingType
  category: FindingCategory
  description: string
  suggestion: string
}

export interface AuditResult {
  score: number
  status_label: string
  company_name: string
  audited_url: string
  audited_at: string
  sector: string
  avg_monthly_visits: number | string
  interpretability_pass: boolean
  executability_pass: boolean
  reliability_pass: boolean
  findings: Finding[]
}

export const demoAudit: AuditResult = {
  company_name: "MANGO",
  audited_at: "2026-08-11",
  audited_url:
    "https://shop.mango.com/mx/es/p/mujer/camisetas/basicas/camiseta-100-algodon-cuello-redondo/37091331/37/00",
  sector: "Fashion & Apparel Retail",
  avg_monthly_visits: "10M+",
  score: 76,
  status_label: "Needs Work (Yellow)",
  interpretability_pass: true,
  executability_pass: true,
  reliability_pass: false,
  findings: [
    {
      type: "error",
      category: "Code",
      description:
        "The canonical URL points to color 99 while the audited page and rendered product state are color 37 (Khaki). This creates an inconsistent product identity for agents, search engines, and commerce integrations.",
      suggestion:
        "Generate the canonical URL dynamically so it matches the selected product variant, or define a consistent parent-product canonical strategy while exposing the selected color and variant URL through structured data.",
    },
    {
      type: "error",
      category: "Code",
      description:
        "Product microdata includes multiple Offer objects for the crossed-out and current prices, but does not clearly identify the current offer with availability, SKU, item condition, or a variant-specific URL. The Product also lacks explicit brand and SKU properties.",
      suggestion:
        "Add complete JSON-LD for Product and Offer, including brand.name, sku, mpn, offers.price, priceCurrency, availability, itemCondition, url, and variant-specific identifiers. Represent the sale price as the active Offer and the original price as an appropriate price or priceSpecification field.",
    },
    {
      type: "warning",
      category: "Code",
      description:
        "The page exposes extensive product data through React server payloads, but key transactional data is not provided in a standardized machine-readable commerce feed. Agents must interpret framework-specific serialized data and execute client-side code to confirm cart behavior.",
      suggestion:
        "Publish stable JSON-LD and, where possible, an agent-accessible product or cart API with documented variant selection, inventory, pricing, and add-to-cart operations.",
    },
    {
      type: "warning",
      category: "UI/UX",
      description:
        "Size controls are rendered as buttons with visible labels but are not clearly grouped with an accessible field label or explicit selected-state semantics in the HTML. The add-to-bag control also does not expose the selected color and size in its accessible name or attributes.",
      suggestion:
        "Wrap sizes in a labeled fieldset or equivalent semantic group, expose aria-pressed or aria-selected for the active size, and communicate the selected variant and validation state before enabling the add-to-bag action.",
    },
    {
      type: "warning",
      category: "Code",
      description:
        "The page contains product-level itemScope microdata but does not expose standardized availability for each color-size combination, even though the serialized product data contains detailed inventory states.",
      suggestion:
        "Expose variant-level availability using structured ProductGroup/Product models or linked Product variants, with clear availability values for each color and size combination.",
    },
  ],
}
