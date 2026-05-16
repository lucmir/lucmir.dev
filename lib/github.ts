export type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: ContributionLevel;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionWeek[];
};

const QUERY = `
  query Contributions {
    viewer {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

/** Most recent day with contributions > 0, or null if calendar is empty. */
export function findLastActiveDate(
  calendar: ContributionCalendar,
): string | null {
  for (let w = calendar.weeks.length - 1; w >= 0; w--) {
    const days = calendar.weeks[w].contributionDays;
    for (let d = days.length - 1; d >= 0; d--) {
      if (days[d].contributionCount > 0) return days[d].date;
    }
  }
  return null;
}

/** Day-level relative time: today / yesterday / N days / weeks / months ago. */
export function relativeDayLabel(dateStr: string, now: Date = new Date()): string {
  const then = new Date(`${dateStr}T00:00:00Z`);
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const days = Math.round(
    (today.getTime() - then.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export async function fetchContributions(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "lucmir.dev",
      },
      body: JSON.stringify({ query: QUERY }),
      // Revalidate every hour; freshness vs. API quota balance
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: {
        viewer?: {
          contributionsCollection?: {
            contributionCalendar?: ContributionCalendar;
          };
        };
      };
    };
    return json.data?.viewer?.contributionsCollection?.contributionCalendar ?? null;
  } catch {
    return null;
  }
}
