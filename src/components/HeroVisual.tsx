"use client";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { profile } from "@/data/content";

const ease = [0.2, 0.7, 0.2, 1] as const;


const nodes = [
  [20, 54], [20, 132], [20, 210], [20, 288],
  [126, 36], [126, 100], [126, 164], [126, 228], [126, 292],
  [240, 62], [240, 138], [240, 214], [240, 290],
  [354, 36], [354, 100], [354, 164], [354, 228], [354, 292],
  [460, 54], [460, 132], [460, 210], [460, 288],
] as const;
const links =
  "M20 54L126 36 M20 54L126 100 M20 132L126 100 M20 132L126 164 M20 210L126 164 M20 210L126 228 M20 288L126 228 M20 288L126 292 " +
  "M126 36L240 62 M126 100L240 62 M126 100L240 138 M126 164L240 138 M126 164L240 214 M126 228L240 214 M126 228L240 290 M126 292L240 290 " +
  "M240 62L354 36 M240 62L354 100 M240 138L354 100 M240 138L354 164 M240 214L354 164 M240 214L354 228 M240 290L354 228 M240 290L354 292 " +
  "M354 36L460 54 M354 100L460 54 M354 100L460 132 M354 164L460 132 M354 164L460 210 M354 228L460 210 M354 292L460 288";

