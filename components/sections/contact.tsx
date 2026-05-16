import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/lib/cv-data";

const links = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "in/lucmir",
    href: profile.links.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "lucmir",
    href: profile.links.github,
    icon: GithubIcon,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24 scroll-mt-20"
    >
      <div className="space-y-10">
        <SectionHeading label="// contact" title="Let's talk" />

        <p className="text-base sm:text-lg text-foreground-muted max-w-2xl leading-relaxed">
          Open to senior engineering roles building AI agents, agent
          infrastructure, or developer platforms. The fastest way to reach me is
          email.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {links.map(({ label, value, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="group block p-5 rounded-md border border-border bg-background-elevated hover:border-accent hover:bg-background transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="size-5 text-foreground-muted group-hover:text-accent transition-colors" />
                  <span className="font-mono text-sm text-foreground-subtle">
                    {label}
                  </span>
                </div>
                <p className="mt-2 text-foreground group-hover:text-accent transition-colors break-all">
                  {value}
                </p>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 text-foreground-subtle font-mono text-sm">
          <MapPin className="size-4" />
          <span>{profile.location}</span>
        </div>
      </div>
    </section>
  );
}
