"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

function readSavedTheme(): "light" | "dark" | null {
  try {
    const t = localStorage.getItem("lc-theme");
    if (t === "light" || t === "dark") return t;
  } catch {}
  return null;
}

function systemPrefersDark() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  /* Resolved theme drives which icon we render. Starts as "dark" on SSR
     to match the default styling — the head script will have already
     applied any saved override before hydration, so the first client
     render reads the real DOM state on mount and reconciles. */
  const [resolved, setResolved] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const explicit = document.documentElement.getAttribute("data-theme");
    if (explicit === "light" || explicit === "dark") {
      setResolved(explicit);
      return;
    }
    setResolved(systemPrefersDark() ? "dark" : "light");

    // React to system changes only when there's no explicit override
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const has = document.documentElement.getAttribute("data-theme");
      if (has === "light" || has === "dark") return;
      setResolved(mq.matches ? "dark" : "light");
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = resolved === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("lc-theme", next);
    } catch {}
    setResolved(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={resolved === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={resolved === "dark" ? "Light theme" : "Dark theme"}
      className="grid place-items-center size-7 rounded-[6px] border border-border bg-background-elevated text-foreground-muted hover:text-foreground-strong hover:border-border-strong transition-colors"
    >
      {resolved === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
    </button>
  );
}
