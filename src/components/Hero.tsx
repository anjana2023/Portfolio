"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/content";
import { ArrowDownIcon } from "./icons";
import HeroVisual from "./HeroVisual";

const ease = [0.2, 0.7, 0.2, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.2em] -mb-[0.14em]">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.12]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen overflow-hidden px-6 pb-10 pt-28 md:px-10"
    >
      <motion.div
        style={{ opacity: fade, y: lift }}
        className="mx-auto grid min-h-[calc(100svh-9.5rem)] max-w-[1600px] items-center gap-14 md:items-start md:grid-cols-[minmax(0,1.1fr)_minmax(320px,1fr)] md:gap-8 lg:items-center lg:grid-cols-[minmax(0,1.2fr)_minmax(420px,1fr)] lg:gap-10"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-2xl italic text-muted md:text-3xl"
          >
            Hi, I&apos;m {profile.name} —
          </motion.p>

          <h1 className="mt-4 font-display font-extrabold leading-[0.86] tracking-[-0.04em] text-[clamp(56px,8.7vw,150px)]">
            <Line delay={0.1}>
              <span className="gradient-text">Software</span>
            </Line>
            <Line delay={0.22}>
              <span className="text-white/[0.16]">Engineer</span>
              <span className="ml-[0.06em] inline-block h-[0.17em] w-[0.17em] rounded-full bg-lime align-baseline" />
            </Line>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="mt-12"
          >
            <p className="max-w-[34rem] text-lg leading-relaxed text-muted">{profile.intro}</p>
            <a
              href="#work"
              className="mt-8 inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-paper"
            >
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                <ArrowDownIcon />
              </motion.span>
              Scroll to explore
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease }}
            className="mt-12 grid max-w-[38rem] grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:gap-6"
          >
            {profile.stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-3xl font-bold tracking-tight md:text-4xl">{s.value}</dd>
                <dt className="mt-2 text-[10px] uppercase tracking-[0.15em] text-muted sm:text-xs">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        <HeroVisual />
      </motion.div>
    </section>
  );
}