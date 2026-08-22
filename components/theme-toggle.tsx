"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  /* Light is the default for everyone, so SSR starts there. The head
     script applies any stored override before hydration; this reads the
     real DOM state on mount and reconciles. The OS preference is
     intentionally ignored — dark is an explicit choice. */
  const [resolved, setResolved] = useState<Theme>("light");

  useEffect(() => {
    const explicit = document.documentElement.getAttribute("data-theme");
    if (explicit === "dark" || explicit === "light") setResolved(explicit);
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
