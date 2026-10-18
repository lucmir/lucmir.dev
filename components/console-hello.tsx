"use client";

import { useEffect } from "react";

export function ConsoleHello() {
  useEffect(() => {
    // Only log once per session, and only in real browsers (skips SSR & test).
    if (typeof window === "undefined") return;
    if ((window as unknown as { __helloLogged?: boolean }).__helloLogged) return;
    (window as unknown as { __helloLogged?: boolean }).__helloLogged = true;

    console.log("source: https://github.com/lucmir/lucmir.dev");
  }, []);

  return null;
}
