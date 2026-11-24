"use client";
import { useEffect, useState } from "react";
import { navItems } from "@/data/content";

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="font-display text-xl font-bold tracking-tight">
          anjana<span className="text-paper">.</span>
        </a>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-2 py-1.5 backdrop-blur-xl sm:block"
        >
          <ul className="flex items-center">
            {navItems.map((item) => {
              const on = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={on ? "true" : undefined}
                    className={`block rounded-full px-5 py-2 text-[15px] transition-colors ${
                      on ? "bg-white/10 text-paper" : "text-muted hover:text-paper"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <p className="flex items-center gap-2 text-sm text-muted">
          <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_10px_var(--color-lime)]" />
          Open to UAE roles
        </p>
      </div>
    </header>
  );
}
