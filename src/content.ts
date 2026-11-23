// All site copy lives here — edit this file to update the portfolio.

export const profile = {
  name: "Preet Kumar", // shown on the page
  fullName: "Preet Kumar Bhardwaj",
  searchName: "Preet Bhardwaj", // main name for Google
  aliases: ["Preet Kumar", "Preet Kumar Bhardwaj", "प्रीत कुमार"],
  nameNative: "प्रीत कुमार", // shown when the name is tapped / hovered
  role: "Frontend Engineer",
  initials: "PK",
  // Drop your photo at public/me.jpg and set this to "/me.jpg".
  photo: "/me.jpg" as string | null,
  location: "India",
  city: "Gurugram",
  timezone: "Asia/Kolkata",
  email: "preetb059@gmail.com",
  resume: "/Preet_Kumar_Resume.pdf",
  github: "LitPreet",
  links: {
    github: "https://github.com/LitPreet",
    linkedin: "https://www.linkedin.com/in/preet-bhardwaj16/",
  },
};

/** Big hero line. The word in {braces} gets the accent color + speed lines. */
export const headline = "I make the web feel {fast}.";

/** Rotates after "Frontend engineer who …" */
export const rotating = ["ships products end to end.", "obsesses over LCP.", "sweats the small details.", "makes things move."];


/**
 * Bio paragraphs. Wrap a word in [brackets](url) to make it a dashed-underline link.
 */
export const bio = [
  "I build with [React](https://react.dev), [Next.js](https://nextjs.org) and [TypeScript](https://www.typescriptlang.org). Right now I'm at [NeenOpal](https://neenopal.com), working on [Mokkup.ai](https://mokkup.ai), a dashboard-mockup tool used by 140K+ people.",
  "I care about the parts of frontend people feel but rarely notice: pages that load fast, layouts that don't jump, and interfaces that just work. Outside work I build my own products end to end. A couple are below.",
];

export type WorkItem = {
  meta: string;
  sub?: string;
  title: string;
  href?: string;
  desc: string;
  preview?: string;
  links?: { label: string; href: string }[];
};

export const work: WorkItem[] = [
  {
    meta: "99",
    sub: "lighthouse",
    title: "Shiplog",
    href: "https://shiplog-it.vercel.app",
    preview: "/shiplog.png",
    desc: "In-app feedback boards from a single script tag. Users suggest ideas, vote, and see what ships without leaving your product. The widget is about 11 KB, lives in Shadow DOM so it never clashes with your styles, and catches duplicate ideas with AI.",
    links: [
      { label: "Live demo", href: "https://shiplog-it.vercel.app/demo" },
      { label: "Code", href: "https://github.com/LitPreet/Shiplog" },
    ],
  },
  {
    meta: "3 KB",
    sub: "tracker",
    title: "PulseBoard",
    href: "https://github.com/LitPreet/PulseBoard",
    desc: "A self-hostable take on PostHog and Mixpanel. One tiny script gives you live events, trends, funnels, retention and sessions. Redis Streams soak up traffic spikes so Postgres never feels them, and new events show up live in about a second.",
    links: [{ label: "Code", href: "https://github.com/LitPreet/PulseBoard" }],
  },
];

export const experience: WorkItem[] = [
  {
    meta: "2025 — now",
    sub: "Full-time",
    title: "NeenOpal · React Developer",
    href: "https://mokkup.ai",
    desc: "Building Mokkup.ai for 140K+ users: one-click brand theming and drill-down geomaps. Leading the marketing site move from Next.js 11 to 16, and cut mobile LCP by 24% with CLS down to zero.",
  },
  {
    meta: "2023 — 2025",
    sub: "Full-time",
    title: "Vizlogic · Frontend Developer",
    desc: "Architected an enterprise intranet (HRMS, CRM, vendors) in Next.js and Redux. Real-time attendance with live camera check-in for 200+ daily users, and a component library that cut build time by 40%.",
  },
];

export const toolkit: WorkItem[] = [
  { meta: "Frontend", title: "", desc: "TypeScript, React, Next.js, Tailwind, Redux Toolkit, Zustand, TanStack Query, Motion" },
  { meta: "Backend", title: "", desc: "Node.js, Express, PostgreSQL, Redis, Prisma, MongoDB, LLM APIs" },
  { meta: "Testing", title: "", desc: "Playwright, Jest, Vitest, Lighthouse, Docker, GitHub Actions" },
];

export type ChatLine =
  | { from: "them" | "me"; text: string }
  | { from: "me"; kind: "email" | "socials" };

export const chat: ChatLine[] = [
  { from: "them", text: "hey, just went through your portfolio 👋" },
  { from: "them", text: "what do you actually work on?" },
  { from: "me", text: "mostly frontend. react, next.js, typescript" },
  { from: "me", text: "right now i'm building mokkup.ai at neenopal. 140k+ people use it" },
  { from: "them", text: "nice. do you care about performance?" },
  { from: "me", text: "a lot. cut mobile LCP by 24% there and took layout shift to zero" },
  { from: "me", text: "and shiplog, my side project, scores 99 on lighthouse mobile" },
  { from: "them", text: "we're hiring frontend engineers btw 👀" },
  { from: "them", text: "how soon could you join?" },
  { from: "me", text: "right away, actually" },
  { from: "me", text: "email is the fastest way to reach me ⚡" },
  { from: "me", kind: "email" },
  { from: "me", text: "or find me here" },
  { from: "me", kind: "socials" },
  { from: "them", text: "perfect, will reach out" },
  { from: "me", text: "talk soon ✌️" },
];

export const contactLinks = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Resume", href: profile.resume },
];
