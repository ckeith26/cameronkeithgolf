## Context

Cameron Keith's personal site needs to move from Wix to a self-hosted platform that authentically represents a D1 golfer who ships AI systems. The aesthetic must be dark/technical (Vercel/Raycast tier) without feeling gimmicky. It must serve mixed audiences: tech recruiters land on projects, golf contacts land on athletic content, VCs land on startup work. The site itself should be evidence of engineering quality.

### Stakeholders
- Cameron Keith (owner, maintainer)
- Tech recruiters and hiring managers
- Athletic contacts, golf community
- VC / startup ecosystem contacts

### Constraints
- Must be maintainable by a single person (Cameron)
- Deployed on Render (not Vercel)
- Domain: camkeith.me
- Must load fast — performance is a signal of engineering quality
- Content should be easy to update without touching component code

## Goals / Non-Goals

### Goals
- Establish a dark, technical aesthetic that signals engineering depth
- Present golf and AI as co-equal pillars of identity, not competing priorities
- Make the site itself a portfolio piece — the craft of the site demonstrates the skills
- Support mixed audience routing (different entry points, different value propositions)
- Enable easy content updates (projects, blog posts, golf results) via MDX/data files
- Include 1-2 standout interactive moments that show engineering capability
- Achieve Lighthouse 95+ across all categories

### Non-Goals
- E-commerce or paid content
- User authentication or accounts
- CMS admin panel (content managed via code/MDX files)
- Mobile app or PWA
- Real-time features (WebSockets, live data feeds) — keep it static/SSG
- SEO-heavy content marketing strategy

## Decisions

### 1. Next.js App Router with Static Site Generation (SSG)

**Decision**: Use Next.js 14+ App Router with `output: 'export'` for static generation.

**Why**: SSG produces a static bundle that deploys anywhere (including Render as a static site). No server required. Pages are pre-rendered at build time, maximizing performance. The App Router's file-based routing and layouts system keeps the codebase clean.

**Alternatives considered**:
- Pages Router: Legacy pattern, less composable layouts
- SSR on Render: Requires a Node server, adds operational complexity for a personal site
- Astro: Great for content sites but Cameron knows React, and Next.js ecosystem is richer for interactive components

### 2. Tailwind CSS + CSS Variables for theming

**Decision**: Tailwind CSS with a custom dark theme using CSS custom properties.

**Why**: Tailwind's utility-first approach keeps styles co-located with components (no stylesheet sprawl). CSS variables allow the design system to be centrally controlled. No runtime CSS-in-JS overhead.

**Alternatives considered**:
- Styled-components: Runtime overhead, less aligned with modern React patterns
- Vanilla CSS modules: More boilerplate, harder to maintain consistent spacing/colors
- shadcn/ui: Good component library but overkill for a portfolio — we want custom components that demonstrate craft

### 3. Framer Motion for animations

**Decision**: Framer Motion for page transitions, scroll-triggered reveals, and interactive elements.

**Why**: Declarative API integrates naturally with React. Supports layout animations, exit animations, and gesture recognition. Well-maintained, good performance, and Cameron can extend animations as desired.

### 4. MDX for blog and rich content pages

**Decision**: MDX (via next-mdx-remote or @next/mdx) for blog posts and potentially project detail pages.

**Why**: Write content in Markdown with embedded React components. Keeps content in the repo (no external CMS dependency). Supports code syntax highlighting, custom components, and LaTeX for research content.

### 5. Content Architecture — Data files + MDX

**Decision**: Store structured data (projects, experience, golf results) as TypeScript data files. Blog posts and long-form content as MDX files.

**Why**: TypeScript data files give type safety and easy validation. MDX gives rich content flexibility. Both are version-controlled. No database, no CMS, no external dependencies.

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── about/page.tsx
│   ├── work/page.tsx
│   ├── projects/page.tsx
│   ├── projects/[slug]/page.tsx
│   ├── golf/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── ui/                 # Design system primitives
│   ├── layout/             # Header, Footer, Navigation
│   ├── sections/           # Page-specific sections
│   └── interactive/        # Standout interactive elements
├── content/
│   ├── blog/               # MDX blog posts
│   └── projects/           # MDX project detail pages (optional)
├── data/
│   ├── projects.ts         # Structured project data
│   ├── experience.ts       # Work experience timeline
│   ├── golf.ts             # Golf stats, results, schedule
│   └── navigation.ts       # Site navigation config
├── lib/
│   ├── mdx.ts              # MDX utilities
│   └── utils.ts            # Shared utilities
└── styles/
    └── globals.css         # Tailwind base + CSS variables
