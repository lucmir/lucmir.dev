import { cacheLife } from "next/cache";
import { profile } from "@/lib/cv-data";

export async function Footer() {
  "use cache";
  cacheLife("days"); // © year stays current without a redeploy

  return (
    <footer className="border-t border-border mt-6">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-foreground-subtle uppercase tracking-[0.12em]">
        <p>
          <span className="text-accent">©</span> {new Date().getFullYear()} {profile.name.toLowerCase()}
        </p>
        <p>belo horizonte · utc−3</p>
      </div>
    </footer>
  );
}
