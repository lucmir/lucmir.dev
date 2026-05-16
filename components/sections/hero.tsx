import { ArrowDown, Download, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/lib/cv-data";

export function Hero() {
  return (
    <section
      id="top"
      className="max-w-5xl mx-auto px-6 sm:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <p className="font-mono text-sm text-foreground-subtle">
            <span className="text-accent">$</span> whoami
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
            {profile.name}
          </h1>
          <p className="text-xl sm:text-2xl text-foreground leading-snug max-w-xl">
            {profile.tagline}
          </p>
          <p className="text-base sm:text-lg text-foreground-muted max-w-xl leading-relaxed">
            {profile.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-background font-medium text-sm hover:bg-accent-muted transition-colors"
            >
              <Download className="size-4" />
              Download CV
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border-strong text-foreground hover:border-accent hover:text-accent transition-colors text-sm font-medium"
            >
              <Mail className="size-4" />
              Get in touch
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div
            className="group relative size-56 sm:size-64 md:size-72 rounded-full overflow-hidden"
            style={{
              boxShadow: [
                "0 0 0 1px rgba(245, 166, 35, 0.25)",
                "0 0 70px -10px rgba(245, 166, 35, 0.35)",
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
              className="absolute inset-0 size-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
          </div>
        </div>
      </div>

      <div className="pt-20 sm:pt-28 flex justify-center text-foreground-subtle">
        <Link
          href="#about"
          aria-label="Scroll to About section"
          className="hover:text-accent transition-colors"
        >
          <ArrowDown className="size-5 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