function Layer({
  px,
  py,
  depth,
  className,
  children,
}: {
  px: MotionValue<number>;
  py: MotionValue<number>;
  depth: number;
  className: string;
  children: React.ReactNode;
}) {
  const x = useTransform(px, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(py, [-0.5, 0.5], [-depth, depth]);
  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`}>
      {children}
    </motion.div>
  );
}

function Float({
  children,
  amp = 10,
  dur = 6,
  delay = 0,
  rotate = 0,
}: {
  children: React.ReactNode;
  amp?: number;
  dur?: number;
  delay?: number;
  rotate?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      animate={reduce ? undefined : { y: [0, -amp, 0], rotate: [rotate, rotate + 1, rotate] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ rotate }}
    >
      {children}
    </motion.div>
  );
}

function Chip({ label, dot, delay }: { label: string; dot: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay, ease }}
      className="flex items-center gap-2 rounded-full border border-white/15 bg-[#14150c]/80 px-4 py-2 font-mono text-[13px] text-paper shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md"
    >
      <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
      {label}
    </motion.span>
  );
}

const code: { n: number; node: React.ReactNode }[] = [
  { n: 1, node: <><span className="text-pink">const</span> <span className="text-sky">anjana</span> = {"{"}</> },
  { n: 2, node: <>&nbsp;&nbsp;<span className="text-muted">role:</span> <span className="text-lime">&quot;Software Engineer&quot;</span>,</> },
  { n: 3, node: <>&nbsp;&nbsp;<span className="text-muted">lookingFor:</span> [<span className="text-lime">&quot;MERN stack&quot;</span>, <span className="text-lime">&quot;Frontend&quot;</span>],</> },
  { n: 4, node: <>&nbsp;&nbsp;<span className="text-muted">location:</span> <span className="text-lime">&quot;UAE&quot;</span>,</> },
  { n: 5, node: <>&nbsp;&nbsp;<span className="text-muted">stack:</span> [<span className="text-ember">&quot;React&quot;</span>, <span className="text-ember">&quot;Node.js&quot;</span>, <span className="text-ember">&quot;MongoDB&quot;</span>],</> },
  { n: 6, node: <>&nbsp;&nbsp;<span className="text-muted">openToWork:</span> <span className="text-pink">true</span>,</> },
  { n: 7, node: <>{"};"}<span className="ml-1 inline-block h-4 w-[3px] animate-pulse bg-lime align-middle" /></> },
];

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 90, damping: 20 });
  const py = useSpring(my, { stiffness: 90, damping: 20 });

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease }}
      aria-hidden="true"
      className="relative mx-auto h-[560px] w-full max-w-[640px] lg:h-[620px] lg:max-w-none"
    >
      {/* colour wash */}
      <div className="absolute inset-[6%] rounded-full bg-gradient-to-br from-ember/25 via-pink/15 to-lime/25 blur-3xl" />

      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(closest-side, black 35%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(closest-side, black 35%, transparent 100%)",
        }}
      />

      {/* neural network backdrop */}
      <svg
        viewBox="0 0 480 360"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <path d={links} stroke="rgba(210,227,123,0.16)" strokeWidth="1" fill="none" />
        <motion.path
          d={links}
          fill="none"
          stroke="rgba(210,227,123,0.6)"
          strokeWidth="1.5"
          strokeDasharray="1 18"
          animate={{ strokeDashoffset: [0, -32] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        {nodes.map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="3"
            fill={i % 4 === 0 ? "var(--color-pink)" : "var(--color-lime)"}
            animate={{ r: [2.5, 5, 2.5], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.4 + (i % 4) * 0.35, repeat: Infinity, ease: "easeInOut", delay: (i % 8) * 0.17 }}
          />
        ))}
      </svg>

      {/* 1 — editor window */}
      <Layer px={px} py={py} depth={10} className="left-[2%] top-[7%] w-[80%] max-w-[500px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
        >
          <Float amp={6} dur={7}>
            <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#101109]/85 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-muted">anjana.ts</span>
              </div>
              <div className="px-4 py-4 font-mono text-[12.5px] leading-7 sm:text-[13.5px]">
                {code.map((l, i) => (
                  <motion.p
                    key={l.n}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.14, ease }}
                    className="flex gap-4 whitespace-nowrap"
                  >
                    <span className="w-3 shrink-0 select-none text-right text-white/25">{l.n}</span>
                    <span>{l.node}</span>
                  </motion.p>
                ))}
              </div>
            </div>
          </Float>
        </motion.div>
      </Layer>

      {/* 2 — build terminal */}
      <Layer px={px} py={py} depth={22} className="bottom-[2%] right-[0%] w-[56%] max-w-[380px] sm:w-[60%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease }}
        >
          <Float amp={12} dur={8} delay={0.6} rotate={3}>
            <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#0c0d08]/95 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.95)] backdrop-blur-xl">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-3.5 py-2.5">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-[10px] text-muted">build.log</span>
              </div>
              <div className="space-y-2 px-4 py-4 font-mono text-[10px] sm:text-xs">
                <p className="text-paper"><span className="text-lime">$</span> build experience</p>
                <p className="text-muted"><span className="mr-2 text-lime">✓</span> thoughtful interface</p>
                <p className="text-muted"><span className="mr-2 text-lime">✓</span> responsive by design</p>
                <p className="text-muted"><span className="mr-2 text-lime">✓</span> ready to ship<span className="ml-1 inline-block h-3 w-[2px] animate-pulse bg-lime align-middle" /></p>
                <div className="flex items-center gap-1 pt-1">
                  <span className="h-1 w-1 rounded-full bg-lime" />
                  <span className="h-1 w-1 rounded-full bg-lime/60" />
                  <span className="h-1 w-1 rounded-full bg-lime/30" />
                  <span className="ml-2 text-[9px] uppercase tracking-[0.16em] text-muted">workflow complete</span>
                </div>
              </div>
            </div>
          </Float>
        </motion.div>
      </Layer>

      {/* 3 — floating chips */}
      <Layer px={px} py={py} depth={30} className="right-[3%] top-[2%]">
        <Float amp={9} dur={5.5}><Chip label="React" dot="var(--color-sky)" delay={1.2} /></Float>
      </Layer>
      <Layer px={px} py={py} depth={26} className="left-[0%] top-[60%]">
        <Float amp={8} dur={6.5} delay={0.8}><Chip label="TypeScript" dot="var(--color-sky)" delay={1.4} /></Float>
      </Layer>
      <Layer px={px} py={py} depth={34} className="right-[2%] top-[53%] lg:top-[37%]">
        <Float amp={10} dur={6} delay={1.4}><Chip label="Next.js" dot="var(--color-paper)" delay={1.6} /></Float>
      </Layer>
      <Layer px={px} py={py} depth={18} className="bottom-[10%] left-[4%]">
        <Float amp={8} dur={7} delay={0.3}><Chip label="Node.js" dot="var(--color-lime)" delay={1.8} /></Float>
      </Layer>


      <Layer px={px} py={py} depth={14} className="left-[10%] top-[-1%]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease }}
          className="flex items-center gap-2.5 rounded-full border border-lime/30 bg-lime/10 px-4 py-2 text-sm text-paper backdrop-blur-md"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-lime shadow-[0_0_12px_var(--color-lime)]" />
          Open to work · UAE
        </motion.div>
      </Layer>

      <span className="absolute bottom-[1%] left-[2%] font-mono text-xs text-muted/70">{profile.name.toLowerCase()} · AI · UI · WEB</span>
    </motion.div>
  );
}