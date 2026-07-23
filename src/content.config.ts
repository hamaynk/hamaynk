import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    excerpt: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(['Announcement', 'Event', 'Holiday', 'PTA']).optional().default('Announcement'),
    }),
});

const events = defineCollection({
  loader: glob({ base: './src/content/events', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    date: z.coerce.date(),
    location: z.enum(['Connecticut', 'Maine', 'Massachusetts', 'New Hampshire', 'Rhode Island', 'Vermont']),
    interests: z.array(
          z.enum([
            'Arts',
            'Causes',
            'Culture',
            'Education',
            'Religion',
            'Social',
            'Sports'
          ])
        ).min(1, {
          error: 'Please select at least one interest'
        }),
    ageGroup: z.enum(['Kids', 'Teens', '18+', '21+', 'All ages']),
    excerpt: z.string(),
    description: z.string(),
    image: z.string().optional(),
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
    interests: z.array(
          z.enum([
            'Arts',
            'Causes',
            'Culture',
            'Education',
            'Religion',
            'Social',
            'Sports'
          ])
        ).min(1, {
          error: 'Please select at least one interest'
        }),
    image: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = {
  blog,
  events,
  'diy-guides': diyGuides,
};
