export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-6">
        <p className="font-mono text-sm text-foreground-subtle">
          ~/lucmir.dev
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          M1 — <span className="text-accent">Foundation ready</span>
        </h1>
        <p className="text-foreground-muted">
          Next.js 16 + Tailwind v4 scaffolded. Dark base, amber accent, Geist
          Sans &amp; Mono loaded. Assets staged in <code className="font-mono text-foreground">/public</code>.
        </p>
        <p className="font-mono text-xs text-foreground-subtle pt-4">
          <span className="text-accent">$</span> next: M2 — static content &amp; layout
        </p>
      </div>
    </main>
  );
}
