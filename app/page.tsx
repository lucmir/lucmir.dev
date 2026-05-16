import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Experience />
        </Reveal>
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Education />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