```

### 6. Design System — Dark/Technical Aesthetic

**Color Palette**:
- Background: `#0a0a0a` (near-black), `#111111` (card surfaces), `#1a1a1a` (elevated surfaces)
- Text: `#fafafa` (primary), `#a1a1aa` (secondary/muted), `#71717a` (tertiary)
- Accent: `#10b981` (emerald green) — bridges golf greens and terminal aesthetics
- Accent secondary: `#3b82f6` (blue) — for links and interactive states
- Border: `#27272a` (subtle dividers)

**Typography**:
- Headings: Inter (or Geist Sans) — clean, modern, geometric
- Body: Inter — highly legible at all sizes
- Monospace accent: JetBrains Mono (or Geist Mono) — for code, labels, technical elements
- Scale: Fluid typography using `clamp()` for responsive sizing

**Spacing & Grid**:
- 8px base unit
- Max content width: 1200px
- Generous whitespace — let content breathe
- CSS Grid for complex layouts, Flexbox for component internals

### 7. Interactive Standout Moments

Two elements, one primary and one secondary:

**Primary — Scroll-Linked Swing Video Scrub** (Home page hero):
Cameron's real D1 swing video (4K/60fps source: `IMG_2791.MOV`) plays frame-by-frame as the user scrolls. This is the signature interactive moment of the site — it bridges the golf and engineering identities in a single interaction. The technique (used by Apple on product pages) demonstrates genuine frontend engineering capability.

**Implementation approach — Image Sequence on Canvas:**
1. **Preprocessing (build-time):** Trim the 15.6s MOV to ~3-4s of swing (address → impact → follow-through). Extract ~90-120 frames as WebP images at 1080p. Total payload: ~2-4MB.
2. **Runtime:** Preload all frames on page load. A `<canvas>` element in a sticky/fixed container draws the current frame based on scroll position (`scrollY / scrollHeight * totalFrames`).
3. **Scroll mapping:** The swing occupies a scroll "zone" (~150vh of scroll distance) so the user has fine-grained control. Once the swing completes, the canvas fades and the content sections below are revealed.
4. **Fallback:** On mobile (< 768px) or when `prefers-reduced-motion` is set, show a static hero image with the full video available as a normal player on the Golf page.
5. **Loading:** Show a blurred first-frame placeholder while frames load. Use `IntersectionObserver` to begin preloading when the section approaches the viewport (or eagerly on desktop).

**Why image sequence over video seek:** Browser video decoders are optimized for playback, not random access. Seeking to arbitrary frames causes keyframe-hunting jank. Pre-extracted image sequences give guaranteed smooth, predictable frame display regardless of browser or codec support.

**Secondary — Interactive Terminal Component** (Home page, below the swing hero):
A compact stylized terminal that auto-types a brief intro. Responds to typed commands (`help`, `about`, `projects`, `golf`, `contact`). Reinforces the engineering identity with a playful-but-purposeful interaction.

**Design principle**: Both moments feel _earned_ — the swing scrub demonstrates real frontend engineering (canvas, scroll math, asset optimization), and the terminal shows interactive UI craft. Neither is decorative.

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Static export limits dynamic features | Can't do server-side features | Personal site doesn't need them; forms can use external service (Formspree, Resend) |
| Content maintenance burden | Blog/projects go stale | MDX files are easy to edit; keep initial content minimal and high-quality |
| Performance on Render static hosting | Slower than Vercel edge | Optimize images (next/image with static export), minimize JS bundle, lazy load below-fold |
| Dark mode only may not suit all contexts | Some users prefer light | Design for dark-first; light mode can be added later as enhancement |
| Swing videos are from 2021 | Outdated footage | **Resolved**: Cameron has current 4K/60fps swing video (IMG_2791.MOV) for scroll-linked hero |
| Image sequence payload (~2-4MB) | Slower initial load on poor connections | Lazy preload with blurred placeholder; static fallback on mobile; frames are WebP compressed |
| Canvas scroll-sync browser compat | Older browsers may not handle smoothly | requestAnimationFrame + throttled scroll handler; graceful degradation to static image |

## Resolved Questions

1. **Swing footage**: Cameron has current 4K/60fps MOV — will be used for scroll-linked hero scrub
2. **AI video generation**: Rejected — real footage is more authentic and aligned with "not gimmicky" goal

## Resolved Questions (continued)

3. **Contact form**: No form — just email and social links (LinkedIn, GitHub). Keeps it simple, no third-party dependencies.
4. **Dartmouth tournament results**: No specific results data available. Golf page will focus on achievements (AJGA, Junior Olympian, D1 status), swing footage, and athletic narrative rather than a results table.
5. **Stealth startup**: Must remain unnamed. Reference as "Stealth Startup" in experience section with role title (AI Engineer) and date range only. No company details.
