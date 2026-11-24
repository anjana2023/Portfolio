"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorDot() {
  const [big, setBig] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setBig(!!(e.target as HTMLElement | null)?.closest("a, button, input, textarea, [role='radio']"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[70] motion-reduce:hidden [@media(hover:none)]:hidden [@media(pointer:coarse)]:hidden"
    >
      <motion.div
        animate={{ scale: big ? 2.6 : 1, opacity: big ? 0.55 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="-ml-[5px] -mt-[5px] h-2.5 w-2.5 rounded-full bg-lime"
      />
    </motion.div>
  );
}
