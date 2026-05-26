"use client";

import Image from "next/image";
import { useState } from "react";

export function HeroPhoto() {
  const [smiling, setSmiling] = useState(false);

  // Desktop pointers: smile on hover, revert on leave.
  // Filter out touch pointers — taps fire pointerenter too, and we want
  // taps to toggle (via onClick) rather than just turn on.
  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" || e.pointerType === "pen") setSmiling(true);
  };
  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" || e.pointerType === "pen") setSmiling(false);
  };

  return (
    <button
      type="button"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={() => setSmiling((v) => !v)}
      aria-label={smiling ? "Show serious photo" : "Show smiling photo"}
      className="group relative size-56 sm:size-64 md:size-72 rounded-full overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      style={{
        boxShadow: [
          "0 0 0 1px rgba(203, 166, 247, 0.25)",
          "0 0 70px -10px rgba(203, 166, 247, 0.35)",
          "0 20px 50px -20px rgba(0, 0, 0, 0.6)",
        ].join(", "),
      }}
    >
      <Image
        src="/eu-profile.png"
        alt=""
        aria-hidden
        width={479}
        height={479}
        priority
        className="absolute inset-0 size-full object-cover"
      />
      <Image
        src="/eu-serious.png"
        alt="Lucas Cunha"
        width={479}
        height={479}
        priority
        className="absolute inset-0 size-full object-cover transition-opacity duration-300"
        style={{ opacity: smiling ? 0 : 1 }}
      />
    </button>
  );
}
