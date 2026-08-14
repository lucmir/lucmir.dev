import {
  about,
  certifications,
  education,
  experience,
  languages,
  profile,
  skills,
} from "@/lib/cv-data";

/* Machine-readable CV following the llms.txt convention, so AI assistants
 * and recruiter agents get clean markdown instead of scraping the page.
 * Built only from static cv-data — prerendered at build time. */
export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucas-cunha.com";
  const lines: string[] = [
    `# ${profile.name}`,
    "",
    `> ${profile.tagline}. ${profile.subtitle}`,
    "",
    `- Location: ${profile.location} (UTC−3)`,
    `- Email: ${profile.email}`,
    `- GitHub: ${profile.links.github}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    `- CV (PDF): ${siteUrl}${profile.cvUrl}`,
    "",
    "## About",
    "",
    ...about.paragraphs.flatMap((p) => [p, ""]),
    `Currently: ${about.currently}`,
    "",
    "## Experience",
    "",
  ];

  for (const job of experience) {
    lines.push(`### ${job.role} — ${job.company} (${job.duration})`, "");
    for (const b of job.bullets) lines.push(`- ${b}`);
    if (job.stack?.length) lines.push(`- Stack: ${job.stack.join(", ")}`);
    lines.push("");
  }

  lines.push("## Skills", "");
  for (const group of skills) {
    lines.push(`- ${group.name}: ${group.items.map((s) => s.name).join(", ")}`);
  }

  lines.push("", "## Certifications", "");
  for (const cert of certifications) {
    lines.push(`- ${cert.name} — verify: ${cert.verifyUrl}`);
  }

  lines.push("", "## Education", "");
  for (const edu of education) {
    lines.push(`- ${edu.degree}, ${edu.field} — ${edu.school} (${edu.duration})`);
  }

  lines.push("", "## Languages", "");
  for (const lang of languages) {
    lines.push(`- ${lang.name} (${lang.level})`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
