import { Card } from "@/components/ui/Card";

const GITHUB_USERNAME = "ckeith26";
const ACCENT_HEX = "10b981";

// Dark-theme contribution palette: very dark green → full accent
const DARK_PALETTE = ["#0d3321", "#115c3b", "#0e9264", "#10b981"];

function sanitizeSvg(raw: string): string {
  const svgMatch = raw.match(/<svg[\s\S]*<\/svg>/);
  if (!svgMatch) return "";
  let svg = svgMatch[0];
  svg = svg.replace(/<script[\s\S]*?<\/script>/gi, "");
  svg = svg.replace(/\bon\w+\s*=\s*"[^"]*"/gi, "");
  svg = svg.replace(/\bon\w+\s*=\s*'[^']*'/gi, "");
  svg = svg.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "");
  return svg;
}

function remapColors(svg: string): string {
  // The ghchart SVG uses inline styles (style="fill:#EEEEEE;...")
  // and data-score (not data-count) for contribution levels.
  // Score 0 = no contributions, 1-4 = contribution levels.

  // Replace text/label colors for dark theme
  svg = svg.replace(/fill:#000/g, "fill:#71717a");

  // Remap contribution rect colors based on data-score
  svg = svg.replace(
    /style="fill:#[0-9a-fA-F]+;([^"]*)"(\s*)data-score="(\d+)"/g,
    (_match, restStyle, space, scoreStr) => {
      const score = parseInt(scoreStr, 10);
      const color =
        score === 0
          ? "transparent"
          : DARK_PALETTE[Math.min(score - 1, DARK_PALETTE.length - 1)];
      return `style="fill:${color};${restStyle}"${space}data-score="${scoreStr}"`;
    }
  );

  return svg;
}

async function fetchContributionSvg(): Promise<{
  svg: string;
  total: number;
} | null> {
  try {
    const res = await fetch(
      `https://ghchart.rshah.org/${ACCENT_HEX}/${GITHUB_USERNAME}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const raw = await res.text();

    let svg = sanitizeSvg(raw);
    if (!svg) return null;

    // Fetch actual contribution count from GitHub's contributions page
    let total = 0;
    try {
      const contribRes = await fetch(
        `https://github.com/users/${GITHUB_USERNAME}/contributions`,
        { next: { revalidate: 3600 } }
      );
      if (contribRes.ok) {
        const contribHtml = await contribRes.text();
        // Parse "X contributions in the last year" text
        const totalMatch = contribHtml.match(
          /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/
        );
        if (totalMatch) {
          total = parseInt(totalMatch[1].replace(/,/g, ""), 10);
        }
      }
    } catch {
      // Fall back to 0 if fetch fails
    }

    // Round squares
    svg = svg.replace(/<rect /g, '<rect rx="3" ry="3" ');

    // Remap all colors for dark theme
    svg = remapColors(svg);

    // Force SVG to stretch to container width
    // Extract original width/height to build a viewBox, then remove fixed dimensions
    const widthMatch = svg.match(/width="(\d+)"/);
    const heightMatch = svg.match(/height="(\d+)"/);
    const origW = widthMatch ? widthMatch[1] : "722";
    const origH = heightMatch ? heightMatch[1] : "112";

    // Remove existing width/height attributes
    svg = svg.replace(/\s*width="\d+"/, "");
    svg = svg.replace(/\s*height="\d+"/, "");

    // Add viewBox (if not already present) and set width to 100%
    if (!svg.includes("viewBox")) {
      svg = svg.replace(
        /<svg/,
        `<svg viewBox="0 0 ${origW} ${origH}"`
      );
    }
    svg = svg.replace(/<svg/, '<svg width="100%"');

    return { svg, total };
  } catch {
    return null;
  }
}

export async function GitHubContributions() {
  const result = await fetchContributionSvg();

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            GitHub Activity
          </h3>
          {result && result.total > 0 && (
            <p className="mt-1 text-sm text-foreground-muted">
              <span className="font-medium text-accent">
                {result.total.toLocaleString()}
              </span>{" "}
              contributions in the last year
            </p>
          )}
        </div>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-foreground-subtle transition-colors hover:text-accent"
        >
          @{GITHUB_USERNAME} &rarr;
        </a>
      </div>
      <div>
        {result ? (
          <div
            className="w-full"
            dangerouslySetInnerHTML={{ __html: result.svg }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://ghchart.rshah.org/${ACCENT_HEX}/${GITHUB_USERNAME}`}
            alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
            className="w-full"
            style={{
              filter:
                "invert(1) hue-rotate(180deg) saturate(1.3) brightness(0.85)",
            }}
          />
        )}
      </div>
    </Card>
  );
}
