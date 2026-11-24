import { experience } from "@/data/content";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-32 md:px-10 md:py-44">
      <Reveal className="flex items-end gap-8">
        <h2 className="font-display text-[clamp(38px,4.4vw,76px)] font-bold leading-none tracking-[-0.03em]">
          Experience{" "}
          <span className="bg-gradient-to-r from-pink to-gold bg-clip-text font-serif font-normal italic text-transparent">
            so far
          </span>
        </h2>
        <div className="mb-3 hidden h-px flex-1 bg-white/15 md:block" />
      </Reveal>

      <ol className="mt-16 border-b border-white/10">
        {experience.map((e, i) => (
          <li key={e.company} className="border-t border-white/10">
            <Reveal delay={i * 0.08} y={20} className="grid gap-4 py-10 md:grid-cols-[1fr_1fr_1.6fr] md:gap-10">
              <p className="pt-2 text-sm uppercase tracking-[0.18em] text-muted">{e.period}</p>
              <div>
                <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{e.company}</h3>
                <p className="mt-1 text-lg text-muted">{e.role}</p>
              </div>
              <p className="text-lg leading-relaxed text-muted">{e.summary}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
