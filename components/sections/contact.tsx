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
      <SectionHead name="contact" />

      <div className="border border-border rounded-[8px] bg-background-card p-6 sm:p-10">
        <div>
          <h3 className="font-sans text-2xl sm:text-3xl md:text-[43.5px] font-semibold tracking-[-0.02em] text-foreground-strong leading-[1.05] mb-2 mt-2">
            Email me at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors"
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
              className="inline-flex items-center gap-2 px-3.5 py-2 font-sans text-[16px] font-medium rounded-[6px] bg-accent-soft border border-[color-mix(in_oklab,var(--accent)_50%,var(--border-strong))] text-accent hover:bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] transition-colors"
            >
              {copied ? <Check className="size-3.5" /> : <Mail className="size-3.5" />}
              {copied ? "copied" : "copy email"}
            </button>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-3.5 py-2 font-sans text-[16px] font-medium rounded-[6px] bg-background-elevated border border-border-strong text-foreground-strong hover:border-accent hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-3.5 py-2 font-sans text-[16px] font-medium rounded-[6px] bg-background-elevated border border-border-strong text-foreground-strong hover:border-accent hover:text-accent transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
