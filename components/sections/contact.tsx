"use client";

import { Check, Mail } from "lucide-react";
import { useState } from "react";
import { SectionHead } from "@/components/sections/about";
import { profile } from "@/lib/cv-data";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section
      id="contact"
      className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 scroll-mt-20"
    >
      <SectionHead name="contact" index={7} />

      <div className="rounded-[4px] border border-border bg-background-card p-7 sm:p-12">
        <div>
          <h3 className="display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] text-foreground-strong mb-4 mt-1 [overflow-wrap:anywhere]">
            Email me at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="text-accent underline decoration-accent/30 decoration-1 underline-offset-[8px] hover:decoration-accent transition-colors"
            >
              {profile.email}
            </a>
          </h3>
          <p className="font-sans text-[18px] leading-[1.6] text-foreground-muted max-w-[52ch] mb-4">
            Open to senior full-stack, AI product roles, and AI advisory.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-2 px-5 py-2.5 font-sans text-[15.5px] font-medium rounded-full bg-brand border border-brand text-brand-ink hover:bg-accent hover:border-accent hover:text-background transition-colors"
            >
              {copied ? <Check className="size-3.5" /> : <Mail className="size-3.5" />}
              {copied ? "Copied" : "Copy email"}
            </button>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-sans text-[15.5px] font-medium rounded-full bg-transparent border border-border-strong text-foreground-strong hover:border-accent hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-sans text-[15.5px] font-medium rounded-full bg-transparent border border-border-strong text-foreground-strong hover:border-accent hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
