export interface ModelOption {
  id: string;
  label: string;
  note?: string;
}

export const MODELS: ModelOption[] = [
  { id: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5", note: "fastest & cheapest — great default" },
  { id: "claude-sonnet-4-5-20250929", label: "Claude Sonnet 4.5", note: "mid-tier" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", note: "balanced tactician" },
  { id: "claude-sonnet-5", label: "Claude Sonnet 5", note: "sharp" },
  { id: "claude-opus-4-5-20251101", label: "Claude Opus 4.5", note: "strong" },
  { id: "claude-opus-4-6", label: "Claude Opus 4.6", note: "strong" },
  { id: "claude-opus-4-7", label: "Claude Opus 4.7", note: "strong" },
  { id: "claude-opus-4-8", label: "Claude Opus 4.8", note: "strongest, most deliberate" },
  { id: "claude-opus-5", label: "Claude Opus 5", note: "strongest" },
];

export const DEFAULT_MODEL = MODELS[0].id;

export function validModel(model: string | undefined, fallback: string): string {
  return MODELS.some(m => m.id === model) ? model! : fallback;
}

export function modelLabel(id: string): string {
  return MODELS.find(m => m.id === id)?.label || id;
}
