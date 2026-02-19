## ADDED Requirements

### Requirement: Page Structure and Routing
The site SHALL provide seven top-level pages accessible via the main navigation: Home (/), About (/about), Work (/work), Projects (/projects), Golf (/golf), Blog (/blog), and Contact (/contact).

#### Scenario: User navigates to home page
- **WHEN** a visitor loads the root URL
- **THEN** they see a hero section with Cameron's name, a dual-identity tagline (athlete + engineer), and clear navigation to all sections

#### Scenario: User navigates to a project detail page
- **WHEN** a visitor clicks on a featured project from /projects
- **THEN** they are routed to /projects/[slug] with a detailed project page including description, tech stack, links, and visuals

#### Scenario: User navigates to a blog post
- **WHEN** a visitor clicks on a blog post from /blog
- **THEN** they are routed to /blog/[slug] with the full MDX-rendered post content

### Requirement: Navigation System
The site SHALL provide a persistent header navigation with the site name/logo and links to all top-level pages, plus a mobile-responsive hamburger menu.

#### Scenario: Desktop navigation
- **WHEN** the viewport is 768px or wider
- **THEN** all navigation links are visible in the header bar

#### Scenario: Mobile navigation
- **WHEN** the viewport is narrower than 768px
- **THEN** navigation links are accessible via a hamburger menu with smooth open/close animation

### Requirement: Home Page
The home page SHALL serve as the primary landing experience, establishing Cameron's dual identity as a D1 athlete and AI engineer. It SHALL include a hero section, a brief value proposition, quick-link cards to key sections (Projects, Golf, Blog), and featured highlights.

#### Scenario: First-time visitor landing
- **WHEN** a new visitor loads the home page
- **THEN** within 3 seconds of visual content they understand: Cameron is a Dartmouth D1 golfer who builds AI systems

### Requirement: About Page
The about page SHALL present Cameron's full narrative including education (Dartmouth CS + Economics, intended MS), the intersection of golf and technology, and personal background. It SHALL NOT read as a resume — it tells the story.

#### Scenario: Visitor reads about page
- **WHEN** a visitor navigates to /about
- **THEN** they see a narrative bio, education details, key achievements, and the story of how golf discipline translates to engineering rigor

### Requirement: Work and Research Page
The work page SHALL display professional experience and research in a timeline or card-based layout. Each entry SHALL include role title, organization, date range, and key accomplishments.

#### Scenario: Visitor views professional experience
- **WHEN** a visitor navigates to /work
- **THEN** they see entries for Keyfactor, Stealth Startup (unnamed — listed as "Stealth Startup"), SEE Lab (Dartmouth), Brama AI, Trivariate Research, and JPMorgan with descriptions and dates

### Requirement: Projects Page with Tiered Display
The projects page SHALL present work in two tiers: 4-5 featured projects displayed as large, detailed cards with descriptions, tech stacks, and links; and a compact grid/list of all other projects below.

#### Scenario: Visitor views featured projects
- **WHEN** a visitor navigates to /projects
- **THEN** they see featured projects (e.g., Brama AI, GUARD-AI, Coffee Chats, Earnings Pipeline, WhisperChain+) displayed prominently with images/visuals, descriptions, tech tags, and links

#### Scenario: Visitor browses project archive
- **WHEN** a visitor scrolls past featured projects on /projects
- **THEN** they see a compact grid of additional projects with titles, brief descriptions, and tech tags

### Requirement: Golf Page
The golf page SHALL present Cameron's athletic profile at the D1 collegiate level, including swing footage, competitive results, and schedule. Content SHALL be presented with the same design quality as the technical sections.

#### Scenario: Visitor views golf profile
- **WHEN** a visitor navigates to /golf
- **THEN** they see an athletic bio (D1 Dartmouth, AJGA background), swing footage (embedded video), achievement highlights (AJGA Scholastic All American, 2021 Junior Olympian, individual wins), and an athletic narrative — no detailed results table

### Requirement: Blog Page
The blog page SHALL display a chronological list of posts with titles, dates, excerpts, and tags. Posts SHALL be authored in MDX and support code syntax highlighting, LaTeX, and custom React components.

#### Scenario: Visitor browses blog
- **WHEN** a visitor navigates to /blog
- **THEN** they see a list of blog posts sorted by date (newest first) with title, date, excerpt, and tags

### Requirement: Contact Page
The contact page SHALL provide clear ways to reach Cameron via email and social links (LinkedIn, GitHub). There SHALL be no contact form — direct links only.

#### Scenario: Visitor wants to reach out
- **WHEN** a visitor navigates to /contact
- **THEN** they see Cameron's email address and social profile links (LinkedIn, GitHub) with a brief "Let's connect" message
