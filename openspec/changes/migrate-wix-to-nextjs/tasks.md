## Team Structure

Six agents + team lead, designed for maximum parallel execution with a dedicated video pipeline.

| Agent | Role | Workstream |
|-------|------|------------|
| **lead** | Orchestrator | Scaffolding, video preprocessing, conflict resolution, integration, final review |
| **foundation** | Design system engineer | CSS, fonts, all reusable components |
| **data** | Content & data engineer | TypeScript data files, MDX pipeline, content writing |
| **pages-alpha** | Page builder A | Home, About, Work, Contact pages |
| **pages-beta** | Page builder B | Projects, Project detail, Golf, Blog, Blog post pages |
| **interactive** | Animation & interaction engineer | Swing scrub component, terminal, Framer Motion, hover states |

---

## Phase 0: Scaffolding + Video Pipeline (lead — sequential, blocks everything)

- [x] 0.1 Initialize Next.js 14+ project with App Router, TypeScript, Tailwind CSS, and ESLint
- [x] 0.2 Configure static export (`output: 'export'`) for Render deployment
- [x] 0.3 Set up project directory structure:
  ```
  src/app/, src/components/ui/, src/components/layout/, src/components/sections/,
  src/components/interactive/, src/content/blog/, src/data/, src/lib/, src/styles/,
  public/frames/, public/images/projects/, public/images/golf/, public/videos/
  ```
- [x] 0.4 Install all dependencies: framer-motion, next-mdx-remote, rehype-pretty-code, gray-matter, @next/font (or next/font)
- [x] 0.5 Configure Tailwind with custom dark theme tokens per design.md:
  - Colors: bg `#0a0a0a`/`#111111`/`#1a1a1a`, text `#fafafa`/`#a1a1aa`/`#71717a`, accent `#10b981`/`#3b82f6`, border `#27272a`
  - Font families: sans (Inter/Geist Sans), mono (JetBrains Mono/Geist Mono)
  - Extend spacing, border-radius, and animation timings
- [x] 0.6 Create `src/styles/globals.css` with CSS custom properties, Tailwind directives, base dark theme styles, and fluid typography clamp() scale
- [x] 0.7 Create placeholder `src/app/layout.tsx` root layout with font loading, metadata, and body styling
- [x] 0.8 **Video preprocessing pipeline**: Process `IMG_2791.MOV` for scroll-linked scrub:
  - Trim to swing segment (~3-4 seconds: address → impact → follow-through) using ffmpeg
  - Extract ~100 frames as WebP at 1080p resolution into `public/frames/swing/`
  - Name sequentially: `frame-001.webp` through `frame-100.webp`
  - Generate a blurred placeholder from frame 1 for loading state
  - Verify total frame payload is under 4MB
  - Create `src/data/swing-frames.ts` with frame count and path constants

**Blocks**: Phase 1 (all agents wait for scaffolding + frames)

---

## Phase 1: Foundation + Data (parallel — 2 agents)

### foundation agent — Design System & Components
Owns: `src/components/**`, `src/styles/**`

- [x] 1.1 Build primitive UI components in `src/components/ui/`:
  - Button (primary, secondary, ghost variants)
  - Badge/Tag (for tech stack labels)
  - Card (dark surface with border, hover-ready)
  - SectionContainer (max-width wrapper with consistent padding)
  - Divider (subtle horizontal rule)
- [x] 1.2 Build layout components in `src/components/layout/`:
  - Header: site name/logo, nav links, mobile hamburger menu with open/close animation
  - Footer: social links, copyright, minimal design
  - PageLayout: wraps page content with Header + Footer + consistent spacing
- [x] 1.3 Build content components in `src/components/sections/`:
  - TimelineEntry: for work experience (date range, role, org, bullets)
  - ProjectCardFeatured: large card with image, title, description, tech tags, links
  - ProjectCardCompact: small grid card with title, brief description, tech tags
  - GolfStatCard: for golf achievements/stats display
  - BlogPostPreview: title, date, excerpt, tags
