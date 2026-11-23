# Preet Kumar — Portfolio

Personal portfolio built with **Next.js 16**, **React 19**, **Tailwind CSS 4** and **Motion** (Framer Motion). Mobile-first, statically prerendered, light/dark theme.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Edit content

All copy — name, stats, projects, experience, skills, contact chat — lives in [`src/content.ts`](src/content.ts). Change it there; components read from it.

Files in `public/` (resume, screenshots) are served from the site root, e.g. `/Preet_Kumar_Resume.pdf`.

## Structure

```
src/
  app/
    layout.tsx       fonts (Hanken Grotesk + JetBrains Mono), metadata, theme bootstrap
    page.tsx         section order
    globals.css      color tokens + accent swatches (emerald default, blue, violet, rose)
  components/
    Intro.tsx        status pill, photo frame + name (↔ Hindi), headline, rotating line, bio
    Lamp.tsx         pixel desk lamp — toggles dark mode with a circular reveal; stars at night
    PaperPlane.tsx   pixel plane that drifts across the screen
    WorkList.tsx     meta | title + description rows (work, experience, toolkit)
    GitHub.tsx       contribution graph, cached and refreshed daily
    Chat.tsx         "Let's talk" scripted chat with typing indicator; press C to copy email
    Footer.tsx       contact links, color swatches, live clock, pixel cat (tap to wake)
    Pixel.tsx        tiny pixel-art renderer + the art itself
  content.ts         all site copy
legacy/              previous single-file HTML versions
```

## Your photo

Put a square photo at `public/me.jpg`, then in `src/content.ts` set `photo: "/me.jpg"`. Until then the frame shows your initials.

## Notes

- Animations respect the OS "reduce motion" setting (`MotionConfig reducedMotion="user"`).
- Fonts: Hanken Grotesk (text) and JetBrains Mono (labels), self-hosted via `next/font`.
- Deploy: push to GitHub and import the repo on Vercel — no config needed.
