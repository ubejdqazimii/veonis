export type HomepageText = { source: string; text: string };
export type HomepageContent = Partial<Record<"hero" | "services" | "overview" | "highlights" | "innovation" | "collaboration" | "insights" | "cta", HomepageText[]>>;

// Keep the original copy as a fallback when a field has not been configured yet.
export function createHomepageCopy(entries?: HomepageText[]) {
  const values = new Map((entries ?? []).map(entry => [entry.source, entry.text]));
  return (source: string): string => values.get(source)?.trim() || source;
}
