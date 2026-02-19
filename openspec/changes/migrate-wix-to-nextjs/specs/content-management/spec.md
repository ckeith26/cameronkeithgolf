## ADDED Requirements

### Requirement: MDX Blog System
The site SHALL support blog posts authored as MDX files in a content/blog/ directory. Each MDX file SHALL include frontmatter (title, date, excerpt, tags) and support embedded React components, code blocks with syntax highlighting, and LaTeX rendering.

#### Scenario: New blog post creation
- **WHEN** Cameron creates a new .mdx file in content/blog/ with valid frontmatter
- **THEN** the post automatically appears on /blog and is accessible at /blog/[slug] after rebuild

#### Scenario: Code syntax highlighting in blog
- **WHEN** a blog post contains a fenced code block with a language identifier
- **THEN** it renders with syntax highlighting matching the dark theme

### Requirement: Structured Project Data
The site SHALL store project data in a TypeScript data file (data/projects.ts) with typed fields: slug, title, description, longDescription, techStack (string[]), featured (boolean), links (github, live, paper), image, and date.

#### Scenario: Adding a new featured project
- **WHEN** Cameron adds a new entry to data/projects.ts with featured: true
- **THEN** the project appears in the featured tier on /projects after rebuild

#### Scenario: Project data type safety
- **WHEN** a project entry is missing a required field
- **THEN** TypeScript compilation fails with a clear error indicating the missing field

### Requirement: Experience and Golf Data Files
The site SHALL store professional experience in data/experience.ts and golf results/stats in data/golf.ts as typed TypeScript arrays. These files serve as the single source of truth for their respective pages.

#### Scenario: Updating golf results
- **WHEN** Cameron adds a new tournament result to data/golf.ts
- **THEN** the result appears on /golf in the correct chronological position after rebuild

### Requirement: Static Asset Management
The site SHALL store images, videos, and other media in the public/ directory organized by category (public/images/projects/, public/images/golf/, public/videos/). All images SHALL have optimized versions generated at build time.

#### Scenario: Project screenshot display
- **WHEN** a project references an image path in its data
- **THEN** the image loads with proper dimensions, lazy loading for below-fold content, and blur placeholder
