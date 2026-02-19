# Change: Migrate Wix site to self-hosted Next.js personal brand platform

## Why

The current Wix site (cameronkeithgolf.com) is frozen as a junior golf recruiting portfolio from 2022. It doesn't represent Cameron's evolved identity: a Dartmouth D1 athlete who is simultaneously an AI researcher (NeurIPS, IEEE S&P), startup founder (Brama AI), and ML engineer shipping production systems. The site undersells dramatically and uses a platform that limits technical expression. A self-hosted Next.js site built with engineering rigor will authentically represent someone who builds real systems — not a template-user, but someone whose website itself demonstrates craft.

## What Changes

- **BREAKING**: Complete platform migration from Wix to Next.js (App Router) deployed on Render
- Replace 8 Wix pages with a restructured 7-page architecture designed for mixed audiences
- Introduce dark/technical aesthetic (Vercel/Raycast-inspired) with monospace accents
- Elevate golf and AI/engineering as co-equal brand pillars (the athlete-engineer duality)
- Add tiered project showcase (featured heroes + compact archive)
- Add MDX-powered blog/writing section for research summaries and technical writing
- Add polished animations (Framer Motion) with 1-2 standout interactive technical moments
- Design system built for maintainability: Tailwind CSS, component library, dark mode

## Impact

- Affected specs: site-architecture, design-system, interactive-experience, content-management (all new)
- Affected code: Entire codebase — greenfield Next.js project
- Domain: cameronkeithgolf.com (user handles Render deployment)
- Content migration: Swing videos and putting highlights preserved; tournament data curated for D1 era

## Audience Matrix

| Section | Primary Audience | Goal |
|---------|-----------------|------|
| Home / Hero | Everyone | Immediate dual-identity positioning |
| About | Recruiters, VCs, general | Full narrative — who, why, trajectory |
| Work & Research | Tech recruiters, hiring managers | Professional credibility and depth |
| Projects | Engineers, technical recruiters | Proof of craft — real systems, real results |
| Golf | Athletic community, sponsors, general | Competitive legitimacy at the highest level |
| Blog | Peers, technical community | Thought leadership, research dissemination |
| Contact | All | Clear path to reach out |
