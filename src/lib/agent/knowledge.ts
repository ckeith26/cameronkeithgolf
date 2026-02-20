import { projects } from "@/data/projects";
import { aboutContent } from "@/data/about";
import { experiences, education } from "@/data/experience";
import { golfData } from "@/data/golf";
import { coursework } from "@/data/coursework";
import { socialLinks } from "@/data/navigation";

export function getKnowledge(topic: string): string {
  switch (topic) {
    case "about":
      return formatAbout();
    case "projects":
      return formatProjects();
    case "experience":
      return formatExperience();
    case "golf":
      return formatGolf();
    case "coursework":
      return formatCoursework();
    case "contact":
      return formatContact();
    default:
      return "Topic not found. Available topics: about, projects, experience, golf, coursework, contact";
  }
}

function formatAbout(): string {
  const sections = aboutContent.sections
    .map((s) => `${s.heading}: ${s.body}`)
    .join("\n\n");

  return [
    `# About Cameron Keith`,
    aboutContent.headline,
    aboutContent.intro,
    sections,
    `Interests: ${aboutContent.interests.join(", ")}`,
  ].join("\n\n");
}

function formatProjects(): string {
  const featured = projects
    .filter((p) => p.featured)
    .map(
      (p) =>
        `- ${p.title} [slug: ${p.slug}] (${p.date}): ${p.description}\n  Tech: ${p.techStack.join(", ")}\n  Page: /projects/${p.slug}`
    )
    .join("\n");

  const archive = projects
    .filter((p) => !p.featured)
    .map((p) => `- ${p.title} [slug: ${p.slug}] (${p.date}): ${p.description}\n  Page: /projects/${p.slug}`)
    .join("\n");

  return `# Cameron's Projects\n\n## Featured Projects\n${featured}\n\n## Other Projects\n${archive}`;
}

function formatExperience(): string {
  const expStr = experiences
    .map(
      (e) =>
        `- ${e.role} at ${e.org} (${e.dateRange})${e.current ? " [Current]" : ""}\n  ${e.description}\n${e.bullets.map((b) => `  - ${b}`).join("\n")}`
    )
    .join("\n\n");

  const citations = education.citations
    .map((c) => `  - ${c.course} (${c.term}): ${c.description}`)
    .join("\n");

  const eduStr = [
    `${education.school} - ${education.degree}`,
    `GPA: ${education.gpa} | ${education.dateRange}`,
    `Intended: ${education.intendedGrad}`,
    `High School: ${education.highSchool.name}, ${education.highSchool.location} (${education.highSchool.year})`,
    `\nCitations for Meritorious Performance:\n${citations}`,
  ].join("\n");

  return `# Experience\n\n${expStr}\n\n# Education\n${eduStr}`;
}

function formatGolf(): string {
  const achievements = golfData.achievements
    .map((a) => `- ${a.title} (${a.year}): ${a.description}`)
    .join("\n");

  return `# Golf Career\n\n${golfData.athleticBio}\n\n## Achievements\n${achievements}`;
}

function formatCoursework(): string {
  const categories = coursework
    .map((cat) => {
      const courses = cat.courses
        .map((c) => `  - ${c.code}: ${c.title} (${c.term})`)
        .join("\n");
      return `## ${cat.label}\n${courses}`;
    })
    .join("\n\n");

  return `# Coursework at Dartmouth\n\n${categories}`;
}

function formatContact(): string {
  const links = socialLinks
    .map((s) => `- ${s.label}: ${s.href}${s.handle ? ` (${s.handle})` : ""}`)
    .join("\n");

  return `# Contact Information\n\n${links}\n\nResume: Available at /cameron-keith-resume.pdf`;
}
