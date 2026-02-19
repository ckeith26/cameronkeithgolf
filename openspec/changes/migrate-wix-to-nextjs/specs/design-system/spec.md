## ADDED Requirements

### Requirement: Dark Technical Aesthetic
The site SHALL use a dark color scheme as the primary (and initially only) theme, with near-black backgrounds (#0a0a0a), subtle surface elevation (#111111, #1a1a1a), high-contrast text (#fafafa primary, #a1a1aa secondary), and an emerald green accent (#10b981) that bridges golf and terminal aesthetics.

#### Scenario: Visual identity consistency
- **WHEN** any page is rendered
- **THEN** the color palette, typography, and spacing follow the defined design system tokens consistently

#### Scenario: Dark backgrounds with proper contrast
- **WHEN** text is rendered on any surface
- **THEN** the contrast ratio meets WCAG AA standards (4.5:1 for body text, 3:1 for large text)

### Requirement: Typography System
The site SHALL use a three-tier typography system: a clean sans-serif for headings and body (Inter or Geist Sans), a monospace font for code and technical accents (JetBrains Mono or Geist Mono), and fluid responsive sizing using clamp() functions.

#### Scenario: Monospace accents signal technical identity
- **WHEN** technical labels, code snippets, dates, or metadata are displayed
- **THEN** they use the monospace typeface to reinforce the engineering aesthetic

#### Scenario: Typography scales responsively
- **WHEN** the viewport changes from mobile to desktop
- **THEN** font sizes scale fluidly without breakpoint jumps

### Requirement: Component Library
The site SHALL include reusable UI components: Button, Card, Badge/Tag, Section container, Timeline entry, Project card (featured and compact variants), and Navigation. Components SHALL be built with Tailwind CSS and accept variants via props.

#### Scenario: Consistent component usage
- **WHEN** a project card appears on the projects page
- **THEN** it uses the same ProjectCard component with consistent padding, border radius, hover state, and typography

### Requirement: Responsive Layout
The site SHALL be fully responsive across mobile (320px+), tablet (768px+), and desktop (1024px+) viewports. Content max-width SHALL be 1200px, centered with generous side padding.

#### Scenario: Mobile layout
- **WHEN** viewed on a 375px-wide viewport
- **THEN** all content is readable, navigation is accessible via hamburger menu, and no horizontal scroll occurs

#### Scenario: Desktop layout
- **WHEN** viewed on a 1440px-wide viewport
- **THEN** content is centered with comfortable margins, and multi-column layouts are used where appropriate (e.g., project grid, experience timeline)
