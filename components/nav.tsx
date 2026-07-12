"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/lib/cv-data";

const SECTIONS = [
  { id: "about",          label: "about" },
  { id: "activity",       label: "activity" },
  { id: "experience",     label: "experience" },
  { id: "skills",         label: "skills" },
  { id: "certifications", label: "certifications" },
  { id: "education",      label: "education" },
  { id: "contact",        label: "contact" },
];

export function Nav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // If the URL hash already matches the clicked link, the browser won't
  // re-scroll (anchor nav is a no-op on identical hash). Force the scroll
  // programmatically in that case.
  const handleNavClick = (id: string) => {
    setActiveId(id);
    if (window.location.hash === `#${id}`) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    targets.forEach((el) => observer.observe(el));

    // The observer's negative bottom margin (-50%) means a section in the
    // lower half of the viewport never activates. The last section (contact)
    // typically sits at the very bottom of the page and can never reach the
    // top half if there's not enough scroll runway. Force-activate it when
    // the user is within ~4px of the page end.
    const onScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) setActiveId(SECTIONS[SECTIONS.length - 1].id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // close mobile menu on resize past breakpoint
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border">
      <nav className="max-w-[1200px] mx-auto px-5 sm:px-8 h-14 grid grid-cols-[auto_1fr_auto] items-center gap-6">
        <Link
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="inline-flex items-center gap-2.5 text-foreground-strong text-[13px]"
        >
          <span className="grid place-items-center size-[22px] text-[11px] font-semibold text-accent border border-accent bg-accent-soft">
            L
          </span>
          <span>
            Lucas Cunha <span className="text-foreground-subtle">/</span>
            <span className="text-foreground-muted"> lucmir</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-0.5 justify-center text-[12.5px]">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <Link
                href={`#${s.id}`}
                onClick={() => handleNavClick(s.id)}
                className={`px-2.5 py-1.5 rounded-[2px] border transition-colors ${
                  activeId === s.id
                    ? "text-accent border-[color-mix(in_oklab,var(--accent)_30%,var(--border))] bg-accent-soft"
                    : "text-foreground-muted border-transparent hover:text-foreground-strong"
                }`}
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 justify-self-end">
          <ThemeToggle />
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="grid place-items-center size-7 rounded-[2px] border border-border bg-background-elevated text-foreground-muted hover:text-foreground-strong hover:border-border-strong transition-colors"
          >
            <GithubIcon className="size-3.5" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className="grid place-items-center size-7 rounded-[2px] border border-border bg-background-elevated text-foreground-muted hover:text-foreground-strong hover:border-border-strong transition-colors"
          >
            <LinkedinIcon className="size-3.5" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="lg:hidden grid place-items-center size-7 rounded-[2px] border border-border bg-background-elevated text-foreground-muted"
          >
            {menuOpen ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="lg:hidden border-t border-border bg-background">
          <ul className="max-w-[1200px] mx-auto px-5 sm:px-8 py-3 space-y-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <Link
                  href={`#${s.id}`}
                  onClick={() => {
                    setMenuOpen(false);
                    handleNavClick(s.id);
                  }}
                  className={`block px-3 py-2 rounded-[2px] text-sm transition-colors ${
                    activeId === s.id
                      ? "text-accent bg-accent-soft"
                      : "text-foreground-muted hover:text-foreground-strong"
                  }`}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
