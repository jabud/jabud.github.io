import { getCollection } from 'astro:content';

export type EntryType = 'nota' | 'reseña' | 'proyecto';

export interface UnifiedEntry {
  title: string;
  description: string;
  href: string;
  date: Date;
  tags: string[];
  type: EntryType;
}

/** Convierte una etiqueta a un slug de URL: "En desarrollo" -> "en-desarrollo". */
export const tagSlug = (tag: string): string =>
  tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/** Todas las entradas publicadas (notas + reseñas + proyectos), unificadas. */
export async function getAllEntries(): Promise<UnifiedEntry[]> {
  const [notas, resenas, projects] = await Promise.all([
    getCollection('notas', ({ data }) => !data.draft),
    getCollection('resenas', ({ data }) => !data.draft),
    getCollection('projects'),
  ]);

  const entries: UnifiedEntry[] = [
    ...notas.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      href: `/notas/${e.id}/`,
      date: e.data.pubDate,
      tags: e.data.tags,
      type: 'nota' as const,
    })),
    ...resenas.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      href: `/resenas/${e.id}/`,
      date: e.data.pubDate,
      tags: e.data.tags,
      type: 'reseña' as const,
    })),
    ...projects.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      href: `/projects/${e.id}/`,
      date: e.data.date,
      tags: e.data.tags,
      type: 'proyecto' as const,
    })),
  ];

  return entries.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export interface TagCount {
  tag: string; // etiqueta representativa (primera vista)
  slug: string;
  count: number;
}

/** Conteo de cada etiqueta en todo el sitio, de mayor a menor. */
export async function getTagCounts(): Promise<TagCount[]> {
  const entries = await getAllEntries();
  const map = new Map<string, TagCount>();
  for (const entry of entries) {
    for (const tag of entry.tags) {
      const slug = tagSlug(tag);
      const existing = map.get(slug);
      if (existing) existing.count++;
      else map.set(slug, { tag, slug, count: 1 });
    }
  }
  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag)
  );
}
