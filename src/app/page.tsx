import { experience, toolkit, work } from "@/content";
import { Chat } from "@/components/Chat";
import { Footer } from "@/components/Footer";
import { GitHub } from "@/components/GitHub";
import { Intro } from "@/components/Intro";
import { Lamp } from "@/components/Lamp";
import { PaperPlane } from "@/components/PaperPlane";
import { WorkList } from "@/components/WorkList";
import { Label, Reveal } from "@/components/ui";
import { jsonLd } from "@/site";

export default function Home() {
  return (
    <>
      {/* structured data: tells search engines who this page is about */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
      />
      <PaperPlane />
      <main className="relative mx-auto max-w-[540px] px-4 pt-5 sm:px-4 sm:pt-6">
        <Lamp />
        <Intro />

        <section className="pt-16">
          <Reveal>
            <Label>Selected work</Label>
          </Reveal>
          <WorkList items={work} />
        </section>

        <section className="pt-16">
          <Reveal>
            <Label>Experience</Label>
          </Reveal>
          <WorkList items={experience} />
        </section>

        <section className="pt-16">
          <GitHub />
        </section>

        <section className="pt-16">
          <Reveal>
            <Label>Toolkit</Label>
          </Reveal>
          <WorkList items={toolkit} />
        </section>

        <section className="pt-16">
          <Reveal>
            <Label>Let&apos;s talk</Label>
          </Reveal>
          <Chat />
        </section>

        <Footer />
      </main>
    </>
  );
}
