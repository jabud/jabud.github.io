import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Esquema compartido para escritos (notas y reseñas)
const writingSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const notas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notas' }),
  schema: writingSchema,
});

const resenas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resenas' }),
  schema: writingSchema.extend({
    // Campos opcionales propios de una reseña de libro
    author: z.string().optional(),
    rating: z.number().min(0).max(5).optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    link: z.string().url().optional(),
    repo: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { notas, resenas, projects };
