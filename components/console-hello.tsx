"use client";

import { useEffect } from "react";

export function ConsoleHello() {
  useEffect(() => {
    // Only log once per session, and only in real browsers (skips SSR & test).
    if (typeof window === "undefined") return;
    if ((window as unknown as { __helloLogged?: boolean }).__helloLogged) return;
    (window as unknown as { __helloLogged?: boolean }).__helloLogged = true;

    const accent = "color: #cba6f7; font-weight: 600;";
    const muted = "color: #a1a1aa;";
    const mono = "font-family: ui-monospace, monospace;";

    console.log(
      "%c👋 Hi! Looking under the hood?",
      `${accent} ${mono} font-size: 14px;`,
    );
    console.log(
      "%cSource: %chttps://github.com/lucmir/lucmir.dev",
      `${muted} ${mono}`,
      `${accent} ${mono}`,
    );
    console.log(
      "%cIf you spot anything weird, open an issue. Or hire me :)",
      `${muted} ${mono} font-style: italic;`,
    );
  }, []);

  return null;
}
