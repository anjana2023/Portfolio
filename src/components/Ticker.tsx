"use client";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { skills } from "@/data/content";

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** 4-point sparkle used as the separator */
function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[0.55em] w-[0.55em] shrink-0 fill-lime">
      <path d="M12 0C12.6 6.6 17.4 11.4 24 12 17.4 12.6 12.6 17.4 12 24 11.4 17.4 6.6 12.6 0 12 6.6 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}

function List({ flip, hidden }: { flip: boolean; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex w-max shrink-0 items-center">
      {skills.map((s, i) => {
        const bright = (i + (flip ? 1 : 0)) % 2 === 0;
        return (
          <li
            key={s}
            className={`flex items-center gap-[0.5em] pr-[0.5em] ${bright ? "text-paper" : "text-white/25"}`}
          >
            <span className="whitespace-nowrap">{s}</span>
            <Sparkle />
          </li>
        );
      })}
    </ul>
  );
}

/** One marquee row. Drifts on its own and speeds up / reverses with scroll velocity. */
function Row({ dir, start, flip }: { dir: 1 | -1; start: number; flip: boolean }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(start);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir * 1.8 * (delta / 1000);
    move += dir * move * boost.get();
    baseX.set(baseX.get() + move);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <motion.div style={{ x }} className="flex w-max">
      <List flip={flip} />
      <List flip={flip} hidden />
    </motion.div>
  );
}

export default function Ticker() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="relative overflow-hidden border-y border-white/[0.07] py-10 font-display text-[clamp(30px,4.6vw,76px)] font-bold leading-none tracking-[-0.02em]"
    >
      <ul className="sr-only">
        {skills.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="space-y-[0.28em]">
        <Row dir={-1} start={-8} flip={false} />
        <Row dir={1} start={-30} flip />
      </div>
    </section>
  );
}
