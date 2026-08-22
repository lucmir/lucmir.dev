import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-6">
        <p className="font-sans text-base text-foreground-subtle">
          <span className="text-accent">$</span> cat /requested-page
        </p>
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight">
          404
        </h1>
        <p className="text-lg sm:text-xl text-foreground-muted">
          That page didn&apos;t resolve. Probably a typo, or something I
          haven&apos;t built yet.
        </p>
        <p className="font-sans text-[16px] text-foreground-subtle pt-4">
          <Link
            href="/"
            className="text-accent hover:underline underline-offset-4"
          >
            ← cd ~/
          </Link>
        </p>
      </div>
    </main>
  );
}
