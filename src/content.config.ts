import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const stateEnum = ['CT', 'ME', 'MA', 'NH', 'RI', 'VT'] as const;
const categoryEnum = ['Arts', 'Causes', 'Culture', 'Education', 'Religion', 'Social', 'Sports'] as const;
const typeEnum = ['Athletics', 'Cultural', 'Educational', 'Humanitarian', 'Media', 'Politically Affiliated', 'Professional', 'Religious'] as const;

const events = defineCollection({
  loader: glob({ base: './src/content/events', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    time: z.string(),
    venueAddress: z.string(),
    venueCity: z.string(),
    state: z.enum(stateEnum),
    interests: z.union([
      z.enum(categoryEnum),
      z.array(z.enum(categoryEnum))
    ]).transform((val) => Array.isArray(val) ? val : [val]),
    ageGroup: z.union([
      z.enum(['Kids', 'Teens', '18+', '21+', 'All ages']),
      z.array(z.enum(['Kids', 'Teens', '18+', '21+', 'All ages']))
    ]).transform((val) => Array.isArray(val) ? val : [val]),
    price: z.string(),
    organizers: z.string(),
    eventUrl: z.string().url().optional(),
    isUserSubmitted: z.boolean().default(false),
    published: z.boolean().default(true),
  }),
});

const diyGuides = defineCollection({
  loader: glob({ base: './src/content/diy-guides', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    excerpt: z.string(),
    description: z.string(),
    interests: z.union([
      z.enum(categoryEnum),
      z.array(z.enum(categoryEnum))
    ]).transform((val) => Array.isArray(val) ? val : [val]),
  }),
});

const orgs = defineCollection({
  loader: glob({ base: './src/content/orgs', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    state: z.enum(stateEnum).optional(),
    type: z.union([
      z.enum(typeEnum),
      z.array(z.enum(typeEnum))
    ]).transform((val) => Array.isArray(val) ? val : [val]),
    address: z.string().optional(),
    website: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
});

export const collections = {
  events,
  'diy-guides': diyGuides,
  orgs,
};