- [x] 1.4 Build MDX components in `src/components/mdx/`:
  - Custom heading styles (h1-h4)
  - Code block wrapper (integrates with rehype-pretty-code theme)
  - Callout/note component
  - Image with caption
- [x] 1.5 Verify all components render correctly and are responsive (375px, 768px, 1440px)

**Blocks**: Phase 2 (pages-alpha, pages-beta need components)

### data agent — Content Data Layer & Written Content
Owns: `src/data/**`, `src/content/**`, `src/lib/**`

- [x] 1.6 Create `src/data/projects.ts`: TypeScript interface (`Project`) and populate ALL projects from resume. Mark featured: Brama AI, GUARD-AI, Coffee Chats, Real-time Earnings Pipeline, WhisperChain+. Include: slug, title, description, longDescription, techStack[], featured, links {github?, live?, paper?}, date, category
- [x] 1.7 Create `src/data/experience.ts`: TypeScript interface (`Experience`) and populate: Keyfactor (AI/ML Intern), Stealth Startup (AI Engineer — keep company unnamed, list as "Stealth Startup"), SEE Lab Dartmouth (AI Researcher), Brama AI (Founder), Trivariate Research (Quant/AI Intern), JPMorgan (Software Engineer). Include: role, org, dateRange, description, bullets[], current
- [x] 1.8 Create `src/data/golf.ts`: TypeScript interface (`GolfData`) with sections for: athleticBio (D1 Dartmouth narrative), achievements (AJGA Scholastic All American, 2021 Junior Olympian, Alister Mackenzie Invitational, Cornell v Dartmouth individual win), and swingVideos (paths to video files in public/videos/). No detailed results table — focus on highlights and narrative.
- [x] 1.9 Create `src/data/navigation.ts`: nav links config, social links config (LinkedIn, GitHub, email)
- [x] 1.10 Set up MDX pipeline in `src/lib/mdx.ts`:
  - Function to get all blog posts (read content/blog/ directory, parse frontmatter)
  - Function to get single post by slug
  - Configure rehype-pretty-code with dark theme matching site palette
  - Configure gray-matter for frontmatter parsing
- [x] 1.11 Create sample blog post `src/content/blog/hello-world.mdx` with frontmatter (title, date, excerpt, tags) and sample content demonstrating code blocks, headings, and formatting
- [x] 1.12 Write About page narrative content in `src/data/about.ts` or as MDX: the story of golf + AI, education at Dartmouth (CS + Econ, 3.59 GPA, intended MS), how athletic discipline translates to engineering rigor. NOT a resume — a story.
- [x] 1.13 Write featured project long descriptions for detail pages (each ~150-200 words covering what, why, how, results)

**Blocks**: Phase 2 (pages-alpha, pages-beta need data)

---

## Phase 2: Pages + Interactions (parallel — 3 agents)

All three agents run simultaneously. Page agents own non-overlapping route files and READ from shared components/ and data/. The interactive agent owns components/interactive/ and writes no route files until integration.

### pages-alpha agent — Home, About, Work, Contact
Owns: `src/app/page.tsx`, `src/app/about/`, `src/app/work/`, `src/app/contact/`

- [x] 2.1 Build Home page (`src/app/page.tsx`):
  - Swing scrub zone: sticky container div with `id="swing-canvas"` placeholder (~150vh scroll height), blurred first-frame background as initial state
  - Below swing zone: Cameron Keith name (large type), dual-identity tagline ("D1 Golfer. AI Engineer. Building at the intersection.")
  - Terminal placeholder div with `id="terminal"` for Phase 2 interactive agent integration
  - Quick-link cards to Projects, Golf, Blog
  - Featured highlights strip (latest project, latest blog post — pull from data files)
