"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { ScrollSection } from "./ScrollSection";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { ScrollReveal } from "./ScrollReveal";
import { Terminal } from "./Terminal";
import { TimelineEntry } from "@/components/sections/TimelineEntry";
import { ProjectCardFeatured } from "@/components/sections/ProjectCardFeatured";
import { GolfStatCard } from "@/components/sections/GolfStatCard";

import { aboutContent } from "@/data/about";
import { experiences } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import { golfData } from "@/data/golf";
import { socialLinks } from "@/data/navigation";

/* ── Helpers ─────────────────────────────────── */

function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-8 inline-flex items-center gap-1 font-mono text-sm text-accent transition-colors hover:text-foreground"
    >
      {children}
      <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
    </Link>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "x":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Hero letter animation ───────────────────── */

const nameLetters = "Cameron Keith".split("");

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

/* ── Component ───────────────────────────────── */

export function HomePageClient() {
  const prefersReducedMotion = useReducedMotion();

  const currentExperiences = experiences.filter((e) => e.current).slice(0, 3);
  const highlighted = featuredProjects.slice(0, 2);
  const topAchievements = golfData.achievements.slice(0, 4);
  const golfTagline = golfData.athleticBio.split(".")[0] + ".";
  const storyExcerpt = aboutContent.sections[0].body.split(". ").slice(0, 2).join(". ") + ".";

  return (
    <>
      <ScrollProgressBar />

      {/* ── 1. Hero ── */}
      <ScrollSection
        id="hero"
        fullHeight
        parallax
        className="flex items-center justify-center"
      >
        <div className="text-center mx-auto">
          {prefersReducedMotion ? (
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Cameron Keith
            </h1>
          ) : (
            <motion.h1
              className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {nameLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  className="inline-block"
                  style={letter === " " ? { width: "0.3em" } : undefined}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h1>
          )}

          <motion.p
            className="mt-4 max-w-xl mx-auto text-lg text-foreground-muted"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            D1 Golfer. AI Engineer. Building at the intersection.
          </motion.p>

          <motion.p
            className="mt-4 max-w-2xl mx-auto text-base leading-relaxed text-foreground-muted"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            I am a Dartmouth student-athlete, AI researcher, and startup founder
            turning the discipline of competitive golf into engineering that
            matters.
          </motion.p>

        </div>

        {/* Scroll indicator - centered bouncing arrow */}
        {!prefersReducedMotion && (
          <motion.button
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer bg-transparent border-none p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            onClick={() => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Scroll to next section"
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground-subtle"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </motion.button>
        )}
      </ScrollSection>

      {/* ── 2. Terminal ── */}
      <ScrollSection
        id="terminal"
        className="py-24"
      >
        <Terminal />
      </ScrollSection>

      {/* ── 3. Story Teaser ── */}
      <ScrollSection
        id="story"
        className="py-24"
        parallax
      >
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            {aboutContent.headline}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground-muted">
            {aboutContent.intro}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground-muted">
            {storyExcerpt}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <SectionLink href="/about">Read the full story</SectionLink>
        </ScrollReveal>
      </ScrollSection>

      {/* ── 4. Experience Highlights ── */}
      <ScrollSection
        id="experience"
        className="py-24"
      >
        <ScrollReveal>
          <h2 className="mb-8 text-2xl font-semibold text-foreground sm:text-3xl">
            Experience
          </h2>
        </ScrollReveal>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border" />
          {currentExperiences.map((exp, i) => (
            <ScrollReveal key={`${exp.org}-${exp.role}`} delay={i * 0.1}>
              <TimelineEntry
                role={exp.role}
                org={exp.org}
                dateRange={exp.dateRange}
                description={exp.description}
                bullets={exp.bullets.slice(0, 1)}
                current={exp.current}
              />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.3}>
          <SectionLink href="/work">View full timeline</SectionLink>
        </ScrollReveal>
      </ScrollSection>

      {/* ── 5. Featured Projects ── */}
      <ScrollSection
        id="projects"
        className="py-24"
      >
        <ScrollReveal>
          <h2 className="mb-8 text-2xl font-semibold text-foreground sm:text-3xl">
            Featured Work
          </h2>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-2">
          {highlighted.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.1}>
              <ProjectCardFeatured
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                links={project.links}
                slug={project.slug}
                date={project.date}
              />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.2}>
          <SectionLink href="/projects">See all projects</SectionLink>
        </ScrollReveal>
      </ScrollSection>

      {/* ── 6. Golf Achievements ── */}
      <ScrollSection
        id="golf"
        className="py-24"
      >
        <ScrollReveal>
          <h2 className="mb-2 text-2xl font-semibold text-foreground sm:text-3xl">
            Golf
          </h2>
          <p className="mb-8 max-w-2xl text-base text-foreground-muted">
            {golfTagline}
          </p>
        </ScrollReveal>
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {topAchievements.map((achievement, index) => (
            <ScrollReveal key={achievement.title} delay={index * 0.1} className="h-full">
              <GolfStatCard
                label={achievement.title}
                value={achievement.year}
                description={achievement.description}
                {...(achievement.title === "NCAA D1 Varsity Golf" && {
                  logo: "/dartmouth-big-green.svg",
                  href: "https://dartmouthsports.com/sports/mens-golf/roster/cameron-keith/40950",
                })}
              />
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.4}>
          <SectionLink href="/golf">Full golf career</SectionLink>
        </ScrollReveal>
      </ScrollSection>

      {/* ── 7. Contact CTA ── */}
      <ScrollSection
        id="contact"
        className="py-24"
      >
        <ScrollReveal>
          <div className="relative text-center">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Let&apos;s Connect
            </h2>
            <a
              href="mailto:cameron.s.keith.26@dartmouth.edu"
              className="mt-4 block font-mono text-lg text-accent transition-colors hover:text-foreground"
            >
              cameron.s.keith.26@dartmouth.edu
            </a>

            {/* Social links */}
            <div className="mt-8 flex items-center justify-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.icon !== "mail" ? "_blank" : undefined}
                  rel={link.icon !== "mail" ? "noopener noreferrer" : undefined}
                  className="text-foreground-subtle transition-all hover:text-accent hover:scale-110"
                  aria-label={link.label}
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>

            {/* Resume */}
            <a
              href="/cameron-keith-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 font-mono text-sm text-foreground-muted transition-all hover:border-accent hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Resume
            </a>
          </div>
        </ScrollReveal>
      </ScrollSection>
    </>
  );
}
