import { cacheLife } from "next/cache";
import { profile } from "@/lib/cv-data";

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

// GitHub's `data-level` 0–4 on each calendar cell.
const LEVELS: ContributionLevel[] = [
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
];

const USERNAME = new URL(profile.links.github).pathname.replace(/^\/+/, "");

function attrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [, name, value] of tag.matchAll(/([\w-]+)="([^"]*)"/g)) {
    out[name] = value;
  }
  return out;
}

/**
 * Parses the public contributions fragment (github.com/users/<name>/contributions).
 * Each day is a `<td class="ContributionCalendar-day" data-date data-level id>`
 * with its count in a `<tool-tip for="<id>">N contributions on …</tool-tip>`.
 * Returns null if the markup doesn't look like that, so a GitHub redesign hides
 * the section instead of rendering wrong numbers.
 */
export function parseContributionsHtml(html: string): ContributionCalendar | null {
  const counts = new Map<string, number>();
  for (const [, tagAttrs, text] of html.matchAll(
    /<tool-tip\b([^>]*)>([^<]*)<\/tool-tip>/g,
  )) {
    const forId = attrs(tagAttrs).for;
    const match = text.trim().match(/^(No|[\d,]+) contributions?\b/);
    if (forId && match) {
      counts.set(forId, match[1] === "No" ? 0 : Number(match[1].replace(/,/g, "")));
    }
  }

  const days: ContributionDay[] = [];
  for (const [tag] of html.matchAll(/<td\b[^>]*\bContributionCalendar-day\b[^>]*>/g)) {
    const a = attrs(tag);
    const count = counts.get(a.id);
    const level = LEVELS[Number(a["data-level"])];
    if (!a["data-date"] || count === undefined || !level) return null;
    days.push({ date: a["data-date"], contributionCount: count, contributionLevel: level });
  }
  if (days.length === 0) return null;

  // Group into Sunday–Saturday columns, like GitHub's own calendar.
  days.sort((x, y) => x.date.localeCompare(y.date));
  const weeks: ContributionWeek[] = [];
  for (const day of days) {
    if (weeks.length === 0 || new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0) {
      weeks.push({ contributionDays: [] });
    }
    weeks[weeks.length - 1].contributionDays.push(day);
  }

  return {
    totalContributions: days.reduce((sum, d) => sum + d.contributionCount, 0),
    weeks,
  };
}

// Reads the public profile calendar instead of the GraphQL API: Civic's org
// blocks personal tokens, which silently drops all its private contributions
// from the API. The public page still counts them (with "Include private
// contributions on my profile" enabled), and needs no token.
export async function fetchContributions(): Promise<ContributionCalendar | null> {
  "use cache";
  // Revalidate hourly; freshness vs. hammering github.com
  cacheLife("hours");

  try {
    const res = await fetch(`https://github.com/users/${USERNAME}/contributions`, {
      headers: { Accept: "text/html", "User-Agent": "lucmir.dev" },
    });
    if (!res.ok) return null;
    return parseContributionsHtml(await res.text());
  } catch {
    return null;
  }
}
