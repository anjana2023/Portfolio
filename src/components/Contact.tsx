"use client";
import { useState } from "react";
import { contactTopics, profile } from "@/data/content";
import Reveal from "./Reveal";
import { ArrowUpRightIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";

const field =
  "w-full border-0 border-b border-white/20 bg-transparent py-4 text-xl text-paper outline-none transition-colors placeholder:text-muted focus:border-lime";

export default function Contact() {
  const [topic, setTopic] = useState(contactTopics[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`${topic} — from ${name || "your portfolio"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  const socials = [
    { label: "Email", href: `mailto:${profile.email}`, Icon: MailIcon },
    { label: "GitHub", href: profile.github, Icon: GithubIcon },
    { label: "LinkedIn", href: profile.linkedin, Icon: LinkedinIcon },
  ];

  return (
    <section id="contact" className="px-6 pb-20 pt-10 md:px-10">
      <Reveal>
        <h2 className="font-display text-[clamp(46px,7.2vw,150px)] font-extrabold leading-[0.9] tracking-[-0.05em]">
          Let&apos;s work{" "}
          <span className="gradient-text font-serif font-normal italic tracking-[-0.02em]">together</span>
        </h2>
      </Reveal>

      <div className="mt-20 grid gap-16 md:grid-cols-2">
        <Reveal>
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            Have a product in mind or a role to fill? I usually reply within a day.
          </p>
          <ul className="mt-8 flex gap-4">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="grid h-14 w-14 place-items-center rounded-full border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:border-lime hover:bg-lime hover:text-ink"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="space-y-8">
            <div role="radiogroup" aria-label="What are you reaching out about?" className="flex flex-wrap gap-3">
              {contactTopics.map((t) => {
                const on = t === topic;
                return (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setTopic(t)}
                    className={`rounded-full border px-6 py-3 text-[15px] transition-all duration-300 ${
                      on
                        ? "border-lime bg-lime font-medium text-ink"
                        : "border-white/20 hover:border-white/50"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div>
              <label htmlFor="name" className="sr-only">Your name</label>
              <input id="name" className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" type="email" className={field} placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Tell me about it</label>
              <textarea id="message" rows={3} className={`${field} resize-none`} placeholder="Tell me about it" value={message} onChange={(e) => setMessage(e.target.value)} required />
            </div>

            <button
              type="submit"
              className="group inline-flex items-center gap-3 rounded-full bg-lime px-9 py-4 text-lg font-medium text-ink shadow-[0_0_50px_-5px_rgba(200,255,61,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_70px_0_rgba(200,255,61,0.6)]"
            >
              Send message
              <ArrowUpRightIcon className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
