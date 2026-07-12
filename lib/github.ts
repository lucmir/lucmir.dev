import { cacheLife } from "next/cache";

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

export async function fetchContributions(): Promise<ContributionCalendar | null> {
  "use cache";
  // Revalidate hourly; freshness vs. API quota balance
  cacheLife("hours");

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
