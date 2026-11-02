import { cacheLife } from "next/cache";
import { profile } from "@/lib/cv-data";

export async function Footer() {
  "use cache";
  cacheLife("days"); // © year stays current without a redeploy

  return (
    <footer className="bg-brand text-brand-ink mt-6">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[15px] font-sans">
        <p>
          <span className="text-mist">©</span> {new Date().getFullYear()} {profile.name}
        </p>
        <p>Belo Horizonte · UTC−3</p>
      </div>
    </footer>
  );
}
