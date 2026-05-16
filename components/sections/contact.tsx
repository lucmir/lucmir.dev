"use client";

import { Check, Copy, MapPin } from "lucide-react";
import { useState, type SVGProps } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/lib/cv-data";

type LinkCard = {
  label: string;
  value: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
};

const externalLinks: LinkCard[] = [
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
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard write may fail in unusual contexts; the email is visible
      // for manual copy as a fallback
    }
  };

  return (
    <section
      id="contact"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24 scroll-mt-20"
    >
      <div className="space-y-10">
        <SectionHeading label="// contact" title="Let's talk" />

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <li>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email to clipboard"}
              className="group block w-full text-left p-5 rounded-md border border-border bg-background-elevated hover:border-accent hover:bg-background transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-foreground-subtle">
                  Email
                </span>
                {copied ? (
                  <span className="flex items-center gap-1 font-mono text-xs text-accent">
                    <Check className="size-3.5" />
                    copied
                  </span>
                ) : (
                  <Copy className="size-4 text-foreground-subtle group-hover:text-accent transition-colors" />
                )}
              </div>
              <p className="mt-2 text-foreground group-hover:text-accent transition-colors break-all">
                {profile.email}
              </p>
            </button>
          </li>

          {externalLinks.map(({ label, value, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
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