- [x] 2.2 Build About page (`src/app/about/page.tsx`):
  - Narrative bio section using content from data/about.ts
  - Education section: Dartmouth BA CS + Economics, intended MS in CS
  - Key achievements in a grid/list: Citations of Merit, awards, GPA
  - Photo placeholder section
- [x] 2.3 Build Work page (`src/app/work/page.tsx`):
  - Section header with brief intro
  - Timeline of experience entries using TimelineEntry component, pulling from data/experience.ts
  - Visual distinction for current roles vs past roles
  - Research section highlighting IEEE S&P and NeurIPS submissions
- [x] 2.4 Build Contact page (`src/app/contact/page.tsx`):
  - Clean layout with email (cameron.s.keith.26@dartmouth.edu), LinkedIn, GitHub links
  - Social link cards with icons
  - No contact form — direct links only
  - Brief "Let's connect" message

### pages-beta agent — Projects, Golf, Blog
Owns: `src/app/projects/`, `src/app/golf/`, `src/app/blog/`

- [x] 2.5 Build Projects page (`src/app/projects/page.tsx`):
  - Featured tier: 5 large ProjectCardFeatured cards arranged in a grid (2-col on desktop)
  - Archive tier: compact grid of all other projects using ProjectCardCompact
  - Tech stack filter/tags for archive (optional — can be static categories)
  - Pull all data from data/projects.ts
- [x] 2.6 Build Project detail page (`src/app/projects/[slug]/page.tsx`):
  - Hero with project title, date, tech stack badges
  - Long description content
  - Links to live site, GitHub, paper (where available)
  - Image/screenshot section (placeholder if no images yet)
  - "Back to projects" navigation
  - `generateStaticParams()` for static export
- [x] 2.7 Build Golf page (`src/app/golf/page.tsx`):
  - Athletic bio section (D1 Dartmouth, AJGA background narrative)
  - Swing video section: embedded video player for current swing footage
  - Achievement highlights: AJGA Scholastic All American, 2021 Junior Olympian, Alister Mackenzie Invitational (led team), Cornell v Dartmouth (individual win)
  - No results table — narrative + achievements focus
  - Pull from data/golf.ts
- [x] 2.8 Build Blog listing page (`src/app/blog/page.tsx`):
  - List of blog posts sorted by date (newest first) using BlogPostPreview component
  - Each entry: title, date (monospace), excerpt, tags as badges
  - Pull from MDX pipeline (lib/mdx.ts)
- [x] 2.9 Build Blog post page (`src/app/blog/[slug]/page.tsx`):
  - Post header: title, date, tags, estimated read time
  - MDX-rendered content with custom components (code highlighting, headings, callouts)
  - "Back to blog" navigation
  - `generateStaticParams()` for static export

### interactive agent — Swing Scrub, Terminal, Animations
Owns: `src/components/interactive/`, `src/lib/scroll-utils.ts`

- [x] 2.10 Build scroll-linked swing scrub component (`src/components/interactive/SwingCanvas.tsx`):
  - Canvas element that draws preloaded swing frames based on scroll position
  - Preload all frames from `public/frames/swing/` on mount using `Image()` objects
  - Calculate current frame: `Math.floor((scrollProgress) * (totalFrames - 1))`
  - Use `requestAnimationFrame` for smooth rendering, throttled scroll handler
  - Sticky positioning within the scroll zone container
  - Fade-out transition when scroll exits the swing zone
  - Show blurred placeholder until frames are loaded
- [x] 2.11 Build frame preloader utility (`src/lib/frame-preloader.ts`):
  - Preloads all WebP frame images as `HTMLImageElement` objects
  - Reports loading progress (for potential progress indicator)
  - Resolves when all frames are cached and ready
- [x] 2.12 Build interactive terminal component (`src/components/interactive/Terminal.tsx`):
  - Visual: dark card with monospace font, terminal prompt (`$ >`), blinking cursor (CSS animation)
  - Auto-types intro when scrolled into view: "cameron keith — d1 golfer / ai engineer / dartmouth '26"
  - Supports typed commands: `help`, `about`, `projects`, `golf`, `contact` with relevant responses
  - Realistic typing speed with variance (~50-100ms per char), pause between lines
  - User keyboard input when focused
