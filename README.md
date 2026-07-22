# Elementary — Free Astro School Theme

**Elementary** is a free, open-source website theme built with [Astro](https://astro.build) for elementary schools, daycare centers, preschools, or any educational organization that needs a clean, friendly, and modern web presence.

It is fully static (no server-side rendering required), easy to customize, and ready to deploy to any static hosting provider in minutes.

---

## ✨ Features

- **Fully static** — blazing fast, no server required
- **Responsive** — mobile-first layout that works on all screen sizes
- **Tailwind CSS v4** — utility-first styling with a custom brand theme
- **Content Collections** — blog/news posts managed as Markdown files
- **Customizable** — swap colors, fonts, site name, contact info, and social links from a single config file
- **Accessible** — semantic HTML, keyboard-navigable navigation
- **Netlify-ready** — includes `@astrojs/netlify` adapter; works equally well on Vercel, Cloudflare Pages, or any static host

---

## 🛠 Tech Stack

| Tool | Purpose |
| --- | --- |
| [Astro 6](https://astro.build) | Static site framework |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS |
| [tailwind-variants](https://www.tailwind-variants.org) | Component variant system |
| [@tailwindplus/elements](https://tailwindplus.io) | Interactive UI primitives (accordion, tabs, etc.) |
| [TypeScript](https://www.typescriptlang.org) | Type safety across all components |
| [Biome](https://biomejs.dev) | Linting & formatting |

---

## 🚀 Getting Started

**Requirements:** Node.js >= 22.12.0

```sh
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The dev server starts at **http://localhost:4321**.

### All available commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npx biome check` | Lint the project |
| `npx biome format --write .` | Auto-format all files |

---

## 📄 Pages

| Route | Description |
| --- | --- |
| `/` | Home page — hero, news highlights, about, programs, schedule, testimonials, FAQ, newsletter signup |
| `/teachers` | Meet the team — staff cards with name, role, and bio |
| `/blog` | School news & announcements index |
| `/blog/[id]` | Individual blog post |
| `/contact` | Contact form, enrollment form, and school location/info |

---

## 🧩 Components

| Component | Description |
| --- | --- |
| `Layout.astro` | Root HTML shell, sticky header, global styles |
| `Header.astro` | Responsive navigation with active-link highlighting |
| `MobileMenu.astro` | Slide-in mobile navigation drawer |
| `Footer.astro` | Footer with links and social media icons |
| `Section.astro` | Full-width section wrapper (sets background color) |
| `Container.astro` | Centered content container with responsive padding |
| `MainHeading.astro` | Hero-style heading block with headline, subtitle, and CTA |
| `SectionHeading.astro` | Centered heading + description used at the top of sections |
| `Video.astro` | Background or inline video with optional overlay |
| `InfoCards.astro` | Grid of highlight cards (events, news snippets) |
| `Stats.astro` | Key school statistics displayed as large numbers |
| `ProgramCards.astro` | Cards presenting school programs (art, science, sports, etc.) |
| `Agenda.astro` | Weekly or upcoming schedule display |
| `Teachers.astro` | Grid of teacher/staff profile cards |
| `Testimonials.astro` | Scrollable parent/student testimonials carousel |
| `BlogList.astro` | Grid listing of all blog posts |
| `Faq.astro` / `FaqItem.astro` | Accordion-style FAQ section |
| `Button.astro` | Polymorphic button/link with multiple color variants and sizes |
| `FormContact.astro` | General contact form |
| `FormEnrollment.astro` | Student enrollment inquiry form |
| `FormNewsletter.astro` | Email newsletter signup form |

---

## ⚙️ Configuration

All global site settings live in **`src/data/config.ts`**:

```ts
export const siteName = "Elementary";
export const phone    = { href: "tel:+123456789", label: "(123) 456-789" };
export const email    = { href: "mailto:info@elementary.com", label: "info@elementary.com" };
export const address  = { street: "…", city: "…", zip: "…", state: "…" };
export const socialMedia = { facebook: {…}, x: {…}, instagram: {…}, youtube: {…} };
```

Navigation links are in **`src/data/menu.ts`** and teacher profiles in **`src/data/teachers.ts`**.

Brand colors, fonts, and design tokens are defined as CSS custom properties in **`src/styles/global.css`** under `@theme`.

---

## ✍️ Writing Blog Posts

Blog posts live in `src/content/blog/` as Markdown files. Create a new `.md` file to add a post:

```md
---
title: "Spring Science Fair"
date: 2026-04-01
description: "Students showcase their amazing projects."
image: "/images/science-fair.jpg"
---

Your post content here…
```

Posts are automatically picked up and listed on the `/blog` page.

---

## 🌍 Deployment

This theme is a fully static site and can be deployed anywhere that serves static files.

### Netlify (recommended)

1. Push the repository to GitHub / GitLab.
2. Create a new site on [Netlify](https://netlify.com) and connect the repository.
3. Set the build command to `npm run build` and the publish directory to `dist/`.
4. Click **Deploy** — that's it.

---

## 📁 Project Structure

```text
src/
├── assets/          # Images and logo files
├── components/      # All Astro components
│   ├── buttons/
│   └── forms/
├── content/
│   └── blog/        # Markdown blog posts
├── data/            # Site config, menu, and teacher data
├── layouts/         # Root Layout.astro
├── pages/           # File-based routes
├── styles/          # global.css (Tailwind theme tokens)
├── types.ts         # Shared TypeScript prop interfaces
└── utils/           # Helper utilities (e.g. blogUtils.ts)
```

---

## 🙏 Acknowledgements

Built with [Astro](https://astro.build) · Styled with [Tailwind CSS](https://tailwindcss.com) · Icons via [Iconify](https://iconify.design)
