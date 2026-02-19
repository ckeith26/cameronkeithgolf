import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { GolfStatCard } from "@/components/sections/GolfStatCard";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { PhotoCarousel } from "@/components/interactive/PhotoCarousel";
import { golfData } from "@/data/golf";
import { golfPhotos } from "@/data/golf-photos";

export const metadata: Metadata = {
  title: "Golf",
  description:
    "NCAA D1 varsity golf at Dartmouth College. AJGA Scholastic All American, 2021 Junior Olympian of the Year.",
};

export default function GolfPage() {
  const bioParagraphs = golfData.athleticBio.split("\n\n");

  return (
    <PageLayout>
      <SectionContainer className="py-16 md:py-24">
        <ScrollReveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Golf
          </h1>
        </ScrollReveal>

        {/* Athletic Bio */}
        <div className="mt-8 max-w-3xl space-y-4">
          {bioParagraphs.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className="text-base leading-relaxed text-foreground-muted">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* Photo Gallery */}
        <ScrollReveal>
          <h2 className="mt-16 text-2xl font-semibold text-foreground">
            Gallery
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="mt-6">
            <PhotoCarousel photos={golfPhotos} interval={4000} />
          </div>
        </ScrollReveal>

        {/* Achievements */}
        <ScrollReveal>
          <h2 className="mt-16 text-2xl font-semibold text-foreground">
            Achievements
          </h2>
        </ScrollReveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {golfData.achievements.map((achievement, index) => (
            <ScrollReveal key={achievement.title} delay={index * 0.1}>
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

        {/* Junior Golf Results by Year */}
        <ScrollReveal>
          <h2 className="mt-16 text-2xl font-semibold text-foreground">
            Junior Tournament Results
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">
            {Object.values(golfData.juniorResults).reduce((sum, arr) => sum + arr.length, 0)} tournaments from 2016–2021 across the US and internationally.
          </p>
        </ScrollReveal>

        {Object.keys(golfData.juniorResults)
          .sort((a, b) => Number(b) - Number(a))
          .map((year) => (
            <ScrollReveal key={year} delay={0.1}>
              <h3 className="mt-10 mb-4 text-lg font-semibold text-foreground">
                {year} Results
                <span className="ml-2 text-sm font-normal text-foreground-subtle">
                  ({golfData.juniorResults[year].length} tournaments)
                </span>
              </h3>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-background-card">
                      <th className="px-4 py-3 font-medium text-foreground-subtle">Date</th>
                      <th className="px-4 py-3 font-medium text-foreground-subtle">Tournament</th>
                      <th className="px-4 py-3 font-medium text-foreground-subtle">Course</th>
                      <th className="px-4 py-3 font-medium text-foreground-subtle text-right">Yds</th>
                      <th className="px-4 py-3 font-medium text-foreground-subtle text-right">Par</th>
                      <th className="px-4 py-3 font-medium text-foreground-subtle text-right">Rating/Slope</th>
                      <th className="px-4 py-3 font-medium text-foreground-subtle text-right">Score</th>
                      <th className="px-4 py-3 font-medium text-foreground-subtle text-right">Finish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {golfData.juniorResults[year].map((result, i) => (
                      <tr
                        key={i}
                        className={`border-b border-border/50 transition-colors hover:bg-background-elevated ${
                          result.finish.startsWith("1 ") ? "bg-accent/5" : ""
                        }`}
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-foreground-muted">
                          {result.date}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          {result.tournament}
                        </td>
                        <td className="px-4 py-3 text-foreground-muted">{result.course}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-right text-foreground-muted">
                          {result.yardage}
                        </td>
                        <td className="px-4 py-3 text-right text-foreground-muted">
                          {result.par}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-mono text-xs text-foreground-muted">
                          {result.rating}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-foreground">
                          {result.score}
                        </td>
                        <td className={`whitespace-nowrap px-4 py-3 text-right font-medium ${
                          result.finish.startsWith("1 ") ? "text-accent" : "text-foreground-muted"
                        }`}>
                          {result.finish}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          ))}
      </SectionContainer>
    </PageLayout>
  );
}
