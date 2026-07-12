"use client";

import { Check, Copy, Mail } from "lucide-react";
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
      <SectionHead idx="06" name="contact" aside="replies within 1 business day" />

      <div
        className="border border-border p-6 sm:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end"
        style={{
          background:
            "linear-gradient(180deg, var(--accent-soft), transparent 40%), var(--background-card)",
        }}
      >
        <div>
          <h3 className="font-sans text-2xl sm:text-3xl md:text-[38px] font-semibold tracking-[-0.02em] text-foreground-strong leading-[1.05] mb-2 mt-2">
            Email me at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors"
            >
              {profile.email}
            </a>
          </h3>
          <p className="font-sans text-[14.5px] leading-[1.6] text-foreground-muted max-w-[52ch] mb-4">
            Open to senior engineering roles, infra and AI advisory, and the occasional weekend rabbit hole. Email is the fastest channel.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-2 px-3.5 py-2 font-mono text-[12.5px] rounded-[2px] bg-accent-soft border border-[color-mix(in_oklab,var(--accent)_50%,var(--border-strong))] text-accent hover:bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] transition-colors"
            >
              {copied ? <Check className="size-3.5" /> : <Mail className="size-3.5" />}
              {copied ? "copied" : "copy email"}
            </button>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-3.5 py-2 font-mono text-[12.5px] rounded-[2px] bg-background-elevated border border-border-strong text-foreground-strong hover:border-accent hover:text-accent transition-colors"
            >
              linkedin →
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-3.5 py-2 font-mono text-[12.5px] rounded-[2px] bg-background-elevated border border-border-strong text-foreground-strong hover:border-accent hover:text-accent transition-colors"
            >
              github →
            </a>
          </div>
        </div>
        <div className="text-[11.5px] text-foreground-muted grid gap-2 min-w-[200px]">
          <div className="flex justify-between gap-4">
            <span>based</span>
            <b className="text-foreground-strong font-medium">Belo Horizonte · BR</b>
          </div>
          <div className="flex justify-between gap-4">
            <span>timezone</span>
            <b className="text-foreground-strong font-medium">UTC−3</b>
          </div>
          <div className="flex justify-between gap-4">
            <span>response</span>
            <b className="text-accent font-medium">&lt; 24h</b>
          </div>
          <div className="flex justify-between gap-4">
            <span>language</span>
            <b className="text-foreground-strong font-medium">EN · PT-BR</b>
          </div>
        </div>
      </div>
    </section>
  );
}
