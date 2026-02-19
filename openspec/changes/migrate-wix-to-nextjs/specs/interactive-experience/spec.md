## ADDED Requirements

### Requirement: Scroll-Linked Swing Video Scrub
The home page hero SHALL feature a scroll-linked video scrub of Cameron's real golf swing. The swing video (sourced from 4K/60fps footage) SHALL be decomposed into an image sequence and rendered frame-by-frame on a canvas element, with the current frame determined by the user's scroll position. The swing SHALL occupy a dedicated scroll zone (~150vh) in a sticky container, and content sections SHALL be revealed after the swing completes.

#### Scenario: User scrolls through swing on desktop
- **WHEN** a visitor scrolls through the hero section on a desktop viewport
- **THEN** the swing video plays forward frame-by-frame in sync with scroll position, completing the full swing arc (address → backswing → impact → follow-through) across the scroll zone

#### Scenario: User scrolls back up
- **WHEN** a visitor scrolls back up within the swing zone
- **THEN** the swing reverses smoothly, frame-by-frame, matching the upward scroll

#### Scenario: Swing completes and content is revealed
- **WHEN** the visitor scrolls past the end of the swing zone
- **THEN** the sticky canvas fades out and the main content sections below are revealed

#### Scenario: Mobile fallback
- **WHEN** the viewport is narrower than 768px or the user has prefers-reduced-motion enabled
- **THEN** the scroll-linked scrub is replaced with a static hero image (first frame or key impact frame) and the full swing video is available as a normal player on the Golf page

#### Scenario: Loading state
- **WHEN** frames are still being preloaded
- **THEN** a blurred first-frame placeholder is shown until enough frames are loaded for smooth playback

### Requirement: Interactive Terminal Component
The home page SHALL include a stylized terminal component below the swing hero that auto-types a brief introduction and responds to predefined commands. The terminal SHALL use monospace font, dark card styling, a blinking cursor, and realistic typing cadence.

#### Scenario: Terminal auto-types on scroll into view
- **WHEN** the terminal component enters the viewport
- **THEN** it auto-types an introduction (name, current roles) with realistic typing speed (~50-100ms per character with variance) and a blinking cursor

#### Scenario: Visitor types a command
- **WHEN** a visitor focuses the terminal and types a recognized command (help, about, projects, golf, contact)
- **THEN** the terminal displays a relevant response with the same typing animation

### Requirement: Page Transitions and Scroll Animations
The site SHALL use Framer Motion for smooth page transitions and scroll-triggered reveal animations. Elements SHALL animate in as they enter the viewport (fade-up, subtle scale). Animations SHALL be performant and respect prefers-reduced-motion.

#### Scenario: Scroll-triggered content reveal
- **WHEN** a section enters the viewport during scroll
- **THEN** its content animates in with a subtle fade-up effect (opacity 0→1, translateY 20px→0, ~400ms ease-out)

#### Scenario: User prefers reduced motion
- **WHEN** the user's OS has prefers-reduced-motion enabled
- **THEN** all non-essential animations are disabled or reduced to simple opacity fades

### Requirement: Interactive Hover States
All interactive elements (links, cards, buttons, navigation items) SHALL have clear hover states that provide visual feedback. Project cards SHALL have a subtle lift/glow effect on hover.

#### Scenario: Project card hover
- **WHEN** a user hovers over a project card
- **THEN** the card subtly elevates (shadow or border glow) and the title color shifts to the accent color

### Requirement: Performance Standards
The site SHALL achieve a Lighthouse performance score of 95+ on desktop and 90+ on mobile. Total JavaScript bundle size for initial page load SHALL be under 200KB gzipped. All images SHALL use modern formats (WebP/AVIF) with responsive srcset. The swing image sequence SHALL total under 4MB and use WebP compression.

#### Scenario: Fast initial load
- **WHEN** a visitor loads any page on a 4G connection
- **THEN** First Contentful Paint occurs within 1.5 seconds and Largest Contentful Paint within 2.5 seconds

#### Scenario: Swing frames load efficiently
- **WHEN** the home page loads on a typical broadband connection
- **THEN** all swing frames are preloaded within 3 seconds, allowing smooth scroll scrubbing without stutter
