import { Download, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/brand-icons";
import { profile } from "@/lib/cv-data";

export function Hero() {
  return (
    <section
      id="top"
      className="border-b border-border max-w-[1200px] mx-auto px-5 sm:px-8 pt-14 pb-14"
    >
      {/* Top row: name+copy on left, ID card on right */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
        <div>
          {/* Handle line */}
          <div className="font-mono text-[12.5px] text-foreground-muted mb-3.5 flex flex-wrap items-center gap-x-3.5 gap-y-1">
            <span>
              <span className="text-accent">@</span>lucmir
            </span>
            <span className="text-foreground-subtle">·</span>
            <span>senior fullstack engineer</span>
            <span className="text-foreground-subtle">·</span>
            <span>belo horizonte, br</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.022em] leading-[1.02] text-foreground-strong mb-4">
            {profile.name}
          </h1>

          <p className="font-sans text-lg sm:text-xl md:text-[22px] leading-[1.4] text-foreground-strong max-w-[60ch] mb-3">
            Builds AI <b className="text-accent font-medium">agents</b>, and the cloud infrastructure they run on.
          </p>

          <p className="text-[13.5px] text-foreground-muted max-w-[64ch] mb-7 leading-[1.6]">
            15+ years building and operating large-scale distributed systems. I work across cloud, AI/MCP, and identity, with a soft spot for observability, incident response, and architectures that hold up under real users. Currently leading DevOps and infrastructure at Civic Technologies.
          </p>

          <div className="flex flex-wrap gap-2">
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 px-3.5 py-2 font-mono text-[12.5px] rounded-[2px] bg-accent-soft border border-[color-mix(in_oklab,var(--accent)_50%,var(--border-strong))] text-accent hover:bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] transition-colors"
            >
              <Download className="size-3.5" />
              Download CV
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-3.5 py-2 font-mono text-[12.5px] rounded-[2px] bg-background-elevated border border-border-strong text-foreground-strong hover:border-accent hover:text-accent transition-colors"
            >
              <Mail className="size-3.5" />
              Get in touch
            </Link>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-3.5 py-2 font-mono text-[12.5px] rounded-[2px] bg-background-elevated border border-border-strong text-foreground-strong hover:border-accent hover:text-accent transition-colors"
            >
              <GithubIcon className="size-3.5" />
              GitHub
            </a>
          </div>
        </div>

        {/* ID card */}
        <aside className="w-full md:w-[220px] border border-border bg-background-card">
          <div className="aspect-[1/1.05] overflow-hidden border-b border-border [filter:saturate(.85)_contrast(1.02)]">
            <Image
              src="/eu-profile.png"
              alt="Lucas Cunha"
              width={479}
              height={479}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 text-[11.5px] text-foreground-muted grid gap-1">
            <div className="grid grid-cols-[60px_1fr] gap-2">
              <span>role</span>
              <b className="font-medium text-foreground-strong">Sr Eng</b>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-2">
              <span>team</span>
              <b className="font-medium text-foreground-strong">Civic</b>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-2">
              <span>tz</span>
              <b className="font-medium text-foreground-strong">UTC−3</b>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-2">
              <span>exp</span>
              <b className="font-medium text-foreground-strong">15+ yr</b>
            </div>
          </div>
        </aside>
      </div>

      {/* Tiles */}
      <div className="mt-9 grid grid-cols-1 md:grid-cols-3 border border-border rounded-[2px] overflow-hidden bg-background-card">
        <div className="p-4 sm:p-5 border-b md:border-b-0 md:border-r border-border">
          <div className="text-[10.5px] text-foreground-muted uppercase tracking-[0.12em] mb-2 flex justify-between">
            <span>experience</span>
          </div>
          <div className="font-mono font-medium text-2xl sm:text-3xl text-foreground-strong leading-none tracking-[-0.01em]">
            15<span className="text-[13px] text-foreground-muted ml-1">+ yr</span>
          </div>
          <div className="text-[10.5px] text-foreground-muted mt-1.5">
            across cloud, AI, identity
          </div>
        </div>

        <div className="p-4 sm:p-5 border-b md:border-b-0 md:border-r border-border">
          <div className="text-[10.5px] text-foreground-muted uppercase tracking-[0.12em] mb-2 flex justify-between">
            <span>companies</span><span>career</span>
          </div>
          <div className="font-mono font-medium text-2xl sm:text-3xl text-foreground-strong leading-none tracking-[-0.01em]">
            5
          </div>
          <svg className="w-full h-6 mt-2.5 block" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path
              fill="var(--accent-soft)"
              d="M0,28 L8,22 L18,24 L28,16 L40,12 L52,14 L64,10 L76,6 L88,8 L100,4 L100,30 L0,30 Z"
            />
            <path
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.4"
              d="M0,28 L8,22 L18,24 L28,16 L40,12 L52,14 L64,10 L76,6 L88,8 L100,4"
            />
          </svg>
        </div>

        <div className="p-4 sm:p-5">
          <div className="text-[10.5px] text-foreground-muted uppercase tracking-[0.12em] mb-2 flex justify-between">
            <span>degrees</span><span>computer science</span>
          </div>
          <div className="font-mono font-medium text-2xl sm:text-3xl text-foreground-strong leading-none tracking-[-0.01em]">
            2
          </div>
          <div className="text-[10.5px] text-foreground-muted mt-1.5">
            BSc + MSc, UFMG
          </div>
        </div>
      </div>
    </section>
  );
}
