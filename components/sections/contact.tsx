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

      <div className="rounded-[8px] bg-pink-soft text-ink p-6 sm:p-10">
        <div>
          <h3 className="display text-[clamp(2.2rem,5.5vw,4rem)] text-ink mb-3 mt-1">
            Email me at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="text-brand underline decoration-brand/40 underline-offset-[6px] hover:decoration-brand transition-colors normal-case"
            >
              {profile.email}
            </a>
          </h3>
          <p className="font-sans text-[18px] leading-[1.6] text-ink-muted max-w-[52ch] mb-4">
            Open to senior full-stack, AI product roles, and AI advisory.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-2 px-4 py-2 font-sans text-[16px] font-semibold rounded-[6px] bg-brand border border-brand text-brand-ink hover:bg-accent hover:border-accent transition-colors"
            >
              {copied ? <Check className="size-3.5" /> : <Mail className="size-3.5" />}
              {copied ? "copied" : "copy email"}
            </button>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-3.5 py-2 font-sans text-[16px] font-medium rounded-[6px] bg-[rgba(255,255,255,0.55)] border border-ink/25 text-ink hover:border-brand hover:text-brand transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-3.5 py-2 font-sans text-[16px] font-medium rounded-[6px] bg-[rgba(255,255,255,0.55)] border border-ink/25 text-ink hover:border-brand hover:text-brand transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
