import { SectionHeading } from "@/components/section-heading";
import { about } from "@/lib/cv-data";

export function About() {
  return (
    <section
      id="about"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24 scroll-mt-20"
    >
      <div className="space-y-8">
        <SectionHeading label="// about" title="A short introduction" />
        <div className="max-w-3xl space-y-4 text-base sm:text-lg text-foreground-muted leading-relaxed">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
