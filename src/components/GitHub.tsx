import { cacheLife } from "next/cache";
import { profile } from "@/content";
import { GitHubGrid } from "./GitHubGrid";
import { levelColor } from "./levels";
import { Arrow, Label, Reveal } from "./ui";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

async function getContributions(user: string) {
  "use cache";
  cacheLife("days");
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`);
    if (!res.ok) return null;
    const data = (await res.json()) as { total: { lastYear: number }; contributions: Day[] };
    return { total: data.total.lastYear, days: data.contributions };
  } catch {
    return null;
  }
}

/** Contribution graph, fetched at build time and refreshed daily. Hidden if the API is down. */
export async function GitHub() {
  const data = await getContributions(profile.github);
  if (!data) return null;

  // Group days into week columns (Sunday-first), padding the first week.
  const weeks: (Day | null)[][] = [];
  const first = new Date(data.days[0].date).getUTCDay();
  let week: (Day | null)[] = Array(first).fill(null);
  for (const d of data.days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);

  return (
    <Reveal>
      <Label
        right={
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-1 text-[13px] text-ink-2 hover:text-accent"
          >
            View on GitHub <Arrow className="group-hover:translate-x-0.5" />
          </a>
        }
      >
        GitHub
      </Label>
      <GitHubGrid weeks={weeks} />
      <div className="mt-3 flex items-center justify-between text-[11.5px] text-ink-3">
        <span>{data.total} contributions in the last year</span>
        <span className="inline-flex items-center gap-1">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="size-[9px] rounded-[2px]" style={{ background: levelColor(l) }} />
          ))}
          More
        </span>
      </div>
    </Reveal>
  );
}
