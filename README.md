# Anjana — Portfolio (Next.js + Tailwind v4 + Framer Motion)

## Run
    npm install
    npm run dev      # http://localhost:3000

## Edit your content
Everything (copy, projects, experience, skills, links) lives in `src/data/content.ts`.
Search that file for `TODO` — your GitHub URL.

## Project screenshots
They load from your live site (https://anjanaworks-dev.vercel.app/...), see `src/data/content.ts`.
To self-host, copy the images into `public/projects/` and change the paths there.
While an image loads, the device frame shows a dark gradient.

## Structure
- `src/components/Hero.tsx`        masked headline reveal + animated gradient word + stats
- `src/components/Work.tsx`        pinned horizontal scroll, parallax device mockups, per-project colour wash, scroll progress line (stacked cards on mobile)
- `src/components/Experience.tsx`  ruled timeline rows
- `src/components/Ticker.tsx`      two-row skills marquee; speeds up / reverses with scroll, lime sparkle separators
- `src/components/Contact.tsx`     topic chips, underline inputs, mailto submit
- `CursorDot.tsx`, `ScrollProgress.tsx`, `Navbar.tsx` (scroll-spy), `Backdrop.tsx`

## Notes
- Fonts: Bricolage Grotesque (display), Instrument Serif italic (accents), Manrope (body) via next/font. These are my best match to the video; swap in `src/app/layout.tsx`.
- Contact form opens the visitor's mail app (no backend). Replace with a Route Handler + Resend later.
- Respects prefers-reduced-motion; custom cursor only on fine-pointer devices.
