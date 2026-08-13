export type FindingCategory = "Code" | "UI/UX";

export interface Finding {
  type: "error" | "warning" | "info";
  category: FindingCategory;
  description: string;
  suggestion: string;
}

export interface AuditResult {
  company_name: string;
  audited_url: string;
  audited_at: string;
  sector: string;
  avg_monthly_visits: string;
  score: number;
  status_label: string;
  interpretability_pass: boolean;
  executability_pass: boolean;
  reliability_pass: boolean;
  findings: Finding[];
}

export const demoAudit: AuditResult = {
  "company_name": "MANGO",
  "audited_url": "https://shop.mango.com/mx/es/p/mujer/camisetas/basicas/camiseta-100-algodon-cuello-redondo/37091331/37/00",
  "audited_at": "2026-08-12",
  "sector": "Fashion & Apparel Retail",
  "avg_monthly_visits": "10M+",
  "score": 78,
  "status_label": "Needs Work (Yellow)",
  "interpretability_pass": true,
  "executability_pass": true,
  "reliability_pass": false,
  "findings": [
    {
      "type": "error",
      "category": "Code",
      "description": "The canonical URL points to color 99 while the audited page represents color 37, creating an identity mismatch for the selected product variant.",
      "suggestion": "Use a canonical URL consistent with the selected color variant, or define a stable parent-product canonical URL while exposing the active color and variant identifiers in structured data."
    },
    {
      "type": "error",
      "category": "Code",
      "description": "Product schema uses partial Microdata but does not provide a complete machine-readable Product and Offer representation. The offers lack clear availability, seller, item URL, variant identity, and an unambiguous relationship between the current and crossed-out prices.",
      "suggestion": "Add comprehensive JSON-LD using Product, Offer, and, where appropriate, ProductGroup or individual variant entities with sku, color, size, price, priceCurrency, availability, seller, url, and valid-through information."
    },
    {
      "type": "warning",
      "category": "Code",
      "description": "The page exposes rich product and inventory data inside framework-specific React payloads, but the purchasing operation is represented primarily by JavaScript buttons without a declarative machine-readable action or add-to-cart contract.",
      "suggestion": "Expose an agent-consumable add-to-cart endpoint or form contract documenting product ID, color ID, size ID, quantity, inventory validation, and expected success or error responses."
    },
    {
      "type": "warning",
      "category": "UI/UX",
      "description": "Size buttons expose availability text but do not clearly expose the selected size state through semantic attributes such as aria-pressed or aria-selected, and the size collection is not grouped with a clearly associated accessible label.",
      "suggestion": "Use a fieldset and legend or an equivalent labelled group, and update aria-selected or aria-pressed on the chosen size while exposing the selected color and size in accessible state text."
    }
  ]
};