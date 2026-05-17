/** Circular “next” navigation for long-form editorial routes (Phase 4). */

export function getNextBySlugCircular<T extends { slug: string }>(
  items: readonly T[],
  slug: string,
): T | null {
  const i = items.findIndex((x) => x.slug === slug);
  if (i === -1 || items.length < 2) return null;
  return items[(i + 1) % items.length]!;
}
