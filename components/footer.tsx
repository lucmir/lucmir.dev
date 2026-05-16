import { profile } from "@/lib/cv-data";

export function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm font-mono text-foreground-subtle">
        <p>
          <span className="text-accent">©</span> {new Date().getFullYear()}{" "}
          {profile.name}
        </p>
        <p>
          Built with Next.js + Tailwind ·{" "}
          <a
            href="https://github.com/lucmir/lucmir.dev"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-accent transition-colors"
          >
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
