"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { projects, type Project } from "@/data/content";

/* ---------- a browser-style device frame ---------- */
function Device({
  src,
  label,
  className = "",
  style,
}: {
  src: string;
  label: string;
  className?: string;
  style?: React.CSSProperties | Record<string, MotionValue<number> | string | number>;
}) {
  return (
    <motion.div
      style={style as never}
      className={`absolute overflow-hidden rounded-[22px] border border-white/10 bg-[#0c0d0a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex h-9 items-center gap-1.5 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      {/* The gradient sits under the image, so it shows until you add the screenshot */}
      <div
        role="img"
        aria-label={label}
        className="aspect-[16/10] w-full bg-cover bg-top"
        style={{
          backgroundImage: `url(${src}), linear-gradient(135deg, #1b1d15, #2a2c20 55%, #15160f)`,
        }}
      />
    </motion.div>
  );
}

/* ---------- one project panel (desktop, horizontal) ---------- */
function Panel({ p, progress, i }: { p: Project; progress: MotionValue<number>; i: number }) {
  const n = projects.length;
  // centre of this panel in overall progress (0..1)
  const c = n === 1 ? 0 : i / (n - 1);
  const span = 1 / Math.max(n - 1, 1);
  const range = [c - span, c, c + span];
  const mainY = useTransform(progress, range, [40, 0, -40]);
  const sideY = useTransform(progress, range, [90, 0, -90]);
  const smallY = useTransform(progress, range, [-60, 0, 60]);
  const sideX = useTransform(progress, range, [60, 0, -60]);

  return (
    <div className="relative flex h-full w-screen shrink-0 items-center">
      {/* ghost word */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[4vw] left-[2vw] select-none whitespace-nowrap font-display text-[clamp(220px,34vw,560px)] font-extrabold leading-none tracking-[-0.06em] text-white/[0.035]"
      >
        {p.name}
      </span>

      {/* text */}
      <div className="relative z-10 w-[40vw] shrink-0 pl-10 pr-6 lg:pl-14">
        <p className="text-sm tracking-[0.22em]" style={{ color: p.accent }}>
          {p.index} — {p.year}
        </p>
        <h3 className="mt-4 font-display text-[clamp(56px,8.5vw,140px)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          {p.name}
        </h3>
        <p className="mt-4 font-serif text-3xl italic" style={{ color: p.accent }}>
          {p.kind}
        </p>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{p.description}</p>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full border border-white/20 px-4 py-1.5 text-sm">
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* devices */}
      <div className="relative z-10 h-[62vh] w-[58vw] shrink-0">
        <div
          aria-hidden="true"
          className="absolute -bottom-10 left-[8%] h-[70%] w-[90%] rounded-full blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${p.glow}, transparent)` }}
        />
        <Device
          src={p.shots[0]}
          label={`${p.name} main screen`}
          className="left-[4%] top-[8%] w-[78%]"
          style={{ y: mainY }}
        />
        <Device
          src={p.shots[1]}
          label={`${p.name} detail screen`}
          className="right-[-6%] top-[-6%] w-[48%]"
          style={{ y: sideY, x: sideX }}
        />
        <Device
          src={p.shots[2]}
          label={`${p.name} secondary screen`}
          className="-left-[10%] bottom-[0%] w-[44%]"
          style={{ y: smallY }}
        />
      </div>
    </div>
  );
}

/* ---------- mobile card (stacked, no pinning) ---------- */
function MobileCard({ p }: { p: Project }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs tracking-[0.22em]" style={{ color: p.accent }}>
        {p.index} — {p.year}
      </p>
      <h3 className="mt-3 font-display text-5xl font-extrabold tracking-[-0.03em]">{p.name}</h3>
      <p className="mt-2 font-serif text-2xl italic" style={{ color: p.accent }}>
        {p.kind}
      </p>
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0d0a]">
        <div className="flex h-8 items-center gap-1.5 px-3">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </div>
        <div
          role="img"
          aria-label={`${p.name} screenshot`}
          className="aspect-[16/10] w-full bg-cover bg-top"
          style={{ backgroundImage: `url(${p.shots[0]}), linear-gradient(135deg,#1b1d15,#2a2c20)` }}
        />
      </div>
      <p className="mt-6 text-muted">{p.description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <li key={t} className="rounded-full border border-white/20 px-3 py-1 text-sm">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Heading({ progress }: { progress?: MotionValue<number> }) {
  return (
    <div className="flex items-end gap-8 px-0 md:px-10">
      <h2 className="font-display text-[clamp(36px,3.9vw,64px)] font-bold leading-none tracking-[-0.03em]">
        Selected <span className="gradient-text font-serif font-normal italic">work</span>
      </h2>
      {/* faint track + a gradient fill that grows as you move through the projects */}
      <div className="relative mb-3 hidden h-px flex-1 bg-white/10 md:block">
        {progress && (
          <motion.div
            style={{ scaleX: progress }}
            className="absolute inset-0 origin-left bg-gradient-to-r from-lime via-ember to-pink"
          />
        )}
      </div>
    </div>
  );
}

/** Full-section colour wash that cross-fades as each project comes into view. */
function GlowLayer({ p, i, progress }: { p: Project; i: number; progress: MotionValue<number> }) {
  const n = projects.length;
  const c = n === 1 ? 0 : i / (n - 1);
  const half = 0.6 / Math.max(n - 1, 1);
  // Keep every offset inside 0..1 and in order (scroll-linked opacity requires it).
  const lo = Math.max(0, c - half);
  const hi = Math.min(1, c + half);
  const input = [lo, c, hi].filter((v, k, arr) => k === 0 || v > arr[k - 1]);
  const output = input.map((v) => (v === c ? 1 : 0));
  const opacity = useTransform(progress, input.length > 1 ? input : [0, 1], input.length > 1 ? output : [1, 1]);
  return (
    <motion.div
      aria-hidden="true"
      style={{
        opacity,
        background: `radial-gradient(70% 60% at 68% 100%, ${p.glow}, transparent 70%)`,
      }}
      className="pointer-events-none absolute inset-0"
    />
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = projects.length;
  // Each project is two screen-widths: text + devices.
  // Track is n * 100vw wide; slide it so the last panel ends flush.
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `${-(n - 1) * 100}vw`]);

  return (
    <section id="work" aria-label="Selected work">
      {/* Desktop: pinned horizontal scroller */}
      <div ref={ref} style={{ height: `${n * 110}vh` }} className="relative hidden md:block">
        <div className="sticky top-0 h-screen overflow-hidden pt-24">
          {projects.map((p, i) => (
            <GlowLayer key={p.name} p={p} i={i} progress={scrollYProgress} />
          ))}
          <div className="relative z-10">
            <Heading progress={scrollYProgress} />
          </div>
          <motion.div style={{ x }} className="relative z-10 mt-4 flex h-[calc(100vh-9rem)]">
            {projects.map((p, i) => (
              <Panel key={p.name} p={p} progress={scrollYProgress} i={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile: simple stacked cards */}
      <div className="px-6 py-24 md:hidden">
        <Heading />
        <div className="mt-10 space-y-6">
          {projects.map((p) => (
            <MobileCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