- [x] 2.13 Create scroll reveal utility (`src/components/interactive/ScrollReveal.tsx`):
  - Framer Motion wrapper component (InView trigger)
  - Fade-up animation: opacity 0→1, translateY 20px→0, ~400ms ease-out
  - Configurable delay prop for staggered reveals
- [x] 2.14 Implement prefers-reduced-motion detection:
  - CSS media query for base styles
  - Framer Motion `useReducedMotion` hook integration
  - When enabled: disable swing scrub (show static frame), disable terminal auto-type (show static text), simplify all reveals to instant

---

## Phase 3: Integration & Polish (parallel — 2 agents)

### interactive agent (integration) — Wire Up Interactive Elements
Owns: Integration of interactive components into page files

- [x] 3.1 Integrate SwingCanvas into Home page: replace placeholder in `src/app/page.tsx` with actual component, configure scroll zone height, ensure proper z-indexing with content below
- [x] 3.2 Integrate Terminal into Home page: replace placeholder, position below swing hero section
- [x] 3.3 Wrap all page sections with ScrollReveal: cards, timeline entries, section headings, project grids
- [x] 3.4 Implement hover states across site:
  - Project cards: subtle scale(1.02) + border glow on hover
  - Nav links: animated underline (width 0→100%)
  - Buttons: background color shift + subtle shadow
  - Cards: border-color transition to accent green
- [x] 3.5 Add page transition animations (Framer Motion AnimatePresence in root layout or template.tsx)

### lead agent (quality) — SEO, Meta, Testing, Final Review
Owns: metadata, testing, final integration

- [x] 3.6 Add metadata and OpenGraph tags to all pages via Next.js Metadata API:
  - Each page: title, description, og:title, og:description, og:image
  - Root layout: site-wide defaults, twitter:card, theme-color
- [x] 3.7 Add favicon (dark-themed) and `manifest.json`
- [x] 3.8 Build 404 page (`src/app/not-found.tsx`) with navigation back to home
- [x] 3.9 Verify static export builds successfully (`next build` produces working `out/` directory)
- [x] 3.10 Run Lighthouse audit on built static files — target 95+ desktop, 90+ mobile
- [x] 3.11 Test responsive behavior: 375px (mobile), 768px (tablet), 1440px (desktop) across all pages
- [x] 3.12 Cross-browser check: Chrome, Safari, Firefox — verify layout, animations, and swing scrub
- [x] 3.13 Final content review: proofread all text, verify all links work, check image loading
- [x] 3.14 Verify all `generateStaticParams()` functions produce correct slugs for projects and blog posts
- [x] 3.15 Test swing scrub performance: verify frame loading < 3s on broadband, smooth scrub at 60fps, proper mobile fallback

---

## Execution Timeline

```
Phase 0 ──── lead scaffolds project + processes swing video frames
              │
Phase 1 ──── foundation (components)  ─────────────┐
         ├── data (data files + content) ───────────┤
              │                                      │
Phase 2 ──── pages-alpha (Home/About/Work/Contact) ─┤
         ├── pages-beta (Projects/Golf/Blog) ────────┤
         ├── interactive (SwingCanvas/Terminal/anims) ┤
              │                                       │
Phase 3 ──── interactive (integration + hover) ──────┤
         ├── lead (SEO + testing + final review) ────┘
```

**Peak parallelism**: 3 agents in Phase 2
**Critical path**: Phase 0 → Phase 1 (foundation) → Phase 2 (pages + interactive) → Phase 3 (integration + polish)
**Key optimization**: The interactive agent builds SwingCanvas and Terminal components in Phase 2 concurrently with page builders, then integrates them in Phase 3 — avoiding serialization of the most complex components behind page completion.
